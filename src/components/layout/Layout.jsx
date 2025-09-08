import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadUser } from '../../store/slices/authSlice';
import { loadCartFromStorage } from '../../store/slices/cartSlice';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import CartSidebar from '../cart/CartSidebar';
import WishlistSidebar from '../wishlist/WishlistSidebar';
import SearchModal from '../search/SearchModal';
import OffersTicker from './OffersTicker';

const Layout = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const { mobileMenuOpen, cartOpen, wishlistOpen, searchOpen } = useAppSelector((state) => state.ui);

  useEffect(() => {
    // Load user if token exists
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      dispatch(loadUser());
    }
    
    // Load cart from localStorage
    dispatch(loadCartFromStorage());
  }, [dispatch, isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col">
      <OffersTicker />
      <Header />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
      
      {/* Mobile Menu */}
      {mobileMenuOpen && <MobileMenu />}
      
      {/* Cart Sidebar */}
      {cartOpen && <CartSidebar />}
      
      {/* Wishlist Sidebar */}
      {wishlistOpen && <WishlistSidebar />}
      
      {/* Search Modal */}
      {searchOpen && <SearchModal />}
    </div>
  );
};

export default Layout;

