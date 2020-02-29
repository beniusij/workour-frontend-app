/**
 * Fetches current user from backend server using the cookie set
 * @returns {Promise<*>}
 */
export default function getCurrentUser() {
  return fetch(
    `${process.env.REACT_APP_API_URL}/getCurrentUser`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
    })
    .then((data) => {
      if (typeof data !== 'object') {
        return JSON.parse(data)
      } else {
        return data
      }
    })
    .catch((error) => {
      console.log(error)
      return null
    })
}