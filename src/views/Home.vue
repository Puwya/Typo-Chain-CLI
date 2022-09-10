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
import Words from '../api/Words';

export default {
  name: 'Home-V',
  data() {
    return {
      input: '',
      words: [],
      CharIndex: 0,
      ActiveWordIndex: 0,
    };
  },
  async mounted() {
    const res = await Words.Get();
    this.words = res.words;
    window.addEventListener('keydown', (event) => {
      if (event.key === ' ') {
        event.preventDefault();
      }
      this.input = event.key;
    });
  },
  methods: {
    HandleState(Word, char, WordIndex, CharIndex) {
      if (WordIndex === this.ActiveWordIndex && this.CharIndex === CharIndex) {
        if (this.input === char) {
          ++this.CharIndex;
        }
        if (this.CharIndex === Word.length) {
          ++this.ActiveWordIndex;
          this.CharIndex = 0;
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
