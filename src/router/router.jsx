import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout.jsx";
import Login from "../components/Login.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import UserList from "../components/userList.jsx";

import BuildNew from "../componentsForHome/BuildNew.jsx";
import Offers from "../componentsForHome/Offers.jsx";
import Customer from "../componentsForHome/AddCustomer.jsx";
import CustomersOverview from "../componentsForHome/CustomersOverview.jsx";
import AddCustomer from "../componentsForHome/AddCustomer.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      // Landing page: User List
      { index: true, Component: UserList },

      // Public login page
      { path: "login", Component: Login },

      // Protected Home Layout
      {
        path: "home",
        Component: () => (
          <ProtectedRoute>
            <HomeLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, Component: Customer }, // default inside home
      
          { path: "create", Component: BuildNew },
          { path: "quotes", Component: Offers },
          { path: "customers", Component: CustomersOverview },
          { path: "add-customer", Component: AddCustomer},

        ],
      },
    ],
  },
]);
