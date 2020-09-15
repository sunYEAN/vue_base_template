<template>
    <transition name="fade">
        <div v-show="visible" class="toast_wrap toast_error">
            <div class="error"></div>
            <p class="message">{{message || 'ERROR'}}</p>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "error"
    }
</script>

<style scoped lang="less">
    .toast_error {
        padding: 20px;
        border-radius: 25px;
        justify-content: flex-start;
        background-color: rgba(0, 0, 0, 0.7);

        .error {
            width: 90px;
            height: 90px;
            background: url("./images/error.png") no-repeat center center;
            background-size: contain;
        }

        .message {
            color: #fff;
            padding: 0 10px 0 20px;
            max-width: 200px;
            font-size: 28px;
            overflow: hidden;
            line-height: 1.4;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
</style>
