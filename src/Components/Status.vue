<template>
    <detect-network v-on:detected-condition="detected">
        <div slot="online">
            <img :src="require('../assets/icons/wifi-icon-green.png')" alt="">
        </div>
        <div slot="offline">
            <img :src="require('../assets/icons/wifi-icon-red.png')" alt="">
        </div>
    </detect-network>
</template>

<script>
import offline from 'v-offline';
import detectNetwork from 'v-offline';

export default {
    components: {
        offline,
        detectNetwork
    },
    data() {
        return {
            state: null,
        }
    },
    methods: {
        detected(e) {
            this.state = e;
            // console.log(e);
        }
    }
}
</script>