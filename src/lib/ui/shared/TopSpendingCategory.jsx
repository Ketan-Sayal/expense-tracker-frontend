import axios from "axios";
import { useEffect, useState } from "react"

const TopSpendingCategory = () => {
    const [thisMonthData, setThisMonthData] = useState([]);
    const [lastMonthData, setLastMonthData] =  useState([]);
    const [viewAll, setViewAll] = useState(false);
    const [totalExpense, setTotalExpense] = useState(0);
    const [diffenceCategories, setDiffenceCategories] = useState([]);

    useEffect(()=>{
      axios.get("/api/expenses/topSpending").then((res)=>{
        const data = res.data.data;
        setThisMonthData(data?.thisMonth);
        setLastMonthData(data?.lastMonth);
        const totalSpending = data?.thisMonth.reduce((sum, expense)=> sum+=expense.expense, 0);
        setTotalExpense(totalSpending);
        setDiffenceCategories(data?.diffenceCategories);
      }).catch((error)=>console.log(error))
    }, []);

    const filterArray = !viewAll?thisMonthData?.filter((_, i)=>i<=2):thisMonthData;

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Top Spending Categories</h3>
            <button 
            onClick={()=>setViewAll((prev)=>!prev)}
            className="text-blue-600 cursor-pointer hover:text-blue-700 text-sm font-medium">{!viewAll?"View All":"View Less"}</button>
          </div>
          
          <div className="space-y-4">
            {/* Category Item */}
            {lastMonthData && thisMonthData && (
              filterArray?.map((expense, i)=>{
                const precentSpending = (expense.expense/totalExpense)*100;
                const diffrence = diffenceCategories[i];
                return(
                <div key={expense.name} className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-100">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${expense.color} rounded-xl flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">{expense.icon}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{expense.actualName}</p>
                  <p className="text-sm text-gray-600">{precentSpending.toFixed(0)}% of total expenses</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">₹{expense.expense}</p>
                {diffrence>0?(<p className="text-sm text-red-600">+₹{diffrence} vs last month</p>):(<p className="text-sm text-green-600">-₹{diffrence} vs last month</p>)}
              </div>
            </div>
            )})
            )}
          </div>
    </div>
  )
}

export default TopSpendingCategory
