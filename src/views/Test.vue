<template>
  <div>
    <div class="row" v-if="c_module">
      <div class="col s12">
        <!-- Информация о модуле -->
        <div>
          <h2>{{ c_module.subject }}</h2>
          <p>Описание: {{ c_module.title }}</p>
          <p>Автор: {{ userModuleAuthor?.login }}</p>
        </div>
      </div>
    </div>
    <div class="row" v-if="qanA?.length">
      <div class="col s12" :key="index" v-for="(question, index) in qanA">
        <div class="card">
          <div class="card-content">
            <span class="card-title">{{ question.question }}</span>
            <div class="input-field">
              <textarea
                id="answer"
                class="materialize-textarea"
                v-model="answers[index]"
              ></textarea>
              <label for="answer">Answer</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s12 center">
        <button class="btn" @click="submitAnswers">Завершить тест</button>
      </div>
    </div>
  </div>
</template>

<script>
import TestList from "@/components/tests/TestList";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    TestList,
  },
  data() {
    return {
      answers: [],
    };
  },
  methods: {
    ...mapActions([
      "fetchModuleById",
      "fetchQanABySubLId",
      "fetchSaveTest",
      "fetchGetTestResultByUserAndSubId",
      "fetchPutTestAnswer",
      "fetchGetUserModuleAuthor",
    ]),
    submitAnswers() {
      if (this.testUserAnsw?.length) {
        this.answers.forEach((answer, index) => {
          const test_answer = {
            id: this.testUserAnsw.find(
              (u) =>
                u.userId === this.user.id &&
                u.questionId === this.qanA[index].id
            ).id,
            userId: this.user.id,
            questionId: this.qanA[index].id,
            answer: answer,
          };
          console.log(test_answer);
          this.fetchPutTestAnswer(test_answer);
          this.$router.push("/review_test/" + this.$route.params.id);
        });
      } else {
        this.answers.forEach((answer, index) => {
          const test_answer = {
            userId: this.user.id,
            questionId: this.qanA[index].id,
            answer: answer,
          };
          console.log(test_answer);
          this.fetchSaveTest(test_answer);
          this.$router.push("/review_test/" + this.$route.params.id);
        });
      }
    },
  },
  computed: {
    ...mapGetters(["c_module", "user", "qanA", "testUserAnsw", "userModuleAuthor"]),
  },
  async mounted() {
    await this.fetchModuleById(this.$route.params.id);
    await this.fetchQanABySubLId(this.$route.params.id);
    await this.fetchGetTestResultByUserAndSubId({
      userId: this.user.id,
      subjectId: this.$route.params.id,
    });
    await this.fetchGetUserModuleAuthor(this.c_module.createdById);
    await setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
};
</script>
