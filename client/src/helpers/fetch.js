const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchWithoutToken = async (endpoint, data, method = "GET") => {
  const url = `${BASE_URL}/${endpoint}`;

  if (method === "GET") {
    const res = await fetch(url);

    return await res.json();
  } else {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  }
};

export const fetchWithToken = async (endpoint, data, method = "GET") => {
  const url = `${BASE_URL}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    const res = await fetch(url, {
      headers: {
        "x-token": token,
      },
    });

    return await res.json();
  } else {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  }
};
