import React from 'react';
import { LogOut, User, ShoppingCart, Utensils } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  title: string;
  showCart?: boolean;
  cartCount?: number;
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showCart = false, cartCount = 0, onCartClick }) => {
  const { user, signOut } = useAuth();

  return (
    <header className="holographic border-b border-cosmic-600/20 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-cosmic-600 rounded-xl flex items-center justify-center cosmic-glow mr-3">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold galactic-font galactic-text tracking-wide">Galactic Cantina</span>
                <div className="text-xs text-gray-400 font-medium">Premium Cuisine</div>
              </div>
            </div>
            <div className="ml-8">
              <h1 className="text-lg font-medium text-gray-200">{title}</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {showCart && (
              <button
                onClick={onCartClick}
                className="relative p-3 text-gray-400 hover:text-white transition-colors duration-200 hover-lift rounded-xl hover:bg-white/5"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-ember-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center cosmic-pulse cart-badge font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            
            <div className="flex items-center space-x-3 glass-strong rounded-xl px-4 py-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-cosmic-600 rounded-xl flex items-center justify-center cosmic-glow">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-sm font-medium text-white">{user?.full_name}</span>
                  {user?.role === 'student' && user?.registration_number && (
                    <div className="text-xs text-gray-400">({user.registration_number})</div>
                  )}
                  <div className="text-xs text-cosmic-400 capitalize">{user?.role}</div>
                </div>
              </div>
              <button
                onClick={signOut}
                className="p-2 text-gray-400 hover:text-ember-400 transition-colors duration-200 rounded-lg hover:bg-white/5"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;