<template>
  <div>
    <div class="row" v-if="c_module">
      <div class="col s12">
        <!-- Информация о модуле -->
        <div>
          <h2>{{ 'Решение теста по модулю: ' + c_module.subject }}</h2>
          <p>Описание: {{ c_module.title }}</p>
          <p>Автор: {{ userModuleAuthor?.login }}</p>
        </div>
      </div>
    </div>
    <div class="row" v-if="answers?.length">
      <div class="col s12" :key="index" v-for="(question, index) in qanA">
        <div class="card">
          <div class="card-content">
            <span class="card-title">{{ question.question }}</span>
            <div class="input-field">
              <textarea
                id="answer"
                class="materialize-textarea"
                v-model="answers[index].answer"
                :class="{
                  invalid:
                    v$.answers.$each.$response.$errors[index].answer.length,
                }"
              ></textarea>
              <label for="answer">Вопрос</label>
              <span
                v-if="v$.answers.$each.$response.$errors[index].answer.length"
                class="helper-text"
                :data-error="'Обязательное поле'"
              ></span>
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
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, minLength } from "@vuelidate/validators";
import TestList from "@/components/tests/TestList";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    TestList,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      answers: {
        required,
        $each: helpers.forEach({
          answer: { required },
        }),
      },
    };
  },
  data() {
    return {
      answers: null,
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
    async submitAnswers() {
      const valid_result = await this.v$.$validate();
      if (!valid_result) return;
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
            answer: answer.answer,
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
            answer: answer.answer,
          };
          console.log(test_answer);
          this.fetchSaveTest(test_answer);
          this.$router.push("/review_test/" + this.$route.params.id);
        });
      }
    },
  },
  computed: {
    ...mapGetters([
      "c_module",
      "user",
      "qanA",
      "testUserAnsw",
      "userModuleAuthor",
    ]),
  },
  async mounted() {
    await this.fetchModuleById(this.$route.params.id);
    await this.fetchQanABySubLId(this.$route.params.id);
    this.answers = this.qanA.map(() => ({ answer: "" }));
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
