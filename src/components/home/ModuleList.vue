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
        v-for="(course, index) in filteredModules"
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
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      selectedTopic: "",
      sortOrder: "asc",
      searchQuery: "",
    };
  },
  computed: {
     ...mapGetters(['modules','topics']),
    filteredModules() {
      let modules = this.modules;
      if (this.selectedTopic) {
        modules = modules.filter(
          (course) => course.topic === this.topics.find(topic => topic.id === this.selectedTopic).name
        );
      }
      if (this.searchQuery) {
        modules = modules.filter((course) =>
          course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      if (this.sortOrder === "asc") {
        modules = modules.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        modules = modules.sort((a, b) => b.title.localeCompare(a.title));
      }
      return modules;
    },
  },
  mounted() {
    M.FormSelect.init(this.$refs.select_filter_id);
    M.FormSelect.init(this.$refs.select_sorter_id);
    setTimeout(()=>{M.updateTextFields()},0)
  },
};
</script>

<style>
/* Дополнительные стили могут быть добавлены здесь */
</style>
