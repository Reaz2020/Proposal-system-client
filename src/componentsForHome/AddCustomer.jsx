import React from "react";

const AddCustomer = () => {
  return (
    <section className="bg-white p-6 rounded-md max-w-5xl">
      <h2 className="font-semibold text-lg mb-6">BOLAG AB</h2>

      <div className="grid grid-cols-2 gap-10">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <Field label="Kundnr" defaultValue="1106" />
          <Field label="Organisationsnr" defaultValue="123456-7890" />
          <Field label="Skattenr" defaultValue="SE123456789001" disabled />
          <Field label="Adress" defaultValue="Ågatan 25" />
          <Field label="Postnr" defaultValue="58 222" />
          <Field label="Ort" defaultValue="Linköping" />
          <Field label="Land" defaultValue="SE - Sverige" />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <Field label="Kontaktperson" defaultValue="Sven Svensson" />

          <div>
            <p className="font-medium mb-3">Firmatecknare</p>

            <div className="space-y-4">
              <Field label="Namn" defaultValue="Hans Hansson" />
              <Field label="Roll" defaultValue="VD" />
              <Field label="Mejl" defaultValue="Hans.Hansson@bolag.com" />
              <Field label="Mobil" defaultValue="072-123 45 67" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button className="px-6 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600">
          Spara
        </button>
      </div>
    </section>
  );
};

const Field = ({ label, defaultValue = "", disabled = false }) => {
  return (
    <div className="flex items-center gap-4">
      <label className="w-36 text-sm text-gray-700">{label}</label>
      <input
        type="text"
        defaultValue={defaultValue}
        disabled={disabled}
        className={`flex-1 border rounded px-3 py-2 text-sm ${
          disabled ? "bg-gray-100 text-gray-500" : "bg-white"
        }`}
      />
    </div>
  );
};

export default AddCustomer;
