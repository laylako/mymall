<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>

        <tab-control :titles="titles"
                     @tabClick="tabClick"
                     v-show="isTabFixed"
                     class="palce-holder"
                     ref="tabControlHolder"/>

        <scroll class="better-scroll"
                ref="scroll"
                :click="true"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <home-swiper :banners="banners"
                         @swiperImageLoad="swiperImageLoad"/>
            <recommend-view :recommends="recommends"/>
            <feature-view/>
            <tab-control :titles="titles"
                         @tabClick="tabClick"
                         ref="tabControl"/>
            <goods-list :goodsList="showGoods"/>
        </scroll>

        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>

</template>

<script>
    import NavBar from "components/common/navbar/NavBar"
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView"
    import FeatureView from "./childComps/FeatureView";
    import TabControl from "components/content/TabControl";
    import GoodsList from "components/content/GoodsList";
    import Scroll from "components/common/scroll/Scroll";
    import BackTop from "components/content/BackTop";

    import {getHomeMultidata, getHomeGoods} from "network/home"

    export default {
        name: "Home",
        components: {
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodsList,
            Scroll,
            BackTop
        },
        data() {
            return {
                banners: [],
                recommends: [],
                titles: ["流行", "新款", "精选"],
                goods: {
                    "pop": {page: 0, list: []},
                    "new": {page: 0, list: []},
                    "sell": {page: 0, list: []}
                },
                currentType: "pop",
                isShowBackTop: false,
                tabOffsetTop: 0,
                isTabFixed: false
            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        created() {
            this.getHomeMultidata()
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')
        },
        mounted() {
            const refresh = this.debounce(this.$refs.scroll.refresh, 200)
            this.$bus.$on('itemImageLoad', () => {
                // this.$refs.scroll.refresh()
                refresh()
            })
        },
        methods: {
            debounce(func, delay) {
                let timer = null
                return function (...args) {
                    if (timer) clearTimeout(timer)
                    timer = setTimeout(() => {
                        func.apply(this, args)
                    }, delay)
                }
            },
            /**
             * 事件监听相关的方法
             */
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }
                this.$refs.tabControl.currentIndex=index
                this.$refs.tabControlHolder.currentIndex=index
            },
            contentScroll(position) {
                // 1 决定BackTop组件是否显示
                this.isShowBackTop = (-position.y) > 1000
                // 2 决定tabControl是否吸顶
                this.isTabFixed = (-position.y) > this.tabOffsetTop

            },
            loadMore() {
                this.getHomeGoods(this.currentType)
            },
            backClick() {
                this.$refs.scroll.scrollTo(0, 0)
            },
            swiperImageLoad() {
                this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
                // console.log(this.$refs.tabControl.$el.offsetTop);
            },
            /**
             * 网络请求相关的方法
             */
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    this.banners = res.data.banner.list
                    this.recommends = res.data.recommend.list
                })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1

                    this.$refs.scroll.finishPullUp()
                })
            }
        }
    }
</script>

<style scoped>
    #home {
        /*padding-top: 44px;*/
        height: 100vh;
        position: relative;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
        /*在使用浏览器原声滚动时，为了让导航不跟随一起滚动*/
        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/
        /*z-index: 9;*/
    }

    .better-scroll {
        overflow: hidden;

        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    /*.better-scroll{*/
    /*    !*margin-top: 44px;*!*/
    /*    height: calc(100% - 93px);*/
    /*    overflow: hidden;*/
    /*}*/

    .palce-holder{
        position: relative;
        z-index: 9;
    }
</style>