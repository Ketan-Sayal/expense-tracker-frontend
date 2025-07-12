import { Mail, Phone, MessageCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactSchema } from "../../lib/validation";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from '@emailjs/browser';
import { config } from "../../config";

function ContactSupport() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:yupResolver(ContactSchema),
    defaultValues:{
      name:"",
      email:"",
      message:""
    }
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef();
  const contact = async(data)=>{
    // console.log(data);
    setLoading(true);
    try {
      await axios.post("/api/contact", data);

       await emailjs.send(config.emailjsServiceId, config.emailjsTemplateId, {name:data.name, email:data.email, message:data.message}, {
        publicKey: config.emailjsPublicKey,
      });
      
      await emailjs.send(config.emailjsServiceId, config.emailjsTemplateSecoundId, {name:data.name, email:data.email, message:data.message}, {
        publicKey: config.emailjsPublicKey,
      });
      // console.log(result);
      navigate("/");
      
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
    
  }
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-3xl shadow-xl py-12 px-6">
      <div className="max-w-xl w-full bg-white/90 rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-4 rounded-2xl shadow-xl mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent text-center">
            Contact Support
          </h2>
          <p className="text-gray-600 mt-3 text-center">
            Need help or have questions? Reach out to our support team and we'll get back to you as soon as possible.
          </p>
        </div>
        <form ref={formRef} className="space-y-6" onSubmit={handleSubmit(contact)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              {...register("name")}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-200 outline-none transition"
              placeholder="Your Name"
            />
            {errors.name && <p className='text-sm text-red-400 mt-2'>{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              {...register("email")}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-200 outline-none transition"
              placeholder="you@example.com"
            />
            {errors.email && <p className='text-sm text-red-400 mt-2'>{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              {...register("message")}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-200 outline-none transition resize-none"
              placeholder="How can we help you?"
            />
            {errors.message && <p className='text-sm text-red-400 mt-2'>{errors.message.message}</p>}
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full cursor-pointer py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            {loading?"Sending...":"Send Message"}
          </button>
        </form>
        <div className="mt-10 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="w-5 h-5 text-blue-600" />
            <span>ketansayal04@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Phone className="w-5 h-5 text-blue-600" />
            <span>+91 86999 55736</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSupport;
