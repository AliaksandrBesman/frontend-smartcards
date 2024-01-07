<template>
  <div>
    <h2>Home page</h2>
    <div class="card-container">
      <CardList :cards="cards" />
    </div>
  </div>
  <div class="row">
    <div class="col s3 offset-s3">
      <button
        class="btn waves-effect waves-light"
        type="submit"
        name="action"
        @click="NextCard"
      >
        Тест
      </button>
    </div>
    <div class="col s3"></div>
    <div class="col s3">
      <button
        class="btn waves-effect waves-light"
        type="submit"
        name="action"
        @click="NextCard"
      >
        Статистика
      </button>
    </div>
  </div>
</template>

<script>
import CardList from "@/components/cards/CardList";

export default {
  data() {
    return {
      cards: [
        {
          id: 1123123,
          question: "Question 1",
          answer: "Answer 1",
          flipped: false,
        },
        {
          id: 1123124,
          question: "Question 2",
          answer: "Answer 2",
          flipped: false,
        },
        {
          id: 1123125,
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
    };
  },
  components: {
    CardList,
  },
};
</script>