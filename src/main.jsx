import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import {router } from "./router/router.jsx";
import AuthProvider from "./components/AuthContext.jsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Toaster } from "react-hot-toast";



createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <div className="max-w-7xl mx-auto">
        <RouterProvider router={router} />
      </div>
       <Toaster  toastOptions={{
          style: {
            fontSize: "16px",
            padding: "18px 20px",
            borderRadius: "12px",
            minWidth: "430px",
            minHeight: "260px",
            marginTop: "280px",
          },
        }}/>
    </AuthProvider>
  </StrictMode>,
)




