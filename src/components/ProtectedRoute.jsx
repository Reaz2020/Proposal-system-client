// import { useContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../components/AuthContext.jsx";
// import Spinner from "../components/Spinner.jsx";

// export default function PrivateRoute({ children }) {
//   const { user, loading } = useContext(AuthContext);
//   const [delayed, setDelayed] = useState(true);

//   // useEffect(() => {
//   //   const timer = setTimeout(() => setDelayed(false), 1000);
//   //   return () => clearTimeout(timer);
//   // }, []);

//   // Show spinner while loading or delay active
//   if (loading ) {
//     return <Spinner />;
//   }

//   // After 3 sec, no user → redirect
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }


import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext.jsx";
import Spinner from "../components/Spinner.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

