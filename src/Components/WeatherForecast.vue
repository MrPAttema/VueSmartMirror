<template>
  <ul class="forecast">
    <li class="day" v-for="day in daily" :key="day.id">
      <div>{{ dayOfWeek(day.time * 1000, store.weather.timezone) }}</div>
      <div class="icon">
        <WeatherIcon :icon="day.icon"></WeatherIcon>
      </div>
      <strong>{{ Math.round(day.temperatureMax * 10 ) / 10 }}°</strong>
      <div>{{ Math.round(day.temperatureMin * 10 ) / 10 }}°</div>
    </li>
  </ul>
</template>

<script>
  import WeatherIcon from './WeatherIcon'
  import moment from 'moment'

  export default {
    name: 'forecast',
    components: {
      WeatherIcon
    },
    computed: {
      store () {
        return this.$store.state
      },
    },
    methods: {
      dayOfWeek (time, zone) {
        return moment(time).format('ddd');
      }
    }
  }
</script>

<style lang="scss" scoped>
// @import '../scss/_vars.scss';

// .forecast {
//   border-top: 1px solid #dedede;
//   display: flex;
//   flex-wrap: wrap;
//   margin-top: 16px;
//   padding-top: 16px;

//   li {
//     flex: 1;
//   }

//   .day {
//     color: $accent;
//     font-size: 16px;
//     line-height: 1.6;
//     text-align: center;

//     @media(max-width: 850px) {
//       flex: 0 0 25%;
//       margin-top: 8px;
//     }
//   }

//   .icon {
//     height: 32px;
//     margin: 0 auto;
//     width: 32px;
//   }
// }
</style>
