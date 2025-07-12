import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { DollarSign, Settings, Menu, X, PieChart, TrendingUp, User, LogOut, ChevronDown} from 'lucide-react';
import { useAuthContext } from '../context';
import useConstants from '../utils/constants';
import axios from 'axios';

function RootLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const {isLoggedIn, user, setIsLoggedIn, setUser} = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const {navigationItems} = useConstants();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const logout = async()=>{
    setLoading(true);
    try {
      const res = await axios.post("/api/users/", {}, {headers:{token:Cookies.get("token")}});
      if(res.data?.data?.sucess){
        setIsLoggedIn(false);
        setUser(null);
        Cookies.remove("token");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Navigation Header */}
      <nav className="bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/30 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Enhanced Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                <div 
                onClick={()=>navigate("/")}
                className="relative bg-gradient-to-r cursor-pointer from-blue-600 via-purple-600 to-indigo-600 p-3 rounded-2xl shadow-xl transform hover:scale-110 transition-all duration-300">
                  <DollarSign
                  className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent tracking-tight">
                  ExpenseTracker
                </h1>
                <p className="text-sm text-gray-600 font-medium tracking-wide">Smart Finance Management</p>
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 gap-7">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const active = isActive(item.path);
                // Only show main nav items (not login/signup) for logged in users
                if(!item.isActive || (!isLoggedIn && (item.id === 'login' || item.id === 'SignUp'))) return null;
                // Only show dashboard/expenses/income/analytics/reports for logged in users
                if(isLoggedIn && (item.id === 'login' || item.id === 'SignUp')) return null;
                
                return (
                  <div key={item.id} className="relative group">
                    <Link 
                      to={item.path} 
                      className={`
                        flex items-center space-x-3 px-5 py-3 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden
                        ${active 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25 transform scale-105' 
                          : 'text-gray-700 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-lg hover:scale-105'
                        }
                      `}
                    >
                      <IconComponent className={`w-5 h-5 ${active ? 'text-white' : 'group-hover:text-blue-600'} transition-colors duration-300`} />
                      <span className="font-medium">{item.name}</span>
                      
                      {/* Animated background for hover */}
                      {!active && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                      )}
                      
                      {/* Badge */}
                      {item.badge && (
                        <div className="absolute -top-2 -right-2">
                          <span className="relative flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-pink-500 to-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold items-center justify-center">
                              !
                            </span>
                          </span>
                        </div>
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Right side actions */}
            <div className="hidden lg:flex items-center gap-7">
              {!isLoggedIn ? (
                // Login/Signup buttons for non-logged in users
                <div className="flex items-center space-x-2">
                  {navigationItems.filter(item => item.id === 'login' || item.id === 'SignUp').map((item) => {
                    const IconComponent = item.icon;
                    const active = isActive(item.path);
                    
                    return (
                      <div key={item.id} className="relative group">
                        <Link 
                          to={item.path} 
                          className={`
                            flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden
                            ${item.id === 'SignUp'
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105'
                              : active 
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25 transform scale-105' 
                                : 'text-gray-700 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-lg hover:scale-105 border border-gray-200 hover:border-blue-300'
                            }
                          `}
                        >
                          <IconComponent className={`w-4 h-4 ${item.id === 'SignUp' || active ? 'text-white' : 'group-hover:text-blue-600'} transition-colors duration-300`} />
                          <span className="font-medium">{item.name}</span>
                          
                          {/* Animated background for hover */}
                          {!active && item.id !== 'SignUp' && (
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                          )}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // Profile and notifications for logged in users
                <>
                  

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      className="flex items-center cursor-pointer space-x-3 p-3 text-gray-700 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-2xl transition-all duration-300 hover:scale-105 group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium hidden xl:block">{user?.username.length>13?`${user.username.substring(0, 13)}...`:user?.username}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isProfileMenuOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user?.username.length>20?`${user.username.substring(0, 21)}...`:user?.username}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <div className="py-2">
                          <Link to={`/profile/${user?._id}`} className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transition-all duration-200">
                            <User className="w-4 h-4" />
                            <span>Your Profile</span>
                          </Link>
                       <div className="border-t border-gray-100 mt-2 pt-2">
                            <button 
                            onClick={logout}
                            disabled={loading}
                            className="flex cursor-pointer items-center w-full space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200">
                              <LogOut className="w-4 h-4" />
                              <span>Sign out</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Enhanced Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-3 rounded-2xl text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:scale-110"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation Menu */}
          <div className={`lg:hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100 pb-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="pt-4 space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const active = isActive(item.path);
                // Only show main nav items for logged in users, login/signup for logged out users
                if(!item.isActive) return null;
                if(isLoggedIn && (item.id === 'login' || item.id === 'SignUp')) return null;
                if(!isLoggedIn && !(item.id === 'login' || item.id === 'SignUp')) return null;
                
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center space-x-4 px-4 py-4 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden group
                      ${active
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25'
                        : item.id === 'SignUp'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25'
                          : 'text-gray-700 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-lg'
                      }
                    `}
                  >
                    <IconComponent className={`w-6 h-6 ${active || item.id === 'SignUp' ? 'text-white' : 'group-hover:text-blue-600'} transition-colors duration-300`} />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                        {item.badge}
                      </span>
                    )}
                    {!active && item.id !== 'SignUp' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                    )}
                  </Link>
                );
              })}
              
              {/* Enhanced Mobile-only actions */}
              {isLoggedIn && (
                <div className="pt-6 mt-6 border-t border-gray-200 space-y-2">
                  
                  <button className="flex items-center space-x-4 px-4 py-4 w-full text-left text-gray-700 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-2xl transition-all duration-300 group">
                    <User className="w-6 h-6 group-hover:text-blue-600 transition-colors duration-300" />
                    <span className="flex-1 font-medium">Profile</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative">
        {/* Enhanced Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-purple-200/20 to-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/2 w-72 h-72 bg-gradient-to-r from-indigo-200/20 to-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-white/95 backdrop-blur-xl border-t border-white/30 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Enhanced Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl blur opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-2.5 rounded-xl">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                  ExpenseTracker
                </h3>
              </div>
              <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-md">
                Transform your financial life with smart expense tracking, insightful analytics, 
                and powerful budgeting tools. Take control of your money today.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-full">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Smart Analytics</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-full">
                  <PieChart className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Visual Reports</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-gray-800 mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                {navigationItems.slice(0, 4).map((item) => (
                  <li key={item.id}>
                    <Link 
                      to={item.path} 
                      className="text-gray-600 hover:text-blue-700 text-sm transition-all duration-200 flex items-center space-x-3 hover:translate-x-1 group"
                    >
                      <item.icon className="w-4 h-4 group-hover:text-blue-600 transition-colors duration-200" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-gray-800 mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-700 transition-all duration-200 hover:translate-x-1 inline-block font-medium">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-700 transition-all duration-200 hover:translate-x-1 inline-block font-medium">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-700 transition-all duration-200 hover:translate-x-1 inline-block font-medium">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-700 transition-all duration-200 hover:translate-x-1 inline-block font-medium">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Enhanced Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm font-medium">
              © 2025 ExpenseTracker. All rights reserved. Built with ❤️ for better financial management.
            </p>
            <div className="flex items-center space-x-8">
              <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">Version 2.1.0</span>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-30"></div>
                </div>
                <span className="text-sm text-gray-600 font-medium">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default RootLayout;