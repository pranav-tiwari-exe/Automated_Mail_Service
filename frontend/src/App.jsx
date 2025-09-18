import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [data, setdata] = useState("hello")

  useEffect(() => {
    axios.get('http://localhost:8000/').then((response) => {
      setdata(response.data.message)
      console.log(response.data)
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [])

  return (
    <>
      <a href="http://localhost:8000/login">
        <button className="text-3xl font-bold underline text-blue-600 hover:text-blue-800">
          Hello, Tailwind!
        </button>
      </a>

      <h1 className="text-3xl font-bold underline text-blue-600 hover:text-blue-800">{data}</h1>
    </>
  )
}

export default App
