import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";
import ProfileView from "./ProfileView.jsx";
import LogoutComponent from "./LogoutComponent.jsx";

const NavBar = () => {
    const { theme, setTheme } = useAppContext();
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
        <div className="px-4 py-6 flex justify-between items-center rounded-lg">
            <ProfileView />
            <div className="flex items-center gap-4">
                <LogoutComponent />
                <button onClick={toggleTheme} className=" rounded-full p-3">
                    <img src={(theme == "dark") ? assets.lightModeIcon : assets.darkModeIcon} alt="Toggle Theme" className="h-6 w-6" />
                </button>
            </div>

        </div>
    )
}

export default NavBar;