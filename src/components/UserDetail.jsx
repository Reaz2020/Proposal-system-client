import { useState, useEffect } from "react";
import API_BASE from "../Config";
import Swal from "sweetalert2";

export default function UserDetail({ user, onClose, onUserUpdated }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    is_active: false,
    base_package: false,
    energy_insights: false,
    production_package: false,
    high_res_data: false,
    api_export: false,
    sensors: 0,
    gateways: 0,
    repeaters: 0,
    user_accounts: 0,
    dashboards: 0,
  });

  useEffect(() => {
    if (user) {
      setForm({
        id: user.id || "",
        name: user.name || "",
        email: user.email || "",
        password: user.password || "",
        role: user.role || "",
        is_active: user.is_active === 1,
        base_package: user.base_package === 1,
        energy_insights: user.energy_insights === 1,
        production_package: user.production_package === 1,
        high_res_data: user.high_res_data === 1,
        api_export: user.api_export === 1,
        sensors: Number(user.sensors) || 0,
        gateways: Number(user.gateways) || 0,
        repeaters: Number(user.repeaters) || 0,
        user_accounts: Number(user.user_accounts) || 0,
        dashboards: Number(user.dashboards) || 0,
      });
    }
  }, [user]);

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggle = (key) =>
    setForm((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = async () => {
    Swal.fire({
      title: "Saving user...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(`${API_BASE}/update_user.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      Swal.close();

      if (!data.success) {
        Swal.fire({
          title: "Error",
          text: data.message || "Failed to update user",
          icon: "error",
        });
        return;
      }

      Swal.fire({
        title: "Success",
        text: data.message || 'User updated successfully',
        icon: "success",
        

      });

      onUserUpdated(form); // Notify parent about the update

      onClose();
      
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: "Error",
        text: "Network or server error: " + error.message,
        icon: "error",
      });
    }
  };

  // Temporary debug field to check API values
  const debugJSON = JSON.stringify(form, null, 2);

  return (
    <div className="max-w-6xl mx-auto p-10 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold text-center mb-10">
        Edit User
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left column */}
        <div className="space-y-6">
          <Input
            label="Customer Number (ID)"
            value={form.id}
            onChange={(e) => update("id", e.target.value)}
          />
          <Input
            label="Company Name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
          <Input
            label="Email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />

          <Section title="Chosen package">
            <Toggle
              label="Baspaket: Energiövervakning"
              value={form.base_package}
              onChange={() => toggle("base_package")}
            />
            <Toggle
              label="Energiinsikter"
              value={form.energy_insights}
              onChange={() => toggle("energy_insights")}
            />
            <Toggle
              label="Produktionspaket"
              value={form.production_package}
              onChange={() => toggle("production_package")}
            />
            <Toggle
              label="Högupplöst maskindata (3-fasv)"
              value={form.high_res_data}
              onChange={() => toggle("high_res_data")}
            />
            <Toggle
              label="API för automatisk dataexport"
              value={form.api_export}
              onChange={() => toggle("api_export")}
            />
          </Section>

          <Section title="Package size">
            <Input
              label="Number of sensors"
              type="number"
              value={form.sensors}
              onChange={(e) => update("sensors", Number(e.target.value))}
            />
            <Input
              label="Number of gateways"
              type="number"
              value={form.gateways}
              onChange={(e) => update("gateways", Number(e.target.value))}
            />
            <Input
              label="Number of repeaters"
              type="number"
              value={form.repeaters}
              onChange={(e) => update("repeaters", Number(e.target.value))}
            />
            <Input
              label="Number of user accounts"
              type="number"
              value={form.user_accounts}
              onChange={(e) =>
                update("user_accounts", Number(e.target.value))
              }
            />
            <Input
              label="Number of dashboards"
              type="number"
              value={form.dashboards}
              onChange={(e) => update("dashboards", Number(e.target.value))}
            />
          </Section>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <Section title="Customer Portal Log-in credentials">
            <Input
              label="Password"
              type="text"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
            />
            <Select
              label="Role"
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
              options={[
                { label: "user", value: "user" },
                { label: "admin", value: "admin" },
              ]}
            />
          </Section>

          <Section title="Status">
            <Toggle
              label="Active"
              value={form.is_active}
              onChange={() => toggle("is_active")}
            />
          </Section>
        </div>
      </div>

      {/* Temporary debug */}
      <Section title="DEBUG API OUTPUT">
        <pre className="bg-gray-100 p-2 rounded text-xs">{debugJSON}</pre>
      </Section>

      <div className="flex justify-end mt-10 gap-3">
        <button
          className="px-4 py-2 border rounded"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 bg-emerald-500 text-white rounded"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border px-4 py-2"
      />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Toggle({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <button
        onClick={onChange}
        className={`w-11 h-6 rounded-full transition ${
          value ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`block w-5 h-5 bg-white rounded-full transform transition ${
            value ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border px-4 py-2 bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
