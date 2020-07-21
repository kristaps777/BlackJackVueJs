<template>
  <button @click="$emit('button-click')" :disabled="disabled">{{displayText}}</button>
</template>

<script>
export default {
  name: 'Button',
  data() {
    return {
      disabled: false
    };
  },
  props: {
    displayText: {
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
    },
    toggle() {
      this.disabled = (this.disabled + 1) % 2;
    }
  }
};
</script>

<style scoped>
button {
  width: 100px;
  height: 30px;
  background-color: #659ab0;
  border: none;
}

button:disabled {
  opacity: 0.5;
  background-color: #ccc;
}

button:disabled:hover {
  background-color: #ccc;
}

button:focus {
  outline: none;
}

button:hover {
  background-color: #bce3f4;
}
</style>
