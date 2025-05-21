const {jwtDecode} = await import('jwt-decode')

async function getToken() {
    try {
        const decoded = jwtDecode(token);
        const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/users/getidfromemail/" + `${(decoded.email)? decoded.email : decoded.userEmail}`)
        if(!response.ok) {
            throw new Error("Error occured " + response.json())
        }
        const jsonResponse = await response.json()
        return jsonResponse
    } catch (error) {
        console.error('Invalid token:', error);
    }
}

export default function decodeToken(){
    const token = localStorage.getItem('userToken');
    if (token) {
        getToken(token)
    } else {
        return null;
    }
}