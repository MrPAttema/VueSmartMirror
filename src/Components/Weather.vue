<template>
    <div class="grid-item">
        <div class="weather">
            <div class="data">
                <div class="temprature">
                31 &deg;C
                </div>
            </div>
            
            <div class="icon">
                <img src="../assets/icons/day/hot.png" alt="">
            </div>
        </div>
        <div class="weather-text">
            <span>Vandaag en morgen erg warm.</span>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.weather {
    display: flex;
    .icon {
        height: 100%;
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        right: 0;
        img {
            max-width: 250px;
            margin: auto 0;
            image-rendering: -webkit-optimize-contrast;
            position: relative;
        }
    }
    .temprature {
        font-size: 5em;
        font-weight: 300;
        letter-spacing: -0.1em;
        margin: auto 0;
        transform: translateY(-50%);
        top: 50%;
        margin-top: -15px;
        position: absolute;
    }
}
.weather-text {
    font-size: 1.5em;
    position: absolute;
    bottom: 0;
}
</style>
