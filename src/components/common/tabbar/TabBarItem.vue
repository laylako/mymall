<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-show="!isActive">
            <slot name="item-icon"/>
        </div>

        <div v-show="isActive">
            <slot name="item-icon-active"/>
        </div>

        <div :class="{'active':isActive}">
            <slot name="item-text"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props: {
            path: String
        },
        computed: {
            isActive() {
                return this.$route.path.indexOf(this.path) !== -1
            }
        },
        methods: {
            itemClick() {
                if (this.$route.path !== this.path) {
                    this.$router.replace(this.path)
                }
                // console.log(this.$route.path);
            }
        }
    }
</script>

<style scoped>
    .tab-bar-item {
        flex: 1;
    }

    .tab-bar-item img {
        height: 24px;
        width: 24px;
        margin-top: 4px;
    }

    .active {
        color: var(--color-high-text);
    }
</style>