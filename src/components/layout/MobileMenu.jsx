import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeMobileMenu } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';
import { 
  X, 
  Home, 
  Package, 
  ShoppingCart, 
  Heart, 
  User, 
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';

const MobileMenu = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isAdmin } = useAppSelector((state) => state.auth);
  const { totalItems } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);

  const categories = [
    { name: 'Electronics', icon: '📱', href: '/products?category=electronics' },
    { name: 'Fashion', icon: '👕', href: '/products?category=fashion' },
    { name: 'Home & Garden', icon: '🏠', href: '/products?category=home' },
    { name: 'Sports', icon: '⚽', href: '/products?category=sports' },
    { name: 'Books', icon: '📚', href: '/products?category=books' },
    { name: 'Beauty', icon: '💄', href: '/products?category=beauty' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    dispatch(closeMobileMenu());
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => dispatch(closeMobileMenu())}
      />
      
      {/* Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={() => dispatch(closeMobileMenu())}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Section */}
          {isAuthenticated ? (
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 border-b border-gray-200">
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="flex-1 text-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => dispatch(closeMobileMenu())}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex-1 text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => dispatch(closeMobileMenu())}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="p-4 border-b border-gray-200">
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/cart"
                className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                onClick={() => dispatch(closeMobileMenu())}
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Cart</p>
                  <p className="text-xs text-gray-500">{totalItems} items</p>
                </div>
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                onClick={() => dispatch(closeMobileMenu())}
              >
                <Heart className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Wishlist</p>
                  <p className="text-xs text-gray-500">{wishlistItems.length} items</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <nav className="space-y-1">
                <Link
                  to="/"
                  className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => dispatch(closeMobileMenu())}
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </Link>
                
                <Link
                  to="/products"
                  className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => dispatch(closeMobileMenu())}
                >
                  <Package className="w-5 h-5" />
                  <span>All Products</span>
                </Link>

                {isAuthenticated && (
                  <>
                    <Link
                      to="/orders"
                      className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                      onClick={() => dispatch(closeMobileMenu())}
                    >
                      <Package className="w-5 h-5" />
                      <span>My Orders</span>
                    </Link>
                    
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                      onClick={() => dispatch(closeMobileMenu())}
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                        onClick={() => dispatch(closeMobileMenu())}
                      >
                        <Settings className="w-5 h-5" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                  </>
                )}
              </nav>

              {/* Categories */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                      onClick={() => dispatch(closeMobileMenu())}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          {isAuthenticated && (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
