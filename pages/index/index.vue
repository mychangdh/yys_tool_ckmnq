<template>
	<view class="gacha">
		<view class="gacha-information">
			<view v-if="myGacha">
				<view class="gacha-information-item">
					<text class="text">当前概率：</text>
					<text class="value">{{myGacha.probabilityUP}}倍</text>
				</view>
				<view class="gacha-information-item">
					<text class="text">当前保底：</text>
					<text class="value">{{myGacha.currentGuaranteesGolden}}/</text>
					<text class="text">{{myGacha.currentGachasNumber}}</text>
				</view>
				<view class="gacha-information-item">
					<text class="text">指定式神：</text>
					<text class="value">{{myGacha.summonedDesignated?.name}}</text>
					<text class="text">{{myGacha.isSummonedDesignated?'(已召唤出)':''}}</text>
				</view>
				<view class="gacha-information-item">
					<text class="text">当前概率：</text>
					<text class="value">{{myGacha.probability}}</text>
				</view>
			</view>
		</view>

		<view class="gods">
			<scroll-view :scroll-y="true" class="gods-list">
				<uni-grid :column="5" :showBorder="false" :square="false">
					<uni-grid-item v-for="item,index in currentGods" :key="index">
						<image class="image"
							:src="`https://yys.res.netease.com/pc/gw/20180913151832/data/shishen/${item.shishen_id}.png?1`">
						</image>
						<text class="text">{{item.name}}</text>
					</uni-grid-item>
				</uni-grid>
			</scroll-view>
			<scroll-view :scroll-y="true" class="crumbs">
				<view>
					<text v-for="item,index in crumbs" :key="index">
						<text class="level">{{item.level}}</text>
						<text class="name">{{item.name}}</text>
						<text class="cards-number">({{item.currentGachasNumber}}) </text>
					</text>
				</view>
			</scroll-view>

		</view>
		<view class="operate">
			<button type="default" @click="actionCards(1)">单抽</button>
			<button type="primary" @click="actionCards(10)">十抽</button>
			<button type="primary" @click="actionCards(n)">{{n}}抽</button>
		</view>
		<view class="input">
			<input v-model="n" type="number" placeholder="自定义抽数" @input="formartInput" @blur="formartInput" />
		</view>
	</view>
</template>

<script lang="ts" setup>
	import Store from '@/store'
	import { onLoad } from '@dcloudio/uni-app'
	import { resultType } from '@/Gacha/main';
	import { Guarantees60 } from '@/Gacha/main/Guarantees60'
	import { computed, ref, nextTick } from 'vue'
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
		init = null
	}
	onLoad(() => {
		init()
	})
	const n = ref(20)
	// 需要展示的式神
	const currentGods = ref<resultType[]>([])
	const crumbs = computed(() => {
		return myGacha.value?.result.filter(item => item.level === 'SP' || item.level === 'SSR').reverse()
	})
	const actionCards = (n : number) => {
		if (!myGacha.value) return
		currentGods.value = myGacha.value.getSomeResult(n)

	}
	const formartInput = () => {
		if (!n.value) n.value = 1
		if (typeof (n.value) === 'string') n.value = parseInt(n.value)
		if (n.value !== Math.floor(n.value)) n.value = Math.floor(n.value)


	}
</script>
<style lang="scss" scoped>
	.gods {
		text-align: center;
		font-weight: 700;
		margin-top: 40rpx;

		.gods-list {
			max-height: 800rpx;

			.image {
				width: 140rpx;
				height: 140rpx;
				margin: auto;
			}
		}
	}

	.crumbs {
		height: 100rpx;
		margin: 50rpx 10rpx;

		text {
			margin-left: 10rpx;
		}

		.cards-number {
			color: red;
		}
	}

	.gacha-information {
		height: 200rpx;
		padding-top: 30rpx;
		width: 600rpx;
		margin: auto;
		text-align: center;
		font-weight: 700;

		.gacha-information-item {
			font-size: 18px;

			.value {
				font-size: 17px;
				color: red;
			}
		}
	}

	.operate {

		width: 700rpx;
		margin: 40rpx auto;
		display: flex;

		button {
			width: 180rpx;
		}
	}

	.input {
		width: 650rpx;
		margin: auto;

		input {
			border: 1px solid #ccc;
			padding: 20rpx;
			border-radius: 5px;
			text-indent: 1em;
		}
	}
</style>