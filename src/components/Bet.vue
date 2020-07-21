<template>
  <div class="bottom-row grid row">
    <Button ref="BetButton" displayText="Bet" @button-click="$emit('button-click');" />
    <Input ref="BetAmount" type="number" />
  </div>
</template>

<script>
import Button from './Button';
import Input from './Input';

export default {
  name: 'Bet',
  components: {
    Button,
    Input
  },
  methods: {
    lock() {
      this.$refs.BetButton.disable();
      this.$refs.BetAmount.disable();
    },
    unlock() {
      this.$refs.BetButton.enable();
      this.$refs.BetAmount.enable();
    }
  }
};
</script>

<style scoped>
.bottom-row {
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
