<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot/>
        </div>
    </div>
</template>

<script>
    import BScroll from "better-scroll"

    export default {
        name: "Scroll",
        props: {
            /**
             * 1 滚动的时候会派发scroll事件，会截流。
             * 2 滚动的时候实时派发scroll事件，不会截流。
             * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
             */
            probeType: {
                type: Number,
                default: 1
            },
            /**
             * 点击列表是否派发click事件
             */
            click: {
                type: Boolean,
                default: true
            },
            /**
             * 是否派发滚动到底部的事件，用于上拉加载
             */
            pullUpLoad: {
                type: Boolean,
                default: false
            },
            refreshDelay: {
                type: Number,
                default: 20
            }
        },
        data() {
            return {
                scroll: null,
                message: '哈哈哈'
            }
        },
        // 在组件创建完后调用
        mounted() {
            // 保证在DOM渲染完毕后初始化better-scroll
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return
                }
                // better-scroll的初始化
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click,
                    pullUpLoad: this.pullUpLoad
                })

                // 是否派发滚动到底部事件，用于上拉加载
                // if (this.pullup) {
                //     this.scroll.on('scrollEnd', () => {
                //         // 滚动到底部
                //         if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                //             this.$emit('scrollToEnd')
                //         }
                //     })
                // }

                // 2.监听滚动的位置
                this.scroll.on('scroll', (position) => {
                    // console.log(position);
                    this.$emit('scroll', position)
                })

                // 3.监听上拉事件
                this.scroll.on('pullingUp', () => {
                    this.$emit('pullingUp')
                })
            },
            refresh() {
                // 代理better-scroll的refresh方法
                this.scroll && this.scroll.refresh()
            },
            scrollTo(x, y, time = 300) {
                // 代理better-scroll的scrollTo方法
                this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll.finishPullUp()
            },
            scrollToElement() {
                // 代理better-scroll的scrollToElement方法
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        },
        watch: {
            // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
            data() {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            }
        }
    }
</script>

<style scoped>

</style>