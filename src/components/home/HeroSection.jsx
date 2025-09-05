import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Welcome to WAAH PVT. LTD.",
      subtitle: "Your Trusted Shopping Partner",
      description: "Discover amazing products with unbeatable prices and exceptional quality",
      image: "/images/img1.jpg",
      buttonText: "Shop Now",
      buttonLink: "/products",
      badge: "New Arrival"
    },
    {
      id: 2,
      title: "Electronics Collection",
      subtitle: "Latest Technology at Best Prices",
      description: "Get the latest gadgets and electronics with amazing discounts",
      image: "/images/img2.jpg",
      buttonText: "Explore Electronics",
      buttonLink: "/electronics",
      badge: "Up to 70% Off"
    },
    {
      id: 3,
      title: "Fashion & Style",
      subtitle: "Trendy Fashion for Everyone",
      description: "Express your style with our curated fashion collection",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      buttonText: "Shop Fashion",
      buttonLink: "/fashion",
      badge: "Trending"
    },
    {
      id: 4,
      title: "Home & Garden",
      subtitle: "Beautiful Living Spaces",
      description: "Transform your home with our premium home & garden collection",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      buttonText: "Explore Home",
      buttonLink: "/home-garden",
      badge: "Premium"
    },
    {
      id: 5,
      title: "Sports & Fitness",
      subtitle: "Active Lifestyle Essentials",
      description: "Stay fit and active with our sports and fitness equipment",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      buttonText: "Shop Sports",
      buttonLink: "/sports",
      badge: "Active"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-1000 ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-8'
                }`}
              >
                {index === currentSlide && (
                  <>
                    <div className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-4">
                      {slide.badge}
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">
                      {slide.title}
                    </h1>
                    <h2 className="text-lg sm:text-xl md:text-2xl text-blue-200 mb-4">
                      {slide.subtitle}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 md:mb-8 max-w-lg">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to={slide.buttonLink}
                        className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {slide.buttonText}
                      </Link>
                      <button className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors">
                        <Play className="w-5 h-5 mr-2" />
                        Watch Video
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="text-lg font-bold text-gray-900">4.8/5</div>
                <div className="text-sm text-gray-600">Customer Rating</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="text-lg font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="text-lg font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Customer Support</div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="text-lg font-bold text-gray-900">Free</div>
              <div className="text-sm text-gray-600">Shipping & Returns</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
