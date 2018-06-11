<template>
  <div id="home">
      <div class="grid-container">

    <Weather/>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import variables from './variables'

import Weather from './Components/Weather.vue';

export default {
  name: 'home',
    components: {
        Weather
    },
  data () {
    return {
      msg: 'Welcome to Your Vue.js home'
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700|Roboto:300,400,500,700');

body, html {
    margin: 0;
    padding: 0;
    background-color: black;
    font-family: 'Open Sans', sans-serif;
}

#home {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(250px, 350px);
}

.grid-item {
    padding: 1em;
    position: relative;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
