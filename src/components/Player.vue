<template>
  <div>
    <div class="grid player-row">
      <div v-for="card in this.hand" :key="card.id">
        <Card :rank="card.rank" :suit="card.suit" />
      </div>
    </div>
    <div class="grid score-row">
      <Score type="number" label="Player Score" :score="sum(this.score)" />
    </div>
    <div class="grid score-row">
      <Score type="number" label="Money" :score="this.money" />
    </div>
    <Bet ref="Bet" @button-click="$emit('bet-click')" />
    <div class="grid player-buttons-row">
      <Button ref="Hit" displayText="Hit" @button-click="$emit('hit-click')" />
      <Button ref="Stand" displayText="Stand" @button-click="$emit('stand-click')" />
      <Button ref="Double" displayText="Double Down" @button-click="$emit('double-click')" />
    </div>
  </div>
</template>

<script>
import Utilities from '../mixins/Utilities.js';
import Bet from './Bet';
import Button from './Button';
import Card from './Card';
import Score from './Score';

export default {
  name: 'Player',
  mixins: [Utilities],
  components: {
    Bet,
    Button,
    Card,
    Score
  },
  data() {
    return {
      hand: [],
      score: [],
      money: 1000,
      bet: Number
    };
  },
  mounted() {},
  methods: {
    increaseScore(card) {
      this.score = this.calculate(card, this.score);
      this.bet = document.getElementById('betValue').value;
    },
    reduceMoney() {
      this.money -= this.bet;
    },
    doubleBet() {
      document.getElementById('betValue').value = this.bet * 2;
      this.bet = document.getElementById('betValue').value;
      this.money -= this.bet / 2;
    },
    increaseMoney(multiplier) {
      switch (multiplier) {
        case 'regular':
          this.money += parseInt(this.bet);
          break;
        case 'double':
          this.money += parseInt(this.bet) * 2;
          break;
        case 'blackJack':
          this.money += parseInt(this.bet) * 2.5;
          break;
      }
    },
    reset() {
      this.hand = [];
      this.score = [];
    },
    buttonsForNextRound() {
      this.lockHitStand();
      this.lockDoubleDown();
      this.unlockBet();
    },
    lockHitStand() {
      this.$refs.Hit.disable();
      this.$refs.Stand.disable();
    },
    unlockHitStand() {
      this.$refs.Hit.enable();
      this.$refs.Stand.enable();
      this.$refs.Double.enable();
    },
    lockStand() {
      this.$refs.Stand.disable();
    },
    unlockStand() {
      this.$refs.Stand.enable();
    },
    lockHit() {
      this.$refs.Hit.disable();
    },
    unlockHit() {
      this.$refs.Hit.enable();
    },
    lockBet() {
      this.$refs.Bet.lock();
    },
    unlockBet() {
      this.$refs.Bet.unlock();
    },
    lockDoubleDown() {
      this.$refs.Double.disable();
    },
    unlockDoubleDown() {
      this.$refs.Double.enable();
    }
  }
};
</script>

<style>
.player-row {
  justify-content: center;
  grid-template-columns: auto auto auto auto auto auto;
  align-items: center;
  margin: 10px 0;
  height: 180px;
}

.score-row {
  justify-content: center;
  grid-template-columns: auto auto;
  align-items: center;
  margin: 10px 0;
  height: 50px;
}

.player-buttons-row {
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  height: 50px;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 30px 30px;
  gap: 10px;
}
</style>
