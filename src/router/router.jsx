import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout.jsx";
import Login from "../components/Login.jsx";
import UserList from "../components/userList.jsx";

import BuildNew from "../componentsForHome/BuildNew.jsx";
import Offers from "../componentsForHome/Offers.jsx";
import CustomersOverview from "../componentsForHome/CustomersOverview.jsx";
import AddCustomer from "../componentsForHome/AddCustomer.jsx";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      children: [
        { index: true, Component: UserList },
        { path: "login", Component: Login },

        {
          path: "home",
          element: <HomeLayout />, // ✅ important change
          children: [
            { index: true, Component: CustomersOverview }, // choose your default
            { path: "create", Component: BuildNew },
            { path: "quotes", Component: Offers },
            { path: "customers", Component: CustomersOverview },
            { path: "add-customer", Component: AddCustomer },
          ],
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);