import { createContext, useState, useEffect } from "react";
import API_BASE from "../Config.js";
import Swal from "sweetalert2";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    // Floors state moved here
  // const [floors, setFloors] = useState([]);
  const [floorsFromServer, setFloorsFromServer] = useState([]);
  // const [activeFloor, setActiveFloor] = useState(null);
  const [floors, setFloors] = useState(() => {
  const saved = localStorage.getItem("floorsList");
  return saved ? JSON.parse(saved) : [""];
});

const [activeFloor, setActiveFloor] = useState(floors[0]);


  

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!user;

  // Check session on mount
  useEffect(() => {
    checkSession();
  }, []);

  // ✅ Check if user session exists
  const checkSession = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/check_session.php`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success || data.loggedIn) setUser(data.user);
    } catch (err) {
      console.error("check_session error", err);
    } finally {
      setLoading(false);
    }
  };

// const handleLogin = async (userNumber, password) => {
//   setLoading(true);
//   try {
//     const res = await fetch(`${API_BASE}/login.php`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ userNumber, password }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       setUser(data.user);

//       // 🎉 Show login success popup
//       Swal.fire({
//         title: "Login Successful!",
//         html: `
//           <strong>Name:</strong> ${data.user.name} <br>
//           <strong>User number:</strong> ${data.user?.id} <br>
//           <strong>Role:</strong> ${data.user.role}
//         `,
//         icon: "success",
//         confirmButtonText: "Continue",
//         confirmButtonColor: "#3085d6",
//       });

//       return { success: true };
//     } else {
//       return { success: false, message: data.message };
//     }
//   } catch (err) {
//     console.error("login error", err);
//     return { success: false, message: "Network error", err };
//   } finally {
//     setLoading(false);
//   }
// };

const handleLogin = async (userNumber, password) => {
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE}/login.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userNumber, password }),
    });

    const data = await res.json();

    if (data.success) {
      setUser(data.user); // store logged-in user in context

      // Show login success popup
      Swal.fire({
        title: "Login Successful!",
        html: `
          <strong>Name:</strong> ${data.user.name} <br>
          <strong>User number:</strong> ${data.user?.id} <br>
          <strong>Role:</strong> ${data.user.role}
        `,
        icon: "success",
        confirmButtonText: "Continue",
        confirmButtonColor: "#3085d6",
      });

      // ✅ Return user here so LoginPage can check role
      return { success: true, user: data.user };
    } else {
      return { success: false, message: data.message };
    }
  } catch (err) {
    console.error("login error", err);
    return { success: false, message: "Network error", err };
  } finally {
    setLoading(false);
  }
};



const handleLogout = async () => {
  setFloorsFromServer([]);
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You are about to log out. Any unsaved floor data will be cleared.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, log me out',
    cancelButtonText: 'Cancel',
  });

  if (!result.isConfirmed) return;

  setLoading(true);

  try {
    const res = await fetch(`${API_BASE}/logout.php`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    alert("logout data", data);
    console.log("logout data", data.success);

  if (data.success) {
  localStorage.removeItem("floorsList");

  const keysToRemove = [];
  Object.keys(localStorage).forEach(key => {
    if (
      key.startsWith("floorData_") ||
      key === "floorsList" ||
      key === "activeFloor"
    ) {
      keysToRemove.push(key);
    }
  });
  keysToRemove.forEach(k => localStorage.removeItem(k));

  // 🟢 Reset states so useEffects do NOT repopulate localStorage
  setFloors([]);
  setActiveFloor(null);
  setFloorsFromServer([]);   // (you already set this before confirmation)

  setUser(null);

  localStorage.setItem("logout_event", Date.now().toString());
}

  } catch (err) {
    console.error("logout error", err);
  } finally {
    setLoading(false);
  }
};




  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        handleLogin,
        handleLogout, 
        floorsFromServer,
        setFloorsFromServer, 
        isLoggedIn, floors,
    setFloors,
    activeFloor,
    setActiveFloor
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
