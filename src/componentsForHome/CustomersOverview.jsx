import React from "react";
import Offers from "./Offers.jsx";
import { useNavigate } from "react-router-dom";


const CustomersOverview = ({ customers}) => {
    const navigate = useNavigate();
  return (
    <section className="bg-gray-50 p-6 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Kundöversikt</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="py-2 px-3">Kundnummer</th>
              <th className="py-2 px-3">Bolagsnamn</th>
              <th className="py-2 px-3">Organisationsnr</th>
              <th className="py-2 px-3">Offerter</th>
              <th className="py-2 px-3"></th>
            </tr>
          </thead>

          <tbody>
            {customers?.map((customer) => (
              <tr
                key={customer.kundnr}
                className="border-b hover:bg-gray-50"
              >
                {/* Kundnummer */}
                <td className="py-2 px-3">
                  <button
                    onClick={() => console.log("Open customer", customer.kundnr)}
                    className="text-blue-600 hover:underline"
                  >
                    {customer.kundnr}
                  </button>
                </td>

                {/* Bolagsnamn */}
                <td className="py-2 px-3">
                  <button
                    onClick={() =>
                      console.log("Open company", customer.bolagsnamn)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    {customer.bolagsnamn}
                  </button>
                </td>

                {/* Organisationsnr */}
                <td className="py-2 px-3">
                  {customer.organisationsnr}
                </td>

                {/* Offerter */}
                <td className="py-2 px-3">
                  <Offers offers={customer.offers} />
                </td>

                {/* Edit icon */}
                <td className="py-2 px-3 text-right">
                  <button
                    onClick={() => console.log("Edit", customer.kundnr)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="mt-6 px-5 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600" onClick={() => navigate("/home/add-customer")}>
        Lägg till ny
      </button>
    </section>
  );
};

export default CustomersOverview;
