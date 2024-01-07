<template>
  <div class="test-page">
    <div
      v-for="(question, index) in questions"
      :key="index"
      class="question-card"
    >
      <h2>{{ question.title }}</h2>
      <input
        type="text"
        v-model="question.answer"
        placeholder="Введите ответ"
      />
    </div>
    <button
      class="btn waves-effect waves-light submit-button-container"
      type="submit"
      name="action"
      @click="this.$router.push('/module')"
    >
      Отправить тест
      <i class="material-icons right">send</i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        { title: "Вопрос 1", answer: "" },
        { title: "Вопрос 2", answer: "" },
        { title: "Вопрос 3", answer: "" },
        // Добавьте больше вопросов при необходимости
      ],
    };
  },
  methods: {
    submitTest() {
      // Здесь можно добавить логику для отправки ответов на сервер или их обработки
      console.log(this.questions); // Пример: вывод ответов в консоль
    },
  },
};
</script>

<style>
.test-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.question-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

.submit-button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
