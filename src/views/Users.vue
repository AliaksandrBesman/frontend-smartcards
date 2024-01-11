<template>
  <div>
    <h1>Список пользователей</h1>
    <button class="btn" @click="openCreateDialog()">Добавить</button>
    <table>
      <thead>
        <tr>
          <th>Логин</th>
          <th>Пароль</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Отчество</th>
          <th>Роль</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user?.login }}</td>
          <td>{{ user?.password }}</td>
          <td>{{ user?.name }}</td>
          <td>{{ user?.surname }}</td>
          <td>{{ user?.secondName }}</td>
          <td>{{ getRoleById(user?.roleId).name }}</td>
          <td>
            <button class="btn" @click="editUser(index)">Редактировать</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Модальное окно для редактирования пользователя -->
    <div id="editModal" class="modal">
      <div class="modal-content">
        <h4>
          {{
            create_edit_key == "create"
              ? "Добавить пользователя"
              : "Редактировать пользователя"
          }}
        </h4>
        <form>
          <div class="input-field">
            <input
              id="login"
              type="text"
              class="validate"
              v-model="editingUser.login"
            />
            <label for="login">Логин</label>
          </div>
          <div class="input-field">
            <input
              id="password"
              type="text"
              class="validate"
              v-model="editingUser.password"
            />
            <label for="password">Пароль</label>
          </div>
          <div class="input-field">
            <input
              id="name"
              type="text"
              class="validate"
              v-model="editingUser.name"
            />
            <label for="name">Имя</label>
          </div>
          <div class="input-field">
            <input
              id="surname"
              type="text"
              class="validate"
              v-model="editingUser.surname"
            />
            <label for="surname">Фамилия</label>
          </div>
          <div class="input-field">
            <input
              id="secondName"
              type="text"
              class="validate"
              v-model="editingUser.secondName"
            />
            <label for="secondName">Отчество</label>
          </div>
          <div class="input-field">
            <input
              disabled
              id="role"
              type="text"
              class="validate"
              :value="getRoleById(editingUser.roleId)?.name"
            />
            <label for="role">Роль</label>
          </div>
          <div class="input-field">
            <input
              id="department"
              type="text"
              class="validate"
              v-model="editingUserDetails.department"
            />
            <label for="department">Кафедра</label>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <div class="center">
          <button class="btn" @click="saveUser">
            {{ create_edit_key == "create" ? "Добавить" : "Изменить" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      editingUser: {},
      editingUserDetails: {},
      create_edit_key: null,
    };
  },
  methods: {
    ...mapActions([
      "fetchGetAllUsers",
      "fetchPostUser",
      "fetchPostUserDetails",
      "fetchPutUser",
    ]),
    getRoleById(id) {
      setTimeout(() => {
        M.updateTextFields();
      }, 0);
      return this.userRoles?.find((item) => item.id === id);
    },
    editUser(index) {
      this.create_edit_key = "edit";
      // Заполнение формы данными пользователя для редактирования
      this.editingUser = Object.assign({}, this.users[index]);

      // Открытие модального окна
      const modal = document.querySelector(".modal");
      const instance = M.Modal.getInstance(modal);
      instance.open();
      setTimeout(() => {
        M.updateTextFields();
      }, 0);
    },
    openCreateDialog() {
      this.create_edit_key = "create";
      // Открытие модального окна
      const modal = document.querySelector(".modal");
      const instance = M.Modal.getInstance(modal);
      instance.open();
      setTimeout(() => {
        M.updateTextFields();
      }, 0);
    },
    async saveUser() {
      console.log("createUser");
      console.log(this.create_edit_key);
      const user = {
        user: this.editingUser,
        userDetails: this.editingUserDetails,
      };
      if (this.create_edit_key === "create") {
        await this.fetchPostUser(user);
        // this.fetchPostUser(this.editingUser);
      } else {
        this.fetchPutUser(user);
      }
      console.log("closing");
      await this.fetchGetAllUsers();
      // Закрытие модального окна
      const modal = document.querySelector(".modal");
      const instance = M.Modal.getInstance(modal);
      instance.close();
    },
  },
  async mounted() {
    // Инициализация модального окна
    await this.fetchGetAllUsers();

    await setTimeout(() => {
      const modal = document.querySelector(".modal");
      M.Modal.init(modal);
      M.updateTextFields();
    }, 0);
  },
  computed: {
    ...mapGetters(["users", "userDetails", "userRoles"]),
  },
};
</script>
