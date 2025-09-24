import { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';

const AppContext = createContext(null);

const AppProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [picture, setPicture] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const baseBackendUrl = "http://localhost:8000";

    useEffect(() => {
        if (error) toast.error(error);
        setError("")
    }, [error])

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const value = {
        isLogin,
        setIsLogin,
        baseBackendUrl,
        error,
        setError,
        email,
        setEmail,
        name,
        setName,
        picture,
        setPicture,
        theme,
        setTheme
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);

export default AppProvider;