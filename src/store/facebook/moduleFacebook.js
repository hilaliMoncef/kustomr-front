//import router from '@/router'

export default {
    namespaced: true,
    state: {
        accessToken: localStorage.getItem('facebookAccessToken') || '',
        userID: localStorage.getItem('facebookUserID') || '',
    },
    mutations: {
        SET_USER_INFO(state, payload) {
            state.accessToken = payload.accessToken;
            state.userID = payload.userID;
        },
        DELETE_USER_INFO(state) {
            state.accessToken = '';
            state.userID = '';
        }
    },
    actions: {
        login({ commit }, payload) {
            localStorage.setItem('facebookAccessToken', payload.accessToken)
            localStorage.setItem('facebookUserID', payload.userID)
            commit('SET_USER_INFO', payload);
        },
        logout({ commit }) {
            localStorage.removeItem('facebookAccessToken')
            localStorage.removeItem('facebookUserID')
            commit('DELETE_USER_INFO');
        }
    },
    getters: {
        isLoggedIn: state => {
            if (state.accessToken != '') {
                return true;
            } else {
                return false;
            }
        }
    }
}
