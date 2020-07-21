<template>
  <div :class="[classes]">
    <!-- top left -->
    <div>
      <div class="top-left-rank">{{ rank }}</div>
      <div class="top-left-suit" v-html="suitHTMLCharacter"></div>
    </div>
    <!-- middle -->
    <div>
      <div class="middle-suit" v-html="suitHTMLCharacter"></div>
    </div>
    <!-- bottom right -->
    <div>
      <div class="bottom-right-rank">{{ rank }}</div>
      <div class="bottom-right-suit" v-html="suitHTMLCharacter"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['id', 'rank', 'suit'],
  computed: {
    suitColor() {
      if (this.suit === 'hearts' || this.suit === 'diamonds') {
        return 'red';
      }
      return 'black';
    },
    suitHTMLCharacter() {
      if (this.suit === 'diamonds') return '&diams;';
      return `&${this.suit.toLowerCase()};`;
    },
    cardSize() {
      return this.$mq === 'mobile' ? 'card-mobile' : 'card-desktop';
    },
    classes() {
      return [this.suitColor, this.cardSize];
    }
  }
};
</script>

<style scoped>
.card-desktop {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: black;
  margin: 10px;
  padding: 5px;
  box-shadow: 0px 2px 3px 1px #bbb;
  border-radius: 5px;
  width: 120px;
  height: 165px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    225deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(0, 0, 0, 1) 100%
  );
}

.card-mobile {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: black;
  margin: 10px;
  padding: 5px;
  box-shadow: 0px 2px 3px 1px #bbb;
  border-radius: 5px;
  width: 100px;
  height: 145px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    225deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(0, 0, 0, 1) 100%
  );
}

.top-left-rank {
  position: relative;
  top: 0px;
  left: 0px;
}

.top-left-suit {
  position: relative;
  top: 0px;
  left: 0px;
}

.middle-suit {
  text-align: center;
  font-size: 60px;
}

.bottom-right-rank {
  transform: rotate(180deg);
}

.bottom-right-suit {
  transform: rotate(180deg);
}

.red {
  color: red;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    225deg,
    rgba(121, 16, 9, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(121, 16, 9, 1) 100%
  );
}
</style>
