const BASE_URL = "http://localhost:5000/api";

export const api = {
  async get(path) {
    const res = await fetch(`${BASE_URL}${path}`, {
      credentials: "include",
    });
    return res.json();
  },

  async post(path, body = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(body)
    });
    return res.json();
  }
};
