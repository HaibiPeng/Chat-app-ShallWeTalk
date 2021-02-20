import axios from 'axios'
const baseUrl = '/api/users'

const createUser = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { createUser }
