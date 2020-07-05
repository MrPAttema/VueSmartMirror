<template>
  <transition appear>
    <div class="grid-item right">
        <div class="currentTime clock">
            {{ currentTime }}
            <div class="currentDate">
                <span>{{ currentDay | capitalize }}</span>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
import moment from 'moment'
// import variables from '../variables'

export default {
    name: 'clock',
    data() {
        return {
            currentTime: '',
            currentDay: '',
            currentDate: '',
        }
    },
    methods: {
        updateCurrentTime() {
            this.currentTime = moment().format('LTS');
            this.currentDay = moment() .format('dddd, D MMMM YYYY');
            setTimeout(this.updateCurrentTime, 1000);
        }
    },
    created() {
        moment.locale('nl');
        this.updateCurrentTime();
    }
}
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .right {
      float: right;
      text-align: right;
  }
  .clock {
      font-size: 6em;
      font-weight: 300;
  }
  .currentDate {
      font-size: 30px;
      font-weight: 500;
      span {
          display: block;
      }
  }
</style>

