<template>
    <div class="grid-item">
        <div :v-if="loading"></div>
        <div class="weather">
            <div class="data">
                <div class="temprature">
                    {{ currentweather.temp_c }} &deg;C
                </div>
                <div class="weather-text">
                    <span>{{ forecast.txt_forecast.forecastday[0].title | capitalize }}: {{ forecast.txt_forecast.forecastday[0].fcttext_metric }}</span>
                </div>
            </div>          
            <div class="icon">
                <img :src="require('../assets/icons/day/'+ currentweatherIcon +'.png')" alt="">
            </div>
        </div>      
    </div>
</template>

<script>
import axios from 'axios'
import store from '../store'
import variables from '../variables'

export default {
   name: 'weather',
   data() {
        return {
            currentweather: 'Laden..',
            currentweatherIcon: null,
            forecast: [],
            location: [],
        }
    },
    mounted() {
        this.getWeatherData();
    },
    methods: {
        getWeatherData() {
            axios.get('http://api.wunderground.com/api/ee1f1a8cb9899e1b/conditions/geolookup/forecast/lang:NL/q/zmw:00000.1.06270.json')
            .then(response => {
                console.log(response.data)
                this.currentweather = response.data.current_observation
                this.currentweatherIcon = response.data.current_observation.icon
                this.forecast = response.data.forecast
                this.location = response.data.location
                // return this.$store.getters.getWeatherData
            })
        }
    },
    ready: function () {
        this.getWeatherData();
        setInterval(function () {
        this.getWeatherData();
        }.bind(this), 60000); 
    }
}
</script>

<style lang="scss" scoped>
.weather {
    display: flex;
    .data {
        height: 100%;
            .temprature {
            font-size: 7em;
            font-weight: 300;
            letter-spacing: -0.1em;
            margin: auto 0;
        }
        .weather-text {
            font-size: 1.5em;
            margin-top: 15px;
        }
    }
    .icon {
        height: 100%;
        width: 40%;
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        left: 350px;
        img {
            max-width: 210px;
            margin: auto 0;
            image-rendering: -webkit-optimize-contrast;
            position: relative;
        }
    }
}
</style>
