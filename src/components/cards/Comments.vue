<template>
  <div>
    <h2>Комментарии</h2>
    <div class="row">
      <form class="col s12" @submit.prevent="addComment">
        <div class="input-field col s6">
          <input id="name" type="text" v-model="newComment.name" class="validate">
          <label for="name">Имя</label>
        </div>
        <div class="input-field col s6">
          <input id="comment" type="text" v-model="newComment.text" class="validate">
          <label for="comment">Комментарий</label>
        </div>
        <button class="btn waves-effect waves-light" type="submit" name="action">Отправить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
    <ul class="collection">
      <li class="collection-item" v-for="(comment, index) in comments" :key="index">
        <span class="title">{{ comment.name }}</span>
        <p>{{ comment.text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [
        { id: 1, name: 'Иван', text: 'Комментарий 1' },
        { id: 2, name: 'Мария', text: 'Комментарий 2' },
        { id: 3, name: 'Анна', text: 'Комментарий 3' }
        // Добавьте больше комментариев при необходимости
      ],
      newComment: {
        name: '',
        text: ''
      }
    };
  },
  methods: {
    addComment() {
      if (this.newComment.name && this.newComment.text) {
        this.comments.push({
          id: this.comments.length + 1,
          name: this.newComment.name,
          text: this.newComment.text
        });
        this.newComment.name = '';
        this.newComment.text = '';
      }
    }
  }
};
</script>

<style>
/* Дополнительные стили могут быть добавлены здесь */
</style>
