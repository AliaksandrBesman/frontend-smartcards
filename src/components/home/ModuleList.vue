<template>
  <div>
    <h2>Курсы</h2>
    <button class="btn" @click="createModule" v-if="user?.roleId == 2">
      Создать
    </button>
    <div class="row" v-if="grantedModules?.length">
      <div class="input-field col s12 m4">
        <select v-model="selectedTopic" ref="select_filter_id">
          <option value="">Выберите предмет курса</option>
          <option v-for="topic in topics" :key="topic.id" :value="topic.id">
            {{ topic.name }}
          </option>
        </select>
        <label>Предмет курса</label>
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
    <div class="row" v-if="grantedModules?.length">
      <div
        class="col s12 m6 l4"
        v-for="(course, index) in filteredGrantedModules"
        :key="index"
      >
        <div class="card">
          <div class="card-content">
            <span class="card-title">{{ course.subject }}</span>
            <p>{{ course.title }}</p>
          </div>
          <div class="card-action">
            <router-link
              :to="'/module/' + course.id"
              class="waves-effect waves-light btn"
              >Перейти на курс</router-link
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно для создания теста -->
    <div id="createModal" class="modal">
      <div class="modal-content">
        <h4>Добавить модуль</h4>
        <form>
          <div class="input-field">
            <input
              id="testSubject"
              type="text"
              class="validate"
              v-model="newTest.subject"
            />
            <label for="testSubject">Предмет</label>
          </div>
          <div class="input-field">
            <input
              id="testName"
              type="text"
              class="validate"
              v-model="newTest.title"
            />
            <label for="testName">Описание</label>
          </div>
          <div class="input-field">
            <textarea
              id="testQuest"
              class="materialize-textarea"
              v-model="question_answer.question"
            ></textarea>
            <label for="testQuest">Вопрос</label>
          </div>
          <div class="input-field">
            <input
              id="testAnswer"
              type="text"
              class="validate"
              v-model="question_answer.answer"
            />
            <label for="testAnswer">Ответ</label>
          </div>
          <button
            class="waves-effect waves-light btn"
            @click.prevent="addTestCard"
          >
            Добавить
          </button>
          <ul class="collection" v-if="questions_answers?.length">
            <li
              class="collection-item"
              v-for="(qa, index) in questions_answers"
              :key="index"
            >
              <span class="title">{{ qa.question }}</span>
              <p>{{ qa.answer }}</p>
            </li>
          </ul>
        </form>
      </div>
      <div class="modal-footer" style="text-align: center">
        <button
          class="waves-effect waves-light btn modal-close"
          @click.prevent="saveModule"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      selectedTopic: "",
      sortOrder: "asc",
      searchQuery: "",
      newTest: {},
      question_answer: {},
      questions_answers: [],
    };
  },
  methods: {
    ...mapActions([
      "fetchGrantedModulesByUserId",
      "fetchGrantedSubjectLessonByCreatedById",
      "fetchPostSubjectLesson",
    ]),
    createModule() {
      this.questions_answers = [];
      this.question_answer = {};
      // Открытие модального окна
      const modal = document.querySelector(".modal");
      const instance = M.Modal.getInstance(modal);
      instance.open();
      setTimeout(() => {
        M.updateTextFields();
      }, 0);
    },
    addTestCard() {
      this.questions_answers.push({ ...this.question_answer });
    },
    saveModule() {
      const subjectLesson = {
        subjectLesson: {
          subject: this.newTest.subject,
          title: this.newTest.title,
          createdById: this.user.id,
        },
        qanA: this.questions_answers,
      };
      console.log(subjectLesson);
      this.fetchPostSubjectLesson(subjectLesson);
    },
  },
  computed: {
    ...mapGetters(["grantedModules", "user"]),
    filteredGrantedModules() {
      let grantedModules = this.grantedModules;
      if (this.selectedTopic) {
        grantedModules = grantedModules.filter(
          (course) =>
            course.subject ===
            this.topics.find((topic) => topic.id === this.selectedTopic).name
        );
      }
      if (this.searchQuery) {
        grantedModules = grantedModules.filter((course) =>
          course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      if (this.sortOrder === "asc") {
        grantedModules = grantedModules.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      } else {
        grantedModules = grantedModules.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      }
      return grantedModules;
    },
    topics() {
      return Array.from(
        new Set(this.grantedModules.map((item) => item.subject))
      ).map((topic, index) => ({ id: index + 1, name: topic }));
    },
  },
  async mounted() {
    if (this.user?.roleId == 2) {
      await this.fetchGrantedSubjectLessonByCreatedById(this.user.id);
    } else {
      console.log(
        "await this.fetchGrantedModulesByUserId(this.user.id);" +
          "await this.fetchGrantedModulesByUserId(this.user.id);"
      );
      await this.fetchGrantedModulesByUserId(this.user.id);
    }

    await setTimeout(() => {
      const modals = document.querySelectorAll(".modal");
      M.Modal.init(modals);
      M.FormSelect.init(this.$refs.select_filter_id);
      M.FormSelect.init(this.$refs.select_sorter_id);
      M.updateTextFields();
    }, 0);
  },
};
</script>

<style>
/* Дополнительные стили могут быть добавлены здесь */
</style>
