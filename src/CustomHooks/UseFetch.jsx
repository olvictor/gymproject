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

export const dataGet = (token) => {
  return {
    url: API_URL + "/user/treinos",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
};


export const userTreinoSemanal = (token) => {
  return {
    url: API_URL + "/user/treino_semanal",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
};


export const userComentarios = (token) => {
  return {
    url: API_URL + "/comentarios",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
};


export const userMetas = (token) => {
  return {
    url: API_URL + "/user/metas",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
};

export const  buscarTipoDeTreino = (token) => {
  return {
    url: API_URL + "/tipo_de_treino",
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
};