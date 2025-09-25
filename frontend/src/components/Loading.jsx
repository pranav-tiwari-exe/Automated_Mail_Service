import { assets } from "../assets/assets"
import { useAppContext } from "../context/AppContext"

const Loading = (props) => {
  const {theme} = useAppContext();
  return (
    <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center backdrop-blur select-none z-50">
      <img src={theme==='light' ? assets.loadingLight :assets.loadingDark } alt="Loading..."/>
    </div>
  )
}

export default Loading;