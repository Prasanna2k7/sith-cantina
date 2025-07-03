import React, { useState, useEffect } from 'react';
import { Clock, Search, Filter, Plus, Minus, Star, ShoppingCart, X, Package, CheckCircle, AlertCircle, Zap, Shield } from 'lucide-react';
import Header from '../../components/Layout/Header';
import { MenuItem, CartItem, Order } from '../../types';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'menu' | 'orders'>('menu');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [updatingCart, setUpdatingCart] = useState<string | null>(null);

  useEffect(() => {
    fetchMenuItems();
    fetchCartItems();
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('name');

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartItems = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          menu_item:menu_items(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setCartItems(data || []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items:order_items(
            *,
            menu_item:menu_items(*)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const addToCart = async (menuItem: MenuItem) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const existingItem = cartItems.find(item => item.menu_item_id === menuItem.id);

      if (existingItem) {
        await updateCartQuantity(existingItem.id, existingItem.quantity + 1);
      } else {
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            menu_item_id: menuItem.id,
            quantity: 1
          });

        if (error) throw error;
        await fetchCartItems();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateCartQuantity = async (cartItemId: string, quantity: number) => {
    if (updatingCart === cartItemId) return;
    
    setUpdatingCart(cartItemId);
    try {
      if (quantity <= 0) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', cartItemId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', cartItemId);

        if (error) throw error;
      }

      await fetchCartItems();
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    } finally {
      setUpdatingCart(null);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setCheckoutLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const totalAmount = cartItems.reduce((sum, item) => sum + (item.menu_item.price * item.quantity), 0);

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          status: 'pending',
          payment_status: 'completed'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        price: item.menu_item.price
      }));

      const { error: orderItemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (orderItemsError) throw orderItemsError;

      for (const item of cartItems) {
        const { error: updateError } = await supabase
          .from('menu_items')
          .update({ 
            quantity_available: item.menu_item.quantity_available - item.quantity 
          })
          .eq('id', item.menu_item_id);

        if (updateError) throw updateError;
      }

      const { error: clearCartError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (clearCartError) throw clearCartError;

      await fetchCartItems();
      await fetchMenuItems();

      setIsCartOpen(false);
      alert('Order placed successfully! May the Force be with your meal preparation!');

    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to place order. The dark side has interfered. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'processing': return 'bg-empire-100 text-empire-800 border-empire-300';
      case 'ready': return 'bg-rebel-100 text-rebel-800 border-rebel-300';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'cancelled': return 'bg-sith-100 text-sith-800 border-sith-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'ready': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.menu_item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-space-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-empire-600 border-t-transparent rounded-full animate-spin mx-auto mb-6 jedi-glow"></div>
          <div className="flex items-center justify-center space-x-3">
            <Zap className="w-6 h-6 text-empire-500" />
            <span className="text-xl font-medium text-gray-200 galactic-font">Loading Galactic Menu...</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">Preparing your cosmic dining experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-space-gradient">
      <Header
        title={activeTab === 'menu' ? 'Galactic Menu' : 'Your Orders'}
        showCart={activeTab === 'menu'}
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('menu')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'menu'
                  ? 'border-empire-500 text-empire-400'
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-400'
              }`}
            >
              Galactic Menu
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'orders'
                  ? 'border-empire-500 text-empire-400'
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-400'
              }`}
            >
              Your Orders
            </button>
          </nav>
        </div>

        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <>
            {/* Search and Filter */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for galactic delicacies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 dark-input rounded-lg focus:ring-2 focus:ring-empire-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 dark-input rounded-lg focus:ring-2 focus:ring-empire-500 focus:border-transparent appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-dark-950 text-white">
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="dark-food-card rounded-xl overflow-hidden hover-lift transition-all duration-300">
                  <div className="relative">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-dark-950/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center border border-empire-500/30">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-white">{item.rating}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                      <span className="text-2xl font-bold empire-text">₹{item.price}</span>
                    </div>
                    <p className="text-gray-400 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>Serves: {item.serves}</span>
                      <span>Available: {item.quantity_available}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-empire-400">{item.canteen_name}</span>
                      <button
                        onClick={() => addToCart(item)}
                        disabled={item.quantity_available <= 0}
                        className="flex items-center space-x-2 empire-button text-white px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-empire-950/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-empire-500/30">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No galactic delicacies found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white galactic-font">Your Orders</h2>
              <div className="dark-glass px-4 py-2 rounded-lg border border-empire-500/30">
                <span className="text-sm text-gray-400">Total Orders: </span>
                <span className="font-semibold text-white">{orders.length}</span>
              </div>
            </div>

            {ordersLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-empire-600 border-t-transparent rounded-full animate-spin jedi-glow"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-empire-950/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-empire-500/30">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No orders yet</h3>
                <p className="text-gray-400 mb-6">Your galactic feast orders will appear here</p>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="empire-button text-white px-6 py-2 rounded-lg transition-all duration-200"
                >
                  Browse Galactic Menu
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {orders.map((order) => (
                  <div key={order.id} className="dark-holographic rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white galactic-font">
                          Order #{order.id.slice(0, 8)}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {new Date(order.created_at).toLocaleDateString()} at{' '}
                          {new Date(order.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold empire-text">₹{order.total_amount}</p>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-white mb-3">Items:</h4>
                      <div className="space-y-3">
                        {order.order_items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-3 dark-glass rounded-lg border border-empire-500/20">
                            <img
                              src={item.menu_item.image_url}
                              alt={item.menu_item.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h5 className="font-medium text-white">{item.menu_item.name}</h5>
                              <p className="text-sm text-empire-400">{item.menu_item.canteen_name}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-white">x{item.quantity}</p>
                              <p className="text-sm text-gray-400">₹{item.price * item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.status === 'ready' && (
                      <div className="bg-rebel-950/30 border border-rebel-500/50 rounded-lg p-4 force-glow">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-rebel-400 mr-2" />
                          <span className="text-rebel-300 font-medium">Your galactic feast is ready for pickup!</span>
                        </div>
                      </div>
                    )}

                    {order.status === 'processing' && (
                      <div className="bg-empire-950/30 border border-empire-500/50 rounded-lg p-4 jedi-glow">
                        <div className="flex items-center">
                          <Package className="w-5 h-5 text-empire-400 mr-2" />
                          <span className="text-empire-300 font-medium">Your order is being prepared by our galactic chefs</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setIsCartOpen(false)} 
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md dark-holographic flex flex-col border-l border-empire-500/30">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-6 border-b border-empire-500/30">
              <h2 className="text-xl font-semibold text-white galactic-font">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Your cart is empty</h3>
                  <p className="text-gray-400">Add some galactic delicacies to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="dark-glass rounded-lg p-4 border border-empire-500/20">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.menu_item.image_url}
                          alt={item.menu_item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{item.menu_item.name}</h4>
                          <p className="text-sm text-empire-400">₹{item.menu_item.price}</p>
                          <p className="text-xs text-gray-500">{item.menu_item.canteen_name}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            disabled={updatingCart === item.id}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-sith-600/20 hover:bg-sith-600/40 transition-colors disabled:opacity-50 border border-sith-500/30"
                          >
                            <Minus className="w-4 h-4 text-sith-400" />
                          </button>
                          <span className="w-8 text-center font-medium text-white">
                            {updatingCart === item.id ? '...' : item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            disabled={updatingCart === item.id}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-empire-600/20 hover:bg-empire-600/40 transition-colors disabled:opacity-50 border border-empire-500/30"
                          >
                            <Plus className="w-4 h-4 text-empire-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-empire-500/30 p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-white">Total:</span>
                  <span className="text-2xl font-bold empire-text">₹{cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full empire-button text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Shield className="w-5 h-5" />
                  <span>{checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;