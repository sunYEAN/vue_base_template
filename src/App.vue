<template>
    <div class="app">
        <button @click="visible = !visible">add</button>
        <transition name="f">
            <img class="img" src="static/logo.png" alt="" v-show="visible">
        </transition>
        <router-link to="/">首页</router-link>
        <router-link to="/about">关于</router-link>
        <router-link to="/profile">我的</router-link>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "App",
        data () {
            return {
                visible: false
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
    .f-enter-active,.f-leave-active{
        transform: translate(0, 0);
        transition: all 0.2s linear;
    }
    .f-enter,.f-leave-to{
        transform: translate(50%, 50%);
    }
    .img{
        right: 0;
        width: 100px;
        height: 100px;
        position: fixed;
        background-color: pink;
    }
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
