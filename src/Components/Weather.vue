<template>
    <transition>
        <div class="grid-item">
            <div class="weather">
                <div class="data">
                    <div class="temprature">
                        {{ Math.round(currentweather.currently.temperature * 10 ) / 10 }}
                        <span>&deg;C</span>
                    </div>
                    <div class="weather-text">
                        <span>{{ currentweather.currently.summary }}</span>
                        <br>
                        <span class="under">Gevoelstemperatuur: {{ Math.round(currentweather.currently.apparentTemperature * 10 ) / 10 }}&deg;C</span>
                        <br>
                        <span class="under">Wind: {{ Math.round(currentweather.currently.windSpeed) }} km/h | Windstoten: {{ Math.round(currentweather.currently.windGust) }}  km/h</span>
                        <br>
                        <!-- <span>Last updated: {{ timestamp(store.weather.currently.time * 1000, store.weather.timezone)}}</span> -->
                    </div>
                    <div class="forecast">
                        <span>Weersverwachting:</span>
                        <hr>
                        <div class="longtermForecast" :longtermForecast="longtermForecast" v-for="item in longtermForecast.slice(1,5)" :key="item.id">
                        <span class="weekday">{{ item.time | moment.locale('nl').format('ddd') }}:</span>
                        <img class="forecast-icon" :src="require('../assets/icons/'+  item.icon +'.png')" alt="">
                        <div class="weekname">
                            Min: {{ Math.round(item.temperatureLow) }}<span>&deg;C</span> | Max: {{ Math.round(item.temperatureHigh) }}<span>&deg;C</span>
                        </div>
                        <hr class="hr-light">
                        </div>
                        <!-- <WeatherForecast class="fadeIn"></WeatherForecast> -->
                    </div>
                </div>
                <div class="icon">
                    <img :src="require('../assets/icons/'+ currentweatherIcon +'.png')" alt="">
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

import moment from 'moment';
import axios from 'axios'
import variables from '../variables'
import store from "../store";
// import WeatherIcon from './WeatherIcon'
import WeatherForecast from './WeatherForecast'


export default {
    name: 'weather',
    components: {
      WeatherForecast,
    },
    data() {
        return {
            currentweather: {},
            currentweatherIcon: '',
            currentTemprature: '',
            forecast: [],
            forecastday: [],
            longtermForecast: [],
            location: [],
            degreeLabel: '',
            units: '',
            daytime: '',
            maxNumberOfDays: 7,
        }
    },
    created() {
        moment.locale('nl');
    },
    mounted(){
        this.getData();
    },
    methods: {
        getData() {
            var proxy = 'https://quiet-fjord-46740.herokuapp.com/';
            var url = 'https://api.darksky.net/forecast/' + variables.darkSkyApiKey + '/' + variables.latitude + ',' + variables.longitude + '/?units=' + variables.units + '&lang=' + variables.lang;
            axios.get(proxy + url)
            .then(response => {
                // console.log(response.data);
                this.currentweather = response.data;
                this.currentweatherIcon = response.data.currently.icon;
                this.longtermForecast = response.data.daily.data;
                console.log("Updated Weather");
                setTimeout(this.getData, 600000);
            })
            .catch(error => {
                setTimeout(this.getData, 30000);
                console.log("Fout bij weer update, volgende poging in 30 seconden.");
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
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
.weather {
  flex: 1;
  position: relative;

  @media(max-width: 850px) {
    padding-bottom: 48px;
  }

  .current,
  .forecast {
    flex: 1;

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    svg {
      height: 100%;
      width: 100%;
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
.weekday {
    display: inline;
    min-width: 40px;
    top: -20px;
    position: relative;
    font-size: 1em;
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
