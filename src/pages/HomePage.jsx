import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts, fetchCategories } from '../store/slices/productSlice';
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import OffersSection from '../components/home/OffersSection';
import NewsletterSection from '../components/home/NewsletterSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import BrandsSection from '../components/home/BrandsSection';
import CategoriesRowSection from './user/CategoriesRowSection';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { products, categories, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    // Fetch featured products and categories
    dispatch(fetchProducts({ limit: 8, featured: true }));
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen">

      {/* Categories Section */}
      <CategoriesSection categories={categories} />

       {/* Offers Section */}
      <OffersSection />


      {/* CategoriesRow Sections   */}
      <CategoriesRowSection/>

      {/* Hero Section     
      <HeroSection />
      */}    
      
      
      {/* Featured Products */}
      <FeaturedProducts products={products} loading={loading} />     
     
      
      {/* Brands Section */}
      <BrandsSection />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
