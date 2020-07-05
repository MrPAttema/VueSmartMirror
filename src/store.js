import Vue from 'vue';
import Vuex from 'vuex';
import variables from './variables'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appStatus: {
      message: null,
      state: 'loading',
    },
    weather: {},
    weatherForecast: {},
    geocode: {},
    googleMapsLoaded: false,
    coordinates: {
      latitude: 53.1869101,
      longitude: 5.4483306
    },
    notificationData: {
      message: null,
      state: 'loading',
      code: null,
    },
    icon: '',
    inputQuery: null,
    locationIcon: 'search',
    versionNumber: '1.4.1',
    versionNumberAdd: '20200705',
    updating: false,
    // units: units
  },
  actions: {
    appStatus({ commit }, appStatus) {
      commit('setAppStatus', appStatus)
    },

    coordinates({ commit }, coordinates) {
      commit('setCoordinates', coordinates)
    },

    geocode({ commit, state }, type) {
      return new Promise((resolve, reject) => {
        let query

        (type === 'default')
          ? query = `latlng=${state.coordinates.latitude},${state.coordinates.longitude}`
          : query = `address=${encodeURIComponent(state.inputQuery)}`

        fetch(`${process.env.API_URL.geocode}${query}`)
          .then(response => {
            if (response.status !== 200) {
              commit('setAppStatus', {
                state: 'error',
                message: 'Uh oh, the geolocation API is not responding. Please try again.'
              })
              return
            }
            response.json().then(data => {
              if (!data.length) {
                commit('setAppStatus', {
                  state: 'error',
                  message: 'No results found. Please try another search.'
                })
                return
              }
              commit('setGeocode', data[0])
              resolve(response)
            })
          })
          .catch(() => {
            commit('setAppStatus', {
              state: 'error',
              message: 'Uh oh, the geolocation API is not responding.'
            })
          })
      })
    },

    notificationData({ commit }) {
      var message = null;
      var code = null;
      var proxy = 'https://quiet-fjord-46740.herokuapp.com/';
      axios.get(proxy + 'http://projects.knmi.nl/RSSread/rss_KNMIwaarschuwingen.php')
      .then(response => {
        var parseString = require('xml2js').parseString;
        var xml = response.data;
        parseString(xml, function(error, result) {
          message = result.rss.channel[0].item[0].title[0];
          if (message != '') {
            if (message.includes('groen')) {
              code = 0;
            } else if (message.includes('geel')) {
              code = 1;
            } else if (message.includes('oranje')) {
              code = 2;
            } else if (message.includes('rood')){
              code = 3;
            } else {
              code = 4;
            }
            commit('setNotificationData', {
              state: 'loaded',
              message: message,
              code: code,
            })
          } else {
            commit('setNotificationData', {
              state: 'loaded',
              message: null,
              code: null,
            })
          }
        });
        console.log("Updated KNMI");
        setTimeout(() => {
          commit('setNotificationData')
        }, 10000)
      })
      .catch(error => {
        setTimeout(this.notificationData, 30000);
        commit('setNotificationData'), {
          state: 'loaded',
          message: 'Fout bij KNMI update, volgende poging in 30 seconden.',
          code: 4,
        }
      })
    },

    weather({ commit }) {
      var proxy = 'https://quiet-fjord-46740.herokuapp.com/';
      var url = 'https://api.darksky.net/forecast/' + variables.darkSkyApiKey + '/' + variables.latitude + ',' + variables.longitude + '/?units=' + variables.units + '&lang=' + variables.lang;
      axios.get(proxy + url)
      .then(response => {
        // this.currentweather = response.data;
        // this.currentweatherIcon = response.data.currently.icon;
        // this.longtermForecast = response.data.daily.data;
        commit('setWeather', response.data);
        commit('setWeatherForecast', response.data.daily.data);
        console.log("Updated Weather");
        setTimeout(this.weather, 600000);
      })
      .catch(error => {
        setTimeout(this.weather, 30000);
        commit('setAppStatus', {
          state: 'error',
          message: 'Fout bij weer update, volgende poging in 30 seconden.'
        })
      })
    },

    notificationData({ commit }, state) {
      commit('setNotificationData', state)
    },

    googleMapsLoaded({ commit }, googleMapsLoaded) {
      commit('setGoogleMapsLoaded', googleMapsLoaded)
    },

    inputQuery({ commit }, inputQuery) {
      commit('setInputQuery', inputQuery)
    },

    locationIcon({ commit }, locationIcon) {
      commit('setLocationIcon', locationIcon)
    },

    units({ commit }, units) {
      commit('setUnits', units)
    },

    setWeather({ commit, state }) {
      commit('setWeather', state)
    }
  },

  mutations: {
    setAppStatus: (state, appStatus) => {
      state.appStatus.state = appStatus.state
      state.appStatus.message = appStatus.message
    },

    setNotificationData: (state, notificationData) => {
      state.notificationData.state = notificationData
      state.notificationData.message = notificationData
      state.notificationData.code = notificationData
    },

    setCoordinates: (state, coordinates) => {
      state.coordinates.latitude = coordinates.latitude
      state.coordinates.longitude = coordinates.longitude
    },

    setGeocode: (state, geocode) => {
      state.geocode = geocode
      state.coordinates.latitude = geocode.geometry.location.lat
      state.coordinates.longitude = geocode.geometry.location.lng
    },

    setGoogleMapsLoaded: (state, googleMapsLoaded) => {
      state.googleMapsLoaded = googleMapsLoaded
    },

    setInputQuery: (state, inputQuery) => {
      state.inputQuery = inputQuery
    },

    setLocationIcon: (state, locationIcon) => {
      state.locationIcon = locationIcon
    },

    setUnits: (state, units) => {
      state.units = units
      localStorage.setItem('units', units)
    },

    setWeather: (state, weather) => {
      state.weather = weather
    },

    setWeatherForecast: (state, weather) => {
      state.weather = weather
    }
  }
})