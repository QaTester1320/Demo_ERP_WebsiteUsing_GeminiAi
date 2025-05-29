import React, { useState, useEffect, createContext, useContext } from 'react';
import { Home, Package, ShoppingCart, Users, User, Search, Plus, Edit, Trash2, X, Check, AlertCircle, Info, ChevronRight, ChevronLeft, Menu, XCircle, ArrowLeft } from 'lucide-react'; // Importing icons, added ArrowLeft
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'; // Importing Recharts components

// Create a context for notifications
const NotificationContext = createContext();

// Notification Provider Component
const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Notification disappears after 3 seconds
  };

  const notificationStyle = {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem', // space-x-3
    transition: 'transform 0.3s ease-in-out',
    transform: notification ? 'translateY(0)' : 'translateY(100%)', // Simulating transition
    zIndex: 100 // Ensure notification is on top
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div
          data-testid="notification-message"
          style={{
            ...notificationStyle,
            backgroundColor: notification.type === 'success' ? '#22C55E' : // bg-green-500
                             notification.type === 'error' ? '#EF4444' : // bg-red-500
                             '#3B82F6', // bg-blue-500
          }}
        >
          {notification.type === 'success' && <Check size={20} />}
          {notification.type === 'error' && <XCircle size={20} />}
          {notification.type === 'info' && <Info size={20} />}
          <span>{notification.message}</span>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

// Custom Confirmation Modal Component
const ConfirmModal = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(75, 85, 99, 0.5)', // bg-gray-600 bg-opacity-50
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        maxWidth: '24rem', // max-w-sm
        width: '100%',
        textAlign: 'center',
      }}>
        <h3 style={{
          fontSize: '1.25rem', // text-xl
          fontWeight: 'bold',
          color: '#1F2937', // text-gray-800
          marginBottom: '0.75rem',
        }}>{title}</h3>
        <p style={{
          color: '#374151', // text-gray-700
          marginBottom: '1.5rem',
        }}>{message}</p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem', // space-x-4
        }}>
          <button
            data-testid="confirm-modal-confirm-button"
            onClick={onConfirm}
            style={{
              backgroundColor: '#DC2626', // bg-red-600
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              transition: 'background-color 0.15s ease-in-out',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Confirm
          </button>
          <button
            data-testid="confirm-modal-cancel-button"
            onClick={onCancel}
            style={{
              backgroundColor: '#D1D5DB', // bg-gray-300
              color: '#1F2937', // text-gray-800
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              transition: 'background-color 0.15s ease-in-out',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Utility function to generate unique IDs
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Login Component
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (username === 'admin' && password === 'password') {
      onLogin(true);
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to bottom right, #2563EB, #4F46E5)', // bg-gradient-to-br from-blue-600 to-indigo-800
      padding: '1rem',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // shadow-2xl
        width: '100%',
        maxWidth: '28rem', // max-w-md
      }}>
        <h2 style={{
          fontSize: '2.25rem', // text-4xl
          fontWeight: '800', // font-extrabold
          textAlign: 'center',
          color: '#111827', // text-gray-900
          marginBottom: '2rem',
        }}>ERP Login</h2>
        <form onSubmit={handleLogin} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem', // space-y-6
        }}>
          <div>
            <label htmlFor="username" style={{
              display: 'block',
              fontSize: '0.875rem', // text-sm
              fontWeight: '600', // font-semibold
              color: '#374151', // text-gray-700
              marginBottom: '0.5rem',
            }}>Username</label>
            <input
              type="text"
              id="username"
              data-testid="username-input"
              style={{
                width: '100%',
                padding: '0.8125rem 1.25rem', // px-5 py-3
                border: '1px solid #D1D5DB', // border border-gray-300
                borderRadius: '0.5rem',
                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                fontSize: '1.125rem', // text-lg
                outline: 'none',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3B82F6'; // focus:border-blue-500
                e.target.style.boxShadow = '0 0 0 1px #3B82F6, 0 0 0 3px rgba(59, 130, 246, 0.5)'; // focus:ring-blue-500
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#D1D5DB';
                e.target.style.boxShadow = 'none';
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem',
            }}>Password</label>
            <input
              type="password"
              id="password"
              data-testid="password-input"
              style={{
                width: '100%',
                padding: '0.8125rem 1.25rem',
                border: '1px solid #D1D5DB',
                borderRadius: '0.5rem',
                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                fontSize: '1.125rem',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3B82F6';
                e.target.style.boxShadow = '0 0 0 1px #3B82F6, 0 0 0 3px rgba(59, 130, 246, 0.5)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#D1D5DB';
                e.target.style.boxShadow = 'none';
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p data-testid="login-error" style={{ color: '#DC2626', fontSize: '0.875rem', fontWeight: '500', textAlign: 'center' }}>{error}</p>}
          <button
            type="submit"
            data-testid="login-button"
            style={{
              width: '100%',
              backgroundColor: '#1D4ED8', // bg-blue-700
              color: 'white',
              padding: '0.75rem 1.5rem', // py-3 px-6
              borderRadius: '0.5rem',
              transition: 'background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              fontSize: '1.125rem', // text-lg
              fontWeight: '600', // font-semibold
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow-md
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1E40AF'} // hover:bg-blue-800
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
            onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px #3B82F6, 0 0 0 4px rgba(59, 130, 246, 0.5)'} // focus:ring-2 focus:ring-blue-500
            onBlur={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

// Layout Component with Sidebar Navigation
const Layout = ({ children, onNavigate, currentPage, goBack, canGoBack }) => { // Added goBack and canGoBack props
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', page: 'dashboard', icon: Home },
    { name: 'Products', page: 'products', icon: Package },
    { name: 'Orders', page: 'orders', icon: ShoppingCart },
    { name: 'Customers', page: 'customers', icon: Users },
    { name: 'Users', page: 'users', icon: User },
  ];

  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#1F2937', // bg-gray-800
    color: 'white',
    width: '16rem', // w-64
    padding: '1.5rem', // p-6
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem', // space-y-6
    transition: 'transform 0.3s ease-in-out',
    transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
    zIndex: 30,
    flexShrink: 0,
  };

  const navLinkBaseStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '0.75rem 1rem', // py-3 px-4
    borderRadius: '0.5rem',
    fontSize: '1.125rem', // text-lg
    fontWeight: '500', // font-medium
    transition: 'background-color 0.2s, color 0.2s',
    cursor: 'pointer',
    border: 'none',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F3F4F6' }}> {/* bg-gray-100 */}
      {/* Mobile Sidebar Toggle */}
      <div style={{
        position: 'fixed',
        top: '1rem',
        left: '1rem',
        zIndex: 40,
        display: 'block', // Default for mobile
      }}>
        <button
          data-testid="sidebar-toggle-button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            padding: '0.5rem',
            borderRadius: '0.375rem',
            color: '#4B5563', // text-gray-600
            backgroundColor: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            outline: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px #3B82F6, 0 0 0 4px rgba(59, 130, 246, 0.5)'}
          onBlur={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        style={{
          ...sidebarStyle,
          // Media query simulation for md:relative md:translate-x-0
          '@media (min-width: 768px)': {
            position: 'relative',
            transform: 'translateX(0)',
          }
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#93C5FD' }}>ERP System</h1> {/* text-3xl font-extrabold text-blue-300 */}
          <button
            style={{
              display: 'block', // Default for mobile
              color: '#9CA3AF', // text-gray-400
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              padding: '0',
            }}
            onClick={() => setIsSidebarOpen(false)}
            data-testid="close-sidebar-button"
          >
            <X size={24} />
          </button>
        </div>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.page}
                data-testid={`nav-link-${item.page}`}
                onClick={() => { onNavigate(item.page); setIsSidebarOpen(false); }}
                style={{
                  ...navLinkBaseStyle,
                  backgroundColor: currentPage === item.page ? '#1E40AF' : 'transparent', // bg-blue-700
                  color: currentPage === item.page ? 'white' : '#D1D5DB', // text-white or text-gray-300
                  boxShadow: currentPage === item.page ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
                }}
                onMouseOver={(e) => {
                  if (currentPage !== item.page) {
                    e.currentTarget.style.backgroundColor = '#374151'; // hover:bg-gray-700
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseOut={(e) => {
                  if (currentPage !== item.page) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#D1D5DB';
                  }
                }}
              >
                <Icon size={20} style={{ marginRight: '0.75rem' }} /> {/* mr-3 */}
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '2rem', // p-8
        transition: 'all 0.3s ease-in-out',
        marginLeft: '0', // Default for mobile
        // Media query simulation for md:ml-64
        '@media (min-width: 768px)': {
          marginLeft: '16rem', // ml-64 (w-64 of sidebar)
        }
      }}>
        {/* Back Button */}
        {canGoBack && currentPage !== 'dashboard' && ( // Only show if can go back and not on dashboard
          <button
            onClick={goBack}
            style={{
              backgroundColor: '#4B5563', // bg-gray-600
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontWeight: '600',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              transition: 'background-color 0.2s ease-in-out',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1.5rem', // mb-6
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1F2937'} // hover:bg-gray-800
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4B5563'}
          >
            <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Back
          </button>
        )}
        {children}
      </main>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ products, orders, customers, onNavigate }) => {
  const { showNotification } = useContext(NotificationContext);

  // Calculate dynamic data for dashboard cards
  const totalProducts = products.length;
  const newOrders = orders.filter(order => order.status === 'Pending' || order.status === 'Processing').length;
  const activeCustomers = customers.length;
  const lowStockThreshold = 10; // Define low stock threshold
  const lowStockItems = products.filter(product => product.stock < lowStockThreshold).length;

  // Data for Product Stock Chart (top 5 products by stock)
  const productStockData = products
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 5)
    .map(p => ({ name: p.name, stock: p.stock }));

  // Data for Order Status Pie Chart
  const orderStatusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
  const orderStatusData = Object.keys(orderStatusCounts).map(status => ({
    name: status,
    value: orderStatusCounts[status],
  }));

  const PIE_COLORS = ['#3B82F6', '#9333EA', '#22C55E', '#EF4444', '#F59E0B']; // Blue, Purple, Green, Red, Yellow

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      minHeight: 'calc(100vh - 4rem - 32px)', // Adjusted height to account for padding/margin
    }}>
      <h1 style={{
        fontSize: '3rem', // text-5xl
        fontWeight: '800', // font-extrabold
        color: '#111827', // text-gray-900
        marginBottom: '2.5rem', // mb-10
        textAlign: 'center',
      }}>Welcome to ERP Dashboard</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)', // grid-cols-1
        gap: '2rem', // gap-8
        // Media queries for md:grid-cols-2 lg:grid-cols-3
        '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
        '@media (min-width: 1024px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
      }}>
        {/* Card Base Style */}
        {/* Note: Hover effects will be handled with inline onMouseOver/onMouseOut or simplified */}
        {[
          {
            title: 'Product Overview', icon: <Package size={28} style={{ marginRight: '0.75rem' }} />,
            text: 'Quick insights into your product inventory and sales performance.', value: totalProducts, unit: 'Products',
            bg: 'linear-gradient(to right, #3B82F6, #2563EB)', // from-blue-500 to-blue-600
            textColor: '#DBEAFE', // text-blue-100
            page: 'products'
          },
          {
            title: 'Recent Orders', icon: <ShoppingCart size={28} style={{ marginRight: '0.75rem' }} />,
            text: 'Monitor the status of your latest customer orders.', value: newOrders, unit: 'New Orders',
            bg: 'linear-gradient(to right, #A855F7, #9333EA)', // from-purple-500 to-purple-600
            textColor: '#F3E8FF', // text-purple-100
            page: 'orders'
          },
          {
            title: 'Active Customers', icon: <Users size={28} style={{ marginRight: '0.75rem' }} />,
            text: 'See your growing customer base and engagement.', value: activeCustomers, unit: 'Customers',
            bg: 'linear-gradient(to right, #22C55E, #16A34A)', // from-green-500 to-green-600
            textColor: '#DCFCE7', // text-green-100
            page: 'customers'
          },
          {
            title: 'Low Stock Alerts', icon: <AlertCircle size={28} style={{ marginRight: '0.75rem' }} />,
            text: `Products with stock below ${lowStockThreshold}. Time to reorder!`, value: lowStockItems, unit: 'Items Critical',
            bg: 'linear-gradient(to right, #F59E0B, #D97706)', // from-yellow-500 to-yellow-600
            textColor: '#FEF3C7', // text-yellow-100
            page: 'products' // Navigate to products page to view low stock items
          },
          {
            title: 'System Status', icon: <Info size={28} style={{ marginRight: '0.75rem' }} />,
            text: 'All systems operational. Running smoothly.', value: 'Online', unit: '',
            bg: 'linear-gradient(to right, #6366F1, #4F46E5)', // from-indigo-500 to-indigo-600
            textColor: '#E0E7FF', // text-indigo-100
            page: 'dashboard' // No specific page, stay on dashboard
          },
          {
            title: 'Total Users', icon: <User size={28} style={{ marginRight: '0.75rem' }} />,
            text: 'Total registered users in the system.', value: 4, unit: 'Users', // Static for now as user data is static
            bg: 'linear-gradient(to right, #EF4444, #DC2626)', // from-red-500 to-red-600
            textColor: '#FEE2E2', // text-red-100
            page: 'users'
          },
        ].map((card, index) => (
          <div
            key={index}
            onClick={() => onNavigate(card.page)}
            style={{
              background: card.bg,
              color: 'white',
              padding: '2rem',
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              transform: 'scale(1)', // Initial state for hover effect
              transition: 'transform 0.3s ease-in-out',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h2 style={{
              fontSize: '1.875rem', // text-3xl
              fontWeight: 'bold',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
            }}>{card.icon} {card.title}</h2>
            <p style={{ color: card.textColor, marginBottom: '1rem' }}>{card.text}</p>
            <p style={{
              fontSize: '2.25rem', // text-4xl
              fontWeight: '800', // font-extrabold
            }}>{card.value} <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>{card.unit}</span></p>
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '2rem',
        marginTop: '3rem',
        '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
      }}>
        {/* Product Stock Chart */}
        <div style={{
          backgroundColor: '#F9FAFB', // bg-gray-50
          padding: '2rem',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '1rem' }}>Product Stock Levels (Top 5)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={productStockData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" style={{ fontSize: '0.75rem' }} />
              <YAxis style={{ fontSize: '0.75rem' }} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.1)' }} />
              <Legend />
              <Bar dataKey="stock" fill="#3B82F6" name="Stock" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Pie Chart */}
        <div style={{
          backgroundColor: '#F9FAFB',
          padding: '2rem',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '1rem' }}>Order Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}> {/* mt-12 text-center */}
        <button
          onClick={() => showNotification('Dashboard data refreshed!', 'info')}
          style={{
            backgroundColor: '#374151', // bg-gray-700
            color: 'white',
            padding: '0.75rem 2rem', // py-3 px-8
            borderRadius: '0.5rem',
            transition: 'background-color 0.2s ease-in-out',
            fontSize: '1.25rem', // text-xl
            fontWeight: '600', // font-semibold
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow-md
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1F2937'} // hover:bg-gray-800
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#374151'}
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
};

// Product Form Component
const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || '');
  const [stock, setStock] = useState(product?.stock || '');
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    setName(product?.name || '');
    setPrice(product?.price || '');
    setStock(product?.stock || '');
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !stock) {
      showNotification('Please fill in all fields.', 'error');
      return;
    }
    onSubmit({
      id: product?.id || generateId(),
      name,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
    });
    setName('');
    setPrice('');
    setStock('');
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem 1rem', // px-4 py-2
    border: '1px solid #D1D5DB', // border border-gray-300
    borderRadius: '0.5rem', // rounded-lg
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    outline: 'none',
  };

  const inputFocusStyle = {
    borderColor: '#3B82F6', // focus:border-blue-500
    boxShadow: '0 0 0 1px #3B82F6, 0 0 0 3px rgba(59, 130, 246, 0.5)', // focus:ring-blue-500
  };

  const buttonBaseStyle = {
    flex: 1,
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    color: 'white',
    fontWeight: '600',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'background-color 0.2s ease-in-out',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      marginBottom: '2rem',
    }}>
      <h2 style={{
        fontSize: '1.875rem', // text-3xl
        fontWeight: 'bold',
        color: '#1F2937', // text-gray-800
        marginBottom: '1.5rem',
      }}>{product ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)', // grid-cols-1
        gap: '1.5rem', // gap-6
        // Media queries for md:grid-cols-2 lg:grid-cols-4
        '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
        '@media (min-width: 1024px)': { gridTemplateColumns: 'repeat(4, 1fr)' },
      }}>
        <div>
          <label htmlFor="product-name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Product Name</label>
          <input
            type="text"
            id="product-name"
            data-testid="product-name-input"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="product-price" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Price ($)</label>
          <input
            type="number"
            id="product-price"
            data-testid="product-price-input"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            required
          />
        </div>
        <div>
          <label htmlFor="product-stock" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Stock</label>
          <input
            type="number"
            id="product-stock"
            data-testid="product-stock-input"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem' }}> {/* flex items-end space-x-3 */}
          <button
            type="submit"
            data-testid={product ? "update-product-button" : "add-product-button"}
            style={{
              ...buttonBaseStyle,
              backgroundColor: product ? '#2563EB' : '#16A34A', // bg-blue-600 or bg-green-600
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = product ? '#1D4ED8' : '#15803D'} // hover:bg-blue-700 or hover:bg-green-700
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = product ? '#2563EB' : '#16A34A'}
          >
            {product ? <><Edit size={18} style={{ display: 'inline', marginRight: '0.5rem' }} /> Update Product</> : <><Plus size={18} style={{ display: 'inline', marginRight: '0.5rem' }} /> Add Product</>}
          </button>
          {product && (
            <button
              type="button"
              data-testid="cancel-edit-button"
              onClick={onCancel}
              style={{
                ...buttonBaseStyle,
                backgroundColor: '#D1D5DB', // bg-gray-300
                color: '#1F2937', // text-gray-800
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#9CA3AF'} // hover:bg-gray-400
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#D1D5DB'}
            >
              <X size={18} style={{ display: 'inline', marginRight: '0.5rem' }} /> Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// Product List Component
const ProductList = ({ products, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const tableHeaderStyle = {
    backgroundColor: '#2563EB', // bg-blue-600
    color: 'white',
    padding: '0.75rem 1.5rem', // px-6 py-3
    textAlign: 'left',
    fontSize: '0.875rem', // text-sm
    fontWeight: '600', // font-semibold
    textTransform: 'uppercase', // uppercase
    letterSpacing: '0.05em', // tracking-wider
  };

  const tableCellStyle = {
    padding: '1rem 1.5rem', // px-6 py-4
    whiteSpace: 'nowrap',
    fontSize: '0.875rem', // text-sm
    color: '#374151', // text-gray-700
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }}>
      <h2 style={{
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '1.5rem',
      }}>Product List</h2>
      <div style={{
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column', // flex-col
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem', // space-y-4
        '@media (min-width: 768px)': { // md:flex-row md:space-y-0 md:space-x-4
          flexDirection: 'row',
          gap: '1rem',
        }
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '33.333333%' }}> {/* w-full md:w-1/3 */}
          <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            type="text"
            data-testid="product-search-input"
            placeholder="Search products..."
            style={{
              width: '100%',
              paddingLeft: '2.5rem', // pl-10
              paddingRight: '1rem', // pr-4
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              border: '1px solid #D1D5DB',
              borderRadius: '0.5rem',
              transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3B82F6';
              e.target.style.boxShadow = '0 0 0 1px #3B82F6, 0 0 0 3px rgba(59, 130, 246, 0.5)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#D1D5DB';
              e.target.style.boxShadow = 'none';
            }}
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>
      {products.length === 0 ? (
        <p style={{ color: '#4B5563', textAlign: 'center', padding: '2rem 0' }}>No products available. Add some above!</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: '100%', borderCollapse: 'collapse', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <thead style={{ backgroundColor: '#2563EB', color: 'white' }}>
              <tr>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Price</th>
                <th style={tableHeaderStyle}>Stock</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: 'white', borderBottom: '1px solid #E5E7EB' }}> {/* divide-y divide-gray-200 */}
              {currentProducts.map((product) => (
                <tr
                  key={product.id}
                  data-testid={`product-row-${product.id}`}
                  style={{
                    borderBottom: '1px solid #E5E7EB', // Separator for rows
                    transition: 'background-color 0.15s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'} // hover:bg-gray-50
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <td style={{ ...tableCellStyle, fontWeight: '500', color: '#111827' }}>{product.id}</td>
                  <td style={tableCellStyle}>{product.name}</td>
                  <td style={tableCellStyle}>${product.price.toFixed(2)}</td>
                  <td style={tableCellStyle}>{product.stock}</td>
                  <td style={{ ...tableCellStyle, fontWeight: '500' }}>
                    <button
                      data-testid={`edit-product-button-${product.id}`}
                      onClick={() => onEdit(product)}
                      style={{
                        color: '#4F46E5', // text-indigo-600
                        marginRight: '1rem', // mr-4
                        transition: 'color 0.15s',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#3730A3'} // hover:text-indigo-800
                      onMouseOut={(e) => e.currentTarget.style.color = '#4F46E5'}
                    >
                      <Edit size={18} style={{ display: 'inline', marginRight: '0.25rem' }} /> Edit
                    </button>
                    <button
                      data-testid={`delete-product-button-${product.id}`}
                      onClick={() => onDelete(product.id)}
                      style={{
                        color: '#DC2626', // text-red-600
                        transition: 'color 0.15s',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#B91C1C'} // hover:text-red-800
                      onMouseOut={(e) => e.currentTarget.style.color = '#DC2626'}
                    >
                      <Trash2 size={18} style={{ display: 'inline', marginRight: '0.25rem' }} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length > itemsPerPage && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1.5rem', // mt-6
              gap: '0.5rem', // space-x-2
            }}>
              <button
                data-testid="pagination-prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: '0.5rem',
                  borderRadius: '9999px', // rounded-full
                  backgroundColor: '#E5E7EB', // bg-gray-200
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                  border: 'none',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => { if (currentPage !== 1) e.currentTarget.style.backgroundColor = '#D1D5DB'; }} // hover:bg-gray-300
                onMouseOut={(e) => { if (currentPage !== 1) e.currentTarget.style.backgroundColor = '#E5E7EB'; }}
              >
                <ChevronLeft size={20} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  data-testid={`pagination-page-${page}`}
                  onClick={() => handlePageChange(page)}
                  style={{
                    padding: '0.5rem 1rem', // px-4 py-2
                    borderRadius: '0.5rem', // rounded-lg
                    fontWeight: '600',
                    backgroundColor: currentPage === page ? '#2563EB' : '#E5E7EB', // bg-blue-600 or bg-gray-200
                    color: currentPage === page ? 'white' : '#374151', // text-white or text-gray-700
                    transition: 'background-color 0.15s',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => { if (currentPage !== page) e.currentTarget.style.backgroundColor = '#D1D5DB'; }}
                  onMouseOut={(e) => { if (currentPage !== page) e.currentTarget.style.backgroundColor = '#E5E7EB'; }}
                >
                  {page}
                </button>
              ))}
              <button
                data-testid="pagination-next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: '0.5rem',
                  borderRadius: '9999px', // rounded-full
                  backgroundColor: '#E5E7EB', // bg-gray-200
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  border: 'none',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => { if (currentPage !== totalPages) e.currentTarget.style.backgroundColor = '#D1D5DB'; }}
                onMouseOut={(e) => { if (currentPage !== totalPages) e.currentTarget.style.backgroundColor = '#E5E7EB'; }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Product Management Page
const ProductManagementPage = ({ products, setProducts }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState(null);
  const { showNotification } = useContext(NotificationContext);

  const handleAddOrUpdateProduct = (productData) => {
    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === productData.id ? productData : p
      ));
      setEditingProduct(null);
      showNotification('Product updated successfully!', 'success');
    } else {
      setProducts([...products, productData]);
      showNotification('Product added successfully!', 'success');
    }
  };

  const handleDeleteProduct = (id) => {
    setProductToDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteProduct = () => {
    setProducts(products.filter(product => product.id !== productToDeleteId));
    setShowDeleteConfirm(false);
    setProductToDeleteId(null);
    showNotification('Product deleted successfully!', 'success');
  };

  const cancelDeleteProduct = () => {
    setShowDeleteConfirm(false);
    setProductToDeleteId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}> {/* space-y-8 */}
      <h1 style={{
        fontSize: '3rem',
        fontWeight: '800',
        color: '#111827',
        marginBottom: '2.5rem',
        textAlign: 'center',
      }}>Product Management</h1>
      <ProductForm product={editingProduct} onSubmit={handleAddOrUpdateProduct} onCancel={() => setEditingProduct(null)} />
      <ProductList products={products} onEdit={setEditingProduct} onDelete={handleDeleteProduct} />
      <ConfirmModal
        show={showDeleteConfirm}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={confirmDeleteProduct}
        onCancel={cancelDeleteProduct}
      />
    </div>
  );
};

// Order Form Component
const OrderForm = ({ products, onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('Pending');
  const { showNotification } = useContext(NotificationContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !selectedProductId || !quantity) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }
    const selectedProduct = products.find(p => p.id === selectedProductId);
    if (!selectedProduct) {
      showNotification('Selected product not found!', 'error');
      return;
    }
    onSubmit({
      id: generateId(),
      customerName,
      productId: selectedProductId,
      productName: selectedProduct.name,
      quantity: parseInt(quantity, 10),
      status,
    });
    setCustomerName('');
    setSelectedProductId('');
    setQuantity('');
    setStatus('Pending');
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem 1rem', // px-4 py-2
    border: '1px solid #D1D5DB', // border border-gray-300
    borderRadius: '0.5rem', // rounded-lg
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    outline: 'none',
  };

  const inputFocusStyle = {
    borderColor: '#3B82F6', // focus:border-blue-500
    boxShadow: '0 0 0 1px #3B82F6, 0 0 0 3px rgba(59, 130, 246, 0.5)', // focus:ring-blue-500
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      marginBottom: '2rem',
    }}>
      <h2 style={{
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '1.5rem',
      }}>Add New Order</h2>
      <form onSubmit={handleSubmit} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)', // grid-cols-1
        gap: '1.5rem', // gap-6
        // Media queries for md:grid-cols-2 lg:grid-cols-4
        '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
        '@media (min-width: 1024px)': { gridTemplateColumns: 'repeat(4, 1fr)' },
      }}>
        <div>
          <label htmlFor="customer-name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Customer Name</label>
          <input
            type="text"
            id="customer-name"
            data-testid="customer-name-input"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="product-select" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Product</label>
          <select
            id="product-select"
            data-testid="product-select"
            style={{
              ...inputStyle,
              backgroundColor: 'white', // bg-white for select
            }}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            required
          >
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>{product.name} (${product.price.toFixed(2)})</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantity" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Quantity</label>
          <input
            type="number"
            id="quantity"
            data-testid="quantity-input"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </div>
        <div>
          <label htmlFor="status" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Status</label>
          <select
            id="status"
            data-testid="status-select"
            style={{
              ...inputStyle,
              backgroundColor: 'white',
            }}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div style={{
          gridColumn: 'span 1 / span 1', // Default
          '@media (min-width: 768px)': { gridColumn: 'span 2 / span 2' }, // md:col-span-2
          '@media (min-width: 1024px)': { gridColumn: 'span 1 / span 1' }, // lg:col-span-1
          display: 'flex',
          alignItems: 'flex-end',
        }}>
          <button
            type="submit"
            data-testid="add-order-button"
            style={{
              width: '100%',
              backgroundColor: '#9333EA', // bg-purple-600
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              transition: 'background-color 0.15s ease-in-out',
              fontWeight: '600',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#7E22CE'} // hover:bg-purple-700
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#9333EA'}
          >
            <Plus size={18} style={{ display: 'inline', marginRight: '0.5rem' }} /> Add Order
          </button>
        </div>
      </form>
    </div>
  );
};

// Order List Component
const OrderList = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const tableHeaderStyle = {
    backgroundColor: '#9333EA', // bg-purple-600
    color: 'white',
    padding: '0.75rem 1.5rem',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const tableCellStyle = {
    padding: '1rem 1.5rem',
    whiteSpace: 'nowrap',
    fontSize: '0.875rem',
    color: '#374151',
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }}>
      <h2 style={{
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '1.5rem',
      }}>Order List</h2>
      <div style={{
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        '@media (min-width: 768px)': {
          flexDirection: 'row',
          gap: '1rem',
        }
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '33.333333%' }}>
          <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            type="text"
            data-testid="order-search-input"
            placeholder="Search orders..."
            style={{
              width: '100%',
              paddingLeft: '2.5rem',
              paddingRight: '1rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              border: '1px solid #D1D5DB',
              borderRadius: '0.5rem',
              transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3B82F6';
              e.target.style.boxShadow = '0 0 0 1px #3B82F6, 0 0 0 3px rgba(59, 130, 246, 0.5)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#D1D5DB';
              e.target.style.boxShadow = 'none';
            }}
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>
      {orders.length === 0 ? (
        <p style={{ color: '#4B5563', textAlign: 'center', padding: '2rem 0' }}>No orders available. Add some above!</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: '100%', borderCollapse: 'collapse', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <thead style={{ backgroundColor: '#9333EA', color: 'white' }}>
              <tr>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Customer</th>
                <th style={tableHeaderStyle}>Product</th>
                <th style={tableHeaderStyle}>Quantity</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: 'white', borderBottom: '1px solid #E5E7EB' }}>
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  data-testid={`order-row-${order.id}`}
                  style={{
                    borderBottom: '1px solid #E5E7EB',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <td style={{ ...tableCellStyle, fontWeight: '500', color: '#111827' }}>{order.id}</td>
                  <td style={tableCellStyle}>{order.customerName}</td>
                  <td style={tableCellStyle}>{order.productName}</td>
                  <td style={tableCellStyle}>{order.quantity}</td>
                  <td style={{ ...tableCellStyle }}>
                    <span style={{
                      padding: '0.25rem 0.75rem', // px-3 py-1
                      display: 'inline-flex',
                      fontSize: '0.75rem', // text-xs
                      lineHeight: '1.25rem', // leading-5
                      fontWeight: '600',
                      borderRadius: '9999px', // rounded-full
                      backgroundColor: order.status === 'Completed' ? '#D1FAE5' : // bg-green-100
                                      order.status === 'Pending' ? '#FEF3C7' : // bg-yellow-100
                                      order.status === 'Processing' ? '#DBEAFE' : // bg-blue-100
                                      '#FEE2E2', // bg-red-100
                      color: order.status === 'Completed' ? '#065F46' : // text-green-800
                             order.status === 'Pending' ? '#92400E' : // text-yellow-800
                             order.status === 'Processing' ? '#1E40AF' : // text-blue-800
                             '#991B1B', // text-red-800
                    }}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length > itemsPerPage && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1.5rem',
              gap: '0.5rem',
            }}>
              <button
                data-testid="pagination-prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  backgroundColor: '#E5E7EB',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                  border: 'none',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => { if (currentPage !== 1) e.currentTarget.style.backgroundColor = '#D1D5DB'; }}
                onMouseOut={(e) => { if (currentPage !== 1) e.currentTarget.style.backgroundColor = '#E5E7EB'; }}
              >
                <ChevronLeft size={20} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  data-testid={`pagination-page-${page}`}
                  onClick={() => handlePageChange(page)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    backgroundColor: currentPage === page ? '#2563EB' : '#E5E7EB',
                    color: currentPage === page ? 'white' : '#374151',
                    transition: 'background-color 0.15s',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => { if (currentPage !== page) e.currentTarget.style.backgroundColor = '#D1D5DB'; }}
                  onMouseOut={(e) => { if (currentPage !== page) e.currentTarget.style.backgroundColor = '#E5E7EB'; }}
                >
                  {page}
                </button>
              ))}
              <button
                data-testid="pagination-next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  backgroundColor: '#E5E7EB',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  border: 'none',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => { if (currentPage !== totalPages) e.currentTarget.style.backgroundColor = '#D1D5DB'; }}
                onMouseOut={(e) => { if (currentPage !== totalPages) e.currentTarget.style.backgroundColor = '#E5E7EB'; }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Order Management Page
const OrderManagementPage = ({ products, orders, setOrders }) => {
  const { showNotification } = useContext(NotificationContext);

  const handleAddOrder = (orderData) => {
    setOrders([...orders, orderData]);
    showNotification('Order added successfully!', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: '800',
        color: '#111827',
        marginBottom: '2.5rem',
        textAlign: 'center',
      }}>Order Management</h1>
      <OrderForm products={products} onSubmit={handleAddOrder} />
      <OrderList orders={orders} />
    </div>
  );
};

// Customer Form Component
const CustomerForm = ({ customer, onSubmit, onCancel }) => {
  const [name, setName] = useState(customer?.name || '');
  const [email, setEmail] = useState(customer?.email || '');
  const [phone, setPhone] = useState(customer?.phone || '');
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    setName(customer?.name || '');
    setEmail(customer?.email || '');
    setPhone(customer?.phone || '');
  }, [customer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      showNotification('Please fill in all fields.', 'error');
      return;
    }
    onSubmit({
      id: customer?.id || generateId(),
      name,
      email,
      phone,
    });
    setName('');
    setEmail('');
    setPhone('');
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem 1rem',
    border: '1px solid #D1D5DB',
    borderRadius: '0.5rem',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    outline: 'none',
  };

  const inputFocusStyle = {
    borderColor: '#3B82F6',
    boxShadow: '0 0 0 1px #3B82F6, 0 0 0 3px rgba(59, 130, 246, 0.5)',
  };

  const buttonBaseStyle = {
    flex: 1,
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    color: 'white',
    fontWeight: '600',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'background-color 0.2s ease-in-out',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      marginBottom: '2rem',
    }}>
      <h2 style={{
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '1.5rem',
      }}>{customer ? 'Edit Customer' : 'Add New Customer'}</h2>
      <form onSubmit={handleSubmit} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '1.5rem',
        '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
        '@media (min-width: 1024px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
      }}>
        <div>
          <label htmlFor="customer-name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Customer Name</label>
          <input
            type="text"
            id="customer-name"
            data-testid="customer-name-input"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="customer-email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Email</label>
          <input
            type="email"
            id="customer-email"
            data-testid="customer-email-input"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="customer-phone" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Phone</label>
          <input
            type="tel"
            id="customer-phone"
            data-testid="customer-phone-input"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div style={{
          gridColumn: 'span 1 / span 1', // Default
          '@media (min-width: 768px)': { gridColumn: 'span 2 / span 2' },
          '@media (min-width: 1024px)': { gridColumn: 'span 3 / span 3' }, // col-span-full
          display: 'flex',
          alignItems: 'flex-end',
          gap: '0.75rem',
        }}>
          <button
            type="submit"
            data-testid={customer ? "update-customer-button" : "add-customer-button"}
            style={{
              ...buttonBaseStyle,
              backgroundColor: customer ? '#2563EB' : '#16A34A',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = customer ? '#1D4ED8' : '#15803D'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = customer ? '#2563EB' : '#16A34A'}
          >
            {customer ? <><Edit size={18} style={{ display: 'inline', marginRight: '0.5rem' }} /> Update Customer</> : <><Plus size={18} style={{ display: 'inline', marginRight: '0.5rem' }} /> Add Customer</>}
          </button>
          {customer && (
            <button
              type="button"
              data-testid="cancel-edit-customer-button"
              onClick={onCancel}
              style={{
                ...buttonBaseStyle,
                backgroundColor: '#D1D5DB',
                color: '#1F2937',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#9CA3AF'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#D1D5DB'}
            >
              <X size={18} style={{ display: 'inline', marginRight: '0.5rem' }} /> Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// Customer List Component
const CustomerList = ({ customers, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const tableHeaderStyle = {
    backgroundColor: '#2563EB',
    color: 'white',
    padding: '0.75rem 1.5rem',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const tableCellStyle = {
    padding: '1rem 1.5rem',
    whiteSpace: 'nowrap',
    fontSize: '0.875rem',
    color: '#374151',
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }}>
      <h2 style={{
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '1.5rem',
      }}>Customer List</h2>
      <div style={{
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        '@media (min-width: 768px)': {
          flexDirection: 'row',
          gap: '1rem',
        }
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '33.333333%' }}>
          <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            type="text"
            data-testid="customer-search-input"
            placeholder="Search customers..."
            style={{
              width: '100%',
              paddingLeft: '2.5rem',
              paddingRight: '1rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              border: '1px solid #D1D5DB',
              borderRadius: '0.5rem',
              transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3B82F6';
              e.target.style.boxShadow = '0 0 0 1px #3B82F6, 0 0 0 3px rgba(59, 130, 246, 0.5)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#D1D5DB';
              e.target.style.boxShadow = 'none';
            }}
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>
      {customers.length === 0 ? (
        <p style={{ color: '#4B5563', textAlign: 'center', padding: '2rem 0' }}>No customers available. Add some above!</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: '100%', borderCollapse: 'collapse', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <thead style={{ backgroundColor: '#2563EB', color: 'white' }}>
              <tr>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Phone</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: 'white', borderBottom: '1px solid #E5E7EB' }}>
              {currentCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  data-testid={`customer-row-${customer.id}`}
                  style={{
                    borderBottom: '1px solid #E5E7EB',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <td style={{ ...tableCellStyle, fontWeight: '500', color: '#111827' }}>{customer.id}</td>
                  <td style={tableCellStyle}>{customer.name}</td>
                  <td style={tableCellStyle}>{customer.email}</td>
                  <td style={tableCellStyle}>{customer.phone}</td>
                  <td style={{ ...tableCellStyle, fontWeight: '500' }}>
                    <button
                      data-testid={`edit-customer-button-${customer.id}`}
                      onClick={() => onEdit(customer)}
                      style={{
                        color: '#4F46E5',
                        marginRight: '1rem',
                        transition: 'color 0.15s',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#3730A3'}
                      onMouseOut={(e) => e.currentTarget.style.color = '#4F46E5'}
                    >
                      <Edit size={18} style={{ display: 'inline', marginRight: '0.25rem' }} /> Edit
                    </button>
                    <button
                      data-testid={`delete-customer-button-${customer.id}`}
                      onClick={() => onDelete(customer.id)}
                      style={{
                        color: '#DC2626',
                        transition: 'color 0.15s',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#B91C1C'}
                      onMouseOut={(e) => e.currentTarget.style.color = '#DC2626'}
                    >
                      <Trash2 size={18} style={{ display: 'inline', marginRight: '0.25rem' }} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCustomers.length > itemsPerPage && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1.5rem',
              gap: '0.5rem',
            }}>
              <button
                data-testid="pagination-prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  backgroundColor: '#E5E7EB',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                  border: 'none',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => { if (currentPage !== 1) e.currentTarget.style.backgroundColor = '#D1D5DB'; }}
                onMouseOut={(e) => { if (currentPage !== 1) e.currentTarget.style.backgroundColor = '#E5E7EB'; }}
              >
                <ChevronLeft size={20} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  data-testid={`pagination-page-${page}`}
                  onClick={() => handlePageChange(page)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    backgroundColor: currentPage === page ? '#2563EB' : '#E5E7EB',
                    color: currentPage === page ? 'white' : '#374151',
                    transition: 'background-color 0.15s',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => { if (currentPage !== page) e.currentTarget.style.backgroundColor = '#D1D5DB'; }}
                  onMouseOut={(e) => { if (currentPage !== page) e.currentTarget.style.backgroundColor = '#E5E7EB'; }}
                >
                  {page}
                </button>
              ))}
              <button
                data-testid="pagination-next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  backgroundColor: '#E5E7EB',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  border: 'none',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => { if (currentPage !== totalPages) e.currentTarget.style.backgroundColor = '#D1D5DB'; }}
                onMouseOut={(e) => { if (currentPage !== totalPages) e.currentTarget.style.backgroundColor = '#E5E7EB'; }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Customer Management Page
const CustomerManagementPage = ({ customers, setCustomers }) => {
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [customerToDeleteId, setCustomerToDeleteId] = useState(null);
  const { showNotification } = useContext(NotificationContext);

  const handleAddOrUpdateCustomer = (customerData) => {
    if (editingCustomer) {
      setCustomers(customers.map(c =>
        c.id === customerData.id ? customerData : c
      ));
      setEditingCustomer(null);
      showNotification('Customer updated successfully!', 'success');
    } else {
      setCustomers([...customers, customerData]);
      showNotification('Customer added successfully!', 'success');
    }
  };

  const handleDeleteCustomer = (id) => {
    setCustomerToDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteCustomer = () => {
    setCustomers(customers.filter(customer => customer.id !== customerToDeleteId));
    setShowDeleteConfirm(false);
    setCustomerToDeleteId(null);
    showNotification('Customer deleted successfully!', 'success');
  };

  const cancelDeleteCustomer = () => {
    setShowDeleteConfirm(false);
    setCustomerToDeleteId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: '800',
        color: '#111827',
        marginBottom: '2.5rem',
        textAlign: 'center',
      }}>Customer Management</h1>
      <CustomerForm customer={editingCustomer} onSubmit={handleAddOrUpdateCustomer} onCancel={() => setEditingCustomer(null)} />
      <CustomerList customers={customers} onEdit={setEditingCustomer} onDelete={handleDeleteCustomer} />
      <ConfirmModal
        show={showDeleteConfirm}
        title="Delete Customer"
        message="Are you sure you want to delete this customer? This action cannot be undone."
        onConfirm={confirmDeleteCustomer}
        onCancel={cancelDeleteCustomer}
      />
    </div>
  );
};

// User Management Page (Display Only)
const UserManagementPage = () => {
  const users = [
    { id: 'user-001', name: 'Admin User', role: 'Administrator', email: 'admin@erp.com' },
    { id: 'user-002', name: 'Sales Manager', role: 'Sales', email: 'sales.m@erp.com' },
    { id: 'user-003', name: 'Warehouse Staff', role: 'Warehouse', email: 'warehouse.s@erp.com' },
    { id: 'user-004', name: 'Finance Controller', role: 'Finance', email: 'finance.c@erp.com' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const tableHeaderStyle = {
    backgroundColor: '#2563EB',
    color: 'white',
    padding: '0.75rem 1.5rem',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const tableCellStyle = {
    padding: '1rem 1.5rem',
    whiteSpace: 'nowrap',
    fontSize: '0.875rem',
    color: '#374151',
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: '800',
        color: '#111827',
        marginBottom: '2.5rem',
        textAlign: 'center',
      }}>User Management</h1>
      <div style={{
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        '@media (min-width: 768px)': {
          flexDirection: 'row',
          gap: '1rem',
        }
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '33.333333%' }}>
          <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            type="text"
            data-testid="user-search-input"
            placeholder="Search users..."
            style={{
              width: '100%',
              paddingLeft: '2.5rem',
              paddingRight: '1rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              border: '1px solid #D1D5DB',
              borderRadius: '0.5rem',
              transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3B82F6';
              e.target.style.boxShadow = '0 0 0 1px #3B82F6, 0 0 0 3px rgba(59, 130, 246, 0.5)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#D1D5DB';
              e.target.style.boxShadow = 'none';
            }}
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>
      {users.length === 0 ? (
        <p style={{ color: '#4B5563', textAlign: 'center', padding: '2rem 0' }}>No users available.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: '100%', borderCollapse: 'collapse', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <thead style={{ backgroundColor: '#2563EB', color: 'white' }}>
              <tr>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Role</th>
                <th style={tableHeaderStyle}>Email</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: 'white', borderBottom: '1px solid #E5E7EB' }}>
              {currentUsers.map((user) => (
                <tr
                  key={user.id}
                  data-testid={`user-row-${user.id}`}
                  style={{
                    borderBottom: '1px solid #E5E7EB',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <td style={{ ...tableCellStyle, fontWeight: '500', color: '#111827' }}>{user.id}</td>
                  <td style={tableCellStyle}>{user.name}</td>
                  <td style={tableCellStyle}>{user.role}</td>
                  <td style={tableCellStyle}>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length > itemsPerPage && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1.5rem',
              gap: '0.5rem',
            }}>
              <button
                data-testid="pagination-prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  backgroundColor: '#E5E7EB',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                  border: 'none',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => { if (currentPage !== 1) e.currentTarget.style.backgroundColor = '#D1D5DB'; }}
                onMouseOut={(e) => { if (currentPage !== 1) e.currentTarget.style.backgroundColor = '#E5E7EB'; }}
              >
                <ChevronLeft size={20} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  data-testid={`pagination-page-${page}`}
                  onClick={() => handlePageChange(page)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    backgroundColor: currentPage === page ? '#2563EB' : '#E5E7EB',
                    color: currentPage === page ? 'white' : '#374151',
                    transition: 'background-color 0.15s',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => { if (currentPage !== page) e.currentTarget.style.backgroundColor = '#D1D5DB'; }}
                  onMouseOut={(e) => { if (currentPage !== page) e.currentTarget.style.backgroundColor = '#E5E7EB'; }}
                >
                  {page}
                </button>
              ))}
              <button
                data-testid="pagination-next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  backgroundColor: '#E5E7EB',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  border: 'none',
                  transition: 'background-color 0.15s',
                }}
                onMouseOver={(e) => { if (currentPage !== totalPages) e.currentTarget.style.backgroundColor = '#D1D5DB'; }}
                onMouseOut={(e) => { if (currentPage !== totalPages) e.currentTarget.style.backgroundColor = '#E5E7EB'; }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard'); // 'login', 'dashboard', 'products', 'orders', 'customers', 'users'
  const [history, setHistory] = useState(['dashboard']); // Initialize history with dashboard

  // Products data state (global for orders to access)
  const [productsData, setProductsData] = useState(() => {
    const savedProducts = localStorage.getItem('erp-products');
    return savedProducts ? JSON.parse(savedProducts) : [
      { id: 'prod-001', name: 'Laptop Pro', price: 1200, stock: 50 },
      { id: 'prod-002', name: 'Wireless Mouse', price: 25, stock: 200 },
      { id: 'prod-003', name: 'Mechanical Keyboard', price: 90, stock: 75 },
    ];
  });

  // Orders data state
  const [ordersData, setOrdersData] = useState(() => {
    const savedOrders = localStorage.getItem('erp-orders');
    return savedOrders ? JSON.parse(savedOrders) : [
      { id: 'order-001', customerName: 'Alice Smith', productId: 'prod-001', productName: 'Laptop Pro', quantity: 1, status: 'Pending' },
      { id: 'order-002', customerName: 'Bob Johnson', productId: 'prod-002', productName: 'Wireless Mouse', quantity: 2, status: 'Completed' },
      { id: 'order-003', customerName: 'Charlie Brown', productId: 'prod-003', productName: 'Mechanical Keyboard', quantity: 1, status: 'Processing' },
    ];
  });

  // Customers data state
  const [customersData, setCustomersData] = useState(() => {
    const savedCustomers = localStorage.getItem('erp-customers');
    return savedCustomers ? JSON.parse(savedCustomers) : [
      { id: 'cust-001', name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
      { id: 'cust-002', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321' },
      { id: 'cust-003', name: 'Peter Jones', email: 'peter.j@example.com', phone: '555-123-4567' },
    ];
  });


  // Effects to update localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('erp-products', JSON.stringify(productsData));
  }, [productsData]);

  useEffect(() => {
    localStorage.setItem('erp-orders', JSON.stringify(ordersData));
  }, [ordersData]);

  useEffect(() => {
    localStorage.setItem('erp-customers', JSON.stringify(customersData));
  }, [customersData]);


  const handleLogin = (success) => {
    if (success) {
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
      setHistory(['dashboard']); // Reset history on login
    }
  };

  const handleNavigate = (page) => {
    setHistory(prevHistory => {
      // Prevent adding duplicate consecutive pages to history
      if (prevHistory[prevHistory.length - 1] !== page) {
        return [...prevHistory, page];
      }
      return prevHistory;
    });
    setCurrentPage(page);
  };

  const goBack = () => {
    setHistory(prevHistory => {
      if (prevHistory.length > 1) {
        const newHistory = prevHistory.slice(0, prevHistory.length - 1);
        setCurrentPage(newHistory[newHistory.length - 1]);
        return newHistory;
      }
      return prevHistory;
    });
  };

  const renderPageContent = () => {
    if (!isLoggedIn) {
      return <Login onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard
                  products={productsData}
                  orders={ordersData}
                  customers={customersData}
                  onNavigate={handleNavigate}
                />;
      case 'products':
        return <ProductManagementPage products={productsData} setProducts={setProductsData} />;
      case 'orders':
        return <OrderManagementPage products={productsData} orders={ordersData} setOrders={setOrdersData} />;
      case 'customers':
        return <CustomerManagementPage customers={customersData} setCustomers={setCustomersData} />;
      case 'users':
        return <UserManagementPage />;
      default:
        return <Dashboard
                  products={productsData}
                  orders={ordersData}
                  customers={customersData}
                  onNavigate={handleNavigate}
                />;
    }
  };

  return (
    <NotificationProvider>
      <div style={{ fontFamily: 'sans-serif', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', color: '#111827' }}>
        {isLoggedIn ? (
          <Layout
            onNavigate={handleNavigate}
            currentPage={currentPage}
            goBack={goBack}
            canGoBack={history.length > 1} // Pass canGoBack prop
          >
            {renderPageContent()}
          </Layout>
        ) : (
          renderPageContent()
        )}
      </div>
    </NotificationProvider>
  );
};

export default App;
