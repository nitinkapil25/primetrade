const Navbar = ({ onLogout, userEmail }) => {
  return (
    <header className="mb-6 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-lg font-semibold">PrimeTrade Tasks</p>
          <p className="text-sm text-slate-500">
            {userEmail ? `Logged in as: ${userEmail}` : 'Dashboard'}
          </p>
        </div>
        <button
          onClick={onLogout}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
