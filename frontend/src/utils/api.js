export const safeFetchJson = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await res.json();
      return { ...data, status: res.status };
    }

    const text = await res.text();
    return {
      success: false,
      status: res.status,
      message: `Backend API returned status ${res.status}: "${text.trim().slice(0, 100)}". Please ensure backend Web Service is running on Render.`
    };
  } catch (err) {
    return {
      success: false,
      status: 0,
      message: `Network error connecting to API: ${err.message}`
    };
  }
};
