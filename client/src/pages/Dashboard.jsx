import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: ''
  });
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFetchingTasks, setIsFetchingTasks] = useState(true);

  const loadTasks = async () => {
    setIsFetchingTasks(true);
    try {
      const response = await api.get('/tasks');
      setTasks(response?.data?.data || []);
    } finally {
      setIsFetchingTasks(false);
    }
  };

  const loadCurrentUser = async () => {
    const response = await api.get('/auth/me');
    setUserEmail(response?.data?.data?.email || '');
  };

  const loadInitialData = async () => {
    try {
      setError('');
      await Promise.all([loadCurrentUser(), loadTasks()]);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load dashboard');
      if (err?.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTask = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/tasks', {
        title: form.title,
        description: form.description
      });
      setForm({ title: '', description: '' });
      await loadTasks();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      await loadTasks();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-4 py-6 sm:px-6">
      <Navbar onLogout={handleLogout} userEmail={userEmail} />

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Create Task</h2>
        <form onSubmit={handleCreateTask} className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-700"
            >
              Description
            </label>
            <input
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </form>
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      </div>

      <section>
        <h3 className="mb-4 text-xl font-semibold">Your Tasks</h3>
        {isFetchingTasks ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
            Loading tasks...
          </div>
        ) : null}
        {!isFetchingTasks && tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 shadow-sm">
            No tasks yet. Create your first task above.
          </div>
        ) : null}
        {!isFetchingTasks && tasks.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <article
                key={task.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h4 className="text-base font-semibold">{task.title}</h4>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      task.status === 'COMPLETED'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
                <p className="mb-4 text-sm text-slate-600">
                  {task.description || 'No description'}
                </p>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default Dashboard;
