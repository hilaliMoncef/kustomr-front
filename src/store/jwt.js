import axios from 'axios'

export default {
    login (email, pwd) {
      return axios.post('/users/token/', {
        email: email,
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
  