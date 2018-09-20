<template>
    <div class="notify-container">
            <div class="special-messages">
                <div class="notify-icon">
                    <img :src="require('../assets/icons/info.png')" alt="">
                </div>
                <div class="notify-message">
                    <span class="message">Waarchuwing voor wind</span>
                </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'NotificationCenter',
    data () {
        return {
            notificationData: '',
        }
    },
    mounted() {
        // this.getNotifications();
    },
    computed() {
        // return this.$store.state.getNotifications
    },
    methods: {
        // getNotifications() {
        //     axios.get('http://api.wunderground.com/api/ee1f1a8cb9899e1b/conditions/geolookup/alerts/forecast/lang:NL/q/zmw:00000.1.06270.json')
        //     .then(response => {
        //         console.log(response.data)
        //         this.currentweather = response.data.current_observation
        //         this.currentweatherIcon = response.data.current_observation.icon
        //         this.forecast = response.data.forecast
        //         this.location = response.data.location
        //         return this.$store.getters.getWeatherData
        //     })
        // }
    }
}
</script>

<style lang="scss" scoped>
    
</style>

