<template>
  <div>
    <h1>Users</h1>
    <button class="btn" @click="editUser(index)">Create</button>
    <table>
      <thead>
        <tr>
          <th>Login</th>
          <th>Role</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Patronymic</th>
          <th>Faculty</th>
          <th>Department</th>
          <th>Specialization</th>
          <th>Course</th>
          <th>Group</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.login }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>
          <td>{{ user.patronymic }}</td>
          <td>{{ user.faculty }}</td>
          <td>{{ user.department }}</td>
          <td>{{ user.specialization }}</td>
          <td>{{ user.course }}</td>
          <td>{{ user.group }}</td>
          <td>
            <button class="btn" @click="editUser(index)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

<!-- Модальное окно для редактирования пользователя -->
    <div id="editModal" class="modal">
      <div class="modal-content">
        <h4>Edit User</h4>
        <form>
          <div class="input-field">
            <input id="login" type="text" class="validate" v-model="editingUser.login">
            <label for="login">Login</label>
          </div>
          <div class="input-field">
            <input id="role" type="text" class="validate" v-model="editingUser.role">
            <label for="role">Role</label>
          </div>
          <div class="input-field">
            <input id="name" type="text" class="validate" v-model="editingUser.name">
            <label for="name">Name</label>
          </div>
          <div class="input-field">
            <input id="surname" type="text" class="validate" v-model="editingUser.surname">
            <label for="surname">Surname</label>
          </div>
          <div class="input-field">
            <input id="patronymic" type="text" class="validate" v-model="editingUser.patronymic">
            <label for="patronymic">Patronymic</label>
          </div>
          <div class="input-field">
            <input id="faculty" type="text" class="validate" v-model="editingUser.faculty">
            <label for="faculty">Faculty</label>
          </div>
          <div class="input-field">
            <input id="department" type="text" class="validate" v-model="editingUser.department">
            <label for="department">Department</label>
          </div>
          <div class="input-field">
            <input id="specialization" type="text" class="validate" v-model="editingUser.specialization">
            <label for="specialization">Specialization</label>
          </div>
          <div class="input-field">
            <input id="course" type="text" class="validate" v-model="editingUser.course">
            <label for="course">Course</label>
          </div>
          <div class="input-field">
            <input id="group" type="text" class="validate" v-model="editingUser.group">
            <label for="group">Group</label>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <div class="center"><button class="btn" @click="saveUser">Save</button></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
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
        {
          login: 'teacher456',
          role: 'учитель',
          name: 'Елена',
          surname: 'Петрова',
          patronymic: 'Александровна',
          faculty: 'Педагогический',
          department: 'Иностранных языков',
          specialization: 'Английский язык',
          course: null,
          group: null
        },
        {
          login: 'student789',
          role: 'ученик',
          name: 'Алексей',
          surname: 'Смирнов',
          patronymic: 'Владимирович',
          faculty: 'Экономический',
          department: 'Менеджмента',
          specialization: 'Менеджмент организации',
          course: 2,
          group: 'МО-21'
        }
      ],
      editingUser: {}
    }
  },
  methods: {
    editUser(index) {
      // Заполнение формы данными пользователя для редактирования
      this.editingUser = Object.assign({}, this.users[index]);

      // Открытие модального окна
      const modal = document.querySelector('.modal');
      const instance = M.Modal.getInstance(modal);
      instance.open();
      setTimeout(()=>{M.updateTextFields()},0)
    },
    saveUser() {
      // Обработка сохранения изменений
      // Например, можно найти индекс пользователя в массиве и заменить его на новый объект
      const index = this.users.findIndex(user => user.login === this.editingUser.login);
      this.users.splice(index, 1, this.editingUser);

      // Закрытие модального окна
      const modal = document.querySelector('.modal');
      const instance = M.Modal.getInstance(modal);
      instance.close();
    }
  },
    mounted() {
    // Инициализация модального окна
    const modal = document.querySelector('.modal');
    M.Modal.init(modal);
    setTimeout(()=>{M.updateTextFields()},0)
  }
}
</script>
