<template>
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <span class="card-title">{{ question }}</span>
          <div class="input-field">
            <textarea id="answer" class="materialize-textarea" v-model="answer"></textarea>
            <label for="answer">Answer</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: String
  },
  data() {
    return {
      answer: ''
    }
  }
}
</script>
