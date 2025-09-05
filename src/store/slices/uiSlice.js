import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  mobileMenuOpen: false,
  searchOpen: false,
  cartOpen: false,
  wishlistOpen: false,
  loading: false,
  theme: localStorage.getItem('theme') || 'light',
  currency: localStorage.getItem('currency') || 'USD',
  language: localStorage.getItem('language') || 'en',
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen;
    },
    closeSearch: (state) => {
      state.searchOpen = false;
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    closeCart: (state) => {
      state.cartOpen = false;
    },
    toggleWishlist: (state) => {
      state.wishlistOpen = !state.wishlistOpen;
    },
    closeWishlist: (state) => {
      state.wishlistOpen = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
      localStorage.setItem('currency', action.payload);
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        type: action.payload.type || 'info',
        message: action.payload.message,
        duration: action.payload.duration || 5000,
        timestamp: new Date().toISOString(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    closeAllModals: (state) => {
      state.sidebarOpen = false;
      state.mobileMenuOpen = false;
      state.searchOpen = false;
      state.cartOpen = false;
      state.wishlistOpen = false;
    },
  },
});

export const {
  toggleSidebar,
  closeSidebar,
  toggleMobileMenu,
  closeMobileMenu,
  toggleSearch,
  closeSearch,
  toggleCart,
  closeCart,
  toggleWishlist,
  closeWishlist,
  setLoading,
  setTheme,
  setCurrency,
  setLanguage,
  addNotification,
  removeNotification,
  clearNotifications,
  closeAllModals,
} = uiSlice.actions;

export default uiSlice.reducer;

