<template>
  <div class="row">
    <div class="col s12">
      <!-- Информация о модуле -->
      <div>
        <h2>{{ moduleName }}</h2>
        <p>Тема: {{ theme }}</p>
        <p>Автор: {{ author }}</p>
      </div>
    </div>
  </div>

  <CardList :cards="cards" />

  <div class="row">
    <div class="col s6">
      <!-- Кнопка "Тест" -->
      <div class="center">
        <a class="btn" @click="this.$router.push('/test')">Тест</a>
      </div>
    </div>
    <div class="col s6">
      <!-- Кнопка "Статистика" -->
      <div class="center">
        <a class="btn" @click="showStatistics = !showStatistics">Статистика</a>
      </div>
    </div>
  </div>
  <Statistics v-if="showStatistics" />
  <Comments />
</template>

<script>
import CardList from "@/components/cards/CardList";
import Statistics from "@/components/cards/Statistics";
import Comments from "@/components/cards/Comments";

export default {
  data() {
    return {
      moduleName: "Название модуля",
      theme: "Тема модуля",
      author: "Автор модуля",
      cards: [
        {
          id: 1123123,
          name: "Задача 1",
          description: "Описание задачи 1",
          number: 1,
          question: "Question 1",
          answer: "Answer 1",
          flipped: false,
        },
        {
          id: 1123124,
          name: "Задача 2",
          description: "Описание задачи 2",
          number: 2,
          question: "Question 2",
          answer: "Answer 2",
          flipped: false,
        },
        {
          id: 1123125,
          name: "Задача 3",
          description: "Описание задачи 3",
          number: 3,
          question: "Question 3",
          answer: "Answer 3",
          flipped: false,
        },
        {
          id: 1123126,
          question: "Question 4",
          answer: "Answer 4",
          flipped: false,
        },
      ],
      showStatistics: false,
    };
  },
  components: {
    CardList,
    Statistics,
    Comments,
  },
};
</script>