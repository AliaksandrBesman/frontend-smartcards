import axios from 'axios'

export default {
    state: {
        users: JSON.parse(localStorage.getItem('users') || '[]'),
        user: {
            login: 'user123',
            role: 'ученик',
            name: 'Иван',
            surname: 'Иванов',
            patronymic: 'Иванович',
            faculty: 'Информационных технологий',
            department: 'Программной инженерии',
            specialization: 'Информационные системы и технологии',
            course: 3,
            group: 'ИСТ-32'
        },
        modules: [
            {
                id: 1,
                title: "Курс 1",
                topic: "Тема 1",
                description: "Описание курса 1",
            },
            {
                id: 2,
                title: "Курс 2",
                topic: "Тема 2",
                description: "Описание курса 2",
            },
            {
                id: 3,
                title: "Курс 3",
                topic: "Тема 1",
                description: "Описание курса 3",
            },
            {
                id: 4,
                title: "Курс 4",
                topic: "Тема 3",
                description: "Описание курса 4",
            },
            // Добавьте больше курсов при необходимости
        ],
        topics: [
            { id: 1, name: "Тема 1" },
            { id: 2, name: "Тема 2" },
            { id: 3, name: "Тема 3" },
            // Добавьте больше тем при необходимости
        ],
    },
    mutations: {
        createUser(state, user) {
            // Check if the item already exists in the array
            const existingItem = state.users.find(u => u.id === user.id);
            console.log(existingItem)
            if (!!!existingItem) {
                console.log("Hello Not")
                state.users.push(user)
                localStorage.setItem('users', JSON.stringify(state.users))
            }

        },
        updateUser(state, user) {
            const index = state.users.findIndex(u => u.id === user.id);
            state.users.splice(index, 1, user);
            localStorage.setItem('users', JSON.stringify(state.users));

        },
        setUser(state, user) {
            state.user = user;
        },

    },
    actions: {
        createUser(ctx, user) {
            console.log("createUser")
            ctx.commit('createUser', user)
        },
        updateUser(ctx, user) {
            console.log("createUser")
            ctx.commit('updateUser', user)
        },
        async fetchLogin(ctx, userLogin) {
            try {
                const index = this.users.findIndex(user => user.login === this.editingUser.login);
                const jwtToken = response.data;
                ctx.commit('setUser', jwtToken)

                console.log("EndLogin");
            } catch (e) {
                console.log("Error");
                throw e
            }
        },
    },
    getters: {
        user: s => s.user,
        users: s => s.users,
        modules: s => s.modules,
        topics: s => s.topics,
    }
}