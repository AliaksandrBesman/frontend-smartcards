import axios from 'axios'

export default {
    state: {
        userDetails: null,
        notGrantedUsers: null,
        userCompletedCourse: null,
        usersLeftComments: null,
    },
    mutations: {
        setUserDetails(state, userDetails) {
            state.userDetails = userDetails;
        },
        setNotGrantedUser(state, notGrantedUsers) {
            state.notGrantedUsers = notGrantedUsers;
        },
        setUserCompletedCourse(state, userCompletedCourse) {
            state.userCompletedCourse = userCompletedCourse;
        },
        setUsersLeftComments(state, usersLeftComments) {
            state.usersLeftComments = usersLeftComments;
        },



    },
    actions: {
        async fetchPostUser(ctx, user) {
            try {
                await axios.
                    post(process.env.VUE_APP_BACKEND_URL + "/api/UserDetails", user.userDetails)
                    .then((response) => {
                        user.user.userDetailsId = response.data.id
                    })
                await axios.post(process.env.VUE_APP_BACKEND_URL + "/api/Users", user.user)
                    .then((response) => {
                    })
            } catch (e) {

                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },
        async fetchPutUser(ctx, user) {
            try {
                await axios.put(process.env.VUE_APP_BACKEND_URL + "/api/Users/" + user.user.id, user.user)
                    .then((response) => {
                    })
            } catch (e) {

                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },
        async fetchPostUserDetails(ctx, userDetails, id) {

            try {
                await axios
                    .post(process.env.VUE_APP_BACKEND_URL + "/api/UserDetails", userDetails)
                    .then((response) => {
                        ctx.commit('setUserDetails', response.data)
                    })
                return 1
            } catch (e) {
                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },
        async fetchGetAllNotGrantedUserstByUserAndSubI(ctx, subjectId) {

            try {
                await axios
                    .post(process.env.VUE_APP_BACKEND_URL + "/api/Users/PostGetAllNotGrantedUserstByUserAndSubId", subjectId)
                    .then((response) => {
                        console.log(response.data);
                        ctx.commit('setNotGrantedUser', response.data)
                    })
            } catch (e) {
                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },
        async fetchPostGrantingAccess(ctx, grantAccess) {
            try {
                await axios
                    .post(process.env.VUE_APP_BACKEND_URL + "/api/GrantingAccesses", grantAccess)
                    .then((response) => {
                    })
            } catch (e) {
                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },
        async fetchGetUsersCOmpletedTesByModuleId(ctx, modeuleId) {
            try {
                await axios
                    .get(process.env.VUE_APP_BACKEND_URL + "/api/TestAnswers/GetUsersCOmpletedTesByModuleId/" + modeuleId)
                    .then((response) => {
                        ctx.commit('setUserCompletedCourse', response.data)
                    })
            } catch (e) {
                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },
        async fetchGetUsersLeftCommentsByModuleId(ctx, modeuleId) {
            try {
                await axios
                    .get(process.env.VUE_APP_BACKEND_URL + "/api/Users/GetUsersLeftCommentsByModuleId/" + modeuleId)
                    .then((response) => {
                        ctx.commit('setUsersLeftComments', response.data)
                    })
            } catch (e) {
                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },




    },
    getters: {
        userDetails: s => s.userDetails,
        notGrantedUsers: s => s.notGrantedUsers,
        userCompletedCourse: s => s.userCompletedCourse,
        usersLeftComments: s => s.usersLeftComments,


    },

}