<template>
  <div>
    <div class="modal-header">
      <h4>Вход</h4>
    </div>
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input
              placeholder="Логин"
              id="login"
              type="text"
              v-model="login"
              :class="{ invalid: v$.password.$error }"
            />
            <label for="login">Логин</label>
            <span
              v-if="v$.login.$error"
              class="helper-text"
              :data-error="'Обязательное поле'"
            ></span>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              id="password"
              type="password"
              v-model="password"
              :class="{ invalid: v$.password.$error }"
            />
            <label for="password">Пароль</label>
            <span
              v-if="v$.password.$error"
              class="helper-text"
              :data-error="'Обязательное поле'"
            ></span>
          </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <div class="row">
        <div class="col s12">
          <button class="btn waves-effect waves-light" @click="loginUser">
            Войти
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      login: { required },
      password: { required },
    };
  },
  name: "Login",
  data() {
    return {
      login: null,
      password: null,
      submitStatus: null,
    };
  },
  methods: {
    ...mapActions(["fetchLogin"]),
    async loginUser() {
      const valid_result = await this.v$.$validate();

      if (!valid_result) return;

      const userInfo = {
        login: this.login,
        password: this.password,
      };

      try {
        await this.fetchLogin(userInfo);
        await this.$router.push("/");
      } catch (e) {
        M.toast({html: 'Неверный логин или пароль!'})
      }
    },
  },
  mounted() {
    M.toast({html: 'Добро пожаловать!'})
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
};
</script>