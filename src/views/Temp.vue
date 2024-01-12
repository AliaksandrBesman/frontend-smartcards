<template>
  <div
    v-for="(input, index) in collection"
    :key="index"
    :class="{
      error: v$.collection.$each.$response.$errors[index].name.length,
    }"
  >
    <input v-model="input.name" type="text" />
    <div
      v-for="error in v$.collection.$each.$response.$errors[index].name"
      :key="error"
    >
      {{ error.$message }}
    </div>
    
  </div>
  <span>{{v$}}</span>
</template>
<script>
// setup in a component
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      collection: {
        $each: helpers.forEach({
          name: {
            required,
          },
        }),
      },
    };
  },
  name: "Login",
  data() {
    return {
      collection: [{ name: "" }, { name: "bar" }],
    };
  },
};
</script>