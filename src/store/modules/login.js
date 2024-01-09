import axios from 'axios'

export default {
    state: {
        user:JSON.parse(localStorage.getItem('user')),
    },
    mutations: {
        setUser(state, user) {
            console.log("setUser");
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user))
        },
        deleteUser(state, temp) {
            state.user = null;
            localStorage.setItem('user', JSON.stringify(null))
        },
        
    },
    actions: {
        async fetchLogin(ctx, userLogin) {
        
            try {
                await axios
                    .post(process.env.VUE_APP_BACKEND_URL + "/login", userLogin)
                    .then((response) => {
                        console.log(response.data);
                        ctx.commit('setUser', response.data)
                    })
            } catch (e) {
                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },
        logout(ctx, temp = 1) {
            ctx.commit('deleteUser', temp)
        },
    },
    getters: {
        user: s => s.user,
    },

}