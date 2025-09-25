import { useEffect, useState } from 'react'
import { useAppContext } from './context/AppContext'
import { ToastContainer } from 'react-toastify';
import axios from 'axios'

import LoginComponent from './components/LoginComponent.jsx'
import NavBar from './components/NavBar.jsx'
import Engine from './components/Engine.jsx';
import Loading from './components/loading.jsx';

function App() {
  const { isLogin, isLoading, setIsLoading, setIsLogin, setError, setEmail, setName, setPicture, setSuccess } = useAppContext();
  const baseBackendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    const recover = params.get('recovery_needed');
    const saved=params.get('saved');

    window.history.replaceState({}, '', window.location.pathname);

    if (recover == 1) {
      setIsLoading(false)
      setError("Session Expired : Redirecting in 5 seconds...")
      setTimeout(() => {
        window.location.href = `${baseBackendUrl}/authentication_needed`;
      }, 5000);
      return;
    }
    if (saved == 1){
      setIsLoading(false)
      setSuccess(<div>Reautorization Successful :<br/>Login to continue </div>)
      return
    }

    if (status === 'error') {
      const message = params.get('message');
      setError(message || "An unknown login error occurred.");
    } else {
      fetchUserData();
    }
    setIsLoading(false);
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${baseBackendUrl}/user`, { withCredentials: true });
      if (res.data.recovery_needed) {
        setError("Session Expired :Redirecting in 5 seconds...")
        setTimeout(() => {
          window.location.href = `${baseBackendUrl}/authentication_needed`;
        }, 5000);
        return;
      }
      if (res.data.user) {
        setIsLogin(true);
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setPicture(res.data.user.picture);
      } else {
        setIsLogin(false);
      }
    } catch (err) {
      setError("Could not connect to the server. Please try again later.");
      setIsLogin(false);
    }
  };

  const login = () => { window.location.href = `${baseBackendUrl}/login` };

  return (
    <div className="sm:mx-0 md:mx-10 lg:mx-20 xl:mx-40 select-none">
      {isLoading && <Loading />}
      <NavBar />
      <ToastContainer />
      {(!isLogin) ? (
        <div className='h-full flex justify-center items-center'>
          <LoginComponent login={login} />
        </div>

      ) :
        (
          <Engine />
        )}

    </div>
  )
}

export default App
