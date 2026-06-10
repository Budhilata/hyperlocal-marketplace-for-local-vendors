import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { VendorDetails } from './components/VendorDetails';
import { Cart } from './components/Cart';
import { OrderTracking } from './components/OrderTracking';
import { VendorDashboard } from './components/VendorDashboard';
import { DeliveryPartnerDashboard } from './components/DeliveryPartnerDashboard';
import { LoginScreen } from './components/LoginScreen';
import { CitySelection } from './components/CitySelection';
import { ChatWindow } from './components/ChatWindow';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  vendorId: string;
};

export type Vendor = {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  location: string;
  description: string;
  products: Product[];
  phone: string;
  isFavorite?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  vendor: Vendor;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready_for_pickup' | 'out_for_delivery' | 'delivered';
  deliveryPerson?: {
    name: string;
    phone: string;
    image: string;
    vehicleNumber: string;
  };
  vendor: Vendor;
  deliveryAddress: string;
  paymentMethod: 'online' | 'cod';
  timestamp: Date;
  customerPhone: string;
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [userType, setUserType] = useState<'customer' | 'vendor' | 'delivery'>('customer');
  const [currentView, setCurrentView] = useState<'home' | 'vendor' | 'cart' | 'tracking' | 'vendorDashboard' | 'deliveryDashboard'>('home');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [chatVendor, setChatVendor] = useState<Vendor | null>(null);

  const handleLogin = (type: 'customer' | 'vendor' | 'delivery') => {
    setUserType(type);
    setIsLoggedIn(true);
    if (type === 'vendor') {
      setCurrentView('vendorDashboard');
    } else if (type === 'delivery') {
      setCurrentView('deliveryDashboard');
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  const handleVendorClick = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setCurrentView('vendor');
  };

  const handleAddToCart = (product: Product, vendor: Vendor) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, vendor }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handlePlaceOrder = (paymentMethod: 'online' | 'cod', address: string, phone: string) => {
    const newOrder: Order = {
      id: `ORD${Date.now()}`,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0) + 30,
      status: 'confirmed',
      deliveryPerson: {
        name: 'Rahul Kumar',
        phone: '+91 98765 43210',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        vehicleNumber: 'MH 01 AB 1234'
      },
      vendor: cartItems[0].vendor,
      deliveryAddress: address,
      paymentMethod,
      timestamp: new Date(),
      customerPhone: phone
    };
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setCurrentView('tracking');
  };

  const toggleFavorite = (vendorId: string) => {
    setFavorites(prev =>
      prev.includes(vendorId)
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const openChat = (vendor: Vendor) => {
    setChatVendor(vendor);
    setShowChat(true);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (userType === 'customer' && !selectedCity) {
    return <CitySelection onSelectCity={handleCitySelect} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
              if (userType === 'customer') setCurrentView('home');
              else if (userType === 'vendor') setCurrentView('vendorDashboard');
              else setCurrentView('deliveryDashboard');
            }}>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">LocalBazaar</h1>
                <p className="text-xs text-gray-600">
                  {userType === 'customer' && selectedCity}
                  {userType === 'vendor' && 'Vendor Panel'}
                  {userType === 'delivery' && 'Delivery Partner'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {userType === 'customer' && (
                <>
                  <button
                    onClick={() => setCurrentView('tracking')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Orders ({orders.length})
                  </button>
                  <button
                    onClick={() => setCurrentView('cart')}
                    className="relative px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                  >
                    Cart
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </button>
                </>
              )}
              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {userType === 'customer' && (
        <>
          {currentView === 'home' && (
            <HomePage 
              onVendorClick={handleVendorClick}
              city={selectedCity}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {currentView === 'vendor' && selectedVendor && (
            <VendorDetails
              vendor={selectedVendor}
              onBack={() => setCurrentView('home')}
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
              isFavorite={favorites.includes(selectedVendor.id)}
              onToggleFavorite={toggleFavorite}
              onOpenChat={openChat}
            />
          )}

          {currentView === 'cart' && (
            <Cart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onBack={() => setCurrentView('home')}
              onPlaceOrder={handlePlaceOrder}
            />
          )}

          {currentView === 'tracking' && (
            <OrderTracking
              orders={orders}
              onBack={() => setCurrentView('home')}
              onReorder={(order) => {
                setCartItems(order.items);
                setCurrentView('cart');
              }}
            />
          )}
        </>
      )}

      {userType === 'vendor' && currentView === 'vendorDashboard' && (
        <VendorDashboard orders={orders} />
      )}

      {userType === 'delivery' && currentView === 'deliveryDashboard' && (
        <DeliveryPartnerDashboard orders={orders} />
      )}

      {/* Chat Window */}
      {showChat && chatVendor && (
        <ChatWindow
          vendor={chatVendor}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
}
