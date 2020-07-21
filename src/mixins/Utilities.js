export default {
  methods: {
    calculate(card, score) {
      if (card.rank === 'A' && this.sum(score) + card.value > 21) {
        score.push(card.altValue);
      } else {
        let aceIndex = score.indexOf(11);
        if (this.sum(score) + card.value > 21 && aceIndex > -1) {
          score.splice(aceIndex, 1);
          score.push(1);
          score.push(card.value);
        } else {
          score.push(card.value);
        }
      }
      return score;
    },
    sum(array) {
      return array.reduce(function(a, b) {
        return a + b;
      }, 0);
    }
  }
};
