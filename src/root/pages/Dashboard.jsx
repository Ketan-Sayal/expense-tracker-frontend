import React, { useEffect, useState } from 'react';
import { Plus, IndianRupeeIcon, TrendingUp, TrendingDown, PieChart, Calendar, Tag, Trash2, Filter, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { categories } from '../../utils/constants';
import axios from 'axios';
import Cookies from "js-cookie";
import { getCategoryColor, getCategoryIcon } from '../../utils';

const Dashboard = () => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchExpenses = async()=>{
    try {
      const result = await axios.get("/api/expenses/", {headers:{token:Cookies.get("token")}});
      const expenseData = result.data.data.expenses;
      // console.log(expenseData);
      
      return expenseData;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchExpenses().then((data)=>{
      setExpenses(data);
    }).catch((err)=>{
      console.log(err);
    })
  }, []);

  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'Food & Dining',
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
    description: ''
  });

  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  

  const handleAddExpense = async() => {
    // add the newExpense array to the backend
    // Add new expense to the expenses array in front-end and set showExpense to false
    setLoading(true);
    try {
      const result = await axios.post("/api/expenses/", newExpense,{headers:{token:Cookies.get("token")}});
      const data = result.data?.data?.expense;
      setExpenses((prev)=>([...prev, data]));
      setShowAddExpense(false);
      setNewExpense({
      title: '',
      amount: '',
      category: 'Food & Dining',
      date: new Date().toISOString().split('T')[0],
      type: 'expense',
      description: ''
    });
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }

  };

  const deleteExpense = async(id) => {
   setLoading(true);
    try {
    await axios.delete(`/api/expenses/expense/${id}`);
    const deletedExpenses = expenses.filter((expense)=>expense._id.toString()!==id.toString());
    setExpenses(deletedExpenses);
   } catch (error) {
    console.log(error);
   }finally{
    setLoading(false);
   }
  };
  let filteredExpenses;
  if(filterCategory==='All'){
    filteredExpenses = expenses;
    if(searchTerm){
      filteredExpenses = filteredExpenses.filter((expense)=>expense.title.includes(searchTerm)|| expense.description.includes(searchTerm));
    }
  }else{
    filteredExpenses = expenses?.filter(expense => expense.category === filterCategory);
    if(searchTerm){
      filteredExpenses = filteredExpenses.filter((expense)=>expense.title.includes(searchTerm)|| expense.description.includes(searchTerm));
    }
  }

  const totalIncome = expenses.filter((expense)=>expense.type === "income").reduce((sum, expense)=>sum+=expense.amount, 0);
  // console.log(totalIncome);
  
  const totalExpenses = expenses.filter((expense)=>expense.type === "expense").reduce((sum, expense)=>sum+=expense.amount, 0);
  const balance = totalIncome-totalExpenses;
  

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Track your expenses and manage your finances</p>
          </div>
          <button
            onClick={() => setShowAddExpense(true)}
            className="flex items-center cursor-pointer space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Balance */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 relative overflow-hidden group hover:shadow-3xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <IndianRupeeIcon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${balance >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {balance >= 0 ? 'Positive' : 'Negative'}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Balance</h3>
            <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              ₹{Math.abs(balance).toFixed(3)}
            </p>
          </div>
        </div>

        {/* Total Income */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 relative overflow-hidden group hover:shadow-3xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Income</h3>
            <p className="text-3xl font-bold text-green-600 flex items-center">₹{totalIncome}</p>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 relative overflow-hidden group hover:shadow-3xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <ArrowDownRight className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Expenses</h3>
            <p className="text-3xl font-bold text-red-600 flex items-center">₹{totalExpenses}</p>
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
          <PieChart className="w-6 h-6 text-blue-600" />
          <span>Categories</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const categoryExpenses = expenses?.filter(e => e.category === category.name && e.type === 'expense');
            const categoryTotal = categoryExpenses?.reduce((sum, e) => sum + e.amount, 0);
            
            return (
              <div key={category.name} className="group">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-600">₹{categoryTotal}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category.name} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          <span>Recent Transactions</span>
        </h2>
        
        {filteredExpenses?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IndianRupeeIcon className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No transactions found</h3>
            <p className="text-gray-500">Add your first transaction to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredExpenses?.map((expense) => (
              <div key={expense._id} className="group">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(expense.category)} rounded-2xl flex items-center justify-center`}>
                      <span className="text-xl">{getCategoryIcon(expense.category)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{expense.title}</h3>
                      <p className="text-sm text-gray-500">{expense.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Tag className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{expense.category}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{expense.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className={`text-lg font-bold ${expense.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {expense.type === 'income' ? '+' : '-'}₹{expense?.amount}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${expense.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {expense.type}
                      </span>
                    </div>
                    <button
                      disabled={loading}
                      onClick={() => deleteExpense(expense._id)}
                      className="opacity-0 group-hover:opacity-100 p-2 cursor-pointer text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Add Transaction Modal */}
      {showAddExpense && (
        <>
          {/* Backdrop with proper z-index */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={() => setShowAddExpense(false)}
          ></div>
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
            <div 
              className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[70vh] overflow-y-auto shadow-2xl transform scale-100 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                  Add Transaction
                </h2>
                <button 
                  onClick={() => setShowAddExpense(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Type Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Type</label>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setNewExpense({...newExpense, type: 'expense'})}
                      className={`flex-1 py-4 px-6 cursor-pointer rounded-2xl font-semibold transition-all duration-300 border-2 ${
                        newExpense.type === 'expense' 
                          ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-xl border-red-500 transform scale-105' 
                          : 'bg-white text-gray-600 hover:bg-red-50 border-gray-200 hover:border-red-300'
                      }`}
                    >
                      <span className="text-xl mb-1 block">💸</span>
                      Expense
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewExpense({...newExpense, type: 'income'})}
                      className={`flex-1 py-4 cursor-pointer px-6 rounded-2xl font-semibold transition-all duration-300 border-2 ${
                        newExpense.type === 'income' 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl border-green-500 transform scale-105' 
                          : 'bg-white text-gray-600 hover:bg-green-50 border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <span className="text-xl mb-1 block">💰</span>
                      Income
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Title</label>
                  <input
                    type="text"
                    value={newExpense.title}
                    onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                    placeholder="Enter transaction title"
                    required
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-semibold">₹</span>
                    <input
                      type="number"
                      step="1"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                      className="w-full pl-8 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg bg-white"
                  >
                    {categories.map(category => (
                      <option key={category.name} value={category.name}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Date</label>
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Description</label>
                  <textarea
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none text-lg"
                    rows="3"
                    placeholder="Add a description..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddExpense(false);
                      setNewExpense({
                        title: '',
                        amount: '',
                        category: 'Food & Dining',
                        date: new Date().toISOString().split('T')[0],
                        type: 'expense',
                        description: ''
                      });
                    }}
                    className="flex-1 py-4 cursor-pointer px-6 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddExpense}
                    disabled={!newExpense.title || !newExpense.amount || loading}
                    className="flex-1 py-4 px-6 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    Add Transaction
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;