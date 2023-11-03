<template>
	<uni-row>
		<uni-col :xs="24" :sm="6" :md="6" class="message">
			<view class="gacha-information">
				<view>
					<view class="gacha-information-item">
						<text class="text">当前卡池：</text>
						<text class="value" @click="changeCardType">{{myGacha?.cardType}}</text>
					</view>
					<view class="gacha-information-item">
						<text class="text">概率UP：</text>
						<text class="value">{{myGacha?.probabilityUP}}倍</text>
					</view>
					<view class="gacha-information-item">
						<text class="text">总抽数：</text>
						<text class="value">{{myGacha?.currentGachasNumber}}</text>
					</view>
					<slot v-if="myGacha" name="information" :myGacha="myGacha"></slot>
				</view>
				<scroll-view :scroll-y="true" class="crumbs" @scrolltolower="crumbsScrolltolower">
					<view class="statistics">
						<text class="gradient" v-for="item,index in ['R','SR','SSR','SP']" :key="index"
							v-show="crumbs[item]"
							:style="`background-image: -webkit-linear-gradient(top, ${color[item]});`">
							{{item }} :{{crumbs[item]}}
						</text>
					</view>
					<text class="gradient" v-for="item,index in crumbs?.data.slice(0,crumbsScrolltolowerIndex * 500)"
						:key="index" :style="`background-image: -webkit-linear-gradient(top, ${color[item.level]});`">
						<text class="name">{{item.name}}</text>
						<text class="cards-number">({{item.currentGachasNumber}}) </text>
					</text>
				</scroll-view>
			</view>
		</uni-col>
		<uni-col :xs="24" :sm="18" :md="14">
			<view class="gods">
				<scroll-view :scroll-y="true" class="gods-list" @scrolltolower="scrolltolower">
					<uni-grid :column="5" :showBorder="false" :square="false">
						<uni-grid-item v-for="item,index in currentGods?.slice(0,scrolltolowerIndex * 50)" :key="index">
							<image class="image"
								:src="`https://yys.res.netease.com/pc/gw/20180913151832/data/shishen/${item.shishen_id}.png?1`">
							</image>
							<text class="text gradient"
								:style="`background-image: -webkit-linear-gradient(top, ${color[item.level]});`">{{item.name}}</text>
						</uni-grid-item>
					</uni-grid>
				</scroll-view>
			</view>
			<view class="operate">
				<button type="default" :disabled="btnDisabled" @click="actionCards(1)">单抽</button>
				<button type="primary" :disabled="btnDisabled" @click="actionCards(10)">十抽</button>
				<button type="primary" :disabled="btnDisabled" @click="actionCards(n)">{{n}}抽</button>
			</view>
			<view class="input">
				<uni-number-box v-model="n" :min="1" :step="1" :max="199999"></uni-number-box>
				<button type="warn" class="resert" @click="resert">重置</button>
			</view>
		</uni-col>
	</uni-row>
	<uni-popup ref="popup" type="center">
		<uni-popup-dialog type="error" title="提示" :content="content" :duration="500"
			@confirm="confirm"></uni-popup-dialog>
	</uni-popup>
</template>

<script lang="ts" setup>
	import Store from '@/store'
	import { onLoad } from '@dcloudio/uni-app'
	import { resultType } from '@/Gacha/main';

	import { watch, ref, nextTick } from 'vue'
	import { Guarantees60 } from '@/Gacha/main/Guarantees60';
	const props = defineProps({
		gacha: {
		}
	})
	// 因为所有子类下的格式都是一样的，这个组件主要是用来渲染图像，不参与式神计算，所以只需要随便找一个子类的类型就行了
	const gachaClass = props.gacha as typeof Guarantees60
	let myGacha = ref<Guarantees60 | null>(null)
	// 初始化
	let init : any = async () => {
		uni.showLoading({
			title: "正在获取式神信息。。",
			mask: true
		});
		await Store.dispatch('getGods')
		myGacha.value = new gachaClass()
		await nextTick(uni.hideLoading)
		currentGods.value = []
		crumbs.value.data = []
	}
	onLoad(() => {
		init()
	})

	const n = ref(20)
	const btnDisabled = ref(false)
	const content = ref('')
	const popup = ref<any>(null)
	// 需要展示的式神
	const currentGods = ref<resultType[]>([])
	const crumbs = ref({
		data: []
	})
	// 弹窗点击确认的事件
	let confirm = () : void => { }
	const resert = () => {
		content.value = '是否重置'
		confirm = () => {
			init()
		}
		popup.value.open()
	}
	const changeCardType = () => {
		if (!myGacha.value) return
		if (myGacha.value.cardType === '旭华召唤') myGacha.value.cardType = '瑶归召唤'
		else myGacha.value.cardType = '旭华召唤'
	}
	const drawCrambs = (arr : resultType[]) => {
		arr.forEach(item => {
			if (crumbs.value[item.level]) crumbs.value[item.level]++
			else crumbs.value[item.level] = 1
			if (item.level === 'SP' || item.level === 'SSR') crumbs.value.data.unshift(item)
		})

	}
	const actionCards = async (n : number) => {

		if (!myGacha.value) return
		btnDisabled.value = true
		if (n >= 1000) uni.showLoading({
			title: '玩命计算中。',
			mask: true
		})
		nextTick(() => {
			if (!myGacha.value) return
			let i = 1
			const isSummonedDesignated = myGacha.value.isSummonedDesignated
			let timer = setInterval(async () => {

				const step = 4413
				if (!myGacha.value) return
				const longs = n / step >= i ? step : n % step
				if (i === 1) {
					currentGods.value = myGacha.value.getSomeResult(longs)
					drawCrambs(currentGods.value)
				}
				else {
					const res = myGacha.value.getSomeResult(longs)
					drawCrambs(res)
					currentGods.value.unshift(...res)
				}
				i++
				if (n / step < i) {
					if (i !== 2) {
						const res = myGacha.value.getSomeResult(n % step)
						drawCrambs(res)
						currentGods.value.unshift(...res)
					}
					btnDisabled.value = false
					clearInterval(timer)
					await nextTick()
					if (n >= 1000) uni.hideLoading()
					if (!isSummonedDesignated && myGacha.value.isSummonedDesignated && currentGods.value.length <= 800) {
						content.value = '恭喜你已经成功召唤出' + (myGacha.value?.summonedDesignated?.name || '当期式神') + '!'
						confirm = () => { }
						popup.value.open()
					}

				}
			}, 0)
		})

		scrolltolowerIndex.value = 1
	}
	const crumbsScrolltolowerIndex = ref(1)
	const scrolltolowerIndex = ref(1)
	const scrolltolower = () => {
		if (scrolltolowerIndex.value >= currentGods.value.length / 50) return
		scrolltolowerIndex.value++
	}
	const crumbsScrolltolower = () => {
		if (crumbsScrolltolowerIndex.value >= crumbs.value.data.length / 500) return
		crumbsScrolltolowerIndex.value++
	}
	const color = {
		SSR: '#db5f13,#e0941c,#f0e321',
		SP: '#f8313b,#fd7f8e,#f8aaac',
		SR: '#9213c0,#cc48dd',
		R: '#1360aa,#38adf8'
	} as const
</script>
<style lang="scss" scoped>
	:deep(.input) {
		width: 91%;
		max-width: 600px;
		display: flex;
		margin: auto;
		justify-content: center;

		.uni-numbox {
			width: 80%;

			input {
				margin-top: 50rpx;
				height: 100rpx;
				max-height: 50px;
			}
		}

		.resert {
			width: 20%;
			height: 100rpx;
			max-height: 50px;
		}

		.uni-numbox-btns {
			display: none;
		}

		.uni-numbox__value {
			width: 91%;
			margin: auto;
			max-width: 2000px;
			margin-bottom: 50rpx;
			border: 1px solid #ccc;
			height: 80rpx;
			border-radius: 5px;

			input {
				text-align: center;
				font-size: 14px;
			}
		}
	}


	.resert {
		width: 91%;
		margin: auto;
	}

	.message {
		position: sticky;
		top: 50rpx;
		background-color: #fff;
		z-index: 2;
		padding-top: 50rpx;
	}

	.gods {
		text-align: center;
		font-weight: 700;
		margin-top: 20rpx;

		.gods-list {
			max-height: 45vh;
			width: 94%;
			margin: auto;

			:deep(.uni-grid) {
				justify-content: center;
				overflow-x: hidden;

			}
		}

		.image {
			width: 130rpx;
			height: 130rpx;
			margin: auto;
		}

		.text {
			font-size: 12px;
			margin: 10rpx 0;
		}
	}


	.crumbs {
		width: 94%;
		max-height: 10vh;
		margin: auto;
		font-size: 12px;
		padding-bottom: 0rpx;

		.statistics {
			text {
				margin-right: 20rpx;
			}
		}

		.cards-number {
			color: red;
		}
	}

	@media screen and (min-width: 768px) {
		.crumbs {
			max-height: 50vh;
		}
	}

	.gacha-information {
		>view {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
		}

		margin: auto;
		text-align: center;
		font-weight: 700;

		:deep(.gacha-information-item) {
			font-size: 18px;
			margin: 0 20rpx;

			.value {
				font-size: 17px;
				color: red;
			}
		}
	}

	.operate {

		width: 100%;
		margin: 40rpx auto;
		display: flex;

		button {
			width: 180rpx;
			white-space: nowrap;
			min-width: 80px;
		}
	}
</style>