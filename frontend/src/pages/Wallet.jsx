import { Link } from 'react-router-dom';

const Wallet = () => (
  <div className="max-w-2xl mx-auto px-4 pb-24 pt-4">
    <Link to="/account" className="text-primary-dark font-semibold">← Account</Link>
    <h2 className="text-2xl font-bold my-4">Wallet</h2>
    <div className="bg-primary p-6 rounded-2xl shadow-sm mb-4">
      <p className="text-sm text-gray-700">Available balance</p>
      <p className="text-4xl font-extrabold mt-2">₹0.00</p>
      <button type="button" onClick={() => alert('Wallet top-up will be available soon.')} className="mt-5 bg-white px-4 py-2 rounded-xl font-semibold">Add Money</button>
    </div>
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      <h3 className="font-bold mb-3">Recent transactions</h3>
      <p className="text-gray-500 text-sm">No transactions yet.</p>
    </div>
  </div>
);

export default Wallet;