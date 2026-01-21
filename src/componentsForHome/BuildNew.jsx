import { useState, useRef, useEffect } from "react";

export default function BuildNew() {
  // Placeholder variables (replace later with DB data)
  const placeholders = {
    customerId: "1106",
    offerNumber: "1106 / 03",
    customerName: "Bolag AB",
    vatNumber: "SE-01",
    contactPerson: "Hans Hansson",
    address: "Ågatan 25",
    postalCode: "582 22",
    city: "Linköping",
    country: "SE - Sverige",

    offerValid: "14 dagar",
    startDate: "2025-01-01",  // date format
    contractLength: "36 månader",
    contractType: "Köp",
    billing: "Årsvis",

    packageSize: "20 mätpunkter",
  };

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    // Create hidden wrapper without changing your current JSX
    const wrapper = document.createElement("div");
    wrapper.id = "build-new-wrapper";
    document.body.appendChild(wrapper);
    containerRef.current = wrapper;

    return () => {
      document.body.removeChild(wrapper);
    };
  }, []);

  const handleOpenModal = (type) => {
    setModalType(type);

    const container = document.querySelector(".p-8.max-w-5xl");

    const inputs = Array.from(container.querySelectorAll("input"));
    const selects = Array.from(container.querySelectorAll("select"));

    const data = {};

    inputs.forEach((el, idx) => {
      const key = el.placeholder || `input_${idx + 1}`;

      if (el.type === "checkbox") {
        data[key] = el.checked ? "selected" : "not selected";
      } else {
        data[key] = el.value || el.placeholder;
      }
    });

    selects.forEach((el, idx) => {
      const key = el.name || `select_${idx + 1}`;
      data[key] = el.value || el.options[el.selectedIndex]?.text;
    });

    setModalData(data);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalType("");
  };

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-semibold mb-6">Skapa nytt</h1>

      {/* Kundinformation */}
      <section className="mb-8">
        <h2 className="font-medium mb-4">Kundinformation</h2>

        <div className="grid grid-cols-2 gap-4">
          <input placeholder={placeholders.customerId} className="input" />
          <input placeholder={placeholders.offerNumber} className="input" />

          <input placeholder={placeholders.customerName} className="input" />
          <input placeholder={placeholders.vatNumber} className="input" />

          <input placeholder={placeholders.contactPerson} className="input" />
          <input placeholder={placeholders.address} className="input" />

          <input placeholder={placeholders.postalCode} className="input" />
          <input placeholder={placeholders.city} className="input" />

          <input placeholder={placeholders.country} className="input col-span-2" />
        </div>
      </section>

      {/* Avtalsinformation */}
      <section className="mb-8">
        <h2 className="font-medium mb-4">Avtalsinformation</h2>

        <div className="grid grid-cols-2 gap-4">
          <input placeholder={placeholders.offerValid} className="input" />
          <input placeholder={placeholders.startDate} className="input" />

          <select className="input">
            <option>{placeholders.contractLength}</option>
          </select>

          <select className="input">
            <option>{placeholders.contractType}</option>
          </select>

          <select className="input">
            <option>{placeholders.billing}</option>
          </select>
        </div>
      </section>

      {/* Paketinformation */}
      <section className="mb-8">
        <h2 className="font-medium mb-4">Paketinformation</h2>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <input placeholder={placeholders.packageSize} className="input col-span-2" />
          <input placeholder="Pris" className="input" />
        </div>

        <div className="space-y-3">
          {[
            "60/200/600A CTs",
            "ELW Gateways",
            "HAN-port",
            "Temp & Humid.",
            "Air Quality sensor",
          ].map((label) => (
            <div key={label} className="grid grid-cols-3 gap-4">
              <input placeholder={label} className="input" />
              <input placeholder="Antal" className="input" />
              <input placeholder="Pris" className="input" />
            </div>
          ))}
        </div>
      </section>

      {/* Tjänster */}
      <section className="mb-8">
        <h2 className="font-medium mb-4">Tjänster</h2>

        <div className="grid grid-cols-2 gap-3">
          {[
            "Konfiguration",
            "Frakt",
            "Energinsikter",
            "Produktionspaket",
            "API",
            "Högupplöst data",
            "Kundanpassning",
          ].map((service) => (
            <label key={service} className="flex items-center gap-2">
              <input type="checkbox" />
              <span>{service}</span>
            </label>
          ))}
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

      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {modalType === "offer" ? "Bekräfta Offert" : "Bekräfta Avtal"}
            </h2>

            <div className="text-sm bg-gray-100 p-4 rounded-lg max-h-64 overflow-y-auto">
              {modalData &&
                Object.entries(modalData).map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b py-1">
                    <span className="font-medium">{k}</span>
                    <span>{String(v)}</span>
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
                onClick={() => {
                  handleCloseModal();
                  alert(
                    modalType === "offer"
                      ? "Offert skapad!"
                      : "Avtal skapat!"
                  );
                }}
                className="px-5 py-2 rounded-lg bg-emerald-600 text-white"
              >
                Bekräfta
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
