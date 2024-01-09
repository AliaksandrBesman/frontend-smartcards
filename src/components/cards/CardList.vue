<template>
    <div class="row">
      <div class="col s12">
        <!-- Карусель с заданиями -->
        <div ref="carousel" class="carousel carousel-slider">
          <Item v-for="(card, index) in cards" :key="index" :card="card" />
        </div>
      </div>
    </div>

  <div class="row">
    <div class="col s12">
      <!-- Кнопки управления каруселью -->
      <div class="center">
        <a class="btn" @click="prevCard">Назад <i class="material-icons left">keyboard_arrow_left</i></a>
        <span style="margin: 0 10px;">{{ currentCard }} / {{ cards.length }}</span>
        <a class="btn" @click="nextCard">Вперед<i class="material-icons right">keyboard_arrow_right</i></a>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./CardItem.vue";

export default {
  props: {
    cards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      carousel: null,
      currentCard: 1,
    };
  },
  components: {
    Item,
  },
  methods: {
    registerModules() {
      this.carousel = M.Carousel.init(this.$refs.carousel, {
        fullWidth: true,
      });
    },
    prevCard() {
      this.currentCard = this.currentCard - 1;
      if (this.currentCard === 0) {
        this.currentCard = 1;
        return;
      }
      this.carousel.prev();
    },
    nextCard() {
      this.currentCard = this.currentCard + 1;
      if (this.currentCard === this.cards.length + 1) {
        this.currentCard = this.cards.length;
        return;
      }
      this.carousel.next();
    },
  },

  mounted() {
    this.registerModules();
  },
};
</script>

<style>
.outer-div {
  text-align: center;
}

.inner-div {
  display: inline-block;
  margin: auto 10px; /* Для создания отступов между блоками */
}
</style>