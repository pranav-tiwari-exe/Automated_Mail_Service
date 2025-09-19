import { useAppContext } from "../context/AppContext";

const LogoutComponent = () => {

    const { isLogin, setIsLogin, baseBackendUrl } = useAppContext();
    const logout = () =>{
        window.location.href = `${baseBackendUrl}/logout`
        setIsLogin(false);   
    }

    return (
        <>
        {isLogin && (
            <button onClick={logout} style={{ background:"var(--shade1)" }} className="px-4 py-1 text-sm rounded-full">
                Logout
            </button>
            )
        }
        </>
    )
}

export default LogoutComponent;