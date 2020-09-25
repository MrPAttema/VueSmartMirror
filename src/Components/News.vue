<template>
  <transition>
  <!-- <transition enter-active-class="animated fadeIn"> -->
    <div v-if="show == true" class="grid-item" >
        <div class="news">
            <span>RTL Nieuws:</span>
            <hr>
            <div class="item" :articles="articles" v-for="item in articles.slice(0,6)" :key="item.id">
                <div class="icon">
                    <img :src="require('../assets/icons/news3.png')" alt="">
                </div>
                <span v-bind:style="{ opacity: opacity }">{{ item.title }}</span>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';
import store from '../store';
import variables from '../variables';
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(variables.newsApiKey);

export default {
   name: 'news',
   data() {
        return {
            articles: [],
            fade: true,
            fadePoint: 0, // Start on 1/4th of the list.
            show: false,
            opacity: 1,
        }
    },
    mounted() {
        this.getNewsData();
    },
    methods: {
        getNewsData() {
            this.show = false;
            const proxyUrl = "https://cors-anywhere.herokuapp.com/"
            const url = proxyUrl + 'https://newsapi.org/v2/top-headlines?sources='+ variables.newsApiSource +'&apiKey='+ variables.newsApiKey;
            axios.defaults.baseURL = 'https://smart.patrickattema.nl';
            axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
            axios.get(url)
            .then(response => {
                this.articles = response.data.articles;
                // this.data.forEach(element => {
                //     var item = element;
                //     if (this.fade == true && this.fadePoint < 1) {
                //         if (this.fadePoint < 0) {
                //             this.fadePoint = 0;
                //         }
                //         var startingPoint = this.articles.length * this.fadePoint;
                //         var steps = this.articles.length - startingPoint;
                //         if (item >= startingPoint) {
                //             var currentStep = item - startingPoint;
                //             var opacity = 1 - (1 / steps * currentStep);
                //         }
                //     }
                //     console.log(item);
                //     item.push({opacity: opacity});
                //     this.articles.push(item);
                // });
                this.show = true;
                setTimeout(this.getNewsData, 600000);
                console.log("Updated News");
            })
            .catch(error => {
                setTimeout(this.getNewsData, 600000);
                console.log(error)
                console.log("Error: Updating news failed, trying again in 30sec.");
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.news {
    font-size: 1em;
    font-weight: 500;
    .item {
        margin-bottom: 15px;
    }
}
.icon {
    max-width: 20px;
    display: inline-block;
    img {
        max-width: 100%;
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
