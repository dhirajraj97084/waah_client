import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoriesSection = ({ categories = [] }) => {
  const defaultCategories = [
    {
      _id: 'electronics',
      name: 'Electronics',
      icon: '📱',
      description: 'Latest gadgets and tech',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      productCount: 150,
      href: '/electronics'
    },
    {
      _id: 'fashion',
      name: 'Fashion',
      icon: '👕',
      description: 'Trendy clothing & accessories',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      productCount: 200,
      href: '/fashion'
    },
    {
      _id: 'home',
      name: 'Home & Garden',
      icon: '🏠',
      description: 'Beautiful home essentials',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      productCount: 120,
      href: '/home-garden'
    },
    {
      _id: 'sports',
      name: 'Sports',
      icon: '⚽',
      description: 'Sports & fitness gear',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      productCount: 80,
      href: '/sports'
    },
    {
      _id: 'books',
      name: 'Books',
      icon: '📚',
      description: 'Books & educational materials',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      productCount: 300,
      href: '/products?category=books'
    },
    {
      _id: 'beauty',
      name: 'Beauty',
      icon: '💄',
      description: 'Beauty & personal care',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      productCount: 90,
      href: '/products?category=beauty'
    }
  ];

  const displayCategories = Array.isArray(categories) && categories.length > 0 ? categories : defaultCategories;

  return (
    <section className="pt-8  bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        

        {/* Categories List */}
        <div
          className="
            flex gap-4 overflow-x-auto sm:overflow-x-hidden 
            scrollbar-hide pb-2
            md:grid md:grid-cols-3 lg:grid-cols-6
          "
        >
          {displayCategories.map((category) => (
            <Link
              key={category._id}
              to={category.href || `/category/${category.slug || category._id}`}
              className="
                flex-shrink-0 w-40 sm:w-full 
                bg-white rounded-lg shadow-sm hover:shadow-md 
                transition-all duration-300 overflow-hidden group
              "
            >
              {/* Category Image */}
              <div className="relative h-24">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Icon */}
                <div className="absolute top-2 left-2 w-8 h-8 bg-white bg-opacity-90 rounded-md flex items-center justify-center text-lg">
                  {category.icon}
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600">
                  {category.name}
                </h3>
                <span className="text-xs text-gray-500">{category.productCount} products</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
