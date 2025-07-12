import { GoogleGenAI } from "@google/genai";
import { config } from "../config";
import { categories } from "./constants";

const ai = new GoogleGenAI({apiKey:config.geminiApiKey});

export const generateTips = async (financialData)=>{
    const prompt =`Financial Analysis:
    Income: $${financialData.income} of this month
    Expenses: $${financialData.expenses} of this month
    Savings: ${financialData.savingsRate}% of this month,
    last six months data:${JSON.stringify(financialData.data)}


    Generate 1 personalized financial tip to increase the savings rate and finatial health in 4 lines. Plase note all the financial data is in indian rupees so use  rupees before showing any previous income and expense. Note give a small and good tip only.`
    try {
         const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getCategoryIcon = (categoryName) => {
    const category = categories?.find(c => c.name === categoryName);
    return category ? category?.icon : '📊';
  };

export  const getCategoryColor = (categoryName) => {
    const category = categories?.find(c => c.name === categoryName);
    return category ? category?.color : 'from-gray-500 to-gray-600';
  };