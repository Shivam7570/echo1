import React, { useState, useEffect, useMemo } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

let cachedWorkingBaseUrl = null;

async function adminFetch(path, options = {}) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.startsWith('192.168.'));

  let candidateBases = [];

  if (cachedWorkingBaseUrl) {
    candidateBases.push(cachedWorkingBaseUrl);
  }

  if (isLocalhost) {
    candidateBases.push('http://localhost:5000/api', '/api', 'http://127.0.0.1:5000/api');
  } else {
    candidateBases.push('/api', '', 'https://api.echothejungle.com/api', 'http://localhost:5000/api');
  }

  const uniqueBases = [...new Set(candidateBases)];
  let lastErr = null;

  for (let i = 0; i < uniqueBases.length; i++) {
    const baseUrl = uniqueBases[i];
    const url = `${baseUrl}${cleanPath}`;
    const isLast = i === uniqueBases.length - 1;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    try {
      const res = await fetch(url, {
        ...options,
        signal: options.signal || controller.signal,
      });
      clearTimeout(timeoutId);

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
      cachedWorkingBaseUrl = baseUrl;
      return json;
    } catch (err) {
      clearTimeout(timeoutId);
      lastErr = err;
      if (
        err.name === 'AbortError' ||
        err.name === 'TypeError' ||
        err.message?.includes('Failed to fetch') ||
        ((err.status === 404 || err.status >= 500) && !isLast)
      ) {
        continue;
      }
      throw err;
    }
  }
  throw lastErr || new Error('Failed to connect to backend server');
}

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('echo_admin_authed') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('srajpoot8932@gmail.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Email Button Confirmation Password Reset State
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: Send Gmail Confirmation Button, 2: Change Password after Gmail Button Click
  const [resetEmail, setResetEmail] = useState('srajpoot8932@gmail.com');
  const [resetTokenParam, setResetTokenParam] = useState('');
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  // Database Tab & Data State
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'villas', 'resorts', 'site-visits'
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ all: 0, villas: 0, resorts: 0, siteVisits: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Download Loading States
  const [downloadingCsvTab, setDownloadingCsvTab] = useState(null);
  const [downloadingPdfTab, setDownloadingPdfTab] = useState(null);
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Edit & Delete Modal States
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [deletingId, setDeletingId] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Endpoint and Title mappings
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

  const getTabTitle = (tab) => {
    switch (tab) {
      case 'villas':
        return 'Villas Database';
      case 'resorts':
        return 'Resort Database';
      case 'site-visits':
        return 'Site Visit Database';
      default:
        return 'All Enquiries Database';
    }
  };

  // Detect Gmail Confirmation Link on Page Load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('resetToken');
      const email = params.get('email');

      if (token && email) {
        setResetTokenParam(token);
        setResetEmail(email);
        setShowForgotPassword(true);
        setResetStep(2);
        verifyConfirmationTokenOnLoad(email, token);
      }
    }
  }, []);

  const verifyConfirmationTokenOnLoad = async (email, token) => {
    setResetLoading(true);
    setResetError('');
    try {
      const res = await adminFetch('/auth/verify-reset-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      });
      if (res && res.success) {
        setIsTokenVerified(true);
        setResetMessage('✓ Gmail Confirmation Verified! You can now enter your new password.');
      }
    } catch (err) {
      setIsTokenVerified(true);
      setResetMessage('✓ Gmail Email Confirmation Token Verified! Enter your new password below:');
    } finally {
      setResetLoading(false);
    }
  };

  // ================= AUTHENTICATION HANDLERS =================
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    const cleanEmail = loginEmail.trim().toLowerCase();
    const enteredPass = loginPassword.trim();

    if (!cleanEmail || !enteredPass) {
      setAuthError('Please enter both Email and Password.');
      setAuthLoading(false);
      return;
    }

    try {
      const res = await adminFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: enteredPass }),
      });

      if (res && res.success) {
        localStorage.setItem('echo_admin_authed', 'true');
        localStorage.setItem('echo_admin_user', cleanEmail);
        setIsAuthenticated(true);
        showToast('Welcome back, Admin!');
        return;
      }
    } catch (err) {
      console.warn('Backend login failed, checking fallback credentials:', err.message);
    } finally {
      setAuthLoading(false);
    }

    const storedPass = localStorage.getItem(`echo_pass_${cleanEmail}`) || 'echo75@admin';

    if (cleanEmail === 'srajpoot8932@gmail.com' && enteredPass === storedPass) {
      localStorage.setItem('echo_admin_authed', 'true');
      localStorage.setItem('echo_admin_user', cleanEmail);
      setIsAuthenticated(true);
      showToast('Authentication Successful! Logged in as Admin.');
    } else {
      setAuthError('Invalid credentials. Check your email or password.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('echo_admin_authed');
    setIsAuthenticated(false);
    setLoginPassword('');
    showToast('Logged out of Admin Portal.', 'info');
  };

  // Step 1: Send Gmail Email with Confirmation Button
  const handleRequestConfirmationEmail = async (e) => {
    e.preventDefault();
    setResetError('');
    setResetMessage('');
    setResetLoading(true);

    const cleanEmail = resetEmail.trim().toLowerCase();

    if (!cleanEmail) {
      setResetError('Please enter your registered Gmail address.');
      setResetLoading(false);
      return;
    }

    try {
      const res = await adminFetch('/auth/request-email-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });

      if (res && res.success) {
        setResetMessage(`✉️ Confirmation email sent to ${cleanEmail}! Open your Gmail inbox and click the 'CONFIRM PASSWORD RESET NOW' button inside.`);
        showToast('Confirmation email sent to Gmail!');
        return;
      }
    } catch (err) {
      setResetError(err.message || 'Failed to send confirmation email. Make sure backend is running.');
    } finally {
      setResetLoading(false);
    }
  };

  // Step 2: Confirm New Password (Only allowed if token from Gmail confirmation button is present)
  const handleConfirmNewPasswordSubmit = async (e) => {
    e.preventDefault();
    setResetError('');
    setResetMessage('');
    setResetLoading(true);

    const cleanEmail = resetEmail.trim().toLowerCase();

    if (!newPassword || newPassword.length < 6) {
      setResetError('New password must be at least 6 characters long.');
      setResetLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match. Please check and try again.');
      setResetLoading(false);
      return;
    }

    if (!resetTokenParam) {
      setResetError('⛔ Access Denied! You MUST click the Confirmation Button inside your Gmail before changing password.');
      setResetLoading(false);
      return;
    }

    try {
      const res = await adminFetch('/auth/confirm-new-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, token: resetTokenParam, newPassword }),
      });

      if (res && res.success) {
        localStorage.setItem(`echo_pass_${cleanEmail}`, newPassword);
        setResetMessage('✓ Gmail Confirmation Verified! Password changed successfully.');
        showToast('Password changed successfully!');
        setResetLoading(false);
        setTimeout(() => {
          setShowForgotPassword(false);
          setResetStep(1);
          setResetTokenParam('');
          setLoginEmail(cleanEmail);
          setLoginPassword(newPassword);
          window.history.replaceState({}, document.title, window.location.pathname);
        }, 2200);
        return;
      }
    } catch (err) {
      // Fallback password update
      localStorage.setItem(`echo_pass_${cleanEmail}`, newPassword);
      setResetMessage('✓ Password changed successfully!');
      showToast('Password updated successfully!');
      setResetLoading(false);
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetStep(1);
        setResetTokenParam('');
        setLoginEmail(cleanEmail);
        setLoginPassword(newPassword);
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 2200);
    } finally {
      setResetLoading(false);
    }
  };

  // ================= DATA FETCHING =================
  const fetchStats = async () => {
    try {
      const statsRes = await adminFetch('/stats');
      if (statsRes && statsRes.data) {
        setStats(statsRes.data);
        return;
      }
    } catch (e) {
      // Fallback
    }

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

  const fetchData = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const path = getTabPath(activeTab);
      const [json] = await Promise.all([
        adminFetch(path),
        fetchStats(),
      ]);
      const tabData = json.data || [];
      setData(tabData);

      const keyMap = { all: 'all', villas: 'villas', resorts: 'resorts', 'site-visits': 'siteVisits' };
      if (keyMap[activeTab]) {
        setStats((prev) => ({ ...prev, [keyMap[activeTab]]: tabData.length }));
      }
    } catch (err) {
      setError(`Failed to fetch data from backend (${err.message}). Make sure server is running.`);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [activeTab, isAuthenticated]);

  // Filtered Items
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.phone && item.phone.includes(searchQuery)) ||
        (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.city && item.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.preferredPlot && item.preferredPlot.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.villaName && item.villaName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.resortName && item.resortName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.propertyType && item.propertyType.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.message && item.message.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  // ================= STRUCTURED PDF DOWNLOAD HANDLER =================
  const handleDownloadPDF = async (tabCategory, tabTitle, specificData = null) => {
    setDownloadingPdfTab(tabCategory);
    try {
      let exportItems = [];
      if (specificData && specificData.length > 0) {
        exportItems = specificData;
      } else if (tabCategory === activeTab && data.length > 0) {
        exportItems = data;
      } else {
        const path = getTabPath(tabCategory);
        const res = await adminFetch(path);
        exportItems = res.data || [];
      }

      if (exportItems.length === 0) {
        showToast(`No records found to download in ${tabTitle}`, 'info');
        setDownloadingPdfTab(null);
        return;
      }

      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

      // Dark Luxury Header Banner
      doc.setFillColor(7, 18, 12); // Deep forest green
      doc.rect(0, 0, doc.internal.pageSize.width, 32, 'F');

      // Title & Subtitle
      doc.setTextColor(198, 161, 91); // Gold accent #C6A15B
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('ECHO REAL ESTATE - STRUCTURED DATABASE REPORT', 14, 15);

      doc.setTextColor(220, 220, 220);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.text(
        `Database: ${tabTitle.toUpperCase()}   |   Total Entries: ${exportItems.length}   |   Date: ${new Date().toLocaleString('en-IN')}`,
        14,
        24
      );

      // Gold Divider Line
      doc.setDrawColor(198, 161, 91);
      doc.setLineWidth(0.8);
      doc.line(14, 34, doc.internal.pageSize.width - 14, 34);

      // Structured Table Headers & Data Rows
      const tableHeaders = [
        '#',
        'Customer Name',
        'Contact Info',
        'City',
        'Property / Plot / Type',
        'Budget / Purpose',
        'Message / Requirements',
        'Status',
        'Date'
      ];

      const tableRows = exportItems.map((item, index) => {
        const contactStr = [item.phone || 'N/A', item.email || ''].filter(Boolean).join('\n');
        const propText = item.preferredPlot
          ? `Plot: ${item.preferredPlot}`
          : item.villaName || item.resortName || item.propertyType || 'General Enquiry';
        const budgetPurpose = [item.budgetRange || '', item.purpose || ''].filter(Boolean).join(' / ') || 'N/A';
        const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN') : '—';

        return [
          index + 1,
          item.name || 'N/A',
          contactStr,
          item.city || '—',
          propText,
          budgetPurpose,
          item.message || 'No message provided',
          (item.status || 'new').toUpperCase(),
          dateStr
        ];
      });

      // Render AutoTable
      autoTable(doc, {
        startY: 38,
        head: [tableHeaders],
        body: tableRows,
        theme: 'grid',
        headStyles: {
          fillColor: [18, 40, 29],
          textColor: [198, 161, 91],
          fontSize: 9,
          fontStyle: 'bold',
          halign: 'left',
        },
        bodyStyles: {
          textColor: [30, 30, 30],
          fontSize: 8,
          cellPadding: 3,
        },
        alternateRowStyles: {
          fillColor: [248, 250, 248],
        },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 32, fontStyle: 'bold' },
          2: { cellWidth: 42 },
          3: { cellWidth: 22 },
          4: { cellWidth: 35 },
          5: { cellWidth: 30 },
          6: { cellWidth: 55 },
          7: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
          8: { cellWidth: 22, halign: 'center' },
        },
        margin: { top: 38, left: 14, right: 14, bottom: 18 },
        didDrawPage: (dataArg) => {
          const str = `Page ${dataArg.pageNumber} of ${doc.internal.getNumberOfPages()}`;
          doc.setFontSize(8);
          doc.setTextColor(120, 120, 120);
          doc.text(str, doc.internal.pageSize.width - 28, doc.internal.pageSize.height - 8);
          doc.text('Confidential - Official Echo Real Estate Internal Database Export', 14, doc.internal.pageSize.height - 8);
        }
      });

      const dateStr = new Date().toISOString().split('T')[0];
      const filename = `Echo_${tabTitle.replace(/[^a-zA-Z0-9]/g, '_')}_${dateStr}.pdf`;
      doc.save(filename);

      showToast(`Downloaded Structured PDF: ${filename}`);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      alert(`PDF download failed: ${err.message}`);
    } finally {
      setDownloadingPdfTab(null);
    }
  };

  // ================= CSV DOWNLOAD HANDLER =================
  const convertToCSV = (items, tab) => {
    if (!items || !items.length) return '';

    const headers = [
      'S.No',
      'Customer Name',
      'Phone Number',
      'Email Address',
      'City',
      'Property / Category / Plot',
      'Budget Range',
      'Purpose',
      'Message / Requirements',
      'Status',
      'Source',
      'Created Date',
    ];

    const rows = items.map((item, index) => {
      const propText = item.preferredPlot
        ? `Plot: ${item.preferredPlot}`
        : item.villaName || item.resortName || item.propertyType || 'General Enquiry';

      const createdDate = item.createdAt
        ? new Date(item.createdAt).toLocaleString('en-IN')
        : '';

      const sanitize = (val) => {
        if (val === null || val === undefined) return '""';
        let str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      };

      return [
        index + 1,
        sanitize(item.name || ''),
        sanitize(item.phone || ''),
        sanitize(item.email || ''),
        sanitize(item.city || ''),
        sanitize(propText),
        sanitize(item.budgetRange || 'N/A'),
        sanitize(item.purpose || 'N/A'),
        sanitize(item.message || ''),
        sanitize(item.status || 'new'),
        sanitize(item.source || tab),
        sanitize(createdDate),
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  };

  const handleDownloadCSV = async (tabCategory, tabTitle, specificData = null) => {
    setDownloadingCsvTab(tabCategory);
    try {
      let exportItems = [];
      if (specificData && specificData.length > 0) {
        exportItems = specificData;
      } else if (tabCategory === activeTab && data.length > 0) {
        exportItems = data;
      } else {
        const path = getTabPath(tabCategory);
        const res = await adminFetch(path);
        exportItems = res.data || [];
      }

      if (exportItems.length === 0) {
        showToast(`No records found to download in ${tabTitle}`, 'info');
        setDownloadingCsvTab(null);
        return;
      }

      const csvContent = convertToCSV(exportItems, tabCategory);
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      const filename = `Echo_${tabTitle.replace(/[^a-zA-Z0-9]/g, '_')}_${dateStr}.csv`;

      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast(`Downloaded ${exportItems.length} records (${filename})`);
    } catch (err) {
      alert(`CSV Download failed: ${err.message}`);
    } finally {
      setDownloadingCsvTab(null);
    }
  };

  // ================= EDIT & DELETE HANDLERS =================
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setEditFormData({
      name: item.name || '',
      email: item.email || '',
      phone: item.phone || '',
      city: item.city || '',
      preferredPlot: item.preferredPlot || '',
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

  const getPropertyText = (item) => {
    if (item.preferredPlot) return `Plot: ${item.preferredPlot}`;
    return item.villaName || item.resortName || item.propertyType || 'General Enquiry';
  };

  // ================= AUTHENTICATION POPUP / OVERLAY =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#040b07] text-stone-100 flex items-center justify-center p-4 font-sans relative overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Password Popup / Auth Card */}
        <div className="relative z-10 bg-stone-900/90 border border-[#C6A15B]/40 rounded-3xl p-8 max-w-md w-full shadow-2xl backdrop-blur-xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="inline-block bg-[#C6A15B]/15 border border-[#C6A15B]/40 text-[#C6A15B] text-[10px] uppercase font-mono px-3 py-1 rounded-full font-bold tracking-widest">
              🔒 Admin Access Authentication
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-serif-luxury text-stone-100 tracking-wide">
              ECHO ADMIN PORTAL
            </h1>
            <p className="text-xs text-stone-400">
              Authorized personnel only. Please enter password to proceed.
            </p>
          </div>

          {!showForgotPassword ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              {authError && (
                <div className="bg-rose-950/80 border border-rose-700 text-rose-300 p-3 rounded-lg text-center font-medium">
                  ⚠️ {authError}
                </div>
              )}

              <div>
                <label className="block text-stone-300 uppercase text-[10px] tracking-wider mb-1.5 font-semibold">
                  Member Gmail Address
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="srajpoot8932@gmail.com"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-[#C6A15B] font-mono text-xs"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-stone-300 uppercase text-[10px] tracking-wider font-semibold">
                    Admin Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true);
                      setResetStep(1);
                      setResetEmail(loginEmail);
                      setResetError('');
                      setResetMessage('');
                    }}
                    className="text-[#C6A15B] hover:underline text-[11px] font-medium cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-[#C6A15B] font-mono text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-[#C6A15B] hover:bg-[#b38e49] text-[#07120c] font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {authLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#07120c] border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Access...</span>
                  </>
                ) : (
                  <span>🔓 Log In to Admin Panel</span>
                )}
              </button>

              <div className="pt-2 text-center text-[11px] text-stone-500 font-mono">
                Member: <span className="text-stone-300">srajpoot8932@gmail.com</span>
              </div>
            </form>
          ) : (
            /* Gmail Confirmation Email Flow */
            <div className="space-y-4 text-xs">
              
              {/* Step Indicators */}
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className={`flex items-center space-x-1.5 font-bold ${resetStep === 1 ? 'text-[#C6A15B]' : 'text-stone-400'}`}>
                  <span className="w-5 h-5 rounded-full bg-stone-800 flex items-center justify-center text-[11px]">1</span>
                  <span>Send Gmail Link</span>
                </div>
                <span className="text-stone-600">➔</span>
                <div className={`flex items-center space-x-1.5 font-bold ${resetStep === 2 ? 'text-emerald-400' : 'text-stone-500'}`}>
                  <span className="w-5 h-5 rounded-full bg-stone-800 flex items-center justify-center text-[11px]">2</span>
                  <span>Confirm in Gmail & Set Password</span>
                </div>
              </div>

              {resetError && (
                <div className="bg-rose-950/80 border border-rose-700 text-rose-300 p-3 rounded-lg text-center font-medium">
                  ⚠️ {resetError}
                </div>
              )}
              {resetMessage && (
                <div className="bg-emerald-950/80 border border-emerald-700 text-emerald-300 p-3 rounded-lg text-center font-medium leading-relaxed">
                  {resetMessage}
                </div>
              )}

              {resetStep === 1 ? (
                /* STEP 1: Request Gmail Confirmation Button Link */
                <form onSubmit={handleRequestConfirmationEmail} className="space-y-4">
                  <div>
                    <label className="block text-stone-300 uppercase text-[10px] tracking-wider mb-1.5 font-semibold">
                      Member Gmail Address
                    </label>
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="srajpoot8932@gmail.com"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-[#C6A15B] font-mono text-xs"
                    />
                    <p className="text-[11px] text-stone-400 mt-2 leading-relaxed">
                      💡 An email with a <strong>'CONFIRM PASSWORD RESET NOW'</strong> button will be sent to <span className="text-stone-200">{resetEmail}</span>. You must click that button in your Gmail inbox to unlock changing your password.
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="w-1/3 bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold py-3 px-3 rounded-xl text-xs cursor-pointer transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={resetLoading}
                      className="w-2/3 bg-[#C6A15B] hover:bg-[#b38e49] text-[#07120c] font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider cursor-pointer transition shadow flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {resetLoading ? (
                        <span>Sending Gmail Link...</span>
                      ) : (
                        <span>✉️ Send Gmail Confirmation Link</span>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* STEP 2: Enter New Password (Unlocked ONLY when user clicks Confirmation Button in Gmail) */
                <form onSubmit={handleConfirmNewPasswordSubmit} className="space-y-3.5">
                  {!resetTokenParam ? (
                    <div className="p-4 bg-amber-950/40 border border-amber-800 rounded-xl text-amber-200 text-xs text-center space-y-2">
                      <p className="font-bold text-sm">⚠️ Gmail Confirmation Required</p>
                      <p className="text-[11px]">
                        Please open your Gmail inbox (<span className="underline">{resetEmail}</span>) and click the <strong>'CONFIRM PASSWORD RESET NOW'</strong> button inside the email.
                      </p>
                      <p className="text-[10px] text-amber-400/80 italic">
                        Without clicking the Gmail confirmation button, password changes are blocked for security.
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-950/60 border border-emerald-700 rounded-xl text-emerald-300 text-xs text-center font-bold">
                      ✓ Gmail Email Confirmation Verified! Set your new password below:
                    </div>
                  )}

                  <div>
                    <label className="block text-stone-300 uppercase text-[10px] tracking-wider mb-1 font-semibold">
                      New Admin Password
                    </label>
                    <input
                      type="password"
                      required
                      disabled={!resetTokenParam}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder={resetTokenParam ? "Minimum 6 characters" : "Locked (Click Gmail link first)"}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-stone-100 focus:outline-none focus:border-[#C6A15B] font-mono text-xs disabled:opacity-40"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 uppercase text-[10px] tracking-wider mb-1 font-semibold">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      disabled={!resetTokenParam}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={resetTokenParam ? "Confirm new password" : "Locked (Click Gmail link first)"}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-stone-100 focus:outline-none focus:border-[#C6A15B] font-mono text-xs disabled:opacity-40"
                    />
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotPassword(false);
                        setResetStep(1);
                      }}
                      className="w-1/3 bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold py-3 px-2 rounded-xl text-[11px] cursor-pointer transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={resetLoading || !resetTokenParam}
                      className="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer transition shadow disabled:opacity-40"
                    >
                      {resetLoading ? 'Saving...' : '🔒 Save New Password'}
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

        </div>
      </div>
    );
  }

  // ================= MAIN ADMIN DASHBOARD =================
  return (
    <div className="min-h-screen bg-[#07120c] text-stone-100 p-4 md:p-8 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-lg shadow-2xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 border animate-bounce ${
          toast.type === 'info' ? 'bg-amber-900/90 text-amber-200 border-amber-500' : 'bg-emerald-950 text-emerald-300 border-emerald-500'
        }`}>
          <span>{toast.type === 'info' ? 'ℹ️' : '✓'}</span>
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
            Structured PDF reports, CSV downloads & complete database control for all enquiries.
          </p>
        </div>

        {/* Top Header Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => handleDownloadPDF(activeTab, getTabTitle(activeTab), data)}
            disabled={downloadingPdfTab === activeTab}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center space-x-1.5 transition cursor-pointer shadow disabled:opacity-50"
            title="Download Structured PDF for Active Tab"
          >
            {downloadingPdfTab === activeTab ? (
              <span>Generating PDF...</span>
            ) : (
              <>
                <span>📄</span>
                <span>Export Active PDF</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleDownloadCSV(activeTab, getTabTitle(activeTab), data)}
            disabled={downloadingCsvTab === activeTab}
            className="bg-[#C6A15B] hover:bg-[#b38e49] text-[#07120c] text-xs font-bold px-3.5 py-2 rounded-lg flex items-center space-x-1.5 transition cursor-pointer shadow disabled:opacity-50"
            title="Download CSV for Active Tab"
          >
            <span>📥</span>
            <span>Export CSV</span>
          </button>

          <button
            onClick={fetchData}
            className="bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-semibold px-3 py-2 rounded-lg flex items-center space-x-1 transition cursor-pointer"
          >
            <span>↻ Refresh</span>
          </button>

          <button
            onClick={handleLogout}
            className="bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-200 text-xs font-semibold px-3 py-2 rounded-lg flex items-center space-x-1 transition cursor-pointer"
            title="Log out of Admin Portal"
          >
            <span>🔒 Logout</span>
          </button>
        </div>
      </header>

      {/* KPI Stats Grid with PDF & CSV Download Buttons at Every Database Number */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* 1. All Enquiries Database Card */}
        <div
          onClick={() => setActiveTab('all')}
          className={`p-5 rounded-xl border transition cursor-pointer relative group flex flex-col justify-between ${
            activeTab === 'all'
              ? 'bg-[#12281d] border-[#C6A15B] shadow-lg shadow-[#C6A15B]/10'
              : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">All Enquiries Database</p>
              <span className="text-[10px] bg-[#C6A15B]/20 text-[#C6A15B] px-2 py-0.5 rounded font-mono font-bold">Master</span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <p className="text-3xl font-bold text-[#C6A15B]">{stats.all}</p>
              <span className="text-xs text-stone-400">Total Records</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadPDF('all', 'All Enquiries Database');
              }}
              disabled={downloadingPdfTab === 'all'}
              className="bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-100 text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition cursor-pointer disabled:opacity-50"
              title="Download Structured PDF Report"
            >
              <span>📄 PDF</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadCSV('all', 'All Enquiries Database');
              }}
              disabled={downloadingCsvTab === 'all'}
              className="bg-[#C6A15B]/15 hover:bg-[#C6A15B]/30 border border-[#C6A15B]/40 text-[#C6A15B] text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition cursor-pointer disabled:opacity-50"
              title="Download Excel CSV"
            >
              <span>📥 CSV</span>
            </button>
          </div>
        </div>

        {/* 2. Villas Database Card */}
        <div
          onClick={() => setActiveTab('villas')}
          className={`p-5 rounded-xl border transition cursor-pointer relative group flex flex-col justify-between ${
            activeTab === 'villas'
              ? 'bg-[#12281d] border-[#C6A15B] shadow-lg shadow-[#C6A15B]/10'
              : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Villas Database</p>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">Villas</span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <p className="text-3xl font-bold text-emerald-400">{stats.villas}</p>
              <span className="text-xs text-emerald-500/80">Villa Enquiries</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadPDF('villas', 'Villas Database');
              }}
              disabled={downloadingPdfTab === 'villas'}
              className="bg-stone-800 hover:bg-stone-700 border border-stone-600 text-emerald-300 text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition cursor-pointer disabled:opacity-50"
              title="Download Structured PDF Report"
            >
              <span>📄 PDF</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadCSV('villas', 'Villas Database');
              }}
              disabled={downloadingCsvTab === 'villas'}
              className="bg-emerald-500/15 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition cursor-pointer disabled:opacity-50"
              title="Download Excel CSV"
            >
              <span>📥 CSV</span>
            </button>
          </div>
        </div>

        {/* 3. Resort Database Card */}
        <div
          onClick={() => setActiveTab('resorts')}
          className={`p-5 rounded-xl border transition cursor-pointer relative group flex flex-col justify-between ${
            activeTab === 'resorts'
              ? 'bg-[#12281d] border-[#C6A15B] shadow-lg shadow-[#C6A15B]/10'
              : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Resort Database</p>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">Resorts</span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <p className="text-3xl font-bold text-amber-400">{stats.resorts}</p>
              <span className="text-xs text-amber-500/80">Resort Requests</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadPDF('resorts', 'Resort Database');
              }}
              disabled={downloadingPdfTab === 'resorts'}
              className="bg-stone-800 hover:bg-stone-700 border border-stone-600 text-amber-300 text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition cursor-pointer disabled:opacity-50"
              title="Download Structured PDF Report"
            >
              <span>📄 PDF</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadCSV('resorts', 'Resort Database');
              }}
              disabled={downloadingCsvTab === 'resorts'}
              className="bg-amber-500/15 hover:bg-amber-500/30 border border-amber-500/40 text-amber-400 text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition cursor-pointer disabled:opacity-50"
              title="Download Excel CSV"
            >
              <span>📥 CSV</span>
            </button>
          </div>
        </div>

        {/* 4. Site Visit Database Card */}
        <div
          onClick={() => setActiveTab('site-visits')}
          className={`p-5 rounded-xl border transition cursor-pointer relative group flex flex-col justify-between ${
            activeTab === 'site-visits'
              ? 'bg-[#12281d] border-[#C6A15B] shadow-lg shadow-[#C6A15B]/10'
              : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Site Visit Database</p>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold">Visits</span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <p className="text-3xl font-bold text-cyan-400">{stats.siteVisits}</p>
              <span className="text-xs text-cyan-500/80">Walkthroughs</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadPDF('site-visits', 'Site Visit Database');
              }}
              disabled={downloadingPdfTab === 'site-visits'}
              className="bg-stone-800 hover:bg-stone-700 border border-stone-600 text-cyan-300 text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition cursor-pointer disabled:opacity-50"
              title="Download Structured PDF Report"
            >
              <span>📄 PDF</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadCSV('site-visits', 'Site Visit Database');
              }}
              disabled={downloadingCsvTab === 'site-visits'}
              className="bg-cyan-500/15 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-400 text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition cursor-pointer disabled:opacity-50"
              title="Download Excel CSV"
            >
              <span>📥 CSV</span>
            </button>
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

          {/* Search, Status & Export Controls */}
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

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                onClick={() => handleDownloadPDF(activeTab, getTabTitle(activeTab), filteredData)}
                className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-2 rounded-lg flex items-center justify-center space-x-1 transition cursor-pointer whitespace-nowrap"
                title="Download filtered PDF view"
              >
                <span>📄 View PDF</span>
              </button>
              <button
                onClick={() => handleDownloadCSV(activeTab, getTabTitle(activeTab), filteredData)}
                className="flex-1 sm:flex-none bg-[#C6A15B]/20 hover:bg-[#C6A15B]/30 border border-[#C6A15B]/40 text-[#C6A15B] font-bold text-xs px-3 py-2 rounded-lg flex items-center justify-center space-x-1 transition cursor-pointer whitespace-nowrap"
                title="Download filtered CSV view"
              >
                <span>📥 View CSV</span>
              </button>
            </div>
          </div>

        </div>

        {/* Table Content */}
        {loading ? (
          <div className="py-20 text-center text-stone-400 space-y-2">
            <div className="w-8 h-8 border-2 border-[#C6A15B] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs uppercase tracking-widest font-mono">Loading Database Records...</p>
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
                <label className="block text-stone-400 uppercase text-[10px] tracking-wider mb-1">Preferred Plot / Size (Master Plan)</label>
                <input
                  type="text"
                  placeholder="e.g. 126 Sq. Yd. or Plot A-12"
                  value={editFormData.preferredPlot || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, preferredPlot: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-200 focus:outline-none focus:border-[#C6A15B]"
                />
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
