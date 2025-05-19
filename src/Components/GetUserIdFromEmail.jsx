const {jwtDecode} = await import('jwt-decode')

export default async function decodeToken(){
            const token = localStorage.getItem('userToken');
            if (token) {
            try {
                const decoded = jwtDecode(token);
                const response = await fetch("https://fullstackproject-backend-z5rx.onrender.com/users/getidfromemail/" + decoded.userEmail)
                if(!response.ok) {
                    throw new Error("Error occured " + response.json())
                }
                const jsonResponse = await response.json()
                return jsonResponse
            } catch (error) {
                console.error('Invalid token:', error);
            }
            } else {
                return null;
            }
        }