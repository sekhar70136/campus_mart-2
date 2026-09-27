import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const colleges = ['Vishnu Institute of Technology', 'SRKR', 'MGVR', 'JNTUK', 'Aditya Engineering College', 'Malla Reddy University', 'Nooragadi University', 'SRM University', 'VR Siddhartha', 'PVP Siddhartha College'];

const Settings = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [form, setForm] = useState({ name: user?.name || '', college: user?.college || user?.campus || '' });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser({ ...user, ...form, campus: form.college });
    setSaved(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24 pt-4">
      <Link to="/account" className="text-primary-dark font-semibold">← Account</Link>
      <h2 className="text-2xl font-bold my-4">Settings</h2>
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl shadow-sm flex flex-col gap-4">
        <label className="font-semibold">Name
          <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required className="mt-2 w-full p-3 border border-gray-300 rounded-xl font-normal" />
        </label>
        <label className="font-semibold">College
          <select value={form.college} onChange={(event) => setForm({ ...form, college: event.target.value })} required className="mt-2 w-full p-3 border border-gray-300 rounded-xl font-normal">
            <option value="">Select college</option>
            {colleges.map((college) => <option key={college} value={college}>{college}</option>)}
          </select>
        </label>
        <p className="text-sm text-gray-500">Email: {user?.email}</p>
        <button type="submit" className="bg-primary p-3 rounded-xl font-semibold">Save Changes</button>
        {saved && <p className="text-green-600 text-sm">Profile updated.</p>}
      </form>
    </div>
  );
};

export default Settings;