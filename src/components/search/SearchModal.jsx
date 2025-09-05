import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeSearch } from '../../store/slices/uiSlice';
import { fetchProducts } from '../../store/slices/productSlice';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchModal = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches] = useState([
    'iPhone', 'Laptop', 'Sneakers', 'Headphones', 'Watch', 'Camera'
  ]);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input when modal opens
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Save recent searches to localStorage
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleSearch = (term) => {
    if (term.trim()) {
      // Add to recent searches
      const newRecentSearches = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
      setRecentSearches(newRecentSearches);
      
      // Close modal and navigate
      dispatch(closeSearch());
      window.location.href = `/products?search=${encodeURIComponent(term)}`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => dispatch(closeSearch())}
      />
      
      {/* Search Modal */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-lg">
        <div className="max-w-4xl mx-auto p-4">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for products, brands and more..."
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </form>
            </div>
            <button
              onClick={() => dispatch(closeSearch())}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Search Results</h3>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Searching...</p>
                </div>
              ) : products.length > 0 ? (
                <div className="space-y-2">
                  {products.slice(0, 5).map((product) => (
                    <Link
                      key={product._id}
                      to={`/products/${product._id}`}
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg"
                      onClick={() => dispatch(closeSearch())}
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0">
                        <img
                          src={product.image || '/api/placeholder/48/48'}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-500">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                  {products.length > 5 && (
                    <button
                      onClick={() => handleSearch(searchTerm)}
                      className="w-full text-center py-2 text-blue-600 hover:text-blue-700"
                    >
                      View all {products.length} results
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 py-4">No products found for "{searchTerm}"</p>
              )}
            </div>
          )}

          {/* Recent Searches */}
          {!searchTerm && recentSearches.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Recent Searches
                </h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          {!searchTerm && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;

