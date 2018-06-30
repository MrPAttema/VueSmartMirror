<template>
    <div class="grid-item">
        <div class="weather">
            <div class="data">
                <div class="temprature">
                    {{ currentweather.temp_c }}
                    <span v-html="degreeLabel"></span>
                </div>
                <div class="weather-text">
                    <span>{{ forecast.txt_forecast.forecastday[0].title | capitalize }}: {{ forecast.txt_forecast.forecastday[0].fcttext_metric }}</span>
                </div>
                <div class="forecast">
                    <div class="longtermForecast" :longtermForecast="longtermForecast" v-for="item in longtermForecast" :key="item.id">
                        <span class="weekname">{{ item.date.weekday | capitalize }}</span>
                        <img class="forecast-icon" :src="require('../assets/icons/day/'+  item.icon +'.png')" alt="">
                        {{ item.high.celsius }}<span v-html="degreeLabel"></span> - {{ item.low.celsius }}<span v-html="degreeLabel"></span>
                    </div>
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
            currentweather: {},
            currentweatherIcon: null,
            forecast: [],
            longtermForecast: [],
            location: [],
            degreeLabel: '',
            units: '',
            maxNumberOfDays: 7,
        }
    },
    mounted() {
        this.getWeatherData();
    },
    methods: {
        getWeatherData() {
            const url  = 'http://api.wunderground.com/api/'+ variables.weatherUndergroundApiKey +'/conditions/geolookup/alerts/forecast/lang:NL/q/zmw:00000.1.06270.json';
            axios.get(url)
            .then(response => {
                this.unit = variables.scale;
                this.currentweather = response.data.current_observation;
                this.currentweatherIcon = response.data.current_observation.icon;
                this.forecast = response.data.forecast;
                this.longtermForecast = response.data.forecast.simpleforecast.forecastday;
                this.location = response.data.location;
                switch(this.unit) {
                case 'metric':
                    this.degreeLabel = '&deg;C';
                    this.units = 'celcius';
                    break;
                case 'imperial':
                    this.degreeLabel = '&deg;F';
                    this.units = 'fahrenheit';
                    break;
                case 'default':
                    this.degreeLabel = 'K';
                    break;
                }
                setTimeout(this.getWeatherData, 60000);
                console.log("Updated weather");
                return this.$store.getters.getWeatherData
            })
            .catch(error => {
                setTimeout(this.getNewsData, 30000);
                console.log("Error: Updating weather failed, trying again in 30sec.");
            })
        }
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
img.forecast-icon {
    max-height: 50px;
}
span.weekname {
    top: -20px;
    position: relative;
}
</style>
