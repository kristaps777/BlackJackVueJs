<template>
  <div class="grid single">
    <input id="betValue" :type="type" :disabled="disabled" />
  </div>
</template>

<script>
export default {
  name: 'Input',
  data() {
    return {
      disabled: false,
    };
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    enable() {
      this.disabled = false;
    },
    disable() {
      this.disabled = true;
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
.single {
  grid-template-columns: 100px;
}
</style>
