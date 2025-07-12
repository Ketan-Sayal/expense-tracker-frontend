import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useLocation } from "react-router-dom";
import  Loader  from "../lib/ui/shared/Loader";

const AuthContext = createContext({
    user:null,
    setUser:()=>{},
    isLoggedIn:false,
    setIsLoggedIn:()=>{}
});

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const {pathname} = useLocation();

    useEffect(()=>{
        setLoading(true);
        const token = Cookies.get("token");// The unndefined  error for the cookie is due to httpOnly property sent by the server.[make it false always]
        // console.log(token);
        
        if(token){
            axios.get("/api/users/", {headers:{"token":token}}).then((res)=>{
                setUser(res.data.data.user);
                setIsLoggedIn(true);
                setLoading(false);
            }).catch(err=>{
                setLoading(false);
                console.log(err);
                
            })
        }else{
            setUser(null);
            setIsLoggedIn(false);
            setLoading(false);
        }
    }, [pathname]);
    // console.log(isLoggedIn);
    // console.log(Cookies.get("token", {decode:true}));
    // console.log(document.cookie);
    
    return(
        <AuthContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
            {loading?<Loader loading={loading}/>:(children)}
        </AuthContext.Provider>
    )
}

export const useAuthContext = ()=>{
    return useContext(AuthContext);
}