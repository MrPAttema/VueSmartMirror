import Vue from 'vue'
import Home from './Home.vue'
import store from './store'

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
    store,
    el: '#home',
    render: h => h(Home)
})
