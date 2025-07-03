import React from 'react';
import { LogOut, User, ShoppingCart, Utensils, Crown, Shield } from 'lucide-react';
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
    <header className="glass-morphism border-b border-white/10 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 glass-morphism rounded-xl flex items-center justify-center cosmic-glow mr-3">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold cosmic-text tracking-wide">Cosmic Cantina</span>
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
                className="relative p-3 text-gray-400 hover:text-white transition-colors duration-200 hover-lift rounded-xl glass-morphism hover:bg-white/10"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            
            <div className="flex items-center space-x-3 glass-morphism-strong rounded-xl px-4 py-3 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  user?.role === 'staff' ? 'bg-yellow-500/20' : 'bg-cosmic-500/20'
                }`} style={{ 
                  boxShadow: user?.role === 'staff' 
                    ? '0 0 15px rgba(245, 158, 11, 0.4)' 
                    : '0 0 15px rgba(139, 92, 246, 0.4)' 
                }}>
                  {user?.role === 'staff' ? (
                    <Crown className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Shield className="w-5 h-5 text-cosmic-400" />
                  )}
                </div>
                <div>
                  <span className="text-sm font-medium text-white">{user?.full_name}</span>
                  {user?.role === 'student' && user?.registration_number && (
                    <div className="text-xs text-gray-400">({user.registration_number})</div>
                  )}
                  <div className={`text-xs capitalize ${
                    user?.role === 'staff' ? 'text-yellow-400' : 'text-cosmic-400'
                  }`}>
                    {user?.role === 'staff' ? 'Staff Member' : 'Student'}
                  </div>
                </div>
              </div>
              <button
                onClick={signOut}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-white/10"
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