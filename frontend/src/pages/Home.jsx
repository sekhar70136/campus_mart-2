import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = products
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((first, second) => sort === 'low' ? first.price - second.price : sort === 'high' ? second.price - first.price : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-24 pt-4">
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search for drafters, calculators..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="w-full py-3.5 px-5 rounded-full border border-gray-300 text-base bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <select value={sort} onChange={(e) => setSort(e.target.value)} className="mb-4 p-3 border border-gray-300 rounded-xl bg-white">
        <option value="newest">Sort products</option>
        <option value="low">Price: Low to high</option>
        <option value="high">Price: High to low</option>
      </select>
      
      <div className="bg-yellow-50 border-l-4 border-primary p-3 rounded-xl text-yellow-800 text-sm mb-4">
        🔔 New items added near you!
      </div>

      <h2 className="text-xl font-bold mb-4">Available Items</h2>
      
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      <div className="mt-8">
        <h3 className="font-semibold mb-2">Sponsored</h3>
        <div className="bg-gradient-to-br from-primary to-yellow-500 text-white p-8 rounded-2xl text-center font-bold shadow-md">
          Your ad here
        </div>
      </div>
    </div>
  );
};

export default Home;