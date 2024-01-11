import axios from 'axios'

export default {
    state: {
        users: null,
        grantedModules: null,
        module: null,
        qanA: null,
        testUserAnsw: null,
        subjectComments: null,
        usersTestResult: null,
    },
    mutations: {
        setGrantedModules(state, grantedModules) {
            state.grantedModules = grantedModules;
        },
        setModule(state, module) {
            state.module = module;
        },
        setQanA(state, qanA) {
            state.qanA = qanA;
        },
        setTestUserAnsw(state, testUserAnsw) {
            state.testUserAnsw = testUserAnsw;
        },
        setSubjectComments(state, subjectComments) {
            state.subjectComments = subjectComments;
        },
        setUsers(state, users) {
            console.log("setUsers")
            console.log(users)
            state.users = users;
        },
        setUsersTestResult(state, usersTestResult) {
            state.usersTestResult = usersTestResult;
        },



    },
    actions: {
        async JustTestMRemoveIT(ctx, userId) {
            debugger
            console.log(userId)
        },
        async fetchGrantedModulesByUserId(ctx, userId) {
            await axios
                .get(process.env.VUE_APP_BACKEND_URL + "/api/SubjectLessons/GetGrantedSubjectLessonByUserId/" + userId)
                .then((response) => {
                    console.log(response.data);
                    const grantedModules = response.data;
                    setTimeout(() => {
                        ctx.commit('setGrantedModules', grantedModules)
                    }, 0)
                })
        },
        async fetchGrantedSubjectLessonByCreatedById(ctx, userId) {
            await axios
                .get(process.env.VUE_APP_BACKEND_URL + "/api/SubjectLessons/GetGrantedSubjectLessonByCreatedById/" + userId)
                .then((response) => {
                    console.log(response.data);
                    const grantedModules = response.data;
                    setTimeout(() => {
                        ctx.commit('setGrantedModules', grantedModules)
                    }, 0)
                })
        },


        async fetchModuleById(ctx, moduleId) {
            await axios
                .get(process.env.VUE_APP_BACKEND_URL + "/api/SubjectLessons/" + moduleId)
                .then((response) => {
                    console.log(response.data);
                    const module = response.data;
                    // setTimeout(() => {
                    ctx.commit('setModule', module)
                    // }, 0)
                })
        },
        async fetchQanABySubLId(ctx, moduleId) {
            await axios
                .get(process.env.VUE_APP_BACKEND_URL + "/api/QuestionAnswers/GetQuestionAnswerBySubLId/" + moduleId)
                .then((response) => {
                    console.log(response.data);
                    const qanA = response.data;
                    // setTimeout(() => {
                    ctx.commit('setQanA', qanA)
                    // }, 0)
                })
        },
        async fetchSaveTest(ctx, testData) {
            try {
                await axios
                    .post(process.env.VUE_APP_BACKEND_URL + "/api/TestAnswers", testData)
                    .then((response) => {
                        console.log(response.data);
                    })
            } catch (e) {
                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },
        async fetchGetTestResultByUserAndSubId(ctx, user_and_subj_id) {

            try {
                await axios
                    .post(process.env.VUE_APP_BACKEND_URL + "/api/TestAnswers/PostGetTestResultByUserAndSubId", user_and_subj_id)
                    .then((response) => {
                        console.log(response.data);
                        ctx.commit('setTestUserAnsw', response.data)
                    })
            } catch (e) {
                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },
        async fetctGetCommentsBySubjectId(ctx, subjectId) {
            await axios
                .get(process.env.VUE_APP_BACKEND_URL + "/api/Comments/GetCommentsBySubjectId/" + subjectId)
                .then((response) => {
                    setTimeout(() => {
                        ctx.commit('setSubjectComments', response.data)
                    }, 0)
                })
        },
        async fetchAddNewComment(ctx, newCommwnr) {
            try {
                await axios
                    .post(process.env.VUE_APP_BACKEND_URL + "/api/Comments", newCommwnr)
                    .then((response) => {

                    })
            } catch (e) {
                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },
        async fetchGetAllUsers(ctx) {
            console.log("fetchGetAllUsers")
            try {
                await axios
                    .get(process.env.VUE_APP_BACKEND_URL + "/api/Users")
                    .then((response) => {
                        setTimeout(() => {
                            ctx.commit('setUsers', response.data)
                        }, 0)
                    })
            } catch (e) {
                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },
        async fetchPutComment(ctx, comment) {
            console.log("fetchGetAllUsers")
            try {
                await axios
                    .put(process.env.VUE_APP_BACKEND_URL + "/api/Comments/" + comment.id, comment)
                    .then((response) => {
                    })
            } catch (e) {
                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },
        async fetchPutTestAnswer(ctx, testAnswer) {

            console.log("fetchGetAllUsers")
            try {
                await axios
                    .put(process.env.VUE_APP_BACKEND_URL + "/api/TestAnswers/" + testAnswer.id, testAnswer)
                    .then((response) => {
                    })
            } catch (e) {
                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },
        async fetchDeleteSubjectLesson(ctx, subjectLessonId) {

            try {

                let subjectLessonsId = null;
                await axios.
                    delete(process.env.VUE_APP_BACKEND_URL + "/api/SubjectLessons/" + subjectLessonId)
                    .then((response) => {
                    })
                // subjectLesson.qanA.forEach(element => {
                //     axios.put(process.env.VUE_APP_BACKEND_URL + "/api/QuestionAnswers/"+element.id, element)
                //         .then((response) => {

                //         })
                // });


            } catch (e) {

                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },
        async fetchPutSubjectLesson(ctx, subjectLesson) {

            try {

                let subjectLessonsId = null;
                await axios.
                    put(process.env.VUE_APP_BACKEND_URL + "/api/SubjectLessons/" + subjectLesson.subjectLesson.id, subjectLesson.subjectLesson)
                    .then((response) => {
                    })
                subjectLesson.qanA.forEach(element => {
                    axios.put(process.env.VUE_APP_BACKEND_URL + "/api/QuestionAnswers/" + element.id, element)
                        .then((response) => {

                        })
                });


            } catch (e) {

                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },
        async fetchPostSubjectLesson(ctx, subjectLesson) {

            try {

                let subjectLessonsId = null;
                await axios.
                    post(process.env.VUE_APP_BACKEND_URL + "/api/SubjectLessons", subjectLesson.subjectLesson)
                    .then((response) => {

                        subjectLessonsId = response.data.id
                    })

                subjectLesson.qanA.forEach(element => {

                    element.subjectLessonId = subjectLessonsId
                });
                subjectLesson.qanA.forEach(element => {


                    axios.post(process.env.VUE_APP_BACKEND_URL + "/api/QuestionAnswers", element)
                        .then((response) => {

                        })
                });


            } catch (e) {

                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },
        async fetchGetUsersTestResultByModuleId(ctx, modeuleId) {
            try {
                await axios
                    .get(process.env.VUE_APP_BACKEND_URL + "/api/TestAnswers/GetUsersTestResultByModuleId/" + modeuleId)
                    .then((response) => {
                        ctx.commit('setUsersTestResult', response.data)
                    })
            } catch (e) {
                console.log("fetchLogin Error:");
                console.log(e);
                throw e
            }
        },

    },
    getters: {
        users: s => s.users,
        topics: s => s.topics,
        grantedModules: s => s.grantedModules,
        c_module: s => s.module,
        qanA: s => s.qanA,
        testUserAnsw: s => s.testUserAnsw,
        subjectComments: s => s.subjectComments,
        usersTestResult: s => s.usersTestResult,




    }
}