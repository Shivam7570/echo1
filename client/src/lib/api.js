const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// Submit a contact/enquiry form. `source` identifies where on the site it came from.
export function submitEnquiry({ name, email, phone, message, source = "other" }) {
  return request("/enquiries", {
    method: "POST",
    body: JSON.stringify({ name, email, phone, message, source }),
  });
}
