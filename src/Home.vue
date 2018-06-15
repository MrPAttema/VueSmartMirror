<template>
    <div id="home">
        <div class="grid-container">
            <Weather/>
            <Clock/>
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
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:100,300,400,500,700|Roboto:100,300,400,500,700');
@import './assets/styles/all';

body, html {
    margin: 0;
    padding: 0;
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
                height: 65%;
                position: relative;
                top: 50%;
                left: 50%;
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
