import React, { useEffect, useState } from "react";
import Offers from "./Offers.jsx";
import { useNavigate } from "react-router-dom";
import API_BASE from "../Config";
import { toast } from "react-hot-toast";

const CustomersOverview = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/get_customers.php`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCustomers(data.data);
        } else {
          console.error(data.message);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleOfferClick = (offers, idx) => {
    if (!offers || offers.length === 0) {
      toast("No offers yet", { duration: 500 }); // auto closes after 2 seconds
      return;
    }
    console.log("Open offer", idx);
  };

  if (loading) {
    return (
      <section className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Kundöversikt</h2>
        <p>Loading...</p>
      </section>
    );
  }

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
            {customers?.map((customer, index) => {
              const offers = customer.offers ?? [];
              const bgClass = index % 2 === 0 ? "bg-white" : "bg-gray-100";

              return (
                <tr key={customer.kundnr} className={`${bgClass} border-b`}>
                  <td className="py-2 px-3">
                    <button
                      onClick={() =>
                        console.log("Open customer", customer.kundnr)
                      }
                      className="text-blue-600 hover:underline"
                    >
                      {customer.kundnr}
                    </button>
                  </td>

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

                  <td className="py-2 px-3">{customer.organisationsnr}</td>

                  <td className="py-2 px-3">
                    {offers.length === 0 ? (
                      <button
                        onClick={() => handleOfferClick(offers, 0)}
                        className="text-blue-600 hover:underline"
                      >
                        [0]
                      </button>
                    ) : (
                      offers.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOfferClick(offers, idx)}
                          className="text-blue-600 hover:underline mr-2"
                        >
                          [{idx}]
                        </button>
                      ))
                    )}
                  </td>

                  <td className="py-2 px-3 text-right">
                    <button
                      onClick={() => console.log("Edit", customer.kundnr)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✏️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        className="mt-6 px-5 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
        onClick={() => navigate("/home/add-customer")}
      >
        Lägg till ny
      </button>
    </section>
  );
};

export default CustomersOverview;
