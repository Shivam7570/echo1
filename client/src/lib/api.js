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
  } else {
    // Relative paths are critical when backend & frontend are hosted on Hostinger under the same domain
    candidateUrls.push(`/api${cleanPath}`);
    candidateUrls.push(`${cleanPath}`);
    candidateUrls.push(`${PROD_BACKEND}${cleanPath}`);
    candidateUrls.push(`${LOCAL_BACKEND}${cleanPath}`);
  }

  // Remove duplicates while preserving order
  const uniqueCandidateUrls = [...new Set(candidateUrls)];

  let lastError = null;

  for (let i = 0; i < uniqueCandidateUrls.length; i++) {
    const url = uniqueCandidateUrls[i];
    const isLastCandidate = i === uniqueCandidateUrls.length - 1;

    try {
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMsg = data.message || `Server returned status ${res.status}`;
        const err = new Error(errorMsg);
        err.status = res.status;

        // If 404 Not Found or Server Error (5xx) and we have more candidates, continue to next candidate
        if ((res.status === 404 || res.status >= 500) && !isLastCandidate) {
          lastError = err;
          continue;
        }

        throw err;
      }

      return data;
    } catch (err) {
      lastError = err;
      if (err.name === "TypeError" || err.message.includes("Failed to fetch") || ((err.status === 404 || err.status >= 500) && !isLastCandidate)) {
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
