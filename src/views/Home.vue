<template>
  <div class="container">
    <div class="row">
      <div class="col-6 d-flex flex-row flex-wrap mx-auto border border-dark border-5">
        <div v-for="(word, i) in words" :key="i">
          <span
            v-for="(char, j) in word"
            :key="j"
            :class="input && HandleState(word, char, i, j)"
            v-text="char"
          ></span>
          <span>&nbsp;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Words from '../api/typo-chain/Words';

export default {
  name: 'Home-V',
  data() {
    return {
      input: '',
      words: [],
      Char: 0,
      ActiveWord: 0,
    };
  },
  async mounted() {
    await this.FetchData();
    this.AddInputListener();
  },
  methods: {
    async FetchData() {
      const res = await Words.Get();
      this.words = res.words;
    },
    AddInputListener() {
      window.addEventListener('keydown', (event) => {
        if (event.key === ' ') {
          event.preventDefault();
        }
        this.input = event.key;
      });
    },
    HandleState(Word, char, row, col) {
      if (row === this.ActiveWord && this.Char === col) {
        if (this.input === char) {
          ++this.Char;
        }
        if (this.Char >= Word.length) {
          ++this.ActiveWord;
          this.Char = 0;
        }
        return 'fw-bold text-danger';
      }
      return '';
    },
  },
};
</script>

<style scoped>
span {
  white-space: pre-wrap;
}
</style>
