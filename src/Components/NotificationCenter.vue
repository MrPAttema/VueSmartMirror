<template>
	<transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
		<div v-if="store.notificationData.state === 'loaded' && store.notificationData.code >= 1" class="notify-container">
			<div class="special-messages">
				<div class="notify-icon">
					<img :src="require('../assets/icons/alert_normal.svg')" alt="">
				</div>
				<div class="notify-message" v-bind:class="{ yellow: store.notificationData.code === 1, orange: store.notificationData.code === 2, red: store.notificationData.code === 3 }">
					<span class="message">{{ store.notificationData.message }}</span>
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
