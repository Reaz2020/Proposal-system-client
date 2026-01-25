import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster } from "react-hot-toast";
import AuthProvider from './components/AuthContext.jsx';

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <Toaster />
  
    
  
   
    </>
  )
}

export default App
