import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  Calendar, 
  Target,
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from 'lucide-react';
import PieChartPage from '../../lib/ui/shared/PieChartPage';
import LineChartPage from '../../lib/ui/shared/LineChartPage';
import axios from 'axios';
import { useAuthContext } from '../../context';
import { Navigate } from 'react-router-dom';
import TopSpendingCategory from '../../lib/ui/shared/TopSpendingCategory';
import MonthlyComparision from '../../lib/ui/shared/MonthlyComparision';
import { generateTips } from '../../utils';


const Analytics = () => {
    const [pieChartData, setPieChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [maxCategoryInfo, setMaxCategoryInfo] = useState({name:"Food", expense:500});
    const [bugetEfficiency, setBugetEfficiency] = useState(0);
    const [avgBugetEfficiency, setAvgBugetEfficiency] = useState(0);
    const {isLoggedIn} = useAuthContext();
    const [recomendation, setRecomendation] = useState("Consider increasing your emergency fund to 6 months of expenses");
    const [loading, setLoading] = useState(false);

    const fetchPieChartData = async ()=>{
        try {
            const result = await axios.get("/api/expenses/categories", {headers:{token:Cookies.get("token")}});
            const data = result.data?.data?.categoriesIncomeAndExpenses;
            // console.log(data);
            
            return data;
        } catch (error) {
            throw new error;
        }
    }

    const fetchLineChartData = async ()=>{
        try {
            const result = await axios.get("/api/expenses/total", {headers:{token:Cookies.get("token")}});
            const data = result.data?.data?.totalIncomeAndExpenses;
            // console.log(data);
            
            return data;
        } catch (error) {
            throw new error;
        }
    }

    function calculateBudgetEfficiency(income, expenses) {
      if (income === 0) return 0;
      const twentyPercentIncome = income*0.2;
     // Higher efficiency = lower expense ratio
      const expenseRatio = ((income - expenses) / twentyPercentIncome)*100;
      // const efficiency = (1 - expenseRatio) * 100;
      
      
      
    
      // Cap at reasonable bounds
      return Math.max(0, Math.min(100, expenseRatio));
    }

    const maxCategoryData =(categoryData)=>{
      let categoryName = categoryData[0].name;
      let categoryExpense = categoryData[0].expense;
      categoryData.forEach(data => {
        if(categoryExpense<data.expense){
          categoryExpense = data.expense;
          categoryName = data.name;
        }
      });
      return {name:categoryName, expense:categoryExpense}
    }

    useEffect(()=>{
        fetchPieChartData().then((data)=>{
          setPieChartData(data);
          const maxCategoryInfo = maxCategoryData(data);
          setMaxCategoryInfo(maxCategoryInfo);
        }).catch(error=>console.log(error));
        fetchLineChartData().then((data)=>{
          setLineChartData(data);
          const bugetEfficiency = calculateBudgetEfficiency(data[data.length-1].income, data[data.length-1].expense);
          setBugetEfficiency(bugetEfficiency);
          const pervMonthEfficiency = calculateBudgetEfficiency(data[data.length-2].income, data[data.length-2].expense);
          const avgBugetEffiency = ((bugetEfficiency-pervMonthEfficiency)/pervMonthEfficiency)*100;
          const finalAvg = ((!Number.isFinite(pervMonthEfficiency))||(!Number.isFinite(bugetEfficiency))||(!Number.isFinite(avgBugetEffiency)) || Number.isNaN(avgBugetEffiency))?bugetEfficiency:avgBugetEffiency;
          setAvgBugetEfficiency(finalAvg);
          const currMonthSpending = data[data?.length-1]?.expense;
          const currMonthEarnings = data[data?.length-1]?.income;
          const savingsRate = ((currMonthEarnings-currMonthSpending)/currMonthEarnings)*100;
          if(!Number.isNaN(savingsRate)){
            setLoading(true);
            generateTips({income:currMonthEarnings, expenses:currMonthSpending, savingsRate, data}).then((data)=>{
            // console.log(data);
            // setLoading(false);
            setRecomendation(data);
            // setLoading(false);
          }).finally(()=>{
            setLoading(false);
          });
          }
        }).catch(error=>console.log(error));

    }, []);

    if(!isLoggedIn) return <Navigate to={"/"}/>

    const totalExpenses = (lineChartData?.reduce((sum, expense)=>sum+=expense?.expense, 0));
    // const totalIncome = (lineChartData?.reduce((sum, expense)=>sum+=expense?.income, 0));
    const AvgSpending = totalExpenses/6;
    const currMonthSpending = lineChartData[lineChartData?.length-1]?.expense;
    const currMonthEarnings = lineChartData[lineChartData?.length-1]?.income;
    const precentInAverageSpending = ((currMonthSpending-AvgSpending)/AvgSpending)*100 || 0;
    const savingsRate = ((currMonthEarnings-currMonthSpending)/currMonthEarnings)*100;
    const lastMonthSavingsRate = ((lineChartData[lineChartData?.length-2]?.income-lineChartData[lineChartData.length-2]?.expense)/lineChartData[lineChartData.length-2]?.income)*100;
    const avgSavingsRate = ((savingsRate-lastMonthSavingsRate)/lastMonthSavingsRate)*100;
    // console.log(Number.islastMonthSavingsRate);
    const currMonthBugetControl = ((currMonthSpending) / currMonthEarnings)*100;
    const overallScore = (currMonthBugetControl*0.4)+(savingsRate*0.6);
    // console.log(avgSavingsRate);

   
    

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Deep insights into your financial patterns and spending behavior
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex cursor-pointer items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
            <Download className="w-4 h-4" />
            <span className="font-medium">Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Average Monthly Spending */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
              {precentInAverageSpending>0?<><ArrowUpRight className="w-3 h-3" />
              <span className=' text-green-600'>+{precentInAverageSpending.toFixed(2)}%</span></>:<><ArrowDownRight className="w-3 h-3" />
              <span className=' text-red-600'>{precentInAverageSpending.toFixed(2)}%</span></>}
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Avg Monthly Spending</h3>
          <p className="text-2xl font-bold text-gray-800">₹{AvgSpending.toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-2">vs last month</p>
        </div>

        {/* Savings Rate */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            {
              (Number.isNaN(lastMonthSavingsRate) || !Number.isFinite(lastMonthSavingsRate))&& savingsRate>0?(<div className="flex items-center space-x-1 text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{savingsRate.toFixed(2)}%</span>
            </div>):((Number.isNaN(lastMonthSavingsRate) || !Number.isFinite(lastMonthSavingsRate))&& savingsRate<0)?(<div className="flex items-center space-x-1 text-red-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
              <ArrowDownRight className="w-3 h-3" />
              <span>{savingsRate.toFixed(2)}</span>
            </div>):(avgSavingsRate>0)?(<div className="flex items-center space-x-1 text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{avgSavingsRate.toFixed(2)}</span>
            </div>):(avgSavingsRate<=0)?(<div className="flex items-center space-x-1 text-red-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
              <ArrowDownRight className="w-3 h-3" />
              <span>{avgSavingsRate.toFixed(2)}</span>
            </div>):(" ")
            }
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Savings Rate</h3>
          <p className="text-2xl font-bold text-gray-800">{(Number.isNaN(savingsRate)||!Number.isFinite(savingsRate))?0:savingsRate.toFixed(2)}%</p>
          <p className="text-xs text-gray-500 mt-2">of total income</p>
        </div>

        {/* Largest Expense Category */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Top Category</h3>
          <p className="text-2xl font-bold text-gray-800">{maxCategoryInfo.name}</p>
          <p className="text-xs text-gray-500 mt-2">₹{maxCategoryInfo.expense} this month</p>
        </div>

        {/* Budget Efficiency */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            {avgBugetEfficiency>0?(<div className="flex items-center space-x-1 text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{avgBugetEfficiency.toFixed(2)}%</span>
            </div>): (<div className="flex items-center space-x-1 text-red-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              <span>{avgBugetEfficiency.toFixed(2)}%</span>
            </div>)}
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Budget Efficiency</h3>
          <p className="text-2xl font-bold text-gray-800">{bugetEfficiency.toFixed(2)}%</p>
          <p className="text-xs text-gray-500 mt-2">within budget limits</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Trends Chart */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Spending Trends</h3>
                <p className="text-sm text-gray-600">Last 6 months overview</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Expenses</span>
              <div className="w-3 h-3 bg-green-500 rounded-full ml-4"></div>
              <span className="text-sm text-gray-600">Income</span>
            </div>
          </div>
          
          {/* Chart Placeholder - Use Recharts LineChart here */}
          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
            {lineChartData?(
                <LineChartPage data={lineChartData}/>
            ):(<div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 font-medium">Line Chart Component</p>
              <p className="text-sm text-gray-400">Use Recharts LineChart here</p>
            </div>)}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <PieChart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Category Breakdown</h3>
                <p className="text-sm text-gray-600">Current month distribution</p>
              </div>
            </div>
          </div>
          
          {/* Chart Placeholder - Use Recharts PieChart here */}
          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
            {pieChartData?(
                <PieChartPage data={pieChartData}/>
            ):(<div className="text-center">
              <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 font-medium">Pie Chart Component</p>
              <p className="text-sm text-gray-400">No analysis</p>
            </div>)}
          </div>
        </div>
      </div>

      {/* Detailed Analytics Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Spending Categories */}
        <TopSpendingCategory/>

        {/* Monthly Comparison */}
        <MonthlyComparision/>
      </div>

      {/* Financial Health Score */}
      {/* Financial Health Score with Dynamic Ternary Operators */}
<div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
    <div className="flex-1">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Financial Health Score</h3>
          <p className="text-gray-600">Based on your spending patterns and savings</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-3">
            <div className={`absolute inset-0 rounded-full ${
              overallScore >= 85 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
              overallScore >= 70 ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
              overallScore >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
              'bg-gradient-to-r from-red-500 to-pink-600'
            }`}></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <span className={`text-2xl font-bold ${
                overallScore >= 85 ? 'text-green-600' :
                overallScore >= 70 ? 'text-blue-600' :
                overallScore >= 50 ? 'text-orange-600' :
                'text-red-600'
              }`}>
                {Number.isNaN(overallScore)?0:overallScore.toFixed(0)}
              </span>
            </div>
          </div>
          <p className="font-semibold text-gray-800">Overall Score</p>
          <p className={`text-sm ${
            overallScore >= 85 ? 'text-green-600' :
            overallScore >= 70 ? 'text-blue-600' :
            overallScore >= 50 ? 'text-orange-600' :
            'text-red-600'
          }`}>
            {overallScore >= 85 ? 'Excellent' :
             overallScore >= 70 ? 'Good' :
             overallScore >= 50 ? 'Fair' :
             'Poor'}
          </p>
        </div>
        
        
        <div className="text-center">
  <div className="relative w-20 h-20 mx-auto mb-3">
    <div className={`absolute inset-0 rounded-full ${
      currMonthBugetControl <= 30 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
      currMonthBugetControl <= 50 ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
      currMonthBugetControl <= 70 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
      'bg-gradient-to-r from-red-500 to-pink-600'
    }`}></div>
    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
      <span className={`text-2xl font-bold ${
        currMonthBugetControl <= 30 ? 'text-green-600' :
        currMonthBugetControl <= 50 ? 'text-blue-600' :
        currMonthBugetControl <= 70 ? 'text-orange-600' :
        'text-red-600'
      }`}>
        {Number.isNaN(currMonthBugetControl)?0:currMonthBugetControl.toFixed(0)}
      </span>
    </div>
  </div>
  <p className="font-semibold text-gray-800">Budget Control</p>
  <p className={`text-sm ${
    currMonthBugetControl <= 30 ? 'text-green-600' :
    currMonthBugetControl <= 50 ? 'text-blue-600' :
    currMonthBugetControl <= 70 ? 'text-orange-600' :
    'text-red-600'
  }`}>
    {currMonthBugetControl <= 30 ? 'Excellent' :
     currMonthBugetControl <= 50 ? 'Good' :
     currMonthBugetControl <= 70 ? 'Fair' :
     'Poor'}
  </p>
</div>
        
        
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-3">
            <div className={`absolute inset-0 rounded-full ${
              savingsRate >= 85 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
              savingsRate >= 70 ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
              savingsRate >= 50 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
              'bg-gradient-to-r from-red-500 to-pink-600'
            }`}></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <span className={`text-2xl font-bold ${
                savingsRate >= 85 ? 'text-green-600' :
                savingsRate >= 70 ? 'text-blue-600' :
                savingsRate >= 50 ? 'text-orange-600' :
                'text-red-600'
              }`}>
                {Number.isNaN(savingsRate)?0:savingsRate.toFixed(0)}
              </span>
            </div>
          </div>
          <p className="font-semibold text-gray-800">Savings Rate</p>
          <p className={`text-sm ${
            savingsRate >= 85 ? 'text-green-600' :
            savingsRate >= 70 ? 'text-blue-600' :
            savingsRate >= 50 ? 'text-orange-600' :
            'text-red-600'
          }`}>
            {savingsRate >= 85 ? 'Excellent' :
             savingsRate >= 70 ? 'Good' :
             savingsRate >= 50 ? 'Fair' :
             'Poor'}
          </p>
        </div>
      </div>
    </div>
    
    {/* Dynamic Recommendations */}
    <div className="lg:w-96">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
        <h4 className="font-bold text-gray-800 mb-3">Recommendation</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          {/* Emergency Fund Recommendation */}
          
        
            <li className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>{!loading?recomendation:"Generating..."}</span>
            </li>
        </ul>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Analytics;