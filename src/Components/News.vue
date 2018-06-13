<template>
    <div class="grid-item">
        <div class="news">
            <div class="item" :articles="articles" v-for="item in articles.slice(0, 4)" :key="item.id">
                <div class="icon">
                    <img :src="require('../assets/icons/news.png')" alt="">
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
        }
    },
    mounted() {
        this.getNewsData();
    },
    methods: {
        getNewsData() {
            axios.get('https://newsapi.org/v2/top-headlines?sources=rtl-nieuws&apiKey=d7a62fd8b2d444f78e5b7e56a7ac0665')
            .then(response => {
                console.log(response.data)
                this.articles = response.data.articles
                // return this.$store.getters.getNewsData
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    },
    ready: function () {
        this.getNewsData();
        setInterval(function () {
        this.getNewsData();
        }.bind(this), 60000); 
    }
}
</script>

<style lang="scss" scoped>
.news {
    font-size: 1.2em;
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
