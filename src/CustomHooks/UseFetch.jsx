export const API_URL = 'http://localhost:3000'

export const userLogin = (body) =>{
    return {
        url: API_URL + '/user/login',
        options: {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}


export const getToken = (token) =>{
    return {
        url: API_URL + '/user/perfil',
        options: {
            method: 'GET',
            headers:{
                Authorization : `Bearer ${token}`
            },
        }
    }
}
