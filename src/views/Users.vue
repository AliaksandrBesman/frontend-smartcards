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
              :class="{ invalid: v$.editingUser.login.$error || user_exists }"
              v-model="editingUser.login"
            />
            <label for="login">Логин</label>
            <span
              v-if="v$.editingUser.login.$error || user_exists"
              class="helper-text"
              :data-error="
                user_exists
                  ? 'Пользователь с таким логином уже есть'
                  : 'Обязательное поле'
              "
            ></span>
          </div>
          <div class="input-field col s4">
            <input
              id="login"
              type="text"
              class="validate"
              :class="{ invalid: v$.editingUser.password.$error }"
              v-model="editingUser.password"
            />
            <label for="login">Пароль</label>
            <span
              v-if="v$.editingUser.password.$error"
              class="helper-text"
              :data-error="'Обязательное поле'"
            ></span>
          </div>
          <div class="input-field col s4">
            <select v-model="editingUser.roleId" ref="select_user_role_id" >
              <option :value="1" :disabled="editingUser.roleId == 1 || create_edit_key == 'edit'">Админ</option>
              <option :value="2" :disabled="editingUser.roleId == 1">Учитель</option>
              <option :value="3" :disabled="editingUser.roleId == 1">Ученик</option>
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
              :class="{ invalid: v$.editingUser.name.$error }"
              v-model="editingUser.name"
            />
            <label for="name">Имя</label>
            <span
              v-if="v$.editingUser.name.$error"
              class="helper-text"
              :data-error="'Обязательное поле'"
            ></span>
          </div>
          <div class="input-field col s4">
            <input
              id="surname"
              type="text"
              class="validate"
              :class="{ invalid: v$.editingUser.surname.$error }"
              v-model="editingUser.surname"
            />
            <label for="surname">Фамилия</label>
            <span
              v-if="v$.editingUser.surname.$error"
              class="helper-text"
              :data-error="'Обязательное поле'"
            ></span>
          </div>
          <div class="input-field col s4">
            <input
              id="patronymic"
              type="text"
              class="validate"
              :class="{ invalid: v$.editingUser.secondName.$error }"
              v-model="editingUser.secondName"
            />
            <label for="patronymic">Отчество</label>
            <span
              v-if="v$.editingUser.secondName.$error"
              class="helper-text"
              :data-error="'Обязательное поле'"
            ></span>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input
              id="faculty"
              type="text"
              class="validate"
              :class="{ invalid: v$.editingUserDetails.faculty.$error }"
              v-model="editingUserDetails.faculty"
            />
            <label for="faculty">Факультет</label>
            <span
              v-if="v$.editingUserDetails.faculty.$error"
              class="helper-text"
              :data-error="'Обязательное поле'"
            ></span>
          </div>
          <div class="input-field col s6">
            <input
              id="department"
              type="text"
              class="validate"
              :class="{ invalid: v$.editingUserDetails.department.$error }"
              v-model="editingUserDetails.department"
            />
            <label for="department">Кафедра</label>
            <span
              v-if="v$.editingUserDetails.department.$error"
              class="helper-text"
              :data-error="'Обязательное поле'"
            ></span>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s4">
            <input
              id="specialization"
              type="text"
              class="validate"
              :class="{ invalid: v$.editingUserDetails.speciality.$error }"
              v-model="editingUserDetails.speciality"
            />
            <label for="specialization">Специализация</label>
            <span
              v-if="v$.editingUserDetails.speciality.$error"
              class="helper-text"
              :data-error="'Обязательное поле'"
            ></span>
          </div>
          <div class="input-field col s2">
            <input
              id="course"
              type="text"
              class="validate"
              :class="{ invalid: v$.editingUserDetails.course.$error }"
              v-model="editingUserDetails.course"
            />
            <label for="course">Курс</label>
            <span
              v-if="v$.editingUserDetails.course.$error"
              class="helper-text"
              :data-error="'Обязательное поле'"
            ></span>
          </div>
          <div class="input-field col s6">
            <input
              id="group"
              type="text"
              class="validate"
              :class="{ invalid: v$.editingUserDetails.group.$error }"
              v-model="editingUserDetails.group"
            />
            <label for="group">Группа</label>
            <span
              v-if="v$.editingUserDetails.group.$error"
              class="helper-text"
              :data-error="'Обязательное поле'"
            ></span>
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
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      editingUser: {
        login: { required },
        password: { required },
        name: { required },
        surname: { required },
        secondName: { required },
        roleId: { required },
      },
      editingUserDetails: {
        faculty: { required },
        department: {},
        speciality: {},
        course: {},
        group: {},
      },
    };
  },
  data() {
    return {
      editingUser: {},
      editingUserDetails: {},
      create_edit_key: null,
      user_exists: false,
      roleId_dropDowns: null,
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
    checkIfUserExists(login) {
      return this.users.some((user) => user.login === login);
    },
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
        this.roleId_dropDowns = M.FormSelect.init(
          this.$refs.select_user_role_id
        );
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
        this.roleId_dropDowns = M.FormSelect.init(
          this.$refs.select_user_role_id
        );
        M.updateTextFields();
      }, 0);
    },
    async saveUser() {
      this.user_exists = false;
      const userExist = this.checkIfUserExists(this.editingUser.login);
      if (userExist) {
        if (this.create_edit_key == "create") {
          this.user_exists = true;
        } else {
          const olduser = this.users.find((u) => u.id == this.editingUser.id);
          if (olduser.login != this.editingUser.login) {
            this.user_exists = true;
          }
        }
      }
      const valid_result = await this.v$.$validate();
      if (!valid_result || this.user_exists) return;

      const user = {
        user: this.editingUser,
        userDetails: this.editingUserDetails,
      };
      console.log(user);
      if (this.create_edit_key === "create") {
        await this.fetchPostUser(user);
      } else {
        await this.fetchPutUser(user);
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
      this.roleId_dropDowns = M.FormSelect.init(this.$refs.select_user_role_id);
      M.updateTextFields();
    }, 0);
  },
  computed: {
    ...mapGetters(["users", "usersDetails", "userRoles"]),
  },
};
</script>
