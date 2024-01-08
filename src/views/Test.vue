<template>
  <div>
    <TestList
      v-for="(question, index) in questions"
      :key="index"
      :question="question"
    ></TestList>
    <div class="row">
      <div class="col s12 center">
        <button class="btn" @click="submitAnswers">Завершить тест</button>
      </div>
    </div>
  </div>
</template>

<script>
import TestList from "@/components/tests/TestList";

export default {
  components: {
    TestList,
  },
  data() {
    return {
      questions: ["Question 1", "Question 2", "Question 3"],
    };
  },
  methods: {
    submitAnswers() {
      // Handle submitting answers
    },
  },
  mounted() {

    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
};
</script>
