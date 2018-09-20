<template>
  <div>
    <WeatherIconClearDay v-if="icon === 'clear-day'"></WeatherIconClearDay>
    <WeatherIconClearNight v-if="icon === 'clear-night'"></WeatherIconClearNight>
    <WeatherIconCloudy v-if="icon === 'cloudy'"></WeatherIconCloudy>
    <WeatherIconPartlyCloudyDay v-if="icon === 'partly-cloudy-day'"></WeatherIconPartlyCloudyDay>
    <WeatherIconPartlyCloudyNight v-if="icon === 'partly-cloudy-night'"></WeatherIconPartlyCloudyNight>
    <WeatherIconRain v-if="icon === 'rain'"></WeatherIconRain>
    <WeatherIconSleet v-if="icon === 'sleet'"></WeatherIconSleet>
    <WeatherIconSnow v-if="icon === 'snow'"></WeatherIconSnow>
    <WeatherIconWind v-if="icon === 'wind'"></WeatherIconWind>
    <WeatherIconFog v-if="icon === 'fog'"></WeatherIconFog>
  </div>
</template>

<script>
  import WeatherIconClearDay from '../assets/icons/day/clear_day.png'
  import WeatherIconClearNight from '../assets/icons/day/clear_night.png'
  import WeatherIconCloudy from '../assets/icons/day/cloudy.png'
  import WeatherIconPartlyCloudyDay from '../assets/icons/day/partly_cloudy_day.png'
  import WeatherIconPartlyCloudyNight from '../assets/icons/day/partly_cloudy_night.png'
  import WeatherIconRain from '../assets/icons/day/rain.png'
  import WeatherIconSleet from '../assets/icons/day/sleet.png'
  import WeatherIconSnow from '../assets/icons/day/snow.png'
  import WeatherIconWind from '../assets/icons/day/wind.png'
  import WeatherIconFog from '../assets/icons/day/fog.png'

  export default {
    name: 'weatherIcon',
    props: ['icon'],
    components: {
      WeatherIconClearDay,
      WeatherIconClearNight,
      WeatherIconCloudy,
      WeatherIconPartlyCloudyDay,
      WeatherIconPartlyCloudyNight,
      WeatherIconRain,
      WeatherIconSleet,
      WeatherIconSnow,
      WeatherIconWind,
      WeatherIconFog
    }
  }
</script>