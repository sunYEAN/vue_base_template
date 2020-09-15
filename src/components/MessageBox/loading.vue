<template>
    <transition name="fade-out">
        <div v-show="visible" class="toast_wrap toast_loading">
            <div class="loading"></div>
            <p class="message">{{message || '加载中...'}}</p>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "loading",
    }
</script>

<style scoped lang="less">
    @keyframes circle {
        0%{
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .toast_loading{
        color: #333;
        flex-direction: column;
        .message{
            width: 120px;
            overflow: hidden;
            font-size: 28px;
            margin-top: 10px;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .loading{
            width: 100px;
            height: 100px;
            background: url("./images/loading.png")no-repeat center center;
            background-size: contain;
            animation: circle 1s linear infinite;
        }
    }
</style>
