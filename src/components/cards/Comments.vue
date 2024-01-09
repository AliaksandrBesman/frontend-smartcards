<template>
  <div>
    <h2>Комментарии</h2>
    <div class="row" v-if="user?.roleId == 3">
      <form class="col s12" @submit.prevent="addComment">
        <div class="input-field col s12">
          <textarea
            id="comment"
            class="materialize-textarea"
            v-model="newComment.text"
          ></textarea>
          <!-- <input id="comment" type="text" v-model="newComment.text" class="validate"> -->
          <label for="comment">Комментарий</label>
        </div>
        <button
          class="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Отправить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>

    <ul class="collection" v-if="filteredComment?.length">
      <li
        class="collection-item"
        v-for="(comment, index) in filteredComment"
        :key="index"
      >
        <span class="title">{{ comment.userId }}</span>
        <p>{{ comment.comment1 }}</p>
        <div v-if="user?.roleId == 1">
          <button
            class="btn waves-effect waves-light"
            v-if="comment.hidden"
            @click="ShowHideComment('show', comment)"
          >
            Открыть комментарий
          </button>
          <button
            class="btn waves-effect waves-light"
            v-else
            @click="ShowHideComment('hide', comment)"
          >
            Скрыть комментарий
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      newComment: {
        name: "",
        text: "",
      },
      showComments: true,
    };
  },
  methods: {
    ...mapActions([
      "fetctGetCommentsBySubjectId",
      "fetchAddNewComment",
      "fetchPutComment",
    ]),
    async addComment() {
      if (this.newComment.text) {
        const newComment = {
          userId: this.user.id,
          subjectId: this.$route.params.id,
          comment1: this.newComment.text,
        };
        await this.fetchAddNewComment(newComment);
        this.newComment.name = "";
        this.newComment.text = "";
        await this.fetctGetCommentsBySubjectId(this.$route.params.id);
      }
    },
    async ShowHideComment(type, comment) {
      console.log(type);
      if (type == "show") {
        comment.hidden = false;
      } else {
        comment.hidden = true;
      }
      console.log(comment);
      this.fetchPutComment(comment);
    },
  },
  computed: {
    ...mapGetters(["user", "subjectComments"]),
    filteredComment() {
      if (this.user?.roleId == 1) {
        return this.subjectComments;
      } else {
        return this.subjectComments?.filter(
          comment=> comment.hidden == false
        );
      }
    },
  },
  async mounted() {
    await this.fetctGetCommentsBySubjectId(this.$route.params.id);
  },
};
</script>

<style>
/* Дополнительные стили могут быть добавлены здесь */
</style>
