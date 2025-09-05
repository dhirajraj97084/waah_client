import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CategoriesRowSection = () => {
  const categories = [
    {
      id: "electronics",
      title: "Electronics",
      products: [
        {
          id: 1,
          name: "Smartphone",
          image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80",
          link: "/products/1",
        },
        {
          id: 2,
          name: "Laptop",
          image:
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80",
          link: "/products/2",
        },
        {
          id: 3,
          name: "Headphones",
          image:
            "https://images.unsplash.com/photo-1518441902117-f89c12f6a3ab?auto=format&fit=crop&w=500&q=80",
          link: "/products/3",
        },
        {
          id: 18,
          name: "Laptop",
          image:
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80",
          link: "/products/2",
        },
        {
          id: 19,
          name: "Headphones",
          image:
            "https://images.unsplash.com/photo-1518441902117-f89c12f6a3ab?auto=format&fit=crop&w=500&q=80",
          link: "/products/3",
        },
      ],
    },
    {
      id: "fashion",
      title: "Fashion",
      products: [
        {
          id: 4,
          name: "T-Shirt",
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",
          link: "/products/4",
        },
        {
          id: 5,
          name: "Sneakers",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
          link: "/products/5",
        },
        
        {
          id: 6,
          name: "Watch",
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
          link: "/products/6",
        },
        {
          id: 20,
          name: "T-Shirt",
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",
          link: "/products/4",
        },
        {
          id: 21,
          name: "Sneakers",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
          link: "/products/5",
        },
      ],
    },
    {
      id: "home",
      title: "Home & Garden",
      products: [
        {
          id: 7,
          name: "Sofa",
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80",
          link: "/products/7",
        },
        {
          id: 8,
          name: "Lamp",
          image:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80",
          link: "/products/8",
        },
        {
          id: 9,
          name: "Plant Pot",
          image:
            "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80",
          link: "/products/9",
        },
      ],
    },
    {
      id: "sports",
      title: "Sports",
      products: [
        {
          id: 10,
          name: "Football",
          image:
            "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=500&q=80",
          link: "/products/10",
        },
        {
          id: 11,
          name: "Tennis Racket",
          image:
            "https://images.unsplash.com/photo-1629739377647-b3f8a9a64a9e?auto=format&fit=crop&w=500&q=80",
          link: "/products/11",
        },
        {
          id: 12,
          name: "Gym Dumbbells",
          image:
            "https://images.unsplash.com/photo-1571019613576-2b21c1f3f83b?auto=format&fit=crop&w=500&q=80",
          link: "/products/12",
        },
      ],
    },
    {
      id: "books",
      title: "Books",
      products: [
        {
          id: 13,
          name: "Novel",
          image:
            "https://images.unsplash.com/photo-1528209392022-8da772394a67?auto=format&fit=crop&w=500&q=80",
          link: "/products/13",
        },
        {
          id: 14,
          name: "Educational",
          image:
            "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=500&q=80",
          link: "/products/14",
        },
        {
          id: 15,
          name: "Comics",
          image:
            "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=500&q=80",
          link: "/products/15",
        },
      ],
    },
    {
      id: "beauty",
      title: "Beauty",
      products: [
        {
          id: 16,
          name: "Lipstick",
          image:
            "https://images.unsplash.com/photo-1612817159949-195b34d784af?auto=format&fit=crop&w=500&q=80",
          link: "/products/16",
        },
        {
          id: 17,
          name: "Perfume",
          image:
            "https://images.unsplash.com/photo-1620912189868-252bb3f2d1f2?auto=format&fit=crop&w=500&q=80",
          link: "/products/17",
        },
        {
          id: 18,
          name: "Face Cream",
          image:
            "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=500&q=80",
          link: "/products/18",
        },
      ],
    },
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {categories.map((cat) => (
          <div key={cat.id}>
            {/* Row Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                {cat.title}
              </h2>
              <Link
                to={`/products?category=${cat.id}`}
                className="text-blue-600 hover:underline flex items-center"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Products Row */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide md:grid md:grid-cols-3 lg:grid-cols-5">
              {cat.products.map((product) => (
                <Link
                  key={product.id}
                  to={product.link}
                  className="flex-shrink-0 w-40 md:w-full bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-32 w-full object-cover"
                  />
                  <div className="p-2 text-center">
                    <h3 className="text-sm font-medium text-gray-800 truncate">
                      {product.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesRowSection;
