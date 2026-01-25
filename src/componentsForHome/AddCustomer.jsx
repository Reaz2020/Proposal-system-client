import React, { useRef } from "react";
import toast from "react-hot-toast";

const AddCustomer = () => {
  const formRef = useRef(null);

  const collectCustomerData = () => {
    const form = formRef.current;
    const inputs = Array.from(form.querySelectorAll("input"));

    const data = {};

    inputs.forEach((el) => {
      const key = el.dataset.field;
      if (!key) return;

      data[key] = el.value || null;
    });

    return data;
  };

  const saveCustomer = (customerData) => {
    toast.success("API will be added to save to the server.");
    console.log("Payload to send:", customerData);
  };

  const handleSaveCustomer = () => {
    // alert("Spara kund - funktionalitet kommer snart!");
    const customerData = collectCustomerData();

    toast((t) => (
      <div className="text-sm">
        <p className="font-medium mb-2">Är uppgifterna korrekta?</p>

        <div className="flex gap-3 justify-end">
          <button
            className="px-3 py-1 border rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            Avbryt
          </button>

          <button
            className="px-3 py-1 bg-emerald-500 text-white rounded"
            onClick={() => {
              toast.dismiss(t.id);
              saveCustomer(customerData);
            }}
          >
            Bekräfta
          </button>
        </div>
      </div>
    ));
  };

  return (
    <section className="bg-white p-6 rounded-md max-w-5xl">
      <h2 className="font-semibold text-lg mb-6">BOLAG AB</h2>

      {/* ⚠️ REF MUST BE ON THIS CONTAINER */}
      <div className="grid grid-cols-2 gap-10" ref={formRef}>
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <Field label="Kundnr" defaultValue="1106" dataField="kundnr" />
          <Field label="Organisationsnr" defaultValue="123456-7890" dataField="organisationsnr" />
          <Field label="Skattenr" defaultValue="SE123456789001" disabled dataField="skattenr" />
          <Field label="Adress" defaultValue="Ågatan 25" dataField="adress" />
          <Field label="Postnr" defaultValue="58 222" dataField="postnr" />
          <Field label="Ort" defaultValue="Linköping" dataField="ort" />
          <Field label="Land" defaultValue="SE - Sverige" dataField="land" />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <Field label="Kontaktperson" defaultValue="Sven Svensson" dataField="kontaktperson" />

          <div>
            <p className="font-medium mb-3">Firmatecknare</p>

            <div className="space-y-4">
              <Field label="Namn" defaultValue="Hans Hansson" dataField="firmatecknare_namn" />
              <Field label="Roll" defaultValue="VD" dataField="firmatecknare_roll" />
              <Field label="Mejl" defaultValue="Hans.Hansson@bolag.com" dataField="firmatecknare_mejl" />
              <Field label="Mobil" defaultValue="072-123 45 67" dataField="firmatecknare_mobil" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSaveCustomer}
          className="px-6 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
        >
          Spara
        </button>
      </div>
    </section>
  );
};

const Field = ({ label, defaultValue = "", disabled = false, dataField }) => {
  return (
    <div className="flex items-center gap-4">
      <label className="w-36 text-sm text-gray-700">{label}</label>
      <input
        type="text"
        defaultValue={defaultValue}
        disabled={disabled}
        data-field={dataField}
        className={`flex-1 border rounded px-3 py-2 text-sm ${
          disabled ? "bg-gray-100 text-gray-500" : "bg-white"
        }`}
      />
    </div>
  );
};

export default AddCustomer;
