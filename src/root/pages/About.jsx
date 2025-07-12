import React from 'react';
import { DollarSign, ArrowRight, Star, CheckCircle, Globe, Shield, Lock } from 'lucide-react';
import { testimonials, features, benefits, stats, pricingFeatures } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-200/40 to-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-200/40 to-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-200/30 to-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-700"></div>
                <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 rounded-3xl shadow-2xl transform hover:scale-110 transition-all duration-500">
                  <DollarSign className="w-20 h-20 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent">
                Transform Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 bg-clip-text text-transparent">
                Financial Life
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Take control of your money with the most beautiful and intelligent expense tracking platform. 
              Make smarter financial decisions with good insights and stunning visual reports - completely free forever.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button 
              onClick={()=>navigate("/login")}
              className="group relative cursor-pointer px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300">
                <span className="relative z-10 flex items-center space-x-3">
                  <span>Start Free Forever</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="px-8 py-4 cursor-pointer text-gray-700 font-semibold rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats && stats.map((stat, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                      {stat.icon && React.createElement(stat.icon, { className: "w-6 h-6 text-white" })}
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 text-center">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium text-center">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to master your finances, beautifully designed and intelligently crafted.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features && features.map((feature, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 h-full">
                  <div className="mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color || 'from-blue-500 to-purple-500'} shadow-lg`}>
                      {feature.icon && React.createElement(feature.icon, { className: "w-8 h-8 text-white" })}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section with Mock Screenshots */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-40 left-10 w-64 h-64 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 right-10 w-80 h-80 bg-gradient-to-r from-purple-200/20 to-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                See It In Action
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the power of intelligent financial management with our intuitive interface.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {benefits && benefits.map((benefit, index) => (
              <div key={index} className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/30">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="text-6xl">{benefit.image}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                        {benefit.icon && React.createElement(benefit.icon, { className: "w-6 h-6 text-blue-600" })}
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                Loved by Thousands
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of users who have transformed their financial lives with ExpenseTracker.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials && testimonials.map((testimonial, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 h-full">
                  <div className="flex items-center space-x-1 mb-6">
                    {testimonial.rating && [...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-bold text-gray-800">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Plan Section */}
      <section className="py-20 bg-gradient-to-br from-green-50/50 to-blue-50/50 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-green-200/30 to-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent">
              100% Free Forever
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Get complete access to ExpenseTracker with all premium features. No hidden costs, no subscriptions, no catch.
          </p>

          <div className="relative group max-w-md mx-auto">
            <div className="absolute -inset-2 bg-gradient-to-r from-green-600 via-blue-600 to-indigo-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/30">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">Free Plan</h3>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">$0</span>
                  <span className="text-gray-600">/forever</span>
                </div>
                <p className="text-green-600 font-semibold mt-2">No credit card required</p>
              </div>

              <div className="space-y-4 mb-8">
                {pricingFeatures && pricingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
              onClick={()=>navigate("/login")}
              className="w-full group relative cursor-pointer px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-green-500/40 transform hover:scale-105 transition-all duration-300">
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <span>Start Free Forever</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent">
              Ready to Transform Your Finances?
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who are already making smarter financial decisions with ExpenseTracker - completely free. 
            Start your journey to financial freedom today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
            onClick={()=>navigate("/login")}
            className="group relative cursor-pointer px-10 py-5 bg-gradient-to-r from-green-600 to-blue-600 text-white text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-green-500/40 transform hover:scale-105 transition-all duration-300">
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <span>Get Started Free</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button 
            onClick={()=>navigate("/contact")}
            className="px-10 py-5 text-gray-700 cursor-pointer text-lg font-semibold rounded-2xl border-2 border-gray-200 hover:border-green-300 hover:text-green-700 hover:bg-green-50 transition-all duration-300 transform hover:scale-105">
              Contact Support
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Available Worldwide</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Bank-Level Security</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;