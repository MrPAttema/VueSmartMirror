<template>
    <div id="home">
        <div class="region fullscreen below">
            <div class="container">
            </div>
        </div>
        <div class="region top bar">
            <div class="container">
                <NotificationCenter></NotificationCenter>
            </div>
            <div class="region top left">
              <div class="container">
                <Weather></Weather>
              </div>
            </div>
            <div class="region top center"><div class="container"><Status/></div></div>
            <div class="region top right"><div class="container"><Clock/></div></div>
        </div>
        <div class="region upper third"><div class="container"></div></div>
        <div class="region middle center">
          <div class="container">
          </div>
        </div>
        <div class="region lower third"><div class="container"><br/></div></div>
        <div class="region bottom bar">
            <div class="container"></div>
            <div class="region bottom left">
              <div class="container">
                <News></News>
                <div class="sys-info">
                  v{{ this.$store.state.versionNumber }} ({{ this.$store.state.versionNumberAdd }})
                  <div v-if="this.$store.state.updating" class="updater">
                    -- <div class="loader"></div> 
                    Zoeken naar updates
                  </div>
                </div>
              </div>
            </div>
            <div class="region bottom center">
              <div class="container">
              </div>
            </div>
            <div class="region bottom right">
              <div class="container">
                
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import variables from './variables'

import NotificationCenter from './Components/NotificationCenter.vue';
import Weather from './Components/Weather.vue';
import News from './Components/News.vue';
import Clock from './Components/Clock.vue';
import Status from './Components/Status.vue';

export default {
  name: 'home',
  components: {
    NotificationCenter,
    Weather,
    News,
    Clock,
    Status,
  },
  computed: {
    store () {
      return this.$store.state
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData () {
      this.$store.dispatch('appStatus', {state: 'loading'})
      // this.$store.dispatch('weather').then(() => {
      //   this.$store.dispatch('appStatus', {state: 'loaded'})
      // })
      this.$store.dispatch('getNotificationData').then(() => {
        this.$store.dispatch('appStatus', {state: 'loaded'})
      })
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:100,300,400,500,700|Roboto:100,300,400,500,700');
@import './assets/styles/all';

body, html {
    background-color: black;
    font-family: 'Open Sans', sans-serif;
}

.updater {
  display: inline-block;
  display: -webkit-inline-box;
  color: rgb(85, 85, 85);
}

.loader {
  margin-top: 3px;
  border: 4px solid #707070; 
  border-top: 4px solid #929292; 
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  margin-left: 5px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

#home {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}
.sys-info {
  color: rgb(146, 146, 146);
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
