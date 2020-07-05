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
            fadePoint: 0.25, // Start on 1/4th of the list.
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
            newsapi.v2.topHeadlines({
                sources: 'rtl-nieuws',
                language: 'nl',
            }).then(response => {
                this.articles = response.articles
                this.show = true;
                setTimeout(this.getNewsData, 600000);
                console.log("Updated News");
            })
            .catch(error => {
                setTimeout(this.getNewsData, 600000);
                console.log(error)
                console.log("Error: Updating news failed, trying again in 10 min.");
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
