import { Home, BarChart3,LogIn,LucideLogIn,DollarSign, TrendingUp, PieChart, Shield, Users, Award, Target, Zap, Heart, Star, CheckCircle, ArrowRight, Calculator, Bell, Smartphone, Globe, Lock } from 'lucide-react';
import { useAuthContext } from '../context';

const useConstants = () => {
    const {isLoggedIn} = useAuthContext();
    const navigationItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      path: '/',
      icon: Home,
      isActive: isLoggedIn,
      badge: null
    },
    
    {
      id: 'analytics',
      name: 'Analytics',
      path: '/analytics',
      isActive: isLoggedIn,
      icon: BarChart3,
      badge: null
    },
    {
      id: 'reports',
      name: 'Reports',
      path: '/reports',
      isActive: isLoggedIn,
      icon: PieChart,
      badge: 'New'
    },
    {
      id: 'login',
      name: 'Login',
      path: '/login',
      isActive: !isLoggedIn,
      icon: LogIn,
    },
    {
      id: 'SignUp',
      name: 'Sign Up',
      path: '/signup',
      isActive: !isLoggedIn,
      icon: LucideLogIn,
    }
  ];
  return {navigationItems};
}

export const features = [
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Insights that analyze your spending patterns, identify trends, and provide personalized recommendations to optimize your finances.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: PieChart,
      title: "Visual Reports",
      description: "Beautiful, interactive charts and graphs that transform complex financial data into easy-to-understand visual stories.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your financial data is protected with enterprise-grade 256-bit encryption, multi-factor authentication, and secure cloud storage.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Set, track, and achieve your financial goals with smart milestone tracking, progress notifications, and celebration rewards.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Zap,
      title: "Real-time Sync",
      description: "Instant synchronization across all your devices with real-time expense tracking, automatic categorization, and instant notifications.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Family & Team Sharing",
      description: "Collaborate on budgets with family members or team members while maintaining individual privacy and administrative controls.",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  export const benefits = [
    {
      icon: BarChart3,
      title: "Comprehensive Dashboard",
      description: "Get a complete overview of your financial health in one beautiful, intuitive dashboard.",
      image: "📊"
    },
    {
      icon: Calculator,
      title: "Smart Budgeting",
      description: "Create flexible budgets that adapt to your lifestyle with intelligent spending alerts.",
      image: "💰"
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Stay informed with real-time alerts for unusual spending, bill reminders, and budget updates.",
      image: "🔔"
    },
    {
      icon: Smartphone,
      title: "Mobile First Design",
      description: "Beautifully designed for mobile with offline capabilities and seamless desktop sync.",
      image: "📱"
    }
  ];

  export const stats = [
    { number: "50,000+", label: "Happy Users", icon: Users },
    { number: "$2.5M+", label: "Money Tracked", icon: DollarSign },
    { number: "98%", label: "User Satisfaction", icon: Heart },
    { number: "24/7", label: "Support Available", icon: Shield }
  ];

  export const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "ExpenseTracker completely transformed how I manage my business finances. The insights are incredible and have helped me save over $5,000 this year!",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "Financial Advisor",
      content: "I recommend ExpenseTracker to all my clients. It's the perfect blend of simplicity and powerful features. My clients love the visual reports!",
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      name: "Emily Davis",
      role: "Freelancer",
      content: "Finally, an expense tracker that doesn't feel like work! The interface is gorgeous and tracking expenses has become effortless.",
      rating: 5,
      avatar: "👩‍🎨"
    }
  ];

  export const pricingFeatures = [
    "Unlimited expense tracking",
    "Advanced analytics & insights",
    "Custom categories & tags",
    "Goal setting & tracking",
    "Multi-device synchronization",
    "Export & backup options",
    "Priority customer support",
    "Family sharing (up to 5 members)"
  ];

export default useConstants;

export const categories = [
    { name: 'Food & Dining', icon: '🍽️', color: 'from-orange-500 to-red-500' },
    { name: 'Transportation', icon: '🚗', color: 'from-blue-500 to-cyan-500' },
    { name: 'Entertainment', icon: '🎬', color: 'from-purple-500 to-pink-500' },
    { name: 'Shopping', icon: '🛍️', color: 'from-green-500 to-emerald-500' },
    { name: 'Bills & Utilities', icon: '💡', color: 'from-yellow-500 to-orange-500' },
    { name: 'Income', icon: '💰', color: 'from-emerald-500 to-green-500' }
  ];