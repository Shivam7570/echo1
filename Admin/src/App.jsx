import React, { useState, useEffect, useMemo } from 'react';

async function adminFetch(path, options = {}) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.startsWith('192.168.'));

  const candidates = isLocalhost
    ? [
        `http://localhost:5000/api${cleanPath}`,
        `/api${cleanPath}`,
        `https://api.echothejungle.com/api${cleanPath}`,
      ]
    : [
        `/api${cleanPath}`,
        `${cleanPath}`,
        `https://api.echothejungle.com/api${cleanPath}`,
        `http://localhost:5000/api${cleanPath}`,
      ];

  const uniqueCandidates = [...new Set(candidates)];
  let lastErr = null;

  for (let i = 0; i < uniqueCandidates.length; i++) {
    const url = uniqueCandidates[i];
    const isLast = i === uniqueCandidates.length - 1;

    try {
      const res = await fetch(url, options);
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const errorMsg = json.message || `Server returned ${res.status}`;
        const err = new Error(errorMsg);
        err.status = res.status;
        if ((res.status === 404 || res.status >= 500) && !isLast) {
          lastErr = err;
          continue;
        }
        throw err;
      }
      return json;
    } catch (err) {
      lastErr = err;
      if (err.name === 'TypeError' || err.message.includes('Failed to fetch') || ((err.status === 404 || err.status >= 500) && !isLast)) {
        continue;
      }
      throw err;
    }
  }
  throw lastErr || new Error('Failed to connect to backend server');
}

export default function App() {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'villas', 'resorts', 'site-visits'
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ all: 0, villas: 0, resorts: 0, siteVisits: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Edit Modal State
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // Delete Modal State
  const [deletingId, setDeletingId] = useState(null);

  // Notification Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Endpoint mapping
  const getTabPath = (tab) => {
    switch (tab) {
      case 'villas':
        return '/villas';
      case 'resorts':
        return '/resorts';
      case 'site-visits':
        return '/site-visits';
      default:
        return '/enquiries';
    }
  };

  // Fetch Stats for all counts
  const fetchStats = async () => {
    try {
      const [allRes, villaRes, resortRes, siteRes] = await Promise.all([
        adminFetch('/enquiries'),
        adminFetch('/villas'),
        adminFetch('/resorts'),
        adminFetch('/site-visits'),
      ]);

      setStats({
        all: allRes.count || (allRes.data ? allRes.data.length : 0),
        villas: villaRes.count || (villaRes.data ? villaRes.data.length : 0),
        resorts: resortRes.count || (resortRes.data ? resortRes.data.length : 0),
        siteVisits: siteRes.count || (siteRes.data ? siteRes.data.length : 0),
      });
    } catch (err) {
      console.error('Stats fetch error:', err);
    }
  };

  // Fetch data for active tab
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const path = getTabPath(activeTab);
      const json = await adminFetch(path);
      setData(json.data || []);
      fetchStats();
    } catch (err) {
      setError(`Failed to fetch data from backend (${err.message}). Make sure server is running.`);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Filtered Items
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.phone && item.phone.includes(searchQuery)) ||
        (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.city && item.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.villaName && item.villaName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.resortName && item.resortName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.propertyType && item.propertyType.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.message && item.message.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  // Handle Edit Action
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setEditFormData({
      name: item.name || '',
      email: item.email || '',
      phone: item.phone || '',
      city: item.city || '',
      villaName: item.villaName || '',
      resortName: item.resortName || '',
      propertyType: item.propertyType || '',
      message: item.message || '',
      status: item.status || 'new',
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    try {
      const path = `${getTabPath(activeTab)}/${editingItem._id}`;
      await adminFetch(path, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });
      
      showToast('Record updated successfully!');
      setEditingItem(null);
      fetchData();
    } catch (err) {
      alert('Error updating record: ' + err.message);
    }
  };

  // Handle Delete Action
  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    try {
      const path = `${getTabPath(activeTab)}/${deletingId}`;
      await adminFetch(path, { method: 'DELETE' });

      showToast('Record deleted successfully!', 'info');
      setDeletingId(null);
      fetchData();
    } catch (err) {
      alert('Error deleting record: ' + err.message);
    }
  };

  // Get Property Label for table display
  const getPropertyText = (item) => {
    return item.villaName || item.resortName || item.propertyType || 'General Enquiry';
  };

  return (
    <div className="min-h-screen bg-[#07120c] text-stone-100 p-4 md:p-8 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-lg shadow-2xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 border animate-bounce ${
          toast.type === 'info' ? 'bg-amber-900/90 text-amber-200 border-amber-500' : 'bg-emerald-950 text-emerald-300 border-emerald-500'
        }`}>
          <span>{toast.type === 'info' ? '🗑️' : '✓'}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Admin Header */}
      <header className="max-w-7xl mx-auto mb-8 border-b border-stone-800 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <span className="bg-[#C6A15B]/20 text-[#C6A15B] border border-[#C6A15B]/40 text-xs px-2.5 py-1 rounded font-mono uppercase tracking-widest font-bold">
              Admin Portal
            </span>
            <h1 className="text-2xl md:text-3xl font-bold font-serif-luxury text-stone-100 tracking-wide">
              ECHO DATABASE MANAGEMENT
            </h1>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Structured view, edit, and deletion control for all client enquiries & site visits.
          </p>
        </div>

        <button
          onClick={fetchData}
          className="bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center space-x-2 transition cursor-pointer"
        >
          <span>↻ Refresh Data</span>
        </button>
      </header>

      {/* KPI Stats Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div
          onClick={() => setActiveTab('all')}
          className={`p-5 rounded-xl border transition cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#12281d] border-[#C6A15B] shadow-lg shadow-[#C6A15B]/10'
              : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
          }`}
        >
          <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">All Enquiries Database</p>
          <div className="flex items-baseline justify-between mt-2">
            <p className="text-3xl font-bold text-[#C6A15B]">{stats.all}</p>
            <span className="text-xs text-stone-400">Master Record</span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('villas')}
          className={`p-5 rounded-xl border transition cursor-pointer ${
            activeTab === 'villas'
              ? 'bg-[#12281d] border-[#C6A15B] shadow-lg shadow-[#C6A15B]/10'
              : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
          }`}
        >
          <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Villas Database</p>
          <div className="flex items-baseline justify-between mt-2">
            <p className="text-3xl font-bold text-emerald-400">{stats.villas}</p>
            <span className="text-xs text-emerald-500/80">Villas Requests</span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('resorts')}
          className={`p-5 rounded-xl border transition cursor-pointer ${
            activeTab === 'resorts'
              ? 'bg-[#12281d] border-[#C6A15B] shadow-lg shadow-[#C6A15B]/10'
              : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
          }`}
        >
          <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Resort Database</p>
          <div className="flex items-baseline justify-between mt-2">
            <p className="text-3xl font-bold text-amber-400">{stats.resorts}</p>
            <span className="text-xs text-amber-500/80">Resort Enquiries</span>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('site-visits')}
          className={`p-5 rounded-xl border transition cursor-pointer ${
            activeTab === 'site-visits'
              ? 'bg-[#12281d] border-[#C6A15B] shadow-lg shadow-[#C6A15B]/10'
              : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
          }`}
        >
          <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Site Visit Database</p>
          <div className="flex items-baseline justify-between mt-2">
            <p className="text-3xl font-bold text-cyan-400">{stats.siteVisits}</p>
            <span className="text-xs text-cyan-500/80">Walkthroughs</span>
          </div>
        </div>
      </div>

      {/* Main Database Table Container */}
      <main className="max-w-7xl mx-auto bg-stone-900/90 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Navigation Tabs Bar & Filters */}
        <div className="p-4 md:p-6 border-b border-stone-800 bg-stone-950/60 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Database Selector Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-2 lg:pb-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition cursor-pointer whitespace-nowrap ${
                activeTab === 'all' ? 'bg-[#C6A15B] text-[#07120c]' : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              📋 All Enquiries ({stats.all})
            </button>
            <button
              onClick={() => setActiveTab('villas')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition cursor-pointer whitespace-nowrap ${
                activeTab === 'villas' ? 'bg-[#C6A15B] text-[#07120c]' : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              🏡 Villas DB ({stats.villas})
            </button>
            <button
              onClick={() => setActiveTab('resorts')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition cursor-pointer whitespace-nowrap ${
                activeTab === 'resorts' ? 'bg-[#C6A15B] text-[#07120c]' : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              🌴 Resort DB ({stats.resorts})
            </button>
            <button
              onClick={() => setActiveTab('site-visits')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition cursor-pointer whitespace-nowrap ${
                activeTab === 'site-visits' ? 'bg-[#C6A15B] text-[#07120c]' : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              🚗 Site Visits DB ({stats.siteVisits})
            </button>
          </div>

          {/* Search & Status Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search name, phone, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 text-stone-200 text-xs rounded-lg px-3.5 py-2 focus:outline-none focus:border-[#C6A15B]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-200 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-36 bg-stone-900 border border-stone-700 text-stone-300 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-[#C6A15B]"
            >
              <option value="all">All Statuses</option>
              <option value="new">🟢 New</option>
              <option value="contacted">🟡 Contacted</option>
              <option value="closed">🔴 Closed</option>
            </select>
          </div>

        </div>

        {/* Table Content */}
        {loading ? (
          <div className="py-20 text-center text-stone-400 space-y-2">
            <div className="w-8 h-8 border-2 border-[#C6A15B] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs uppercase tracking-widest">Loading Database Records...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-rose-950/20 text-rose-300 text-xs space-y-2 border-y border-rose-900/40">
            <p className="font-bold">⚠️ Connection Error</p>
            <p>{error}</p>
            <button
              onClick={fetchData}
              className="mt-2 bg-rose-900 hover:bg-rose-800 text-white px-4 py-1.5 rounded text-xs cursor-pointer"
            >
              Try Again
            </button>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="py-16 text-center text-stone-400 space-y-2">
            <p className="text-2xl">🔍</p>
            <p className="text-sm font-semibold text-stone-300">No database records found</p>
            <p className="text-xs text-stone-500">Try clearing search filters or submit a new form on the site.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[900px]">
              <thead className="bg-stone-950 text-stone-400 uppercase text-[11px] tracking-wider border-b border-stone-800 font-semibold">
                <tr>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">City</th>
                  <th className="p-4">Property / Category</th>
                  <th className="p-4">Message / Requirements</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {filteredData.map((item) => (
                  <tr key={item._id} className="hover:bg-stone-800/40 transition">
                    
                    {/* Name & Source */}
                    <td className="p-4 font-semibold text-stone-100">
                      <div className="flex flex-col">
                        <span className="text-sm text-[#C6A15B]">{item.name}</span>
                        {item.source && (
                          <span className="text-[10px] text-stone-500 font-mono uppercase mt-0.5">
                            src: {item.source}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="font-mono text-stone-200">{item.phone || 'N/A'}</div>
                        <div className="text-stone-400 text-[11px]">{item.email || '—'}</div>
                      </div>
                    </td>

                    {/* City */}
                    <td className="p-4 text-stone-300">{item.city || '—'}</td>

                    {/* Property / Resort / Villa */}
                    <td className="p-4">
                      <span className="bg-stone-800 border border-stone-700 text-stone-200 px-2.5 py-1 rounded text-[11px] font-medium inline-block">
                        {getPropertyText(item)}
                      </span>
                    </td>

                    {/* Message */}
                    <td className="p-4 max-w-xs">
                      <p className="line-clamp-2 text-stone-300 text-[11px]">
                        {item.message || 'No additional note provided.'}
                      </p>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status === 'closed'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : item.status === 'contacted'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}
                      >
                        {item.status || 'new'}
                      </span>
                    </td>

                    {/* Created Date */}
                    <td className="p-4 text-stone-400 text-[11px]">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : '—'}
                    </td>

                    {/* Action Buttons */}
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 px-2.5 py-1.5 rounded text-[11px] font-medium transition cursor-pointer"
                          title="Edit Record"
                        >
                          ✏️ Edit
                        </button>

                        <button
                          onClick={() => setDeletingId(item._id)}
                          className="bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-200 px-2.5 py-1.5 rounded text-[11px] font-medium transition cursor-pointer"
                          title="Delete Record"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* ================= EDIT RECORD MODAL ================= */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-stone-900 border border-[#C6A15B]/40 rounded-2xl w-full max-w-lg p-6 text-stone-100 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-serif-luxury text-xl font-bold text-[#C6A15B]">
                Edit Database Record
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-stone-400 hover:text-stone-100 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-stone-400 uppercase text-[10px] tracking-wider mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-200 focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 uppercase text-[10px] tracking-wider mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-200 focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 uppercase text-[10px] tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-200 focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 uppercase text-[10px] tracking-wider mb-1">City</label>
                  <input
                    type="text"
                    value={editFormData.city}
                    onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-200 focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 uppercase text-[10px] tracking-wider mb-1">Status</label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-200 focus:outline-none focus:border-[#C6A15B]"
                  >
                    <option value="new">🟢 New</option>
                    <option value="contacted">🟡 Contacted</option>
                    <option value="closed">🔴 Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-400 uppercase text-[10px] tracking-wider mb-1">Villa / Resort / Property Name</label>
                <input
                  type="text"
                  value={editFormData.villaName || editFormData.resortName || editFormData.propertyType || ''}
                  onChange={(e) => setEditFormData({
                    ...editFormData,
                    villaName: e.target.value,
                    resortName: e.target.value,
                    propertyType: e.target.value,
                  })}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-200 focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label className="block text-stone-400 uppercase text-[10px] tracking-wider mb-1">Message / Notes</label>
                <textarea
                  rows={3}
                  value={editFormData.message}
                  onChange={(e) => setEditFormData({ ...editFormData, message: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-stone-200 focus:outline-none focus:border-[#C6A15B] resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C6A15B] hover:bg-[#b38e49] text-[#07120c] font-bold rounded text-xs cursor-pointer uppercase tracking-wider"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-stone-900 border border-rose-800 rounded-2xl w-full max-w-sm p-6 text-stone-100 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-950 border border-rose-700 text-rose-300 flex items-center justify-center mx-auto text-xl font-bold">
              🗑️
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-100">Delete Record?</h3>
              <p className="text-xs text-stone-400 mt-1">
                Are you sure you want to permanently delete this database entry? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-xs cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs cursor-pointer font-bold uppercase tracking-wider"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
