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
  import WeatherIconClearDay from '../assets/icons/clear-day.png'
  import WeatherIconClearNight from '../assets/icons/clear-night.png'
  import WeatherIconCloudy from '../assets/icons/cloudy.png'
  import WeatherIconPartlyCloudyDay from '../assets/icons/partly-cloudy-day.png'
  import WeatherIconPartlyCloudyNight from '../assets/icons/partly-cloudy-night.png'
  import WeatherIconRain from '../assets/icons/rain.png'
  import WeatherIconSleet from '../assets/icons/sleet.png'
  import WeatherIconSnow from '../assets/icons/snow.png'
  import WeatherIconWind from '../assets/icons/wind.png'
  import WeatherIconFog from '../assets/icons/fog.png'

  export default {
    name: 'WeatherIcon',
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