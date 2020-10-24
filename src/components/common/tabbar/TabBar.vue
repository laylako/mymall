<template>
    <div class="tabbar">
        <slot></slot>
    </div>
</template>

<script>

    export default {
        name: "TabBar",
        components:{
        }
    }
</script>

<style scoped>
    .tabbar{
        display: flex;
        height: 49px;
        font-size: 12px;
        text-align: center;
        background-color: #f6f6f6;
        box-shadow: 0px -1px 10px rgba(100, 100, 100, .3);
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }

</style>