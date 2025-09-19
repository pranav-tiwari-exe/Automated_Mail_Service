import { assets } from "../assets/assets";

const LoginComponent = (props) => {
    return (
        <button
            onClick={props.login}
            className="flex items-center justify-center gap-3 px-5 py-3  border-3 rounded-full  text-base font-semibold transition-all duration-150 active:scale-95 sm:text-lg sm:px-6 sm:py-4 sm:gap-4 hover:scale-105"
            style={{
                background: "var(--secondary)",
                color: "var(--text)",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)"
            }}
        >
            <img
                className="w-6 h-6 sm:w-8 sm:h-8"  
                src={assets.google96x96}
                alt="Google Sign-In"
            />
            Continue with Google
        </button>
    )
}

export default LoginComponent;