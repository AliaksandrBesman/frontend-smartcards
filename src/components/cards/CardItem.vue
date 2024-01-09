<template>
<div class="carousel-item">
  <div class="card center-align" :class="{ flipped: card.flipped }" @click="flipCard">
    <div class="front">{{ card.question }}</div>
    <div class="back">{{ card.answer }}</div>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  methods: {
    flipCard() {
      this.card.flipped = !this.card.flipped;
    },
  },
};
</script>

<style scoped>
.card {

  height: 400px;
  margin: 10px;
  perspective: 1000px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card.flipped {
  transform: rotateY(180deg);
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.front {
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.back {
  background-color: #e6e6e6;
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
</style>