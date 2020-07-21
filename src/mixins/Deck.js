import { v4 as uuidv4 } from 'uuid';

export default {
  data() {
    return {
      deck: [],
      drawnCard: undefined,
      suits: ['hearts', 'diamonds', 'clubs', 'spades'],
      ranks: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
    };
  },
  watch: {
    deck: function() {
      if (this.deck.length < 4) {
        console.log('EMPTY, RELOADING');
        this.assembleDeck();
      }
    }
  },
  mounted() {
    this.assembleDeck();
  },
  methods: {
    assembleDeck() {
      this.drawnCard = undefined;
      this.deck = [];
      for (let i = 0; i < this.suits.length; i++) {
        for (let j = 0; j < this.ranks.length; j++) {
          let card = {};
          card.id = uuidv4();
          card.suit = this.suits[i];
          card.rank = this.ranks[j];
          card.value = this.cardValue(this.ranks[j]);
          card.altValue = 1;
          this.deck.push(card);
        }
      }
    },
    cardFromDeck() {
      let randIndex = Math.floor(Math.random() * this.deck.length);
      this.drawnCard = this.deck.splice(randIndex, 1)[0];
      return this.drawnCard;
    },
    cardValue(rank) {
      if (rank === 'A') {
        return 11;
      }
      if (Number.isInteger(rank)) {
        return rank;
      }
      return 10;
    }
  }
};
