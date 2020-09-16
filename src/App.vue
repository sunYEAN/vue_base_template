<template>
    <div class="app">
        <img src="static/logo.png" alt="">
        <router-link to="/">首页</router-link>
        <router-link to="/about">关于</router-link>
        <router-link to="/profile">我的</router-link>
        <router-view/>
    </div>
</template>

<script>
    import {preload} from './utils'

    preload([

    ]);

    export default {
        name: "App",
        data () {
            return {
            }
        },
        methods: {
        },
        mounted() {
        },
        computed: {
        }
    }
</script>

<style module lang="less">
    :local .font-mini{
        font-size: 12px;
    }
    .font-small{
        font-size: 20px;
    }
</style>
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
