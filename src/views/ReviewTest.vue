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
    <div class="row" v-if="testUserAnsw?.length && qanA?.length">
      <div class="col s12" :key="index" v-for="(question, index) in qanA">
        <div class="card">
          <div class="card-content">
            <span class="card-title">{{ question.question }}</span>
            <div
              class="input-field"
              
            >
              <input
                id="answer"
                type="text"
                class="validate"
                :class="[getAccuracy(question.id) ? 'valid' : getAccuracy(question.id) == null ? '' : 'invalid']"
                :value="getAnswer(question.id)"
                disabled
              />
              <label for="answer">Ответ</label>
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
      "fetchGetUserModuleAuthor",
    ]),
    getAnswer(index) {
      return this.testUserAnsw.find((u) => u.questionId === index).answer;
    },
    getAccuracy(index) {
      return this.testUserAnsw.find((u) => u.questionId === index).accuracy;
    },
    showSMT(inex) {
      return "hehehehhehe" + inex;
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
