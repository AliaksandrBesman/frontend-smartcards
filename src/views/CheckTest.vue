<template>
  <div>
    <div class="row" v-if="c_module">
      <div class="col s12">
        <!-- Информация о модуле -->
        <div>
          <h2>{{ c_module.subject }}</h2>
          <p>Описание: {{ c_module.title }}</p>
          <p>Автор: {{ c_module.createdById }}</p>
        </div>
      </div>
    </div>
    <div class="row" v-if="testUserAnsw?.length && qanA?.length">
      <div class="col s12" :key="index" v-for="(question, index) in qanA">
        <div class="card">
          <div class="card-content">
            <span class="card-title">{{ question.question }}</span>
            <div class="input-field">
              <input
                id="answer"
                type="text"
                class="validate"
                :class="[
                  getAccuracy(question.id)
                    ? 'valid'
                    : getAccuracy(question.id) == null
                    ? ''
                    : 'invalid',
                ]"
                :value="getAnswer(question.id)"
                disabled
              />
              <label for="answer">Answer</label>
            </div>
            <div class="row">
              <div class="col s12">
                <button
                  class="btn"
                  style="margin: 0 10px; color: red"
                  @click="putAnswer(question, false)"
                >
                  Неверно
                </button>
                <button class="btn" @click="putAnswer(question, true)">
                  Верно
                </button>
              </div>
            </div>
          </div>
        </div>
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
      "fetchGetTestResultByUserAndSubId",
      "fetchPutTestAnswer",
      "JustTestMRemoveIT",
    ]),
    getAnswer(index) {
      return this.testUserAnsw.find((u) => u.questionId === index).answer;
    },
    getAccuracy(index) {
      console.log(this.testUserAnsw);
      return this.testUserAnsw.find((u) => u.questionId === index).accuracy;
    },
    putAnswer(question, flag) {
      const checked_test = this.testUserAnsw.find(
        (u) => u.questionId === question.id
      );
      checked_test.accuracy = flag;
      // this.JustTestMRemoveIT({
      //   qanA: this.qanA,
      //   testUserAnsw: this.testUserAnsw,
      //   question: question,
      //   checked_test: checked_test,
      // });

      // console.log(question);
      // question.accuracy = false;

      // const test_answer = {
      //   id: this.testUserAnsw.find((u) => u.questionId === index).id,
      //   userId: this.$route.params.us_id,
      //   questionId: question.id,
      //   answer: this.getAnswer(question.id),
      // };

      // console.log(question);
      this.fetchPutTestAnswer(checked_test);
    },
  },
  computed: {
    ...mapGetters(["c_module", "user", "qanA", "testUserAnsw"]),
  },
  async mounted() {
    await this.fetchModuleById(this.$route.params.m_id);
    await this.fetchQanABySubLId(this.$route.params.m_id);
    await this.fetchGetTestResultByUserAndSubId({
      userId: this.$route.params.us_id,
      subjectId: this.$route.params.m_id,
    });

    await setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
};
</script>
