<template>
  <div id="app">
    <Dealer ref="Dealer" />
    <div class="flex message">
      <p>{{message}}</p>
    </div>
    <Player
      ref="Player"
      @bet-click="activateButtons(); startNewRound();"
      @hit-click="drawCard('player'); checkConditions(); deactivateButtons();"
      @stand-click="standForPlayer();"
      @double-click="doubleDown();"
    />
  </div>
</template>

<script>
import Utilities from './mixins/Utilities.js';
import Deck from './mixins/Deck.js';
import Dealer from './components/Dealer';
import Player from './components/Player';

export default {
  name: 'App',
  mixins: [Deck, Utilities],
  components: {
    Dealer,
    Player
  },
  data() {
    return {
      message: ''
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    drawCard(target) {
      let playingCard = this.cardFromDeck();
      switch (target) {
        case 'player':
          this.$refs.Player.hand.push(playingCard);
          this.$refs.Player.increaseScore(playingCard);
          break;
        case 'dealer':
          this.$refs.Dealer.hand.push(playingCard);
          this.$refs.Dealer.increaseScore(playingCard);
          break;
      }
    },
    checkConditions() {
      this.checkPlayerBust();
      this.checkPlayerHas21();
    },
    checkBlackJack() {
      if (this.sum(this.$refs.Player.score) === 21) {
        this.message = 'BLACKJACK - PLAYER WINS!';
        this.$refs.Player.increaseMoney('blackJack');
        this.$refs.Player.buttonsForNextRound();
      } else if (this.sum(this.$refs.Dealer.score) === 21) {
        this.$refs.Dealer.show();
        this.message = 'BLACKJACK - DEALER WINS!';
        this.$refs.Player.buttonsForNextRound();
      }
    },
    checkPlayerHas21() {
      if (this.sum(this.$refs.Player.score) === 21) {
        this.$refs.Player.lockHitStand();
        this.autoDealer();
      }
    },
    checkPlayerBust() {
      if (this.sum(this.$refs.Player.score) > 21) {
        this.message = 'PLAYER BUSTS!';
        this.$refs.Player.buttonsForNextRound();
      }
    },
    checkScores() {
      const dealerScore = this.sum(this.$refs.Dealer.score);
      const playerScore = this.sum(this.$refs.Player.score);
      switch (true) {
        case dealerScore > 21:
          this.message = 'DEALER BUSTS, PLAYER WINS!';
          this.$refs.Player.increaseMoney('double');
          break;
        case dealerScore > playerScore:
          this.message = 'DEALER WINS!';
          break;
        case dealerScore < playerScore:
          this.message = 'PLAYER WINS!';
          this.$refs.Player.increaseMoney('double');
          break;
        case dealerScore == playerScore:
          this.message = 'PUSH!';
          this.$refs.Player.increaseMoney('regular');
          break;
      }
      this.$refs.Player.unlockBet();
    },
    standForPlayer() {
      this.$refs.Player.lockHit();
      this.$refs.Player.lockStand();
      this.$refs.Player.lockDoubleDown();
      this.autoDealer();
    },
    startNewRound() {
      this.message = '';
      this.$refs.Player.reset();
      this.$refs.Dealer.reset();
      this.drawCard('player');
      this.drawCard('player');
      this.drawCard('dealer');
      this.drawCard('dealer');
      this.$refs.Player.reduceMoney();
      this.checkBlackJack();
    },
    autoDealer() {
      this.$refs.Dealer.show();
      while (this.sum(this.$refs.Dealer.score) < 17) {
        this.drawCard('dealer');
      }
      this.checkScores();
    },
    init() {
      this.$refs.Player.lockHit();
      this.$refs.Player.lockStand();
      this.$refs.Player.lockDoubleDown();
    },
    activateButtons() {
      this.$refs.Player.unlockHit();
      this.$refs.Player.unlockStand();
      this.$refs.Player.unlockDoubleDown();
      this.$refs.Player.lockBet();
    },
    deactivateButtons() {
      this.$refs.Player.lockDoubleDown();
    },
    doubleDown() {
      this.$refs.Player.lockDoubleDown();
      this.$refs.Player.doubleBet();
      this.drawCard('player');
      this.standForPlayer();

    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  color: white;
}

body:before {
  content: '';
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  min-height: -webkit-fill-available;
  height: 100vh;
  z-index: -10;
  background: url('assets/cards.jpg') no-repeat center center;
  background-size: cover;
  filter: brightness(20%);
}

.flex {
  display: flex;
}

.grid {
  display: grid;
}

.row {
  grid-template-columns: 100px 100px;
  gap: 10px;
}

.message {
  height: 20px;
  justify-content: center;
  align-items: center;
}

.white input {
  color: white;
}

.hidden {
  display: none;
}

input {
  text-align: center;
}
</style>
