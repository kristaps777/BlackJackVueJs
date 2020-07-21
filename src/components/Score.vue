<template>
  <div class="grid row">
    <label>{{label}}</label>
    <input :type="type" :value="score" disabled />
  </div>
</template>

<script>

export default {
  name: 'Score',
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true,
      default: 0
    }
  }
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
