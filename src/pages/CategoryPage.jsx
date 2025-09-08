import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts, fetchCategories } from '../store/slices/productSlice';
import ProductCard from '../components/products/ProductCard';

const CategoryPage = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((s) => s.products);

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);
  useEffect(() => {
    dispatch(fetchProducts({ category: slug, page: 1, limit: 12 }));
  }, [dispatch, slug]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{slug?.replace('-', ' ')}</h1>
      {loading && <div className="text-gray-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && products?.length === 0 && (
        <div className="text-gray-600">No products found.</div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((p) => (
          <ProductCard key={p._id} product={p} />)
        )}
      </div>
    </div>
  );
};

export default CategoryPage;


