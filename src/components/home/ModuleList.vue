<template>
  <div>
    <h2>Курсы</h2>
    <div class="row">
      <div class="input-field col s12 m4">
        <select v-model="selectedTopic" ref="select_filter_id">
          <option value="" >Выберите тему курса</option>
          <option v-for="topic in topics" :key="topic.id" :value="topic.id">
            {{ topic.name }}
          </option>
        </select>
        <label>Тема курса</label>
      </div>
      <div class="input-field col s12 m4">
        <select v-model="sortOrder" ref="select_sorter_id">
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
        <label>Сортировка</label>
      </div>
      <div class="input-field col s12 m4">
        <input type="text" v-model="searchQuery" placeholder="Поиск курса" />
      </div>
    </div>
    <div class="row">
      <div
        class="col s12 m6 l4"
        v-for="(course, index) in filteredCourses"
        :key="index"
      >
        <div class="card">
          <div class="card-content">
            <span class="card-title">{{ course.title }}</span>
            <p>{{ course.description }}</p>
          </div>
          <div class="card-action">
            <router-link to="/module" class="waves-effect waves-light btn"
              >Перейти на курс</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [
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
      selectedTopic: "",
      sortOrder: "asc",
      searchQuery: "",
    };
  },
  computed: {
    filteredCourses() {
      let courses = this.courses;
      if (this.selectedTopic) {
        courses = courses.filter(
          (course) => course.topic === this.topics.find(topic => topic.id === this.selectedTopic).name
        );
      }
      if (this.searchQuery) {
        courses = courses.filter((course) =>
          course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      if (this.sortOrder === "asc") {
        courses = courses.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        courses = courses.sort((a, b) => b.title.localeCompare(a.title));
      }
      return courses;
    },
  },
  mounted() {
    M.FormSelect.init(this.$refs.select_filter_id);
    M.FormSelect.init(this.$refs.select_sorter_id);
    M.updateTextFields();
  },
};
</script>

<style>
/* Дополнительные стили могут быть добавлены здесь */
</style>
