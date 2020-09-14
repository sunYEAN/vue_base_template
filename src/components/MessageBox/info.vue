<template>
    <transition name="fade">
        <div v-show="visible" class="toast_wrap toast_info">
            {{message}}
        </div>
    </transition>
</template>

<script>
    export default {
        name: "info",

    }
</script>

<style scoped lang="less">
    .toast_info{
        color: #fff;
        padding: 6px 10px;
        max-width: 60%;
        border-radius: 10px;
        background-color: rgba(0,0,0,0.8);
    }
</style>
