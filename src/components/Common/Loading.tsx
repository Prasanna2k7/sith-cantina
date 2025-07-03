import React from 'react';
import { Utensils, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

const Loading: React.FC = () => {
  const isConfigured = isSupabaseConfigured();

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-gradient">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-cosmic-600 rounded-2xl flex items-center justify-center mx-auto mb-6 cosmic-glow">
            <AlertCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-4 galactic-font">Database Not Connected</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Please connect to Supabase to use the galactic cantina. Click the "Connect to Supabase" button in the top right corner.
          </p>
          <div className="holographic rounded-xl p-6">
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-cosmic-400">Note:</strong> You need to set up your Supabase project and configure the environment variables to proceed with your galactic dining experience.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-space-gradient">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cosmic-600 border-t-transparent rounded-full animate-spin mx-auto mb-6 cosmic-glow"></div>
        <div className="flex items-center justify-center space-x-3">
          <Utensils className="w-6 h-6 text-cosmic-500" />
          <span className="text-xl font-medium text-gray-200 galactic-font">Loading Galactic Menu...</span>
        </div>
        <p className="text-gray-400 text-sm mt-2">Preparing your cosmic dining experience</p>
      </div>
    </div>
  );
};

export default Loading;