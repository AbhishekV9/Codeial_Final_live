const API_ROOT='http://codeial.codingninjas.com:8000/api/v2'

export const APIUrls={
    login: () =>
        `${API_ROOT}/users/login`,
    signup:() =>
        `${API_ROOT}/users/signup`,
    fetchPost:(page=1,limit=5)=> //setting default value for page and limit 
        `${API_ROOT}/posts?page=${page}&limit=${limit}`
}