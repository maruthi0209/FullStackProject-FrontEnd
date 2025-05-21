// const { jwtDecode } = await import('jwt-decode')
async function loadJwtDecode() {
  const { jwtDecode } = await import('./something.js');
  return jwtDecode;
}

function getToken() {
    // try {
    //     const decoded = jwtDecode(token);
    //     const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/users/getidfromemail/" + `${(decoded.email)? decoded.email : decoded.userEmail}`)
    //     if(!response.ok) {
    //         throw new Error("Error occured " + response.json())
    //     }
    //     const jsonResponse = await response.json()
    //     return jsonResponse
    // } catch (error) {
    //     console.error('Invalid token:', error);
    // }

    // const decoded = jwtDecode(token);
    loadJwtDecode().then(jwtDecode => {
        const decoded = jwtDecode(token);
        fetch("https://fullstackproject-backend-z5rx.onrender.com/users/getidfromemail/" + `${(decoded.email) ? decoded.email : decoded.userEmail}`)
        .then((response) => {
            if (!response.ok) { throw new Error("Error occurred " + response.status); }
            return response.json();
        }).then((jsonResponse) => { return jsonResponse }).catch((error) => { console.log(error) })
    });
    
    
}

export default function decodeToken() {
    const token = localStorage.getItem('userToken');
    if (token) {
        getToken(token)
    } else {
        return null;
    }
}