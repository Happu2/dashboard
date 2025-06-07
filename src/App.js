import React, { useState, useEffect, createContext, useContext } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { User, Lock, Eye, EyeOff, Plus, Edit2, Trash2, Sun, Moon, Package, BarChart3, TrendingUp, DollarSign, Activity, Grid, List, Filter, Globe } from 'lucide-react';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import './index.css';

// Initialize i18n with expanded translations
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // App Title
          appTitle: "Slooze",
          appSubtitle: "Commodities Management",
          
          // Navigation
          products: "Products",
          dashboard: "Dashboard",
          logout: "Logout",
          
          // Login
          emailAddress: "Email Address",
          password: "Password",
          signIn: "Sign In",
          enterEmail: "Enter your email",
          enterPassword: "Enter your password",
          invalidCredentials: "Invalid credentials. Try manager@slooze.com / manager123 or keeper@slooze.com / keeper123",
          demoCredentials: "Demo Credentials:",
          manager: "Manager",
          storeKeeper: "Store Keeper",
          
          // Dashboard
          welcomeBack: "Welcome back, Manager!",
          totalRevenue: "Total Revenue",
          activeProducts: "Active Products",
          totalOrders: "Total Orders",
          growthRate: "Growth Rate",
          salesProfitTrends: "Sales & Profit Trends",
          categoryDistribution: "Category Distribution",
          
          // Products
          addProduct: "Add Product",
          editProduct: "Edit Product",
          addNewProduct: "Add New Product",
          name: "Name",
          category: "Category",
          price: "Price",
          quantity: "Quantity",
          unit: "Unit",
          status: "Status",
          active: "Active",
          inactive: "Inactive",
          edit: "Edit",
          delete: "Delete",
          cancel: "Cancel",
          update: "Update",
          add: "Add",
          selectCategory: "Select Category",
          
          // Categories
          preciousMetals: "Precious Metals",
          baseMetals: "Base Metals",
          energy: "Energy",
          agriculture: "Agriculture",
          allCategories: "All Categories",
          
          // Product Names
          gold: "Gold",
          silver: "Silver",
          copper: "Copper",
          crudeOil: "Crude Oil",
          naturalGas: "Natural Gas",
          wheat: "Wheat",
          
          // View Controls
          galleryView: "Gallery",
          listView: "List",
          filterByCategory: "Filter by Category",
          
          // Access Control
          accessDenied: "Access Denied",
          noPermission: "You don't have permission to access this section.",
          
          // Table Headers
          productName: "Product Name",
          actions: "Actions"
        }
      },
      fr: {
        translation: {
          // App Title
          appTitle: "Slooze",
          appSubtitle: "Gestion des Matières Premières",
          
          // Navigation
          products: "Produits",
          dashboard: "Tableau de Bord",
          logout: "Déconnexion",
          
          // Login
          emailAddress: "Adresse E-mail",
          password: "Mot de Passe",
          signIn: "Se Connecter",
          enterEmail: "Entrez votre e-mail",
          enterPassword: "Entrez votre mot de passe",
          invalidCredentials: "Identifiants invalides. Essayez manager@slooze.com / manager123 ou keeper@slooze.com / keeper123",
          demoCredentials: "Identifiants de Démonstration:",
          manager: "Gestionnaire",
          storeKeeper: "Magasinier",
          
          // Dashboard
          welcomeBack: "Bon retour, Gestionnaire!",
          totalRevenue: "Chiffre d'Affaires Total",
          activeProducts: "Produits Actifs",
          totalOrders: "Commandes Totales",
          growthRate: "Taux de Croissance",
          salesProfitTrends: "Tendances Ventes & Profits",
          categoryDistribution: "Distribution par Catégorie",
          
          // Products
          addProduct: "Ajouter Produit",
          editProduct: "Modifier Produit",
          addNewProduct: "Ajouter Nouveau Produit",
          name: "Nom",
          category: "Catégorie",
          price: "Prix",
          quantity: "Quantité",
          unit: "Unité",
          status: "Statut",
          active: "Actif",
          inactive: "Inactif",
          edit: "Modifier",
          delete: "Supprimer",
          cancel: "Annuler",
          update: "Mettre à Jour",
          add: "Ajouter",
          selectCategory: "Sélectionner Catégorie",
          
          // Categories
          preciousMetals: "Métaux Précieux",
          baseMetals: "Métaux de Base",
          energy: "Énergie",
          agriculture: "Agriculture",
          allCategories: "Toutes Catégories",
          
          // Product Names
          gold: "Or",
          silver: "Argent",
          copper: "Cuivre",
          crudeOil: "Pétrole Brut",
          naturalGas: "Gaz Naturel",
          wheat: "Blé",
          
          // View Controls
          galleryView: "Galerie",
          listView: "Liste",
          filterByCategory: "Filtrer par Catégorie",
          
          // Access Control
          accessDenied: "Accès Refusé",
          noPermission: "Vous n'avez pas la permission d'accéder à cette section.",
          
          // Table Headers
          productName: "Nom du Produit",
          actions: "Actions"
        }
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

// Auth Context
const AuthContext = createContext();

// Theme Context
const ThemeContext = createContext();

// Language Context
const LanguageContext = createContext();

// Sample Data with translation keys
const sampleProducts = [
  { id: 1, nameKey: 'gold', categoryKey: 'preciousMetals', price: 1850, quantity: 120, unit: 'oz', status: 'active' },
  { id: 2, nameKey: 'silver', categoryKey: 'preciousMetals', price: 24, quantity: 2500, unit: 'oz', status: 'active' },
  { id: 3, nameKey: 'copper', categoryKey: 'baseMetals', price: 3.8, quantity: 15000, unit: 'lbs', status: 'active' },
  { id: 4, nameKey: 'crudeOil', categoryKey: 'energy', price: 78, quantity: 5000, unit: 'barrels', status: 'active' },
  { id: 5, nameKey: 'naturalGas', categoryKey: 'energy', price: 2.5, quantity: 8000, unit: 'MMBtu', status: 'active' },
  { id: 6, nameKey: 'wheat', categoryKey: 'agriculture', price: 5.2, quantity: 25000, unit: 'bushels', status: 'active' },
];

const sampleUsers = [
  { email: 'manager@slooze.com', password: 'manager123', role: 'Manager', name: 'John Manager' },
  { email: 'keeper@slooze.com', password: 'keeper123', role: 'Store Keeper', name: 'Jane Keeper' }
];

const dashboardData = {
  salesData: [
    { month: 'Jan', sales: 12000, profit: 3000 },
    { month: 'Feb', sales: 15000, profit: 4500 },
    { month: 'Mar', sales: 18000, profit: 5400 },
    { month: 'Apr', sales: 22000, profit: 6600 },
    { month: 'May', sales: 25000, profit: 7500 },
    { month: 'Jun', sales: 28000, profit: 8400 }
  ],
  categoryData: [
    { name: 'Precious Metals', value: 35, color: '#8884d8' },
    { name: 'Base Metals', value: 25, color: '#82ca9d' },
    { name: 'Energy', value: 25, color: '#ffc658' },
    { name: 'Agriculture', value: 15, color: '#ff7c7c' }
  ]
};

// Login Component
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { isDark } = useContext(ThemeContext);
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Attempting login with:', { email, password });
    
    const user = sampleUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    console.log('Found user:', user);
    
    if (user) {
      onLogin(user);
      setError('');
    } else {
      setError(t('invalidCredentials'));
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className={`max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('appTitle')}</h1>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mt-2`}>{t('appSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              {t('emailAddress')}
            </label>
            <div className="relative">
              <User className={`absolute left-3 top-3 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                placeholder={t('enterEmail')}
                required
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              {t('password')}
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-3 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                placeholder={t('enterPassword')}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-3 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            {t('signIn')}
          </button>
        </form>

        <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'} text-sm`}>
          <p className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('demoCredentials')}</p>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('manager')}: manager@slooze.com / manager123</p>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('storeKeeper')}: keeper@slooze.com / keeper123</p>
        </div>
      </div>
    </div>
  );
};

// Navigation Component
const Navigation = ({ user, onLogout, currentView, setCurrentView }) => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();
  
  const menuItems = [
    { id: 'products', label: t('products'), icon: Package, roles: ['Manager', 'Store Keeper'] },
    { id: 'dashboard', label: t('dashboard'), icon: BarChart3, roles: ['Manager'] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <nav className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('appTitle')}</h1>
          </div>
          
          <div className="flex space-x-1">
            {filteredMenuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  currentView === item.id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : isDark 
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className={`p-2 rounded-lg transition-all ${isDark ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            title={`Switch to ${language === 'en' ? 'Français' : 'English'}`}
          >
            <Globe className="w-5 h-5" />
          </button>
          
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all ${isDark ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{user.name.charAt(0)}</span>
            </div>
            <div className="text-left">
              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t(user.role === 'Manager' ? 'manager' : 'storeKeeper')}</p>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
          >
            {t('logout')}
          </button>
        </div>
      </div>
    </nav>
  );
};

// Dashboard Component (Manager Only)
const Dashboard = () => {
  const { isDark } = useContext(ThemeContext);
  const { t } = useTranslation();
  
  const stats = [
    { title: t('totalRevenue'), value: '$284,500', change: '+12.5%', icon: DollarSign, color: 'text-green-600' },
    { title: t('activeProducts'), value: '156', change: '+3.2%', icon: Package, color: 'text-blue-600' },
    { title: t('totalOrders'), value: '2,847', change: '+8.1%', icon: Activity, color: 'text-purple-600' },
    { title: t('growthRate'), value: '23.4%', change: '+2.1%', icon: TrendingUp, color: 'text-indigo-600' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('dashboard')}</h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('welcomeBack')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg hover:shadow-xl transition-all`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.title}</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>{stat.value}</p>
                <p className={`text-sm ${stat.color} mt-1`}>{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('salesProfitTrends')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="month" stroke={isDark ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
              <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('categoryDistribution')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {dashboardData.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {dashboardData.categoryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.name}</span>
                </div>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Products Component
const Products = ({ user }) => {
  const [products, setProducts] = useState(sampleProducts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { isDark } = useContext(ThemeContext);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    nameKey: '',
    categoryKey: '',
    price: '',
    quantity: '',
    unit: '',
    status: 'active'
  });

  const categories = [
    { key: 'preciousMetals', label: t('preciousMetals') },
    { key: 'baseMetals', label: t('baseMetals') },
    { key: 'energy', label: t('energy') },
    { key: 'agriculture', label: t('agriculture') }
  ];

  // Filter products by category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.categoryKey === selectedCategory);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData, price: parseFloat(formData.price), quantity: parseInt(formData.quantity) }
          : p
      ));
      setEditingProduct(null);
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      };
      setProducts([...products, newProduct]);
    }
    
    setFormData({ nameKey: '', categoryKey: '', price: '', quantity: '', unit: '', status: 'active' });
    setShowAddModal(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      nameKey: product.nameKey,
      categoryKey: product.categoryKey,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      unit: product.unit,
      status: product.status
    });
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const canModify = user.role === 'Manager' || user.role === 'Store Keeper';

  // Gallery View Component
  const GalleryView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map(product => (
        <div key={product.id} className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg hover:shadow-xl transition-all`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t(product.nameKey)}</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t(product.categoryKey)}</p>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              product.status === 'active' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            }`}>
              {t(product.status)}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('price')}:</span>
              <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>${product.price}</span>
            </div>
            <div className="flex justify-between">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('quantity')}:</span>
              <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{product.quantity} {product.unit}</span>
            </div>
          </div>

          {canModify && (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-lg transition-all ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm">{t('edit')}</span>
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">{t('delete')}</span>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // List View Component
  const ListView = () => (
    <div className={`rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                {t('productName')}
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                {t('category')}
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                {t('price')}
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                {t('quantity')}
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                {t('status')}
              </th>
              {canModify && (
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  {t('actions')}
                </th>
              )}
            </tr>
          </thead>
          <tbody className={`${isDark ? 'bg-gray-800' : 'bg-white'} divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {filteredProducts.map(product => (
              <tr key={product.id} className={`hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t(product.nameKey)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  {t(product.categoryKey)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  ${product.price}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  {product.quantity} {product.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {t(product.status)}
                  </span>
                </td>
                {canModify && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-all`}
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      {t('edit')}
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 transition-all"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      {t('delete')}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('products')}</h1>
        {canModify && (
          <button
            onClick={() => {
              setShowAddModal(true);
              setEditingProduct(null);
              setFormData({ nameKey: '', categoryKey: '', price: '', quantity: '', unit: '', status: 'active' });
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>{t('addProduct')}</span>
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* View Toggle */}
        <div className={`flex rounded-lg p-1 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'}`}>
          <button
            onClick={() => setViewMode('gallery')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              viewMode === 'gallery'
                ? 'bg-blue-500 text-white shadow-sm'
                : isDark 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span className="text-sm font-medium">{t('galleryView')}</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              viewMode === 'list'
                ? 'bg-blue-500 text-white shadow-sm'
                : isDark 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="text-sm font-medium">{t('listView')}</span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-3">
          <Filter className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-4 py-2 rounded-lg border transition-all ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="all">{t('allCategories')}</option>
            {categories.map(category => (
              <option key={category.key} value={category.key}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Display */}
      {viewMode === 'gallery' ? <GalleryView /> : <ListView />}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-md w-full p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              {editingProduct ? t('editProduct') : t('addNewProduct')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>{t('name')}</label>
                <input
                  type="text"
                  value={formData.nameKey}
                  onChange={(e) => setFormData({...formData, nameKey: e.target.value})}
                  className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  required
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>{t('category')}</label>
                <select
                  value={formData.categoryKey}
                  onChange={(e) => setFormData({...formData, categoryKey: e.target.value})}
                  className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  required
                >
                  <option value="">{t('selectCategory')}</option>
                  {categories.map(cat => (
                    <option key={cat.key} value={cat.key}>{cat.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>{t('price')} ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>{t('quantity')}</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>{t('unit')}</label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  placeholder="e.g., oz, lbs, barrels"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
                >
                  {editingProduct ? t('update') : t('add')} {t('products')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('products');
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('en');

  // Initialize theme and language
  useEffect(() => {
    setIsDark(false);
    i18n.changeLanguage('en');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fr' : 'en';
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView(userData.role === 'Manager' ? 'dashboard' : 'products');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('products');
  };

  // Role-based view access control
  const canAccessView = (view) => {
    if (!user) return false;
    
    switch (view) {
      case 'dashboard':
        return user.role === 'Manager';
      case 'products':
        return user.role === 'Manager' || user.role === 'Store Keeper';
      default:
        return false;
    }
  };

  // Redirect if user tries to access unauthorized view
  useEffect(() => {
    if (user && !canAccessView(currentView)) {
      setCurrentView(user.role === 'Manager' ? 'dashboard' : 'products');
    }
  }, [user, currentView]);

  const renderCurrentView = () => {
    if (!user) return null;
    
    switch (currentView) {
      case 'dashboard':
        return canAccessView('dashboard') ? <Dashboard /> : <AccessDenied />;
      case 'products':
        return canAccessView('products') ? <Products user={user} /> : <AccessDenied />;
      default:
        return <Products user={user} />;
    }
  };

  // Access Denied Component
  const AccessDenied = () => {
    const { t } = useTranslation();
    
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
            {t('accessDenied')}
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('noPermission')}
          </p>
        </div>
      </div>
    );
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <LanguageContext.Provider value={{ language, toggleLanguage }}>
        <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
          <div className={`min-h-screen transition-colors duration-200 ${
            isDark ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
            {!user ? (
              <Login onLogin={handleLogin} />
            ) : (
              <>
                <Navigation 
                  user={user} 
                  onLogout={handleLogout} 
                  currentView={currentView}
                  setCurrentView={setCurrentView}
                />
                <main className="transition-colors duration-200">
                  {renderCurrentView()}
                </main>
              </>
            )}
          </div>
        </AuthContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;