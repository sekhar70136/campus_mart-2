import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const categories = ['Drafters', 'Textbooks', 'Calculators', 'Lab Items', 'Records'];

const Sell = () => {
  const [form, setForm] = useState({ title: '', description: '', price: '', category: 'Drafters', condition: 'Used', imageUrl: '', mobile: '' });
  const [loading, setLoading] = useState(false); const navigate = useNavigate();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file');
      e.target.value = '';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be smaller than 2 MB');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setForm((currentForm) => ({ ...currentForm, imageUrl: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await api.post('/products', form); navigate('/myads'); } 
    catch (err) { alert(err.response?.data?.message || 'Failed to list item'); } 
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24 pt-4 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">List an Item</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <div 
              key={cat} 
              className={`flex flex-col items-center p-3 rounded-2xl shadow-sm text-xs cursor-pointer transition min-w-[80px] ${form.category === cat ? 'bg-primary font-bold' : 'bg-white'}`} 
              onClick={() => setForm({ ...form, category: cat })}
            >
              <span className="text-xl mb-1">
                {cat === 'Drafters' && '📐'}{cat === 'Textbooks' && '📚'}{cat === 'Calculators' && '🧮'}{cat === 'Lab Items' && '🧪'}{cat === 'Records' && '📁'}
              </span>
              <span>{cat}</span>
            </div>
          ))}
        </div>
        <input name="title" placeholder="Title" onChange={handleChange} required className="p-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
        <textarea name="description" placeholder="Description" onChange={handleChange} required className="p-3.5 border border-gray-300 rounded-xl min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-primary" />
        <input name="price" type="number" placeholder="Price (₹)" onChange={handleChange} required className="p-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
        <input name="mobile" type="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength="10" placeholder="Mobile number (10 digits)" onChange={handleChange} required className="p-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
        <select name="condition" onChange={handleChange} className="p-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="Used">Used</option>
          <option value="Like New">Like New</option>
          <option value="New">New</option>
        </select>
        <div className="flex flex-col gap-2">
          <label htmlFor="product-image" className="font-semibold">Product image (optional)</label>
          <input id="product-image" type="file" accept="image/*" onChange={handleImageChange} className="p-3 border border-gray-300 rounded-xl bg-white" />
          {form.imageUrl && <img src={form.imageUrl} alt="Product preview" className="w-32 h-32 object-cover rounded-xl border border-gray-200" />}
        </div>
        <button type="submit" disabled={loading} className="bg-primary text-gray-800 p-3.5 rounded-xl font-semibold text-lg hover:bg-primary-dark transition disabled:opacity-50">
          {loading ? 'Uploading...' : 'Post Ad'}
        </button>
      </form>
    </div>
  );
};

export default Sell;