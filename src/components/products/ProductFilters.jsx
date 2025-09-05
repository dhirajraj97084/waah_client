import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const ProductFilters = ({ filters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
    brand: true
  });

  const categories = [
    { id: 'electronics', name: 'Electronics', count: 150 },
    { id: 'fashion', name: 'Fashion', count: 200 },
    { id: 'home', name: 'Home & Garden', count: 120 },
    { id: 'sports', name: 'Sports', count: 80 },
    { id: 'books', name: 'Books', count: 300 },
    { id: 'beauty', name: 'Beauty', count: 90 }
  ];

  const brands = [
    { id: 'apple', name: 'Apple', count: 45 },
    { id: 'samsung', name: 'Samsung', count: 38 },
    { id: 'nike', name: 'Nike', count: 67 },
    { id: 'adidas', name: 'Adidas', count: 52 },
    { id: 'sony', name: 'Sony', count: 29 },
    { id: 'microsoft', name: 'Microsoft', count: 23 }
  ];

  const priceRanges = [
    { id: '0-25', label: 'Under $25', min: 0, max: 25 },
    { id: '25-50', label: '$25 - $50', min: 25, max: 50 },
    { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
    { id: '100-200', label: '$100 - $200', min: 100, max: 200 },
    { id: '200+', label: 'Over $200', min: 200, max: null }
  ];

  const ratings = [
    { id: '4', label: '4 Stars & Up', value: 4 },
    { id: '3', label: '3 Stars & Up', value: 3 },
    { id: '2', label: '2 Stars & Up', value: 2 },
    { id: '1', label: '1 Star & Up', value: 1 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (categoryId) => {
    onFilterChange({ category: categoryId === filters.category ? '' : categoryId });
  };

  const handlePriceChange = (priceRange) => {
    if (priceRange.id === filters.priceRange) {
      onFilterChange({ minPrice: '', maxPrice: '', priceRange: '' });
    } else {
      onFilterChange({
        minPrice: priceRange.min.toString(),
        maxPrice: priceRange.max ? priceRange.max.toString() : '',
        priceRange: priceRange.id
      });
    }
  };

  const handleBrandChange = (brandId) => {
    onFilterChange({ brand: brandId === filters.brand ? '' : brandId });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ rating: rating === filters.rating ? '' : rating });
  };

  const clearAllFilters = () => {
    onFilterChange({
      category: '',
      minPrice: '',
      maxPrice: '',
      priceRange: '',
      brand: '',
      rating: ''
    });
  };

  const hasActiveFilters = filters.category || filters.minPrice || filters.brand || filters.rating;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          <span>Category</span>
          {expandedSections.category ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 flex-1">{category.name}</span>
                <span className="text-xs text-gray-500">({category.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          <span>Price Range</span>
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange === range.id}
                  onChange={() => handlePriceChange(range)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('brand')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          <span>Brand</span>
          {expandedSections.brand ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.brand && (
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="brand"
                  checked={filters.brand === brand.id}
                  onChange={() => handleBrandChange(brand.id)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 flex-1">{brand.name}</span>
                <span className="text-xs text-gray-500">({brand.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          <span>Customer Rating</span>
          {expandedSections.rating ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.rating && (
          <div className="space-y-2">
            {ratings.map((rating) => (
              <label key={rating.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating.id}
                  onChange={() => handleRatingChange(rating.id)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{rating.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;

