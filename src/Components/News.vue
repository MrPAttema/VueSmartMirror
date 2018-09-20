<template>
    <div class="grid-item">
        <div class="news">
            <span>RTL Nieuws:</span>
            <hr>
            <div class="item" :articles="articles" v-for="item in articles.slice(0, 6)" :key="item.id">
                <div class="icon">
                    <img :src="require('../assets/icons/news3.png')" alt="">
                </div>
                <span>{{ item.title }}</span>
            </div>
        </div>      
    </div>
</template>

<script>
import axios from 'axios'
import store from '../store'
import variables from '../variables'

export default {
   name: 'news',
   data() {
        return {
            articles: [],
            fade: true,
            fadePoint: 0.25, // Start on 1/4th of the list.
        }
    },
    mounted() {
        this.getNewsData();
    },
    methods: {
        getNewsData() {
            const url = 'https://newsapi.org/v2/top-headlines?sources='+ variables.newsApiSource +'&apiKey='+ variables.newsApiKey;
            axios.get(url)
            .then(response => {
                this.articles = response.data.articles
                // for (var item in this.articles) {
                //     if (this.fade && this.fadePoint < 1) {
                //         if (this.fadePoint < 0) {
                //             this.fadePoint = 0;
                //         }
                //         var startingPoint = this.articles.length * this.fadePoint;
                //         var steps = this.articles.length - startingPoint;
                //         if (item >= startingPoint) {
                //             var currentStep = item - startingPoint;
                //             item.style.opacity = 1 - (1 / steps * currentStep);
                //         }
                //     }
                // }
                setTimeout(this.getNewsData, 600000);
                console.log("Updated news");
            })
            .catch(error => {
                setTimeout(this.getNewsData, 30000);
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
</style>
