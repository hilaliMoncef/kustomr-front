import axios from 'axios'

export default {
    login (username, pwd) {
      return axios.post('/users/token/', {
        username: username,
        password: pwd
      })
    },
    getUserInfo() {
      return axios.get('/users/self/')
    },
    refreshToken () {
      return axios.post('/users/token/refresh/', {'refresh': localStorage.getItem('refreshToken')})
    }
  }
  