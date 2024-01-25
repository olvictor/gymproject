export const API_URL = "http://localhost:3000";

export const userLogin = (body) => {
  return {
    url: API_URL + "/user/login",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
};

export const userRegister = (body) => {
  return {
    url: API_URL + "/user/cadastrar",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
};

export const getToken = (token) => {
  return {
    url: API_URL + "/user/perfil",
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
};

export const userPOST = (formData, token) => {
  return {
    url: API_URL + "/user/post",
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  };
};

export const feedGET = (token) => {
  return {
    url: API_URL + "/user/feed",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
};

export const infoGET = (token) => {
  return {
    url: API_URL + "/user/info",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
};

export const infoPOST = (token) => {
  return {
    url: API_URL + "/user/info",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
};
