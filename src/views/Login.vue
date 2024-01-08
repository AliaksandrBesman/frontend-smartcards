<template>
  <div>
    <div class="modal-header">
      <h4>Login</h4>
    </div>
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input
              placeholder="Placeholder"
              id="login"
              type="text"
              v-model="login"
            />
            <label for="login">Login</label>
            <!-- <span
              v-if="v$.login.$error"
              class="helper-text"
              :data-error="v$.login.required.$message"
            ></span> -->
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="password" type="password" v-model="password" />
            <label for="password">Password</label>
            <!-- <span v-if="v$.password.$error" class="helper-text" :data-error="v$.password.required.$message"></span> -->
          </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <div class="row">
        <div class="col s12">
          <button class="btn waves-effect waves-light" @click="loginUser">
            Login
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    loginUser() {

      const userInfo = {
        login: this.login,
        password: this.password,
      };

      try {
        this.fetchLogin(userInfo);
        this.$router.push("/");
      } catch (e) {}
    },
  },
  mounted() {
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
};
</script>