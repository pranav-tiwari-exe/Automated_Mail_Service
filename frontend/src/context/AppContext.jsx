import { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';

const AppContext = createContext(null);

const AppProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState("");  
    const [success, setSuccess] = useState("");
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [picture, setPicture] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        if (error) toast.error(error);
        setError("")
    }, [error])

    useEffect(() => {
        if (success) toast.success(success);
        setSuccess("")
    }, [success])
 
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const value = {
        isLogin,
        setIsLogin,
        error,
        setError,
        success,
        setSuccess,
        email,
        setEmail,
        name,
        setName,
        picture,
        setPicture,
        theme,
        setTheme,
        isLoading,
        setIsLoading
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);

export default AppProvider;