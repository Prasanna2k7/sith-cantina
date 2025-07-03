import React, { useState } from 'react';
import { Clock, Users, ChefHat, ArrowRight, Utensils, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThreeJsRobot from '../components/Common/ThreeJsRobot';
import SpecialMenu from '../components/Common/SpecialMenu';

const Landing: React.FC = () => {
  const [isSpecialMenuOpen, setIsSpecialMenuOpen] = useState(false);
  const [robotClicks, setRobotClicks] = useState(0);

  const handleRobotClick = () => {
    setRobotClicks(prev => prev + 1);
    
    if (robotClicks === 0) {
      alert('🤖 *Beep boop* Greetings, traveler! You\'ve discovered me! Click me 2 more times to unlock the secret galactic menu...');
    } else if (robotClicks === 1) {
      alert('🤖 *Excited droid chirping* Almost there! One more click to access the legendary cantina recipes!');
    } else if (robotClicks === 2) {
      alert('🤖 *Triumphant beeping* ACCESS GRANTED! Welcome to the hidden galactic cantina! These recipes are from across the galaxy!');
      setIsSpecialMenuOpen(true);
    } else {
      // After unlocking, always show menu
      setIsSpecialMenuOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-space-gradient relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-3 h-3 bg-cosmic-400 rounded-full animate-pulse cosmic-glow"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-2.5 h-2.5 bg-quantum-400 rounded-full animate-pulse quantum-glow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-40 w-1.5 h-1.5 bg-ember-400 rounded-full animate-pulse ember-glow" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-cosmic-300 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-quantum-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Header */}
      <header className="holographic border-b border-cosmic-600/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-cosmic-600 rounded-xl flex items-center justify-center cosmic-glow mr-4">
                <Utensils className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-3xl font-bold galactic-font galactic-text tracking-wider">Galactic Cantina</span>
                <div className="text-sm text-gray-400 font-medium">Premium Galactic Cuisine</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-cosmic-950/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cosmic-500/30 mb-6">
              <Star className="w-4 h-4 text-cosmic-400" />
              <span className="text-cosmic-300 text-sm font-medium">Premium Galactic Dining Experience</span>
              <Sparkles className="w-4 h-4 text-cosmic-400" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
            Skip the Queue,<br />
            <span className="galactic-text galactic-font">Order Ahead</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Experience the finest cuisine from across the galaxy. Pre-order your favorite meals 
            and skip the lunch rush. Pick up when ready, no waiting in line required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2 text-cosmic-400">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">Save Time</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center space-x-2 text-quantum-400">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium">Premium Quality</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center space-x-2 text-ember-400">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Galactic Flavors</span>
            </div>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-20">
          {/* Student Card */}
          <Link to="/auth/student" className="group">
            <div className="holographic rounded-2xl p-8 hover-lift transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cosmic-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 bg-cosmic-600 rounded-2xl mb-8 group-hover:bg-cosmic-500 transition-colors duration-300 cosmic-glow">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 galactic-font">Student Portal</h3>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  Browse premium galactic menus, place orders, and track your food status. 
                  Perfect for busy students who want to save time and enjoy quality meals.
                </p>
                <div className="flex items-center text-cosmic-400 font-semibold group-hover:text-cosmic-300 transition-colors text-lg">
                  <span>Enter Portal</span>
                  <ArrowRight className="w-6 h-6 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>

          {/* Staff Card */}
          <Link to="/auth/staff" className="group">
            <div className="holographic rounded-2xl p-8 hover-lift transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-ember-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 bg-ember-600 rounded-2xl mb-8 group-hover:bg-ember-500 transition-colors duration-300 ember-glow">
                  <ChefHat className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 galactic-font">Cantina Staff</h3>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  Manage orders, update galactic menus, and streamline your cantina operations. 
                  Reduce wait times and improve customer satisfaction across the galaxy.
                </p>
                <div className="flex items-center text-ember-400 font-semibold group-hover:text-ember-300 transition-colors text-lg">
                  <span>Enter Portal</span>
                  <ArrowRight className="w-6 h-6 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Enhanced Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center group">
            <div className="w-16 h-16 bg-quantum-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-quantum-500 transition-colors float quantum-glow">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 galactic-font">Time Efficiency</h3>
            <p className="text-gray-400 leading-relaxed">No more waiting in long queues during busy galactic lunch hours. Order ahead and pick up instantly.</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-cosmic-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-cosmic-500 transition-colors cosmic-glow float" style={{ animationDelay: '0.5s' }}>
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 galactic-font">Premium Cuisine</h3>
            <p className="text-gray-400 leading-relaxed">Browse premium galactic menus and place orders from your device. Quality food from across the universe.</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-ember-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-ember-500 transition-colors ember-glow float" style={{ animationDelay: '1s' }}>
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 galactic-font">Real-time Updates</h3>
            <p className="text-gray-400 leading-relaxed">Get instant notifications when your galactic feast is ready for pickup. Never miss your order.</p>
          </div>
        </div>

        {/* Easter Egg Hint */}
        {robotClicks === 0 && (
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-space-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-cosmic-500/20">
              <Sparkles className="w-4 h-4 text-cosmic-400" />
              <p className="text-gray-400 text-sm">
                <span className="text-cosmic-400 font-medium">Psst...</span> there might be a friendly droid hiding somewhere on this page...
              </p>
              <Sparkles className="w-4 h-4 text-cosmic-400" />
            </div>
          </div>
        )}
      </main>

      {/* Three.js Robot (Easter Egg) */}
      <ThreeJsRobot onRobotClick={handleRobotClick} />

      {/* Special Menu Modal */}
      <SpecialMenu 
        isOpen={isSpecialMenuOpen} 
        onClose={() => setIsSpecialMenuOpen(false)} 
      />
    </div>
  );
};

export default Landing;