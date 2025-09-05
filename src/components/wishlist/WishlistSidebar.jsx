import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeFromWishlist } from '../../store/slices/wishlistSlice';
import { closeWishlist } from '../../store/slices/uiSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const WishlistSidebar = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.wishlist);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success('Added to cart!');
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success('Removed from wishlist');
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden lg:block">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => dispatch(closeWishlist())}
      />
      
      {/* Wishlist Panel */}
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Wishlist ({items.length})
            </h2>
            <button
              onClick={() => dispatch(closeWishlist())}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <Heart className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500 mb-6">Save items you love for later</p>
                <Link
                  to="/products"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => dispatch(closeWishlist())}
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0">
                      <img
                        src={item.image || '/api/placeholder/64/64'}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${item._id}`}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600 truncate block"
                        onClick={() => dispatch(closeWishlist())}
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500">${item.price}</p>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="flex items-center space-x-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          onClick={() => handleRemoveFromWishlist(item._id)}
                          className="p-1 text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <Link
                to="/wishlist"
                className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => dispatch(closeWishlist())}
              >
                View All Wishlist Items
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistSidebar;
