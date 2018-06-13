<template>
  <div id="home">
        <div class="grid-container">
            <Weather/>
            <div class="grid-item"></div>
            <!-- <div class="grid-item"></div> -->
            <News/>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import variables from './variables'

import Weather from './Components/Weather.vue';
import News from './Components/News.vue';
import Clock from './Components/Clock.vue';

export default {
  name: 'home',
    components: {
        Weather,
        News,
        Clock
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
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 7em 10px;
  grid-auto-rows: minmax(250px, auto);
  grid-auto-flow: row;
}

.grid-item {
    padding: 0.5em;
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
