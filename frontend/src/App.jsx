import { useEffect } from 'react'
import { useAppContext } from './context/AppContext'
import { ToastContainer } from 'react-toastify';
import axios from 'axios'

import LoginComponent from './components/LoginComponent.jsx'
import NavBar from './components/NavBar.jsx'
import Engine from './components/Engine.jsx';

function App() {
  const { isLogin, setIsLogin, baseBackendUrl, setError, setEmail, setName, setPicture } = useAppContext();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    const message = params.get('message');

    if (status === 'success') {
      setError("");
    }
    else if (status === 'error') {
      setIsLogin(false);
      setError(message);
    }
    fetchUserData();
    window.history.replaceState({}, '', window.location.pathname);
  }, [])

  const fetchUserData = async () => {
    await axios.get(`${baseBackendUrl}/user`, { withCredentials: true }).then((res) => {
      if (res.data.user) {
        setIsLogin(true);
        setEmail(res.data.user.email);
        setName(res.data.user.name);
        setPicture(res.data.user.picture);
      } else {
        setIsLogin(false);
        setEmail(null);
        setName(null);
        setPicture(null);
      }
    }).catch((err) => {
      setError(err.message);
      console.error(err);
    })
  }

  const login = () => window.location.href = `${baseBackendUrl}/login`

  return (
    <div className="sm:mx-0 md:mx-10 lg:mx-20 xl:mx-40">
      <NavBar />
      <ToastContainer />
      {(!isLogin) ? (
        <div className='h-full flex justify-center items-center'>
          <LoginComponent login={login} />
        </div>

      ) :
        (
          <Engine/>
        )}

    </div>
  )
}

export default App
