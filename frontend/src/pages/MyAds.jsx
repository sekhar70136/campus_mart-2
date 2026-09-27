import { useEffect, useState } from 'react';
import api from '../api/axios';

const MyAds = () => {
  const [ads, setAds] = useState([]); const [loading, setLoading] = useState(true);

  useEffect(() => { api.get('/products/myads').then(res => setAds(res.data)).catch(console.error).finally(() => setLoading(false)); }, []);

  const markSold = async (id) => {
    try { await api.put(`/products/${id}`, { status: 'Sold' }); setAds(ads.map(ad => ad.id === id ? { ...ad, status: 'Sold' } : ad)); } 
    catch (err) { alert('Failed to mark as sold'); }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24 pt-4 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">My Ads</h2>
      {ads.length === 0 ? (
        <p className="text-gray-500">No ads yet. <a href="/sell" className="text-primary-dark font-semibold">Sell something</a></p>
      ) : (
        <div className="flex flex-col gap-3">
          {ads.map(ad => (
            <div key={ad.id} className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-base">{ad.title}</h3>
                <p className="text-sm text-gray-500">₹{ad.price} • <span className={ad.status === 'Sold' ? 'text-red-500' : 'text-green-600'}>{ad.status}</span></p>
              </div>
              {ad.status !== 'Sold' && (
                <button className="border-2 border-primary text-gray-800 px-4 py-1.5 rounded-xl text-sm font-semibold hover:bg-primary transition" onClick={() => markSold(ad.id)}>
                  Mark Sold
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAds;