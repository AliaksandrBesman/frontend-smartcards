<template>
  <div>
    <label>{{ label }}</label>
    <input type="text" :value="value" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>