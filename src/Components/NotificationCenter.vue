<template>
  <transition enter-active-class="animated fadeInDown">
    <div class="notify-container">
      <div class="special-messages">
          <div class="notify-icon">
              <img :src="require('../assets/icons/alert_normal.svg')" alt="">
          </div>
          <div class="notify-message">
              <span class="message">{{ this.$store.notificationData }}</span>
          </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NotificationCenter',
  computed: {
    store () {
      return this.$store.state
    }
  },
}
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

