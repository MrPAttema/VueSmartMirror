import Vue from 'vue';
import Vuex from 'vuex';
import variables from './variables'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appStatus: {
        message: null,
        state: 'loading'
    },
    weather: {},
    geocode: {},
    googleMapsLoaded: false,
    coordinates: {
        latitude: 53.1869101,
        longitude: 5.4483306
    },
    notificationData: '',
    icon: '',
    inputQuery: null,
    locationIcon: 'search',
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

    getNotificationData({commit}) {
      var proxy = 'https://cors-anywhere.herokuapp.com/';
      axios.get(proxy + 'http://projects.knmi.nl/RSSread/rss_KNMIwaarschuwingen.php')
        .then(response => {
          var parseString = require('xml2js').parseString;
          var xml = response.data;
          var self = this;
          parseString(xml, function (err, result) {
            self.notificationData = result.rss.channel[0].item[0].title[0];
            self.show = true;
          });
          setTimeout(self.getNotifications, 60000);
          console.log("Updated KNMI");
        })
    },

    weather({ commit, state }) {
      var proxy = 'https://cors-anywhere.herokuapp.com/';
      var url = 'https://api.darksky.net/forecast/' + variables.darkSkyApiKey + '/' + variables.latitude + ',' + variables.longitude + '/?units=' + variables.units + '&lang=' + variables.lang;
      axios.get(proxy + url)
        .then(response => {
          console.log(response.data);
          commit('setGoogleMapsLoaded', response.data)
          commit('setGoogleMapsLoaded', googleMapsLoaded)
          commit('setGoogleMapsLoaded', googleMapsLoaded)
          this.currentweather = response.data;
          this.currentweatherIcon = response.data.currently.icon;
          this.longtermForecast = response.data.daily.data;
          setTimeout(this.getNewsData, 600000);
        })
        .catch(error => {
          setTimeout(this.getNewsData, 30000);
          commit('setAppStatus', {
            state: 'error',
            message: 'Fout bij weer update, volgende poging in 30 seconden.'
          })
        })
    },

    notificationData({ commit }, notificationData) {
      commit('setnotificationData', notificationData)
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

  getters: {
    getWeather: state => {
      return state.weather
    },
  },

  mutations: {
    setAppStatus: (state, appStatus) => {
        state.appStatus.state = appStatus.state
        state.appStatus.message = appStatus.message
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
    }
  }
})
