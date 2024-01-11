<template>
  <div>
    <h1>Список пользователей</h1>
    <button class="btn" @click="openCreateDialog()">Добавить</button>
    <table v-if="users">
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
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ user?.login }}</td>
          <td>{{ user?.password }}</td>
          <td>{{ user?.name }}</td>
          <td>{{ user?.surname }}</td>
          <td>{{ user?.secondName }}</td>
          <td>{{ getRoleById(user?.roleId)?.name }}</td>
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
        <!--  -->
        <div class="row">
          <div class="input-field col s4">
            <input
              id="login"
              type="text"
              class="validate"
              v-model="editingUser.login"
            />
            <label for="login">Логин</label>
          </div>
          <div class="input-field col s4">
            <input
              id="login"
              type="text"
              class="validate"
              v-model="editingUser.password"
            />
            <label for="login">Пароль</label>
          </div>
          <div class="input-field col s4" v-if="create_edit_key == 'edit'">
            <input
              id="role"
              type="text"
              class="validate"
              :value="getRoleById(editingUser?.roleId)?.name"
              disabled
            />
            <label for="role">Роль</label>
          </div>
          <div class="input-field col s4" v-else>
            <!-- <select v-model="editingUser.roleId" :disabled="isEditing"> -->
            <select v-model="editingUser.roleId" ref="select_user_role_id">
              <option value="1">Админ</option>
              <option value="2">Учитель</option>
              <option value="3">Ученик</option>
            </select>
            <label>Роль</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s4">
            <input
              id="name"
              type="text"
              class="validate"
              v-model="editingUser.name"
            />
            <label for="name">Имя</label>
          </div>
          <div class="input-field col s4">
            <input
              id="surname"
              type="text"
              class="validate"
              v-model="editingUser.surname"
            />
            <label for="surname">Фамилия</label>
          </div>
          <div class="input-field col s4">
            <input
              id="patronymic"
              type="text"
              class="validate"
              v-model="editingUser.secondName"
            />
            <label for="patronymic">Отчество</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input
              id="faculty"
              type="text"
              class="validate"
              v-model="editingUserDetails.faculty"
            />
            <label for="faculty">Факультет</label>
          </div>
          <div class="input-field col s6">
            <input
              id="department"
              type="text"
              class="validate"
              v-model="editingUserDetails.department"
            />
            <label for="department">Кафедра</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s4">
            <input
              id="specialization"
              type="text"
              class="validate"
              v-model="editingUserDetails.speciality"
            />
            <label for="specialization">Специализация</label>
          </div>
          <div class="input-field col s2">
            <input
              id="course"
              type="text"
              class="validate"
              v-model="editingUserDetails.course"
            />
            <label for="course">Курс</label>
          </div>
          <div class="input-field col s6">
            <input
              id="group"
              type="text"
              class="validate"
              v-model="editingUserDetails.group"
            />
            <label for="group">Группа</label>
          </div>
        </div>
        <!--  -->
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
      "fetchGetUsersDetails",
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
      this.editingUserDetails = Object.assign(
        {},
        this.usersDetails?.find((u) => u.id == this.users[index].userdetailsid)
      );

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
      this.editingUser = Object.assign({});
      this.editingUserDetails = Object.assign({});
      // Открытие модального окна
      const modal = document.querySelector(".modal");
      const instance = M.Modal.getInstance(modal);
      instance.open();
      setTimeout(() => {
        M.FormSelect.init(this.$refs.select_user_role_id);
        M.updateTextFields();
      }, 0);
    },
    async saveUser() {
      console.log("saveUser");
      console.log(this.create_edit_key);
      const user = {
        user: this.editingUser,
        userDetails: this.editingUserDetails,
      };
      console.log(user);
      if (this.create_edit_key === "create") {
        await this.fetchPostUser(user);
      } else {
        this.fetchPutUser(user);
      }
      console.log("closing");
      await this.fetchGetAllUsers();
      await this.fetchGetUsersDetails();

      // Закрытие модального окна
      const modal = document.querySelector(".modal");
      const instance = M.Modal.getInstance(modal);
      instance.close();
    },
  },
  async mounted() {
    // Инициализация модального окна
    await this.fetchGetAllUsers();
    await this.fetchGetUsersDetails();

    await setTimeout(() => {
      const modal = document.querySelector(".modal");
      M.Modal.init(modal);
      M.FormSelect.init(this.$refs.select_user_role_id);
      M.updateTextFields();
    }, 0);
  },
  computed: {
    ...mapGetters(["users", "usersDetails", "userRoles"]),
  },
};
</script>
