import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white flex justify-around py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
      <NavLink to="/" className={({isActive}) => `flex flex-col items-center text-xl transition ${isActive ? 'text-primary-dark' : 'text-gray-500'}`} end>
        <span>🏠</span><small className="text-[10px] mt-0.5">Home</small>
      </NavLink>
      <NavLink to="/chat" className={({isActive}) => `flex flex-col items-center text-xl transition ${isActive ? 'text-primary-dark' : 'text-gray-500'}`}>
        <span>💬</span><small className="text-[10px] mt-0.5">Chat</small>
      </NavLink>
      <NavLink to="/sell" className="flex flex-col items-center text-xl text-gray-500 transition">
        <span className="bg-primary w-11 h-11 rounded-full flex items-center justify-center text-2xl text-gray-800 -mt-5 shadow-[0_4px_12px_rgba(255,193,7,0.4)]">➕</span>
        <small className="text-[10px] mt-0.5">Sell</small>
      </NavLink>
      <NavLink to="/myads" className={({isActive}) => `flex flex-col items-center text-xl transition ${isActive ? 'text-primary-dark' : 'text-gray-500'}`}>
        <span>📦</span><small className="text-[10px] mt-0.5">My Ads</small>
      </NavLink>
      <NavLink to="/account" className={({isActive}) => `flex flex-col items-center text-xl transition ${isActive ? 'text-primary-dark' : 'text-gray-500'}`}>
        <span>👤</span><small className="text-[10px] mt-0.5">Account</small>
      </NavLink>
    </div>
  );
};

export default BottomNav;