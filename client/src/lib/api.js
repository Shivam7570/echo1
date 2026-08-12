const LOCAL_BACKEND = "http://localhost:5000/api";
const PROD_BACKEND = "https://api.echothejungle.com/api";

function isLocalhost() {
  return (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.startsWith("192.168."))
  );
}

async function request(path, options = {}) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const customBase = import.meta.env.VITE_API_BASE_URL;

  // Build candidate URLs in order of preference
  const candidateUrls = [];
  if (customBase) {
    const cleanCustom = customBase.replace(/\/+$/, "");
    candidateUrls.push(`${cleanCustom}${cleanPath}`);
  }
  if (isLocalhost()) {
    candidateUrls.push(`${LOCAL_BACKEND}${cleanPath}`);
    candidateUrls.push(`/api${cleanPath}`);
  }
  candidateUrls.push(`${PROD_BACKEND}${cleanPath}`);

  let lastError = null;

  for (const url of candidateUrls) {
    try {
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || `Server returned status ${res.status}`);
      }

      return data;
    } catch (err) {
      lastError = err;
      // If it's a network error (like Failed to fetch), try the next candidate URL
      if (err.name === "TypeError" || err.message.includes("Failed to fetch")) {
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error("Failed to connect to backend API server.");
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

export function submitSiteVisit(data) {
  return request("/site-visits", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
