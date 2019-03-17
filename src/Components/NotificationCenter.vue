<template>
	<transition enter-active-class="animated fadeInDown">
		<div v-if="show === true" class="notify-container">
			<div class="special-messages">
				<div class="notify-icon">
					<img :src="require('../assets/icons/alert_normal.svg')" alt="">
				</div>
				<div class="notify-message">
					<span class="message">{{ this.notificationData }}</span>
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
			notificationData: '',
			show: false,
		}
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			var proxy = 'https://cors-anywhere.herokuapp.com/';
			axios.get(proxy + 'http://projects.knmi.nl/RSSread/rss_KNMIwaarschuwingen.php')
			.then(response => {
				var parseString = require('xml2js').parseString;
				var xml = response.data;
				console.log(xml);
				var self = this;
				parseString(xml, function (err, result) {
					self.notificationData = result.rss.channel[0].item[0].title[0];
					self.show = true;
				});
				setTimeout(self.getData(), 60000);
				console.log("Updated KNMI");
			})
			.catch(error => {
				setTimeout(this.getData, 300000);
				console.log("Fout bij KNMI update, volgende poging in 30 seconden.");
			});
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
</style>

