const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://life-energy-infra-api.onrender.com';

export const safeFetchJson = async (url, options = {}) => {
  try {
    // If relative API URL starting with /api, try live API base URL fallback if relative fails
    const fullUrl = url.startsWith('/api') ? `${API_BASE_URL}${url}` : url;

    let res = await fetch(fullUrl, options);

    // If direct fullUrl failed with 404, fallback to relative proxy URL
    if (res.status === 404 && fullUrl !== url) {
      try {
        res = await fetch(url, options);
      } catch (e) {
        // use original response
      }
    }

    const contentType = res.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await res.json();
      return { ...data, status: res.status };
    }

    const text = await res.text();
    return {
      success: false,
      status: res.status,
      message: `Backend API returned status ${res.status}: "${text.trim().slice(0, 100)}". Please ensure backend service is active.`
    };
  } catch (err) {
    return {
      success: false,
      status: 0,
      message: `Network error connecting to API: ${err.message}`
    };
  }
};
