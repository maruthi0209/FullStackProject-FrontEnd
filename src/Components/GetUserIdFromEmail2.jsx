// Dynamically import jwt-decode
async function loadJwtDecode() {
  const { jwtDecode } = await import('jwt-decode');
  return jwtDecode;
}

// Get token info from backend using decoded email
function getToken(token) {
  return loadJwtDecode().then(jwtDecode => {
    const decoded = jwtDecode(token);
    const email = decoded.email || decoded.userEmail;

    return fetch(`https://fullstackproject-backend-z5rx.onrender.com/users/getidfromemail/${email}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error occurred: " + response.status);
        }
        return response.json();
      });
  }).catch(error => {
    console.error('Token decoding or fetch failed:', error);
    return null;
  });
}

// Public function to call
export default function decodeToken() {
  const token = localStorage.getItem('userToken');
  if (token) {
    return getToken(token); 
  } else {
    return Promise.resolve(null);
  }
}
