<template>
  <div>
    <h2>Курсы</h2>
    <button
      class="btn"
      @click="create_change_Module('create')"
      v-if="user?.roleId == 2"
    >
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
        v-for="course in filteredGrantedModules"
        :key="course.id"
      >
        <div class="card">
          <div class="card-content">
            <span class="card-title">{{ ( course.subject.length > 20 ? course.subject.slice(0, 20) + '...' : course.subject ) }}</span>
            <p>{{ course.title }}</p>
          </div>
          <div class="card-action">
            <router-link
              :to="'/module/' + course.id"
              class="waves-effect waves-light btn"
              >Перейти</router-link
            >
            <button
              style="margin: 0 10px"
              class="btn"
              @click="create_change_Module('edit', course.id)"
              v-if="user?.roleId == 2"
            >
              Изменить
            </button>
            <button
              class="btn"
              @click="deleteModule(course.id)"
              v-if="user?.roleId == 2"
            >
              <i class="material-icons">delete_forever</i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно для создания теста -->
    <div id="createModal" class="modal">
      <div class="modal-content">
        <h3>
          {{
            create_edit_type == "create"
              ? "Добавить модуль"
              : "Редактирование обучающего модуля"
          }}
        </h3>

        <div class="input-field">
          <input
            id="subject"
            type="text"
            :class="{ invalid: v$.module.subject.$error }"
            v-model="module.subject"
            placeholder="Предмет"
          />
          <label for="subject">Предмет</label>
          <span
            v-if="v$.module.subject.$error"
            class="helper-text"
            :data-error="'Обязательное поле'"
          ></span>
        </div>

        <div class="input-field">
          <textarea
            id="description"
            class="materialize-textarea"
            :class="{ invalid: v$.module.description.$error }"
            v-model="module.description"
            placeholder="Описание"
          ></textarea>
          <label for="description">Описание</label>
          <span
            v-if="v$.module.description.$error"
            class="helper-text"
            :data-error="'Обязательное поле'"
          ></span>
        </div>

        <h4>Тестовые вопросы</h4>

        <div
          v-for="(question, index) in module.questions"
          :key="question.id"
          class="card"
        >
          <div class="card-content">
            <span class="card-title">Вопрос {{ index + 1 }}</span>

            <div class="input-field">
              <input
                :id="'question' + index"
                type="text"
                v-model="question.question"
                placeholder="Вопрос"
              />
              <label :for="'question' + index">Вопрос</label>
            </div>

            <div class="input-field">
              <input
                :id="'answer' + index"
                type="text"
                v-model="question.answer"
                placeholder="Ответ"
              />
              <label :for="'answer' + index">Ответ</label>
            </div>
            <button class="btn" @click="removeQuestion(index)">
              Удалить вопрос
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col s6">
            <button class="btn" @click="addQuestion">Добавить вопрос</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <span v-if="isTestEmpty" style="color: red"
            >В тесте должен быть минимум один вопрос</span
          >
        </div>
      </div>
      <div class="modal-footer" style="text-align: center">
        <button
          class="waves-effect waves-light btn"
          @click.prevent="saveModule"
        >
          Сохранить
        </button>
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
      module: {
        subject: { required },
        description: { required },
      },
    };
  },
  data() {
    return {
      selectedTopic: "",
      sortOrder: "asc",
      searchQuery: "",
      module: {
        subject: "",
        description: "",
        questions: [],
      },
      create_edit_type: null,
      isTestEmpty: null,
    };
  },
  methods: {
    ...mapActions([
      "fetchGrantedModulesByUserId",
      "fetchGrantedSubjectLessonByCreatedById",
      "fetchPostSubjectLesson",
      "fetchModuleById",
      "fetchQanABySubLId",
      "fetchPutSubjectLesson",
      "fetchDeleteSubjectLesson",
      "fetchDeleteModuleQuestion",
      "fetchDeleteTestAnswerForModule",
    ]),
    isTestNotEmpty(obj) {
      return Array.isArray(obj) && obj.length > 0;
    },
    async create_change_Module(type, module_id = 0) {
      this.create_edit_type = type;
      if (type == "create") {
        this.module = {
          subject: "",
          description: "",
          questions: [],
        };
      } else {
        await this.fetchModuleById(module_id);
        await this.fetchQanABySubLId(module_id);

        this.module = {
          subject: this.c_module.subject,
          description: this.c_module.title,
          questions: this.qanA,
        };
      }

      // Открытие модального окна
      const modal = document.querySelector(".modal");
      const instance = M.Modal.getInstance(modal);
      instance.open();
      setTimeout(() => {
        M.updateTextFields();
      }, 0);
    },
    async deleteModule(sId) {
      await this.fetchDeleteSubjectLesson(sId);
      await this.fetchGrantedSubjectLessonByCreatedById(this.user.id);
    },
    addQuestion() {
      this.module.questions.push({ question: "", answer: "" });
      setTimeout(() => {
        M.updateTextFields();
      }, 0);
    },
    removeQuestion(index) {
      if (this.module.questions?.length < 2) return
      if (this.create_edit_type == "edit") {
        this.fetchDeleteModuleQuestion(this.module.questions[index].id);
      }

      this.module.questions.splice(index, 1);
    },
    async saveModule() {
      const isTestNotEmpty = this.isTestNotEmpty(this.module.questions);
      if (!isTestNotEmpty) {
        this.isTestEmpty = true;
      }
      const valid_result = await this.v$.$validate();
      if (!valid_result || !isTestNotEmpty) return;
      const subjectLesson = {
        subjectLesson: {
          subject: this.module.subject,
          title: this.module.description,
          createdById: this.user.id,
        },
        qanA: this.module.questions,
      };
      if (this.create_edit_type == "edit") {
        subjectLesson.subjectLesson.id = this.c_module.id;
        subjectLesson.qanA.forEach((element) => {
          element.subjectLessonId = this.c_module.id;
        });
        await this.fetchPutSubjectLesson(subjectLesson);
      } else {
        await this.fetchPostSubjectLesson(subjectLesson);
      }
      await this.fetchGrantedSubjectLessonByCreatedById(this.user.id);
      console.log(subjectLesson);

      // Закрытие модального окна
      const modal = document.querySelector(".modal");
      const instance = M.Modal.getInstance(modal);
      instance.close();
    },
  },
  computed: {
    ...mapGetters(["grantedModules", "user", "c_module", "qanA"]),
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
