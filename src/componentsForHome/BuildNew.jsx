import { useState  , useEffect , useContext } from "react";
import API_BASE from "../Config";
import { AuthContext } from "../components/AuthContext";

export default function BuildNew() {
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [reviewData, setReviewData] = useState(null);
  const [skipCustomerInfo, setSkipCustomerInfo] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [users, setUsers] = useState([]);


  const collectFormData = () => {
    const container = document.querySelector(".build-new-form");
    const inputs = Array.from(container.querySelectorAll("input"));
    const selects = Array.from(container.querySelectorAll("select"));

    const data = [];

    inputs.forEach((el) => {
      if (el.type === "checkbox") {
        data.push({
          label: el.nextSibling?.textContent?.trim() || "Checkbox",
          value: el.checked ? "Ja" : "Nej",
        });
      } else if (el.disabled) {
        data.push({
          label: el.value,
          value: "—",
        });
      } else if (el.placeholder) {
        data.push({
          label: el.placeholder,
          value: el.value || "—",
        });
      }
    });

    selects.forEach((el) => {
      data.push({
        label: "Val",
        value: el.value,
      });
    });

    return data;
  };

  const collectFormDataForAPI = () => {
    const container = document.querySelector(".build-new-form");
    const inputs = Array.from(container.querySelectorAll("input"));
    const selects = Array.from(container.querySelectorAll("select"));

    const payload = {};

    inputs.forEach((el) => {
      if (el.type === "checkbox") {
        payload[el.name] = el.checked ? 1 : 0;
      } else if (el.name) {
        payload[el.name] = el.value === "" ? null : el.value;  // <-- CHANGE HERE
      }
    });

    selects.forEach((el) => {
      if (el.name) {
        payload[el.name] = el.value === "" ? null : el.value;  // <-- CHANGE HERE
      }
    });
     // 🔽 NEW LINE ADDED — new field, default 0 (backend-safe)
    payload.measurement_points = payload.measurement_points ?? 0;

    return payload;
  };

  const saveOffer = async () => {
    const payload = collectFormDataForAPI();

    try {
      const res = await fetch(`${API_BASE}/save_offer.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Error saving offer");
      }

      return data;
    } catch (error) {
      console.error("Save offer failed:", error);
      throw error;
    }
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    setReviewData(collectFormData());
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalType("");
    setReviewData(null);
  };


  const applyDiscount = (priceName, discountValue) => {
  const priceInput = document.querySelector(`input[name="${priceName}"]`);
  if (!priceInput) return;

  const original = parseFloat(priceInput.dataset.original ?? priceInput.value);
  if (isNaN(original)) return;

  priceInput.dataset.original = original;

  const discount = parseFloat(discountValue);
  if (isNaN(discount)) return;

  const discountedPrice = original - (original * discount) / 100;
  priceInput.value = Math.max(0, discountedPrice.toFixed(2));
};

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
    <div className="p-8 max-w-5xl build-new-form">
        <p>USER :{user?.id}</p>
      <h1 className="text-2xl font-semibold mb-6">Skapa nytt</h1>

      {/* Kundinformation */}
      <section className="mb-8">
        <h2 className="font-medium mb-2">Kundinformation</h2>

        <label className="flex items-center gap-2 mb-4 text-sm">
          <input
  type="checkbox"
  name="skip_customer_info"
  checked={skipCustomerInfo}
  onChange={(e) => setSkipCustomerInfo(e.target.checked)}
/>

          <span>Ange ej kundinformation</span>
        </label>

{!skipCustomerInfo && (
  <div className="grid grid-cols-2 gap-4">
    <input name="customer_id" placeholder="Kund-ID" className="input" />
    <input name="offer_number" placeholder="Offertnummer" className="input" />
    <input name="customer_name" placeholder="Kundnamn" className="input" />
    <input name="vat_number" placeholder="Organisationsnummer / VAT" className="input" />
    <input name="contact_person" placeholder="Kontaktperson" className="input" />
    <input name="address" placeholder="Adress" className="input" />
    <input name="postal_code" placeholder="Postnummer" className="input" />
    <input name="city" placeholder="Ort" className="input" />
    <input name="country" placeholder="Land" className="input col-span-2" />
  </div>
)}

      </section>

      {/* Avtalsinformation */}
{/* Avtalsinformation */}
{/* Avtalsinformation */}
<section className="mb-8">
  <h2 className="font-medium mb-4">Avtalsinformation</h2>

  <div className="space-y-4">

<div className="flex items-center gap-4">
  <label className="w-56 text-sm">offer_valid_days</label>
  <select
    name="offer_valid_days"
    className="input w-1/2"
  >
    <option value="14">14</option>
    <option value="30">30</option>
  </select>
</div>


    <div className="flex items-center gap-4">
      <label className="w-56 text-sm">start_date</label>
      <input
        name="start_date"
        type="date"
        className="input w-1/2"
      />
    </div>

    <div className="flex items-center gap-4">
      <label className="w-56 text-sm">contract_length_months</label>
      <select
        name="contract_length_months"
        className="input w-1/2"
      >
        <option value="36">36 månader</option>
        <option value="24">24 månader</option>
        <option value="12">12 månader</option>
      </select>
    </div>

    <div className="flex items-center gap-4">
      <label className="w-56 text-sm">contract_type</label>
      <select
        name="contract_type"
        className="input w-1/2"
      >
        <option value="Köp">Köp</option>
        <option value="Hyra">Hyra</option>
      </select>
    </div>

    <div className="flex items-center gap-4">
      <label className="w-56 text-sm">billing_period</label>
      <select
        name="billing_period"
        className="input w-1/2"
      >
        <option value="Årsvis">Årsvis</option>
        <option value="Månadsvis">Månadsvis</option>
      </select>
    </div>

  </div>
</section>




      {/* Paketinformation */}
      <section className="mb-8">
        <h2 className="font-medium mb-4">Paketinformation</h2>

        <div className="grid grid-cols-4 gap-4 mb-2 text-sm font-medium">
          <span>Produkt</span>
          <span>Antal</span>
          <span>Pris</span>
          <span>Rabatt</span>
        </div>
        {/* 🔽 NEW FIELD: storlek (mätpunkter) */}
<div className="grid grid-cols-4 gap-4 mb-2">
  <label className="text-sm font-medium">storlek</label>

  <div className="relative">
    <input
      name="storlek"
      type="number"
      defaultValue={0}
      className="input pr-24"
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 ">
      - mätpunkter
    </span>
  </div>

  <span className="text-sm font-medium">—</span>
  <span className="text-sm font-medium">—</span>
</div>


        {[
          { label: "60/200/600A CTs", quantity: "cts_quantity", price: "cts_price", discount: "cts_discount" },
          { label: "ELW Gateways", quantity: "gateways_quantity", price: "gateways_price", discount: "gateways_discount" },
          { label: "HAN-port", quantity: "han_port_quantity", price: "han_port_price", discount: "han_port_discount" },
          { label: "Temp & Humid.", quantity: "temp_humid_quantity", price: "temp_humid_price", discount: "temp_humid_discount" },
          { label: "Air Quality sensor", quantity: "air_quality_quantity", price: "air_quality_price", discount: "air_quality_discount" },
        ].map((item) => (
          <div key={item.label} className="grid grid-cols-4 gap-4 mb-2">
            <input value={item.label} disabled className="input bg-gray-100" />
            <input name={item.quantity} placeholder="0" className="input" />
            <input name={item.price} placeholder="kr" className="input" />
            <input name={item.discount} placeholder="%" className="input"  onChange={(e) =>
    applyDiscount(item.price, e.target.value)
  } />
          </div>
        ))}
      </section>

      {/* Tjänster */}
      <section className="mb-8">
        <h2 className="font-medium mb-4">Tjänster</h2>

        <div className="space-y-2">
          {[
            { name: "Baspaket", checkboxName: "baspaket_enabled", disabled: true, oneTime: "baspaket_one_time", monthly: "baspaket_monthly", discount: "baspaket_discount" },
            { name: "Konfiguration", checkboxName: "configuration_enabled", oneTime: "configuration_one_time", monthly: "configuration_monthly", discount: "configuration_discount" },
            { name: "Frakt", checkboxName: "shipping_enabled", oneTime: "shipping_one_time", monthly: "shipping_monthly", discount: "shipping_discount" },
            { name: "Energinsikter", checkboxName: "energy_insights_enabled", oneTime: "energy_insights_one_time", monthly: "energy_insights_monthly", discount: "energy_insights_discount" },
            { name: "Produktionspaket", checkboxName: "production_package_enabled", oneTime: "production_package_one_time", monthly: "production_package_monthly", discount: "production_package_discount" },
            { name: "API", checkboxName: "api_enabled", oneTime: "api_one_time", monthly: "api_monthly", discount: "api_discount" },
            { name: "Högupplöst data", checkboxName: "high_res_data_enabled", oneTime: "high_res_data_one_time", monthly: "high_res_data_monthly", discount: "high_res_data_discount" },
            { name: "Kundanpassning", checkboxName: "custom_solution_enabled", oneTime: "custom_solution_one_time", monthly: "custom_solution_monthly", discount: "custom_solution_discount" },
          ].map((service) => (
            <div
              key={service.name}
              className="grid grid-cols-4 gap-4 items-center"
            >
              <label className="flex items-center gap-2">
                <input type="checkbox" name={service.checkboxName} disabled={service.disabled} />
                <span>{service.name}</span>
              </label>
              <input name={service.oneTime} placeholder="Engångspris" className="input" />
              <input name={service.monthly} placeholder="kr/mån" className="input" />
              <input name={service.discount} placeholder="%" className="input"  onChange={(e) =>
    applyDiscount(service.monthly, e.target.value)
  }/>
            </div>
          ))}
        </div>
      </section>

      {/* Extra */}
<section className="mb-8">
  <h2 className="font-medium mb-4">Extra</h2>

  <div className="grid grid-cols-4 gap-4 text-sm font-medium mb-2">
    <span>Tjänst</span>
    <span>Antal</span>
    <span>kr/mån</span>
    <span>Rabatt %</span>
  </div>

  {/* User accounts */}
  <div className="grid grid-cols-4 gap-4 mb-2">
    <input
      value="Användarkonton"
      disabled
      className="input bg-gray-100"
    />

    <input
      name="user_accounts_quantity"
      placeholder="Antal"
      className="input"
    />

    <input
      name="user_accounts_monthly"
      placeholder="kr/mån"
      className="input"
    />

    <input
      name="user_accounts_discount"
      placeholder="%"
      className="input"
      onChange={(e) =>
        applyDiscount("user_accounts_monthly", e.target.value)
      }
    />
  </div>

  {/* Custom dashboard */}
  <div className="grid grid-cols-4 gap-4">
    <input
      value="Kundanp. Dashboard"
      disabled
      className="input bg-gray-100"
    />

    <input
      name="custom_dashboard_quantity"
      placeholder="Antal"
      className="input"
    />

    <input
      name="custom_dashboard_monthly"
      placeholder="kr/mån"
      className="input"
    />

    <input
      name="custom_dashboard_discount"
      placeholder="%"
      className="input"
      onChange={(e) =>
        applyDiscount("custom_dashboard_monthly", e.target.value)
      }
    />
  </div>
</section>


      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => handleOpenModal("offer")}
          className="px-6 py-2 bg-emerald-500 text-white rounded-lg"
        >
          Skapa offert
        </button>

        <button
          onClick={() => handleOpenModal("contract")}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg"
        >
          Skapa avtal
        </button>
      </div>

      {/* Review Modal */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              Granska innan du sparar
            </h2>

            <div className="max-h-80 overflow-y-auto text-sm border rounded-lg">
              {reviewData?.map((row, i) => (
                <div
                  key={i}
                  className="flex justify-between px-4 py-2 border-b"
                >
                  <span className="font-medium">{row.label}</span>
                  <span>{row.value}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2 rounded-lg border border-gray-300"
              >
                Avbryt
              </button>

              <button
                onClick={async () => {
                  try {
                    const response = await saveOffer();
                    handleCloseModal();
                    alert(
                      modalType === "offer"
                        ? "Offert sparad!"
                        : "Avtal sparat!"
                    );
                  } catch (error) {
                    alert("Kunde inte spara offerten. Försök igen.");
                  }
                }}
                className="px-5 py-2 rounded-lg bg-emerald-600 text-white"
              >
                Bekräfta & spara
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
