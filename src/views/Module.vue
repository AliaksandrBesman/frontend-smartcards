<template>
  <div class="row" v-if="c_module">
    <div class="col s12">
      <!-- Информация о модуле -->
      <div>
        <h2>{{ c_module.subject }}</h2>
        <p>Описание: {{ c_module.title }}</p>
        <p>Автор: {{ userModuleAuthor?.login }}</p>
      </div>
    </div>
    <button
      class="btn"
      v-if="user?.roleId == 2"
      @click.prevent="OpenAssignDialog"
    >
      Дать доступ
    </button>
  </div>

  <CardList :cards="qanA" v-if="qanA?.length" />

  <div class="row" v-if="qanA?.length && user?.roleId != 1">
    <div class="col s4">
      <!-- Кнопка "Тест" -->
      <div class="center" v-if="user?.roleId == 3">
        <a
          class="btn"
          @click="this.$router.push('/test/' + this.$route.params.id)"
          >Тест</a
        >
      </div>
    </div>

    <div class="col s4">
      <!-- Кнопка "Статистика" -->
      <div class="center" v-if="user?.roleId == 2">
        <a class="btn" @click="showStatistics = !showStatistics">Статистика</a>
      </div>
    </div>
    <div class="col s4">
      <!-- Кнопка "Тест" -->
      <div class="center" v-if="user?.roleId == 3">
        <a
          :class="[!testUserAnsw?.length ? 'disabled' : '']"
          class="btn"
          @click="this.$router.push('/review_test/' + this.$route.params.id)"
          >Результат Теста</a
        >
      </div>
    </div>
  </div>
  <Statistics v-if="showStatistics" />
  <Comments />
  <!-- Модальное окно для создания теста -->
  <div id="createModal" class="modal">
    <div class="modal-content">
      <h4>Выдача доступа</h4>
      <table>
        <thead>
          <tr>
            <th>Логин</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in notGrantedUsers" :key="index">
            <td>{{ user.login }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.surname }}</td>
            <td>{{ user.secondName }}</td>
            <td>
              <button class="btn" @click="AssignUser(user)">Разрешить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CardList from "@/components/cards/CardList";
import Statistics from "@/components/cards/Statistics";
import Comments from "@/components/cards/Comments";

import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      showStatistics: false,
    };
  },
  components: {
    CardList,
    Statistics,
    Comments,
  },
  methods: {
    ...mapActions([
      "fetchModuleById",
      "fetchQanABySubLId",
      "fetchGetTestResultByUserAndSubId",
      "fetchGetAllNotGrantedUserstByUserAndSubI",
      "fetchPostGrantingAccess",
      "fetchGetUserModuleAuthor",
    ]),
    OpenAssignDialog() {
      // Открытие модального окна
      const modal = document.querySelector(".modal");
      const instance = M.Modal.getInstance(modal);
      instance.open();
      setTimeout(() => {
        M.updateTextFields();
      }, 0);
    },
    async AssignUser(user) {
      await this.fetchPostGrantingAccess({
        userId: user.id,
        subjectLessonId: this.$route.params.id,
      });
      await this.fetchGetAllNotGrantedUserstByUserAndSubI({
        subjectId: this.$route.params.id,
      });
    },
  },
  computed: {
    ...mapGetters([
      "c_module",
      "user",
      "qanA",
      "testUserAnsw",
      "notGrantedUsers",
      "userModuleAuthor"
    ]),
  },
  async mounted() {
    const modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);
    if (this.user?.roleId == 2) {
      await this.fetchGetAllNotGrantedUserstByUserAndSubI({
        subjectId: this.$route.params.id,
      });
    }
    await this.fetchModuleById(this.$route.params.id);
    await this.fetchQanABySubLId(this.$route.params.id);
    await this.fetchGetTestResultByUserAndSubId({
      userId: this.user.id,
      subjectId: this.$route.params.id,
    });
    await this.fetchGetUserModuleAuthor(this.c_module.createdById);
    console.log(this.testUserAnsw);
  },
};
</script>