const { createApp } = Vue
  createApp({
    methods: {
      setTile(as) {
        this.tile = as
        this.showTileChoice = !this.showTileChoice
        this.showDimInput = !this.showDimInput
      },
      redirect() {
        window.location.href = `wavefunctioncollapse.html?tileset=${this.tile}&dim=${this.dim}`;
      }
  },
  data() {
    return {
      tile: "elementary",
      showTileChoice: true,
      showDimInput: false,
      dim: ""
    }
  }
}).mount('#app')