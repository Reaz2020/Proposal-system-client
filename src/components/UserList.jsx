import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import API_BASE from "../Config";
import { AuthContext } from "./AuthContext";
import UserDetail from "./UserDetail";
import AddUser from "./AddUser";

function UserList({ currentUser }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [usersLoading, setUsersLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setUsersLoading(true);

    fetch(`${API_BASE}/get_users.php`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.users)) {
          setUsers(data.users);
        }
      })
      .catch((err) => console.error("Error fetching users:", err))
      .finally(() => setUsersLoading(false));
  }, []);

  if (usersLoading) return <p className="text-center mt-6">Loading users...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-center mb-6">
        User List, current user: {user?.name} ({user?.role})
      </h2>

      {/* Add user button */}
      <div className="flex justify-center mb-6">
        <button
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full"
          onClick={() => setShowAddModal(true)}
        >
          Add user
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr>
              {["ID", "Name", "Email", "Role", "Status", "Action"].map((header) => (
                <th
                  key={header}
                  className="bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-full text-center"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="bg-gray-100 rounded-full px-4 py-2">{user.id}</td>

                {/* Clickable name -> navigates to Home layout */}
                <td
                  className="bg-gray-100 rounded-full px-4 py-2 cursor-pointer hover:underline font-medium"
                  onClick={() =>
                    navigate("/home", { state: { userId: user.id, user } })
                  }
                >
                  {user.name}
                </td>

                <td className="bg-gray-100 rounded-full px-4 py-2">{user.email}</td>
                <td className="bg-gray-100 rounded-full px-4 py-2">{user.role || "-"}</td>
                <td className="bg-gray-100 rounded-full px-4 py-2">{user.status || "-"}</td>

                <td className="bg-gray-100 rounded-full px-4 py-2 flex justify-center">
                  <button
                    className="text-gray-500 hover:text-red-700"
                    title="Edit user"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowEditModal(true);
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <p className="text-center text-gray-500 mt-6">Total users: {users.length}</p>

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div
            className={`bg-white rounded-lg w-[60%] h-[80%] p-6 overflow-auto transform transition-all duration-300 ease-out pointer-events-auto 
            ${showEditModal ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <UserDetail
              user={selectedUser}
              onClose={() => setShowEditModal(false)}
              onUserUpdated={(updatedUser) => {
                setUsers((prev) =>
                  prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
                );
              }}
            />
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div
            className={`bg-white rounded-lg w-[60%] h-[80%] p-6 overflow-auto transform transition-all duration-300 ease-out pointer-events-auto 
            ${showAddModal ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <AddUser onClose={() => setShowAddModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
