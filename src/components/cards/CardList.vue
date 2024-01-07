<template>
  <div ref="carousel" class="carousel carousel-slider center">
    <Item v-for="(card, index) in cards" :key="index" :card="card" />
  </div>

  <div class="row">
    <div class="col s6 offset-s3">
      <div class="outer-div">
        <div class="inner-div">
          <button
            class="btn waves-effect waves-light"
            type="submit"
            name="action"
            @click="PrevCard"
          >
            Назад
            <i class="material-icons left">keyboard_arrow_left</i>
          </button>
        </div>
        <div class="inner-div">
          <span>{{ currentCard }}/{{ cards.length }}</span>
        </div>
        <div class="inner-div">
          <button
            class="btn waves-effect waves-light"
            type="submit"
            name="action"
            @click="NextCard"
          >
            Вперед
            <i class="material-icons right">keyboard_arrow_right</i>
          </button>
        </div>
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
    PrevCard() {
      
      this.currentCard = this.currentCard - 1;
      if (this.currentCard === 0) {
        this.currentCard = 1;
        return
      }
      this.carousel.prev();
    },
    NextCard() {
      this.currentCard = this.currentCard + 1;
      if (this.currentCard === this.cards.length + 1) {
        this.currentCard = 4;
        return
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