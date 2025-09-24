import { useAppContext } from "../context/AppContext";

const LogoutComponent = () => {

    const { isLogin, setIsLogin, setEmail, setName, setPicture } = useAppContext();
    const baseBackendUrl = import.meta.env.VITE_BACKEND_URL;

    const logout = () => {
        window.location.href = `${baseBackendUrl}/logout`
        setEmail(null);
        setName(null);
        setPicture(null);
        setIsLogin(false);
    }

    return (
        <>
            {isLogin && (
                <button onClick={logout} style={{ background: "var(--secondary)" }} className="px-4 py-1 text-sm rounded-full">
                    Logout
                </button>
            )
            }
        </>
    )
}

export default LogoutComponent;