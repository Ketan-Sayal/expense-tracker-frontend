import React, { useEffect, useState } from 'react';
import { DollarSign, TrendingDown, TrendingUp, PieChart, ShoppingBag, Car, Home, Coffee, Gamepad2 } from 'lucide-react';
import { useAuthContext } from '../../context';
import Cookies from "js-cookie";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getCategoryColor, getCategoryIcon } from '../../utils';
// {totalExpenseOfThisMonth, diffrenceInExpense, currMonth:thisMonthDate.toLocaleString("default", {month:"short"}), currYear:thisMonthDate.getFullYear(), biggestSavings, biggestIncrease, bugetUsed, remainingBuget, userExpenseDataOfThisWeek}
const ReportsPage = () => {
  const [totalExpensesOfThisMonth, setTotalExpensesOfThisMonth] = useState(0);
  const [diffrenceInExpense, setDiffrenceInExpense] = useState(0);
  const [currMonth, setCurrMonth] = useState("");
  const [biggestIncrease, setBiggestIncrease] = useState(0);
  const [biggestSavings, setBiggestSavings] = useState(0);
  const [currYear, setCurrYear] = useState(0);
  const [remainingBuget, setRemainingBuget] = useState(0);
  const [bugetUsed, setBugetUsed] = useState(0);
  const [userExpenseDataOfThisWeek, setUserExpenseDataOfThisWeek] = useState([]);

  const {isLoggedIn} = useAuthContext();

  useEffect(()=>{
    axios.get("/api/expenses/report", {headers:{token:Cookies.get("token")}}).then((res)=>{
      const data = res.data.data;
      setTotalExpensesOfThisMonth(data.totalExpenseOfThisMonth);
      setBiggestIncrease(data.biggestIncrease);
      setBiggestSavings(data.biggestSavings);
      setBugetUsed(data.bugetUsed);
      setDiffrenceInExpense(data.diffrenceInExpense);
      setCurrMonth(data.currMonth);
      setCurrYear(data.currYear);
      setRemainingBuget(data.remainingBuget);
      setUserExpenseDataOfThisWeek(data.userExpenseDataOfThisWeek);
      console.log(data);
      
    }).catch(err=>console.log(err));
  }, []);

  if(!isLoggedIn) return <Navigate to={"/"}/>

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent mb-2">
          Expense Report
        </h1>
        <p className="text-gray-600 font-medium">This Month • {currMonth} {currYear}</p>
      </div>

      {/* Total Spending Card */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 text-center">
          <div className="relative group mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <DollarSign className="text-white w-10 h-10" />
            </div>
          </div>
          <h2 className="text-gray-600 text-lg mb-3 font-medium">Total Spent This Month</h2>
          <p className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-3">₹{totalExpensesOfThisMonth}</p>
          {diffrenceInExpense>0?(<div className="flex items-center justify-center space-x-2">
            <TrendingUp className="w-4 h-4 text-red-500" />
            <p className="text-red-500 font-semibold">₹{diffrenceInExpense.toFixed(0)} vs last month</p>
          </div>):(<div className="flex items-center justify-center space-x-2">
            <TrendingDown className="w-4 h-4 text-green-500" />
            <p className="text-green-500 font-semibold">₹{diffrenceInExpense.toFixed(0)} vs last month</p>
          </div>)}
        </div>
      </div>

      

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 text-center hover:scale-105 transition-all duration-300">
            <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300">
              <TrendingDown className="text-green-600 w-8 h-8" />
            </div>
            <h4 className="text-gray-600 text-sm mb-2 font-medium">Biggest Saving</h4>
            <p className="text-3xl font-bold text-green-600 mb-1">₹{biggestSavings.toFixed(0)}</p>
            <p className="text-xs text-gray-500 font-medium">vs last month</p>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 text-center hover:scale-105 transition-all duration-300">
            <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors duration-300">
              <TrendingUp className="text-red-600 w-8 h-8" />
            </div>
            <h4 className="text-gray-600 text-sm mb-2 font-medium">Biggest Increase</h4>
            <p className="text-3xl font-bold text-red-600 mb-1">₹{biggestIncrease.toFixed(0)}</p>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 text-center hover:scale-105 transition-all duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
              <PieChart className="text-blue-600 w-8 h-8" />
            </div>
            <h4 className="text-gray-600 text-sm mb-2 font-medium">Budget Used</h4>
            <p className="text-3xl font-bold text-blue-600 mb-1">{bugetUsed.toFixed(0)}%</p>
            <p className="text-xs text-gray-500 font-medium">₹{remainingBuget.toFixed(0)} remaining</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur opacity-20"></div>
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Recent Expenses</h3>
          
          <div className="space-y-4">
            {userExpenseDataOfThisWeek?.length>0?(userExpenseDataOfThisWeek.map((expense, i)=>{
              const today =  new Date();
              const expenseDate = new Date(expense.date);
              // console.log(expenseDate);
              // console.log("expense date: ", expense.date);
              const diffrenceOfDays = today.getDate() - expenseDate.getDate();
              // console.log(diffrenceOfDays);
              
              return(<div key={i} className="flex items-center justify-between py-4 px-6 border border-gray-100 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-blue-200 group">
              <div className="flex items-center space-x-4">
                <div className={`bg-gradient-to-r ${getCategoryColor(expense.category)} p-3 rounded-xl group-hover:bg-blue-200 transition-colors duration-300`}>
                  {getCategoryIcon(expense.category)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{expense.title}</p>
                  <p className="text-sm text-gray-500 font-medium">{expense.description} • {diffrenceOfDays<=0?"Today":diffrenceOfDays===1?"Yesterday": `${diffrenceOfDays} days ago`}</p>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-800">₹{expense.amount}</span>
            </div>
            )})): (<p className='text-center text-md'>No transactions this week</p>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage
