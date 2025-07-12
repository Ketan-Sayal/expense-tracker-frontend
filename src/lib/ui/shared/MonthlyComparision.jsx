import axios from "axios";
import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import { TrendingUp, TrendingDown, Calendar} from 'lucide-react';

// res - {totalExpensOfCurrMonth, currMonth, prevMonth, prevToPrevMonth, totalExpenseOfLastMonth, avgOfThreeMonths, avgOfSixMonths, avgOfYear, lastThirdMonth, lastSixthMonth, lastYearMonth, currMonthPercent, lastMonthPercent}
const MonthlyComparision = () => {
    const [whichAvgToShow, setWhichAvgToShow] = useState("3M");
    const [totalExpensOfCurrMonth, setTotalExpenseOfCurrMonth] = useState(0);
    const [totalExpensOfLastMonth, setTotalExpenseOfLastMonth] = useState(0);
    const [prevMonth, setPrevMonth] = useState("");
    const [prevToPrevMonth, setPrevToPrevMonth] = useState("");
    const [currMonth, setCurrMonth] = useState("");
    const [avgOfThreeMonths, setAvgOfThreeMonths] = useState(0);
    const [avgOfSixMonths, setAvgOfSixMonths] = useState(0);
    const [avgOfYear, setAvgOfYear] = useState(0);
    const [lastThirdMonth, setLastThirdMonth] = useState("");
    const [lastSixthMonth, setLastSixthMonth] = useState("");
    const [lastYearMonth, setLastYearMonth] = useState("");
    const [currMonthPercent, setCurrMonthPercent] = useState(0);
    const [lastMonthPercent, setLastMonthPercent] = useState(0);
    const [currYear, setCurrYear] = useState("");
    const [lastYear, setLastYear] = useState("");

    useEffect(()=>{
        axios.get("/api/expenses/monthlyInfo", {headers:{token:Cookies.get("token")}}).then((res)=>{
            const data = res.data.data;
            const {totalExpensOfCurrMonth, currMonth, prevMonth, prevToPrevMonth, totalExpenseOfLastMonth, avgOfThreeMonths, avgOfSixMonths, avgOfYear, lastThirdMonth, lastSixthMonth, lastYearMonth, currMonthPercent, lastMonthPercent, currYear, lastYear}= data;
            setTotalExpenseOfCurrMonth(totalExpensOfCurrMonth);
            setTotalExpenseOfLastMonth(totalExpenseOfLastMonth)
            setPrevMonth(prevMonth);
            setPrevToPrevMonth(prevToPrevMonth);
            setCurrMonth(currMonth);
            setAvgOfThreeMonths(avgOfThreeMonths);
            setAvgOfSixMonths(avgOfSixMonths);
            setAvgOfYear(avgOfYear);
            setLastThirdMonth(lastThirdMonth);
            setLastSixthMonth(lastSixthMonth);
            setLastYearMonth(lastYearMonth);
            setCurrMonthPercent(currMonthPercent);
            setLastMonthPercent(lastMonthPercent);
            setCurrYear(currYear);
            setLastYear(lastYear);
            // console.log(data);
            
        }).catch((err)=>{
            console.log(err);
        });
    }, []);

  return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Monthly Comparison</h3>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
              <button 
              onClick={()=>{
                setWhichAvgToShow("3M");
              }}
              className={`px-3 py-1 cursor-pointer ${whichAvgToShow==="3M"?"bg-white rounded-lg text-sm font-medium text-gray-800 shadow-sm":"text-sm font-medium text-gray-600"}`}>3M</button>
              <button 
              onClick={()=>{
                setWhichAvgToShow("6M");
              }}
              className={`px-3 cursor-pointer py-1 ${whichAvgToShow==="6M"?"bg-white rounded-lg text-sm font-medium text-gray-800 shadow-sm":"text-sm font-medium text-gray-600"}`}>6M</button>
              <button
              onClick={()=>{
                setWhichAvgToShow("1Y");
              }}
              className={`px-3 py-1 cursor-pointer ${whichAvgToShow==="1Y"?"bg-white rounded-lg text-sm font-medium text-gray-800 shadow-sm":"text-sm font-medium text-gray-600"}`}>1Y</button>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Month Item */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">This Month</p>
                  <p className="text-sm text-gray-600">{currMonth} {currYear}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">₹{totalExpensOfCurrMonth?.toFixed(0)}</p>
                {currMonthPercent<=0?(<div className="flex items-center space-x-1 text-green-600 text-sm">
                  <TrendingDown className="w-3 h-3" />
                  <span>{currMonthPercent?.toFixed(0)}% vs last month</span>
                </div>):(
                    <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{currMonthPercent?.toFixed(0)}% vs last month</span>
                </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Last Month</p>
                  <p className="text-sm text-gray-600">{prevMonth==="Dec"?`${prevMonth} ${lastYear}`:`${prevMonth} ${currYear}`}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">₹{totalExpensOfLastMonth?.toFixed(0)}</p>
                {lastMonthPercent<=0?(<div className="flex items-center space-x-1 text-green-600 text-sm">
                  <TrendingDown className="w-3 h-3" />
                  <span>{lastMonthPercent?.toFixed(0)}% vs {prevToPrevMonth}</span>
                </div>):(
                    <div className="flex items-center space-x-1 text-red-600 text-sm">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{lastMonthPercent?.toFixed(0)}% vs {prevToPrevMonth}</span>
                </div>
                )}
              </div>
            </div>

            {whichAvgToShow==="3M"?(<div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-slate-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Average (3M)</p>
                  <p className="text-sm text-gray-600">{lastThirdMonth}-{currMonth} {currYear}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">₹{avgOfThreeMonths.toFixed(0)}</p>
                <p className="text-sm text-gray-600">Monthly average</p>
              </div>
            </div>):whichAvgToShow==="6M"?(<div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-slate-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Average (6M)</p>
                  <p className="text-sm text-gray-600">{lastSixthMonth}-{currMonth} {currYear}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">₹{avgOfSixMonths.toFixed(0)}</p>
                <p className="text-sm text-gray-600">Monthly average</p>
              </div>
            </div>):(<div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-slate-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Average (1Y)</p>
                  <p className="text-sm text-gray-600">{lastYearMonth}({lastYear}-{currYear})</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">₹{avgOfYear.toFixed(0)}</p>
                <p className="text-sm text-gray-600">Yearly average</p>
              </div>
            </div>)}
          </div>
        </div>
  )
}

export default MonthlyComparision
