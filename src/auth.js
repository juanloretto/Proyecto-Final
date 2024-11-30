// auth.js
export const getAuthToken = () => {
    return localStorage.getItem('token');
};
