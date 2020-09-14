<template>
    <div class="app">
        <img :src="logo" alt="">
        <router-link to="/">首页</router-link>
        <router-link to="/about">关于</router-link>
        <router-link to="/profile">我的</router-link>
        <router-view/>
    </div>
</template>

<script>
    import Logo from './images/logo.png';
    export default {
        name: "App",
        data () {
            return {
                logo: Logo
            }
        }
    }
</script>

<style scoped lang="less">
    .app{
        img{
            width: 100px;
            height: 100px;
            display: block;
        }
        a{
            color: #333;
            display: inline-block;
        }
    }
</style>
