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
        <div class="region middle center"><div class="container"></div></div>
        <div class="region lower third"><div class="container"><br/></div></div>
        <div class="region bottom bar">
            <div class="container"></div>
            <div class="region bottom left">
              <div class="container">
                <News></News>
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
    // this.fetchData();
  },
  methods: {
    fetchData () {
      this.$store.dispatch('appStatus', {state: 'loading'})
      this.$store.dispatch('weather').then(() => {
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
.notify-container {
    width: 90%;
    margin: 0 auto;
    .special-messages {
        height: 50px;
        padding: 0px 10px;      
        color: white;
        margin: 0 auto;
        overflow: hidden;
        .notify-message {
            overflow: hidden;
            background: $alert-yellow;
            border-bottom-right-radius: 10px;
            padding-left: 10px;
            .message {
                line-height: 50px;
                font-size: 17px;
                font-weight: 600;       
            }
        }
        .notify-icon {
            height: 50px;
            width: 60px;
            float: left;
            background-color: $alert-normal;
            border-bottom-left-radius: 10px;
            img {
                height: 70%;
                position: relative;
                top: 50%;
                left: 30%;
                transform: translate(-50%, -50%);
            }
        }
    }
}

#home {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}
.sys-info {
  color: rgb(85, 85, 85);
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
