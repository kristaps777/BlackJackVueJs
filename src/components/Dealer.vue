<template>
  <div id="dealer">
    <div class="flex dealer-row">
      <div id="overlay" class="hidden"></div>
      <div v-for="card in this.hand" :key="card.id">
        <Card :rank="card.rank" :suit="card.suit" />
      </div>
    </div>
    <div class="flex score-row">
      <Score :type="type" label="Dealer Score" :score="sum(this.score)" />
    </div>
  </div>
</template>

<script>
import Utilities from '../mixins/Utilities.js';
import Card from './Card';
import Score from './Score';

export default {
  name: 'Dealer',
  mixins: [Utilities],
  components: {
    Card,
    Score
  },
  data() {
    return {
      hand: [],
      score: [],
      type: 'hidden'
    };
  },
  mounted() {},
  methods: {
    increaseScore(card) {
      this.score = this.calculate(card, this.score);
    },
    reset() {
      this.hide();
      this.hand = [];
      this.score = [];
    },
    show() {
      document.getElementById('dealer').classList.remove('white');
      document.getElementById('overlay').classList.add('hidden');
      this.type = 'number';
    },
    hide() {
      document.getElementById('dealer').classList.add('white');
      document.getElementById('overlay').classList.remove('hidden');
      this.type = 'hidden';
    }
  }
};
</script>

<style scoped>
.dealer-row {
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  height: 180px;
}

#overlay {
  background-color: white;
  background: url('../assets/back.png') no-repeat center center;
  background-size: cover;
  height: 165px;
  width: 120px;
  border-radius: 5px;
  position: absolute;
  z-index: 1000;
  right: 41.5%;
}
</style>
