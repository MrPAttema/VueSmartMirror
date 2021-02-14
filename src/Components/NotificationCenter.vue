<template>
	<transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
		<div v-if="code >= 1" class="notify-container">
			<div class="special-messages">
				<div class="notify-icon">
					<img :src="require('../assets/icons/alert_normal.svg')" alt="">
				</div>
				<div class="notify-message" v-bind:class="{ yellow: code === 1, orange: code === 2, red: code === 3 }">
					<span class="message">{{ notification }}</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import axios from 'axios';

export default {
  	name: 'NotificationCenter',
    data() {
        return {
            code: '',
			notification: '',
            show: false,
        }
    },
	mounted(){
        this.notificationData();
	},
    methods: {
        notificationData() {
            var proxy = 'https://quiet-fjord-46740.herokuapp.com/';
            var url = 'https://cdn.knmi.nl/knmi/xml/rss/rss_KNMIwaarschuwingen.xml';
			axios.defaults.headers.common['X-Requested-With'] = 'application/rss+xml';
            axios.get(proxy + url)
            .then(response => {
                var parseString = require('xml2js').parseString;
                var xml = response.data;
				var self = this;
                parseString(xml, function(error, result) {
					self.notification = result.rss.channel[0].item[0].title[0];
					if (self.notification != '') {
						if (self.notification.includes('groen')) {
							self.code = 0;
						} else if (self.notification.includes('geel')) {
							self.code = 1;
						} else if (self.notification.includes('oranje')) {
							self.code = 2;
						} else if (self.notification.includes('rood')){
							self.code = 3;
						} else {
							self.code = 4;
						}
					}
				});
				setTimeout(this.notificationData, 600000);
                console.log("Updated KNMI");
            })
            .catch(error => {
				console.log(error);
                setTimeout(this.notificationData, 30000);
                this.notification = 'Fout bij KNMI update, volgende poging in 30 seconden.';
                this.code = 4;
                console.log("Error: Updating KNMI failed, trying again in 30sec.");
            })
        }
    }
}
</script>

<style lang="scss" scoped>
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
	.notify-container {
		width: 90%;
		margin: 0 auto;
	}
	.special-messages {
		height: 50px;
		padding: 0px 10px;
		color: black;
		margin: 0 auto;
		overflow: hidden;
	}
	.notify-message {
		overflow: hidden;
		background: #e4e4e4;
		border-bottom-right-radius: 10px;
		padding-left: 10px;
	}
	.yellow {
		background: rgb(255, 217, 0);
	}
	.orange {
		color: white;
		background: rgb(255, 145, 0);
	}
	.red {
		color: white;
		background: rgb(255, 8, 0);
	}
	.message {
		line-height: 50px;
		font-size: 17px;
		font-weight: 600;
	}
	.notify-icon {
		height: 50px;
		width: 60px;
		float: left;
		background-color: #8b8b8b;
		border-bottom-left-radius: 10px;
		img {
			height: 70%;
			position: relative;
			top: 50%;
			left: 30%;
			transform: translate(-50%, -50%);
		}
	}
</style>
