import React, { useState, useEffect } from 'react';
import { X, Star, Zap, Crown, Sparkles, ChefHat, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpecialMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  rarity: 'legendary' | 'epic' | 'rare';
  power: string;
  origin: string;
}

interface SpecialMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpecialMenu: React.FC<SpecialMenuProps> = ({ isOpen, onClose }) => {
  const [selectedItem, setSelectedItem] = useState<SpecialMenuItem | null>(null);

  const specialItems: SpecialMenuItem[] = [
    {
      id: 'jedi-elixir',
      name: 'Jedi Master\'s Clarity Elixir',
      description: 'A mystical blue beverage infused with rare Ilum crystals and Dagobah herbs. Enhances mental clarity and Force sensitivity. Served in a traditional Jedi chalice.',
      price: 299,
      image_url: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg',
      rarity: 'legendary',
      power: '+50 Focus, +30 Wisdom, +25 Force Sensitivity',
      origin: 'Jedi Temple, Coruscant'
    },
    {
      id: 'sith-feast',
      name: 'Dark Lord\'s Power Feast',
      description: 'An ancient Sith delicacy prepared with volcanic spices from Mustafar and rare meats from Korriban. Grants immense strength and determination to those who dare consume it.',
      price: 499,
      image_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      rarity: 'legendary',
      power: '+100 Strength, +75 Dark Energy, +50 Intimidation',
      origin: 'Sith Academy, Korriban'
    },
    {
      id: 'force-crystal-cake',
      name: 'Kyber Crystal Celebration Cake',
      description: 'A shimmering dessert that sparkles with the power of the Force. Made with crystallized sugar from Jedha and infused with pure kyber crystal essence. Extremely rare and transcendent.',
      price: 399,
      image_url: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
      rarity: 'epic',
      power: '+75 Force Sensitivity, +60 Joy, +40 Enlightenment',
      origin: 'Sacred City of Jedha'
    },
    {
      id: 'rebel-ration',
      name: 'Rebel Alliance Victory Ration',
      description: 'A hearty, nutritious meal that sustained the Rebel Alliance through their darkest hours. Boosts morale and endurance. Favored by freedom fighters across the galaxy.',
      price: 199,
      image_url: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg',
      rarity: 'rare',
      power: '+60 Endurance, +45 Morale, +35 Courage',
      origin: 'Rebel Base, Yavin 4'
    },
    {
      id: 'droid-oil-smoothie',
      name: 'Droid Maintenance Smoothie',
      description: 'A metallic-tasting smoothie that enhances technical abilities and logical thinking. Popular among mechanics and engineers. (Not actually made from droid oil, we promise!)',
      price: 149,
      image_url: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg',
      rarity: 'rare',
      power: '+45 Tech Skills, +35 Logic, +25 Problem Solving',
      origin: 'Droid Factory, Geonosis'
    },
    {
      id: 'cantina-special',
      name: 'Mos Eisley Cantina Mystery Special',
      description: 'The legendary drink that started countless adventures. A mysterious concoction with unknown effects, served only to the bravest souls. No questions asked.',
      price: 777,
      image_url: 'https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg',
      rarity: 'legendary',
      power: '??? Mystery Effect - Adventure Awaits ???',
      origin: 'Mos Eisley Cantina, Tatooine'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 via-orange-500 to-red-500';
      case 'epic': return 'from-purple-400 via-pink-500 to-purple-600';
      case 'rare': return 'from-blue-400 via-cyan-500 to-blue-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Crown className="w-5 h-5" />;
      case 'epic': return <Zap className="w-5 h-5" />;
      case 'rare': return <Star className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'rarity-legendary';
      case 'epic': return 'rarity-epic';
      case 'rare': return 'rarity-rare';
      default: return '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Enhanced Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-7xl max-h-[95vh] overflow-y-auto holographic rounded-3xl p-8"
          >
            {/* Enhanced Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-cosmic-600 rounded-2xl flex items-center justify-center cosmic-glow">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold galactic-font galactic-text mb-2">
                    🤖 Secret Galactic Menu
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Exclusive legendary cuisine discovered by our droid friend. These mythical foods grant special powers!
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-white/10 rounded-xl transition-colors cosmic-glow"
              >
                <X className="w-7 h-7 text-gray-400" />
              </button>
            </div>

            {/* Special Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {specialItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", damping: 20 }}
                  className={`special-menu-item ${getRarityBorder(item.rarity)} rounded-2xl overflow-hidden cursor-pointer hover-lift`}
                  onClick={() => setSelectedItem(item)}
                >
                  {/* Enhanced Image Section */}
                  <div className="relative">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-56 object-cover"
                    />
                    
                    {/* Rarity Badge */}
                    <div className={`absolute top-3 right-3 bg-gradient-to-r ${getRarityColor(item.rarity)} px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg`}>
                      {getRarityIcon(item.rarity)}
                      <span className="text-sm font-bold text-white uppercase tracking-wide">{item.rarity}</span>
                    </div>
                    
                    {/* Price Badge */}
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-cosmic-500/30">
                      <span className="text-yellow-400 font-bold text-lg">₹{item.price}</span>
                    </div>

                    {/* Origin Badge */}
                    <div className="absolute top-3 left-3 bg-space-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-cosmic-500/20">
                      <span className="text-cosmic-300 text-xs font-medium">{item.origin}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 galactic-font leading-tight">{item.name}</h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">{item.description}</p>
                    
                    <div className="space-y-3">
                      <div className="text-sm text-cosmic-400 font-medium bg-cosmic-950/30 px-3 py-2 rounded-lg border border-cosmic-500/20">
                        <Utensils className="w-4 h-4 inline mr-2" />
                        {item.power}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs text-yellow-400 font-medium">Galactic Special</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Click for details
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Fun Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center p-8 bg-gradient-to-r from-cosmic-950/50 via-space-900/50 to-ember-950/50 rounded-2xl border border-cosmic-500/20 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star className="w-6 h-6 text-yellow-400" />
                <span className="text-3xl">🌟</span>
                <Sparkles className="w-6 h-6 text-cosmic-400" />
              </div>
              <h3 className="text-2xl font-bold galactic-font galactic-text mb-3">Easter Egg Unlocked!</h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                <strong className="text-cosmic-400">Congratulations, galactic explorer!</strong> You've discovered the secret droid menu featuring legendary cuisine from across the galaxy. 
                These mythical items don't actually exist in our cantina, but wouldn\'t it be amazing if they did? 
                The droid will remember your discovery! 🤖✨
              </p>
              <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-400">
                <span>🚀 Adventure Unlocked</span>
                <span>•</span>
                <span>🎯 Secret Achievement</span>
                <span>•</span>
                <span>⭐ Galactic Explorer</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Item Detail Modal */}
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", damping: 25 }}
                className="absolute inset-4 bg-black/95 backdrop-blur-lg rounded-3xl p-8 flex items-center justify-center border border-cosmic-500/20"
                onClick={() => setSelectedItem(null)}
              >
                <div className="max-w-lg w-full holographic rounded-2xl p-8 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${getRarityColor(selectedItem.rarity)} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    {getRarityIcon(selectedItem.rarity)}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 galactic-font">{selectedItem.name}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{selectedItem.description}</p>
                  
                  <div className="bg-cosmic-950/30 rounded-lg p-4 mb-4 border border-cosmic-500/20">
                    <div className="text-cosmic-400 font-medium mb-2">
                      <Utensils className="w-4 h-4 inline mr-2" />
                      Powers Granted:
                    </div>
                    <div className="text-white">{selectedItem.power}</div>
                  </div>
                  
                  <div className="text-gray-400 text-sm mb-4">
                    <strong>Origin:</strong> {selectedItem.origin}
                  </div>
                  
                  <div className="text-3xl font-bold galactic-text mb-6">₹{selectedItem.price}</div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('🤖 *Beep boop* This is just a fun easter egg! These legendary items aren\'t real... or are they? Perhaps in a galaxy far, far away... 🌌✨');
                    }}
                    className="cosmic-button px-8 py-3 rounded-xl text-white font-medium text-lg"
                  >
                    Order (Just Kidding!) 🤖
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpecialMenu;