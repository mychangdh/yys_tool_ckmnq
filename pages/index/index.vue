<template>
	<uni-row>
		<uni-col :xs="24" :sm="6" :md="6" class="message">
			<view class="gacha-information">
				<view v-if="myGacha">
					<view class="gacha-information-item">
						<text class="text">当前概率：</text>
						<text class="value">{{myGacha.probabilityUP}}倍</text>
					</view>
					<view class="gacha-information-item">
						<text class="text">当前保底：</text>
						<text class="value">{{myGacha.currentGuaranteesGolden}}/</text>
						<text class="text">{{myGacha.guaranteesGolden}}</text>
					</view>
					<view class="gacha-information-item">
						<text class="text">当前抽数：</text>
						<text class="value">{{myGacha.currentGachasNumber}}</text>
					</view>
					<view class="gacha-information-item">
						<text class="text">指定式神：</text>
						<text class="value">{{myGacha.summonedDesignated?.name}}</text>
						<text class="text">{{myGacha.isSummonedDesignated?'(已召唤出)':''}}</text>
					</view>
					<view class="gacha-information-item">
						<text class="text">当前概率：</text>
						<text class="value">{{myGacha.probability * 100}}%</text>
					</view>
				</view>
			</view>
		</uni-col>
		<uni-col :xs="24" :sm="18" :md="14">
			<view class="gods">
				<scroll-view :scroll-y="true" class="gods-list">
					<uni-grid :column="5" :showBorder="false" :square="false">
						<uni-grid-item v-for="item,index in currentGods" :key="index">
							<image v-if="currentGods.length<=800" class="image"
								:src="`https://yys.res.netease.com/pc/gw/20180913151832/data/shishen/${item.shishen_id}.png?1`">
							</image>
							<text class="text gradient"
								:style="`background-image: -webkit-linear-gradient(top, ${color[item.level]});`">{{item.name}}</text>
						</uni-grid-item>
					</uni-grid>
				</scroll-view>
				<scroll-view :scroll-y="true" class="crumbs">
					<text class="gradient" v-for="item,index in crumbs" :key="index"
						:style="`background-image: -webkit-linear-gradient(top, ${color[item.level]});`">
						<text class="name">{{item.name}}</text>
						<text class="cards-number">({{item.currentGachasNumber}}) </text>
					</text>
				</scroll-view>

			</view>
			<view class="operate">
				<button type="default" :disabled="btnDisabled" @click="actionCards(1)">单抽</button>
				<button type="primary" :disabled="btnDisabled" @click="actionCards(10)">十抽</button>
				<button type="primary" :disabled="btnDisabled" @click="actionCards(n)">{{n}}抽</button>
			</view>
			<view class="input">
				<input v-model="n" type="number" placeholder="自定义抽数" />
			</view>
			<view class="input">
				<button type="warn" @click="resert">重置</button>
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
	import { Guarantees60 } from '@/Gacha/main/Guarantees60'
	import { computed, ref, nextTick, watch } from 'vue'
	let myGacha = ref<Guarantees60 | null>(null)
	// 初始化
	let init : any = async () => {
		uni.showLoading({
			title: "正在获取式神信息。。",
			mask: true
		});
		await Store.dispatch('getGods')
		myGacha.value = new Guarantees60()
		await nextTick(uni.hideLoading)
		currentGods.value = []
	}
	onLoad(() => {
		init()
	})
	watch(() => myGacha.value?.isSummonedDesignated, async (isSummonedDesignated) => {

		if (isSummonedDesignated) {
			content.value = '恭喜你已经成功召唤出' + (myGacha.value?.summonedDesignated?.name || '当期式神') + '!'
			confirm = () => { }
			await popup.value.open()
		}

	}, { deep: true })
	const n = ref(20)
	const btnDisabled = ref(false)
	const content = ref('')
	const popup = ref<any>(null)
	// 需要展示的式神
	const currentGods = ref<resultType[]>([])
	const crumbs = computed(() => {
		return myGacha.value?.result.filter(item => item.level === 'SP' || item.level === 'SSR').reverse()
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

	const actionCards = (n : number) => {
		if (!myGacha.value) return
		btnDisabled.value = true
		setTimeout(() => {
			btnDisabled.value = false
		}, 500)
		currentGods.value = myGacha.value.getSomeResult(n)

	}
	const color = {
		SSR: '#db5f13,#e0941c,#f0e321',
		SP: '#f8313b,#fd7f8e,#f8aaac',
		SR: '#9213c0,#cc48dd',
		R: '#1360aa,#38adf8'
	} as const
</script>
<style lang="scss" scoped>
	.message {
		position: sticky;
		top: 50rpx;
		background-color: #fff;
		z-index: 2;
	}

	.gods {
		text-align: center;
		font-weight: 700;
		margin-top: 20rpx;

		.gods-list {
			// max-height: 1000rpx;

			:deep(.uni-grid) {
				display: flex;
				justify-content: center;
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
	}

	.crumbs {
		max-height: 125rpx;
		margin: 20rpx 10rpx;
		font-size: 12px;
		margin-left: 10rpx;

		.cards-number {
			color: red;
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

		.gacha-information-item {
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
			min-width: 80px;
		}
	}

	.input {
		width: 91%;
		margin: auto;
		max-width: 850px;
		margin-bottom: 50rpx;

		input {
			height: 60rpx;
			border: 1px solid #ccc;
			text-align: center;
			border-radius: 5px;
			font-size: 14px;
		}
	}
</style>