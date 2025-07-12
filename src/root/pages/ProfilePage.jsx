import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Save, Camera, Edit3, Shield, Settings } from 'lucide-react';
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup";
import {useAuthContext} from "../../context"
import { UpdateUserSchema } from '../../lib/validation';
import axios from 'axios';
import Cookies from "js-cookie";
import { Navigate } from 'react-router-dom';

function ProfileForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const {user, setUser, isLoggedIn} = useAuthContext();
  
  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver:yupResolver(UpdateUserSchema),
    defaultValues:{
      username:user?.username||'',
      email:user?.email || "",
      newPassword:"",
    }
  });

  if(!isLoggedIn) return <Navigate to={"/"}/>

  // const navigate = useNavigate();
  const update = async(data) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await axios.patch("/api/users/update", data, {headers:{token: Cookies.get("token")}});
      setUser(result.data.data.user);
      setSuccess("Updated data sucessfully!!");
    } catch (error) {
      if(error?.response?.data?.message)setError(error.response.data.message);
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  return (<>
    <div className="min-h-screen py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-4 rounded-2xl shadow-xl">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent tracking-tight">
              Profile Settings
            </h1>
            <p className="text-gray-600 font-medium mt-2">Manage your account information and security settings</p>
          </div>
        </div>

        {/* User Info Header */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                <User className="w-12 h-12 text-white" />
              </div>
              <button className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border-2 border-white hover:scale-110 transition-all duration-300 group-hover:shadow-xl">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{user?.username}</h2>
              <p className="text-gray-600 mb-4">{user?.email}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-full">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Account Verified</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-blue-700 bg-blue-50 px-3 py-2 rounded-full">
                  <Settings className="w-4 h-4" />
                  <span className="font-medium">Premium Member</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center cursor-pointer space-x-2 p-2 lg:px-6 lg:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <Edit3 className="w-2 h-2 lg:w-4 lg:h-4" />
              <span className='hidden xl:inline'>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit(update)} className="bg-white/95 relative backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
      
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
          <h3 className="text-xl font-bold text-white flex items-center space-x-3">
            <User className="w-6 h-6" />
            <span>Account Information</span>
          </h3>
          <p className="text-blue-100 mt-2">Update your personal information and security settings</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Username Field */}
          <div className="group">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
              <User className="w-4 h-4 text-blue-600" />
              <span>Username</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="username"
                {...register("username")}
                disabled={!isEditing}
                className={`w-full px-6 py-4 rounded-2xl border-2 font-medium transition-all duration-300 text-gray-800 bg-gray-50/50 ${
                  isEditing 
                    ? 'border-gray-200 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10 hover:border-blue-300' 
                    : 'border-gray-100 cursor-not-allowed opacity-75'
                }`}
                placeholder="Enter your username"
              />
              {errors.username && <p className='text-sm text-red-500'>{errors.username.message}</p>}
              {isEditing && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Edit3 className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="group">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Email Address</span>
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                {...register("email")}
                disabled={!isEditing}
                className={`w-full px-6 py-4 rounded-2xl border-2 font-medium transition-all duration-300 text-gray-800 bg-gray-50/50 ${
                  isEditing 
                    ? 'border-gray-200 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10 hover:border-blue-300' 
                    : 'border-gray-100 cursor-not-allowed opacity-75'
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
              {isEditing && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Edit3 className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Password Section */}
          {isEditing && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-100">
              <h4 className="font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <Lock className="w-5 h-5 text-orange-600" />
                <span>Change Password</span>
              </h4>
              
              <div className="space-y-6">
                {/* New Password */}
                <div className="group">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <Lock className="w-4 h-4 text-orange-600" />
                    <span>New Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      {...register("newPassword")}
                      className="w-full px-6 py-4 pr-14 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:bg-white focus:shadow-lg focus:shadow-orange-500/10 hover:border-orange-300 transition-all duration-300 font-medium text-gray-800 bg-white/80"
                      placeholder="Enter your new password"
                    />
                    {errors.newPassword && <p className='text-sm text-red-500'>{errors.newPassword.message}</p>}
                    {error && <p className='text-sm text-red-500'>{error}</p>}
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors duration-200"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
              
                {success && <p className='text-sm text-green-500'>{success}</p>}
            
            </div>
          )}

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  // Reset form data if needed
                }}
                className="px-8 py-3 cursor-pointer text-gray-700 font-semibold rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center cursor-pointer space-x-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                <Save className="w-5 h-5" />
                <span>{loading ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
    </>
  );
}

export default ProfileForm;