const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.echothejungle.com/api";

function getApiUrl(path) {
  let base = RAW_BASE_URL.replace(/\/+$/, "");

  // Ensure base URL ends with /api unless path already includes /api
  if (!base.endsWith("/api") && !path.startsWith("/api")) {
    base = `${base}/api`;
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

async function request(path, options = {}) {
  const url = getApiUrl(path);

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }

  return data;
}

export function submitEnquiry(data) {
  return request("/enquiries", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function submitResortEnquiry(data) {
  return request("/resorts", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function submitVillaEnquiry(data) {
  return request("/villas", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
