<template>
  <div>
    <h2>Home page</h2>
    <div class="card-container">
      <CardList :cards="cards" />
    </div>
  </div>
</template>

<script>
import CardList from "@/components/cards/CardList";

export default {
  data() {
    return {
      cards: [
        { question: 'Question 1', answer: 'Answer 1', flipped: false },
        { question: 'Question 2', answer: 'Answer 2', flipped: false },
        { question: 'Question 3', answer: 'Answer 3', flipped: false },
        { question: 'Question 4', answer: 'Answer 4', flipped: false },
      ]
    }
  },
  components: {
    CardList
  }
}
</script>