<template>
  <div>
    <h2>Модули</h2>
    <div class="row">
      <div
        class="col s12 m6 l4"
        v-for="(module, index) in modules"
        :key="index"
      >
        <div class="card">
          <div class="card-content">
            <span class="card-title">{{ module.title }}</span>
            <p>{{ module.description }}</p>
          </div>
          <div class="card-action">
            <a
              class="waves-effect waves-light btn modal-trigger"
              href="#access-dialog"
              @click="setSelectedModule(module)"
              >Дать доступ</a
            >
          </div>
        </div>
      </div>
    </div>
    <div id="access-dialog" class="modal">
      <div class="modal-content">
        <h4>Выберите параметры доступа</h4>
        <div class="row">
          <div class="input-field col s12 m6">
            <select ref="select_faculty_id" v-model="access.faculty">
              <option value="" disabled>Выберите факультет</option>
              <option
                v-for="faculty in faculties"
                :key="faculty.id"
                :value="faculty.id"
              >
                {{ faculty.name }}
              </option>
            </select>
            <label>Факультет</label>
          </div>
          <div class="input-field col s12 m6">
            <select ref="select_specialty_id" v-model="access.specialty">
              <option value="" disabled>Выберите специальность</option>
              <option
                v-for="specialty in specialties"
                :key="specialty.id"
                :value="specialty.id"
              >
                {{ specialty.name }}
              </option>
            </select>
            <label>Специальность</label>
          </div>
          <div class="input-field col s12 m6">
            <select ref="select_group_id" v-model="access.group">
              <option value="" disabled>Выберите группу</option>
              <option v-for="group in groups" :key="group.id" :value="group.id">
                {{ group.name }}
              </option>
            </select>
            <label>Группа</label>
          </div>
          <div class="input-field col s12 m6">
            <select ref="select_student_id" v-model="access.student">
              <option value="" disabled>Выберите студента</option>
              <option
                v-for="student in students"
                :key="student.id"
                :value="student.id"
              >
                {{ student.name }}
              </option>
            </select>
            <label>Студент</label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a class="waves-effect waves-light btn" @click="giveAccess"
          >Дать доступ</a
        >
        <a class="waves-effect waves-light btn modal-close">Отмена</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modules: [
        { id: 1, title: "Модуль 1", description: "Описание модуля 1" },
        { id: 2, title: "Модуль 2", description: "Описание модуля 2" },
        { id: 3, title: "Модуль 3", description: "Описание модуля 3" },
        // Добавьте больше модулей при необходимости
      ],
      faculties: [
        { id: 1, name: "Факультет 1" },
        { id: 2, name: "Факультет 2" },
        { id: 3, name: "Факультет 3" },
        // Добавьте больше факультетов при необходимости
      ],
      specialties: [
        { id: 1, name: "Специальность 1" },
        { id: 2, name: "Специальность 2" },
        { id: 3, name: "Специальность 3" },
        // Добавьте больше специальностей при необходимости
      ],
      groups: [
        { id: 1, name: "Группа 1" },
        { id: 2, name: "Группа 2" },
        { id: 3, name: "Группа 3" },
        // Добавьте больше групп при необходимости
      ],
      students: [
        { id: 1, name: "Студент 1" },
        { id: 2, name: "Студент 2" },
        { id: 3, name: "Студент 3" },
        // Добавьте больше студентов при необходимости
      ],
      access: {
        faculty: "",
        specialty: "",
        group: "",
        student: "",
      },
      selectedModule: null,
    };
  },
  mounted() {
    // Инициализация модального окна Materialize
    const elems = document.querySelectorAll(".modal");
    const options = {};
    const instances = M.Modal.init(elems, options);
    M.FormSelect.init(this.$refs.select_faculty_id);
    M.FormSelect.init(this.$refs.select_specialty_id);
    M.FormSelect.init(this.$refs.select_group_id);
    M.FormSelect.init(this.$refs.select_student_id);
    setTimeout(()=>{M.updateTextFields()},0)
  },
  methods: {
    setSelectedModule(module) {
      this.selectedModule = module;
    },
    giveAccess() {
      // Здесь можно добавить логику для предоставления доступа к модулю
      console.log(this.access);
      this.hideAccessDialog();
    },
  },
};
</script>

<style>
/* Дополнительные стили могут быть добавлены здесь */
</style>
