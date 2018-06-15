<template>
    <div class="grid-item right">
        <div class="currentTime clock">
            {{ currentTime }}
            <div class="currentDate">
                <span>{{ currentDay | capitalize }}</span>
                <span>{{ currentDate }}</span>
            </div>
        </div>
    </div>
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
            this.currentDay = moment().format('dddd');
            this.currentDate = moment().date() + '-' + moment().weekday() + '-' + moment().year();
            setTimeout(this.updateCurrentTime, 1000);
        }
    },
    created() {  
        moment.locale('nl')  
        this.updateCurrentTime();
    }  
}
</script>

<style lang="scss" scoped>
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
        span {
            display: block;
        }
    }
</style>

