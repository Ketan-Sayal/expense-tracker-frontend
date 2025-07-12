import { Eye, EyeOff, DollarSign, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup"
import { SignupSchema } from '../../lib/validation';
import axios from "axios";
import Cookies from "js-cookie";
import { useAuthContext } from '../../context';
import { useGoogleLogin } from '@react-oauth/google';



export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const {setUser, setIsLoggedIn} = useAuthContext();
    const navigate = useNavigate();
    const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues:{
    username:"",
    email:"",
    password:""
  }})

  const signup = async(data)=>{
    setLoading(true);
    setError("");
    try {
      const {email, password, username} = data;
      const userData = await axios.post("/api/users/register", {username:username, email:email, password});
      // console.log("user: ",userData.data);
      const token = userData.data.data.acessToken.toString();

      if(userData.data?.data.user?._id!==undefined || userData.data?.data.user?._id!==null){
        
        Cookies.set("token", `${token}`, {path:'', sameSite:"Lax", httpOnly:false, expires:5});
        setUser(userData.data.data.user);
        setIsLoggedIn(true);
        navigate("/");
      }else{
        setError(userData.data.data.message);
      }
      
      
      
    } catch (error) {
      if(error?.response?.data?.message)setError(error.response.data.message);
      console.log(error);
      
      
    }finally{
      setLoading(false);
    }
    
    
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      setLoading(true);
      const userInfo = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then(res => res.data);

      const {name, email} = userInfo;
      const res = axios.post("/api/users/login/google-oauth", {username:name, email});
      const result = (await res).data?.data;
      if(result?.user){
      Cookies.set("token", result.acessToken, {expires:5});
      setIsLoggedIn(true);
      setUser(result.user);
      navigate("/");
      }
    setLoading(false);
      
    },
    onError: errorResponse => {console.log(errorResponse);setLoading(false);},
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 flex items-center justify-center p-4">
      {error && (<div className='absolute w-fit p-3 top-0 bg-red-400 text-center rounded-sm'><p className='text-white text-sm font-bold'>{error}</p></div>)}
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full mb-4">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ExpenseTracker</h1>
          <p className="text-gray-600">Sign up to manage your expenses</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <form action="" onSubmit={handleSubmit(signup)} className='w-full space-y-6'>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200"
                  placeholder="Enter your username"
                  required
                />
              </div>
              {errors.username && <p className='text-sm text-red-400 mt-2'>{errors.username.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
              {errors.email && <p className='text-sm text-red-400 mt-2'>{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register("password")}
                 
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && <p className='text-sm text-red-400 mt-2'>{errors.password.message}</p>}
            </div>
            

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r cursor-pointer from-purple-600 to-violet-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {!loading?"Sign Up":"Loading..."}
            </button>
            </form>
          </div>
            
            
            

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="mt-6 flex w-full">
            <button 
            disabled={loading}
            onClick={()=>googleLogin()}
            className="w-full inline-flex cursor-pointer justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="ml-2">Google</span>
            </button>
            
              
          </div>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to='/login' className='font-medium text-purple-600 hover:text-purple-500'>
              Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}