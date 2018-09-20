<template>
    <div class="grid-item">
        <div class="weather">
            <div class="data">
                <div class="temprature">
                    {{ currentTemprature }}
                    <span v-html="degreeLabel"></span>
                </div>
                <div class="weather-text">
                    <span>{{ currentweather.summary }}</span>
                    <br>
                    <span class="under">Wind: {{ Math.round(currentweather.windSpeed) }} km/h | Windstoten: {{ Math.round(currentweather.windGust) }}  km/h</span>
                    <br>
                    <span>{{ updateTime }}</span>
                </div>
                <div class="forecast">
                    <span>Voorspelingen:</span>
                    <hr>

                </div>
            </div>          
            <div class="icon">
                <WeatherIcon :icon="currentweather.icon"></WeatherIcon>
                <!-- <img :src="require('../assets/icons/day/'+ currentweatherIcon +'.png')" alt=""> -->
            </div>
        </div>      
    </div>
</template>

<script>

import moment from 'moment'
import axios from 'axios'
import store from '../store'
import variables from '../variables'
import WeatherIcon from './WeatherIcon'

export default {
   name: 'weather',
   components: {
      WeatherIcon
    },
   data() {
        return {
            currentweather: {},
            currentweatherIcon: null,
            currentTemprature: '',
            forecast: [],
            forecastday: [], 
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

            var proxy = 'https://cors-anywhere.herokuapp.com/';
            var url  = 'https://api.darksky.net/forecast/'+ variables.darkSkyApiKey +'/'+ variables.latitude +','+ variables.longitude +'/?units='+ variables.units +'&lang='+ variables.lang;

            axios.get(proxy + url)
            .then(response => {
                console.log(response.data)
                this.unit = variables.units;
                this.currentweather = response.data.currently;
                this.currentTemprature = parseFloat(response.data.currently.temperature).toFixed(1);
                this.currentweatherIcon = response.data.currently.icon;
                this.forecast = response.data.daily.data;
                this.updateTime = moment(response.data.currently.time).format('dddd, D MMMM YYYY');
                switch(this.unit) {
                    case 'ca':
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
                setTimeout(this.getWeatherData, 600000);
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
            font-size: 6em;
            font-weight: 300;
            letter-spacing: -0.1em;
            margin: auto 0;
        }
        .weather-text {
            font-size: 1.5em;
            font-weight: 500;

            & .under {
                font-size: 0.8em;
            }
        }
    }
    .icon {
        position: absolute;
        transform: translateY(-50%);
        top: 80px;
        left: 280px;
        img {
            max-width: 180px;
            margin: auto 0;
            image-rendering: -webkit-optimize-contrast;
            position: relative;
        }
    }
}
.forecast {
    margin-top: 15px;
    font-weight: 500;
}
img.forecast-icon {
    max-height: 50px;
}
span.weekname {
    top: -20px;
    width: 150px;
    position: relative;
    font-weight: 500;
}
.weekname {
    display: inline;
    top: -20px;
    position: relative;
    
    font-size: 1em;
}
.hr-light {
    border-color: #666;
    margin-top: 0;
}
</style>
