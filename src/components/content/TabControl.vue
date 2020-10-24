<template>
    <div class="tab-control">
        <div class="tab-control-item"
             v-for="(item,index) in titles"
             :class="{active:index===currentIndex}"
             @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        props: {
            titles: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                currentIndex: 0
            }
        },
        methods: {
            itemClick(index) {
                this.currentIndex = index
                this.$emit('tabClick', index)
            }
        }
    }
</script>

<style scoped>
    .tab-control {
        display: flex;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        text-align: center;
        background-color: #fff;
    }

    .tab-control-item {
        flex: 1;
    }

    .active span {
        border-bottom: 3px solid var(--color-tint);
        padding: 0 6px 2px;
    }
</style>