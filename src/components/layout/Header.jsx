import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { 
  toggleMobileMenu, 
  toggleSearch, 
  toggleCart, 
  toggleWishlist,
  closeAllModals 
} from '../../store/slices/uiSlice';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X,
  ChevronDown,
  Truck,
  Shield,
  Star
} from 'lucide-react';
import { fetchCategories } from '../../store/slices/productSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAppSelector((state) => state.auth);
  const { totalItems } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const { mobileMenuOpen, searchOpen } = useAppSelector((state) => state.ui);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setShowUserMenu(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      dispatch(closeAllModals());
    }
  };

  const { categories: categoriesResponse } = useAppSelector((s) => s.products);
  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);
  const categories = Array.isArray(categoriesResponse?.categories) && categoriesResponse.categories.length > 0
    ? categoriesResponse.categories.map((c) => ({ name: c.name, icon: c.icon || '🏷️', href: `/category/${c.slug}` }))
    : [
        { name: 'Electronics', icon: '📱', href: '/category/electronics' },
        { name: 'Fashion', icon: '👕', href: '/category/fashion' },
        { name: 'Home & Garden', icon: '🏠', href: '/category/home' },
        { name: 'Sports', icon: '⚽', href: '/category/sports' },
        { name: 'Books', icon: '📚', href: '/category/books' },
        { name: 'Beauty', icon: '💄', href: '/category/beauty' },
      ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 px-4 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1"><Truck className="w-4 h-4" /><span>Free shipping on orders over $50</span></div>
            <div className="flex items-center space-x-1"><Shield className="w-4 h-4" /><span>Secure payment</span></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1"><Star className="w-4 h-4" /><span>4.8/5 customer rating</span></div>
            <div className="flex items-center space-x-2"><span>USD</span><span>|</span><span>English</span></div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 bg-white ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
<Link to="/" className="flex items-center space-x-2 flex-shrink-0">
  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 shadow-md">
    <img 
      src="/images/logo.jpg" 
      alt="WAAH PVT. LTD." 
      className="w-8 h-8 object-contain"
    />
  </div>
  <span className="hidden sm:block text-xl md:text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
    WAAH PVT. LTD.
  </span>
</Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4">
              <form onSubmit={handleSearch} className="w-full relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search for products, brands and more..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">Search</button>
              </form>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">

              {/* Mobile Search */}
              <button className="md:hidden p-2" onClick={() => dispatch(toggleSearch())}><Search className="w-6 h-6" /></button>

              {/* Wishlist */}
              <button onClick={() => dispatch(toggleWishlist())} className="relative p-2">
                <Heart className="w-6 h-6" />
                {wishlistItems.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{wishlistItems.length}</span>}
              </button>

              {/* Cart */}
              <button onClick={() => dispatch(toggleCart())} className="relative p-2">
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{totalItems}</span>}
              </button>

              {/* User Menu */}
              <div className="relative">
                {isAuthenticated ? (
                  <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center space-x-1 p-2">
                    <User className="w-6 h-6" />
                    <span className="hidden sm:block">{user?.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="hidden sm:flex items-center space-x-2">
                    <Link to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-1">Login</Link>
                    <Link to="/register" className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">Sign Up</Link>
                  </div>
                )}

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">Orders</Link>
                    <Link to="/wishlist" className="block px-4 py-2 text-sm hover:bg-gray-100">Wishlist</Link>
                    {isAdmin && <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-gray-100">Admin Dashboard</Link>}
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>

              {/* Mobile Menu */}
              <button className="md:hidden p-2" onClick={() => dispatch(toggleMobileMenu())}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Categories - Desktop */}
          <div className="hidden md:flex border-t border-gray-200 py-2 space-x-4 overflow-x-auto scrollbar-hide">
            <div className="relative">
              <button onClick={() => setShowCategories(!showCategories)} className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <Menu className="w-5 h-5" />
                <span>Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showCategories && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg py-2 z-50">
                  {categories.map(cat => (
                    <Link key={cat.name} to={cat.href} className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setShowCategories(false)}>
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {categories.map(cat => (
              <Link key={cat.name} to={cat.href} className="text-gray-700 hover:text-blue-600 whitespace-nowrap">{cat.name}</Link>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md z-40">
          <div className="flex flex-col px-4 py-4 space-y-2">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
            <Link to="/offers" className="text-gray-700 hover:text-blue-600">Offers</Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600">Cart</Link>
            <Link to="/wishlist" className="text-gray-700 hover:text-blue-600">Wishlist</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
            <div className="pt-2 border-t">
              <div className="text-sm text-gray-500 mb-2">Categories</div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(cat => (
                  <Link key={cat.name} to={cat.href} className="text-gray-700 hover:text-blue-600" onClick={()=>dispatch(toggleMobileMenu())}>{cat.name}</Link>
                ))}
              </div>
            </div>
            {!isAuthenticated && (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                <Link to="/register" className="text-gray-700 hover:text-blue-600">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Overlay click outside */}
      {(showUserMenu || showCategories) && (
        <div className="fixed inset-0 z-30" onClick={() => { setShowUserMenu(false); setShowCategories(false); }} />
      )}
    </>
  );
};

export default Header;
