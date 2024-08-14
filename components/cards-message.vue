<template>
	<view>
		<uni-row v-if="myGacha">
			<uni-col :xs="24" :sm="6" :md="6" class="message">
				<view class="gacha-information">
					<view class="gacha-information-item">
						<text class="text">您是尊贵的</text>
						<text class="value">{{myGacha.isNotFull?'非':''}}全图鉴</text>
						<text class="text">玩家</text>
						<uni-icons @click="myGacha.isNotFull = !myGacha.isNotFull" v-if="!myGacha.currentGachasNumber"
							type="refreshempty"></uni-icons>
					</view>
					<view>
						<view class="gacha-information-item">
							<text class="text">当前卡池：</text>
							<text class="value">{{myGacha.cardType}}</text>
							<uni-icons class="text" @click="emit('changeCardType', myGacha)"
								type="refreshempty"></uni-icons>
						</view>
						<view class="gacha-information-item">
							<text class="text">总抽数：</text>
							<text class="value">{{myGacha.currentGachasNumber}}</text>
						</view>
					</view>
					<view>
						<slot v-if="myGacha" name="information" :myGacha="myGacha" :currentGodNumber="currentGodNumber">
						</slot>
					</view>
					<view class="statistics">
						<text class="gradient" v-for="item,index in ['R','SR','SSR','SP']" :key="index"
							v-show="crumbs[item]"
							:style="`background-image: -webkit-linear-gradient(top, ${COLOR[item]});`">
							{{item }} :{{crumbs[item]}}
						</text>
					</view>
					<scroll-view :scroll-y="true" class="crumbs" @scrolltolower="crumbsScrolltolower">
						<text class="gradient"
							v-for="item,index in crumbs?.data.slice(0,crumbsScrolltolowerIndex * 500)" :key="index"
							:style="`background-image: -webkit-linear-gradient(top, ${COLOR[item.level]});`">
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
							<uni-grid-item v-for="item,index in currentGods?.slice(0,scrolltolowerIndex * 50)"
								:key="index">
								<gods-avatar :god="item" />
							</uni-grid-item>
						</uni-grid>
					</scroll-view>
				</view>
				<view class="operate">
					<button type="default" :disabled="btnDisabled" @click="actionCards(1)">单抽</button>
					<button type="primary" :disabled="btnDisabled" @click="actionCards(n)">{{n}}抽</button>
				</view>
				<view class="configs">
					<text>自定义抽数</text>
					<!-- #ifndef MP-WEIXIN -->
					<uni-number-box v-model="n" :min="1" :step="1" :max="199999"></uni-number-box>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<input class="my-input" v-model="n" type="number" placeholder="请输入自定义抽数" />
					<!-- #endif -->

					<button v-if="myGacha.currentGachasNumber" type="warn" class="resert" @click="resert">重置</button>
					<!-- #ifdef H5 -->
					<button v-if="myGacha.currentGachasNumber" type="primary" class="resert"
						@click="exports">导出xls</button>
					<!-- #endif -->
					<slot name="otherBtns" :myGacha="myGacha" :currentGodNumber="currentGodNumber">
					</slot>
				</view>
			</uni-col>
		</uni-row>
		<view v-else>
			加载中
		</view>
		<uni-popup ref="popup" type="center">
			<uni-popup-dialog type="error" title="提示" :content="content" :duration="500"
				@confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>

</template>

<script lang="ts" setup>
	import { resultType } from '@/Gacha/main';
	import { COLOR, STEP } from '@/config'
	import { nextTick, ref, watch } from 'vue'
	import dayjs from 'dayjs'
	import { JSONToExcelConvertor } from '@/function/exportExcel'
	import { Guarantees60 } from '@/Gacha/main/guarantees60';
	import store from '../store';
	import godsAvatar from './gods-avatar.vue'
	const props = defineProps({
		gacha: {
		}
	})
	const emit = defineEmits(['changeCardType', 'init','resert'])
	// 因为所有子类下的格式都是一样的，这个组件主要是用来渲染图像，不参与式神计算，所以只需要随便找一个子类的类型就行了
	const gachaClass = props.gacha as typeof Guarantees60
	let myGacha = ref<Guarantees60 | null>(null)
	const n = ref(10)
	// 禁用按钮
	const btnDisabled = ref(false)
	// 弹窗内容
	const content = ref('')
	// 
	const popup = ref<any>(null)
	// 需要展示的式神
	const currentGods = ref<resultType[]>([])

	// 面包屑
	const crumbs = ref<any>({
		data: [] as resultType[]
	})
	// 弹窗点击确认的事件
	let confirm = () : void => { }
	const resert = () => {
		content.value = '是否重置'
		confirm = () => {
			init()
			emit('resert')
		}
		
		popup.value.open()
	}
	// 出金抽数
	let currentGodNumber = ref(0)
	// 绘制当前式神和面包屑
	const drawCrambs = (arr : resultType[], isOne = false) => {
		if (isOne) currentGods.value = arr
		else currentGods.value.push(...arr)
		arr.forEach(item => {
			if (item.isCurrent) currentGodNumber.value = item.currentGachasNumber
			if (crumbs.value[item.level]) crumbs.value[item.level]++
			else crumbs.value[item.level] = 1
			if (item.level === 'SP' || item.level === 'SSR') crumbs.value.data.unshift(item)
		})

	}
	// n为抽卡数量
	const actionCards = async (n : number) => {
		if (!myGacha.value) return
		btnDisabled.value = true
		if (n >= 1000) uni.showLoading({
			title: '玩命计算中。',
			mask: true
		})
		let i = 1
		const oldIsSummonedDesignated = myGacha.value.isSummonedDesignated
		const render = async () => {
			if (!myGacha.value) return
			// 是不是最后一个
			const isLast = n / STEP < i
			drawCrambs(myGacha.value.getSomeResult(isLast ? n % STEP : STEP), i === 1)
			// 如果剩最后一个那一定是最后的余数
			if (!isLast) return i++
			// #ifndef APP
			clearInterval(timer)
			// #endif
			if (n >= 1000) uni.hideLoading()
			setTimeout(() => {
				btnDisabled.value = false
			}, 300)

			if (!oldIsSummonedDesignated
				&& myGacha.value.isSummonedDesignated
				&& currentGods.value.length <= 800) {
				content.value =
					'恭喜你已经成功召唤出' +
					(myGacha.value?.summonedDesignated?.name || '当期式神') + '总共' + currentGodNumber.value + '抽!'
				confirm = () => { }
				popup.value.open()
			}
			// #ifdef APP
			for (let i = 0; i < STEP; i++) {
				await nextTick()
			}
			// #endif
			return false
		}
		// #ifndef APP
		let timer = setInterval(render)
		// #endif

		// #ifdef APP
		while (true) {
			const res = await render()
			if (!res) break
		}
		// #endif
		scrolltolowerIndex.value = 1
		crumbsScrolltolowerIndex.value = 1
	}

	// 初始化
	let init = async () => {
		const isNotFull = myGacha.value?.isNotFull
		myGacha.value = new gachaClass()
		if (isNotFull !== undefined) myGacha.value.isNotFull = isNotFull
		emit('init', myGacha.value,init)
		currentGods.value = []
		currentGodNumber.value = 0
		crumbs.value = {
			data: []
		}
	}
	watch(() => store.state.gods.SP, (SP) => {
		if (SP.length) init()
	}, { deep: true, immediate: true })
	// 导出excel
	const exports = () => {
		if (!myGacha.value) return
		const arr = myGacha.value.result.map(item => {
			return {
				currentGachasNumber: item.currentGachasNumber,
				shishen_id: item.shishen_id,
				name: item.name,
				level: item.level,
			}
		})
		const header = {
			currentGachasNumber: '抽数',
			shishen_id: '式神编号',
			name: '名字',
			level: '等级'
		}
		const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
		JSONToExcelConvertor(arr, header, `${time}抽卡统计`)


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
</script>
<style lang="scss" scoped>
	.page {
		overflow: auto;
	}

	.configs {
		padding: 10rpx;
		width: 100%;
		max-width: 800px;
		text-align: center;
		margin: auto;

		text {
			font-size: 12px;
			font-weight: 700;
		}

		/* #ifdef MP-WEIXIN */
		.my-input {
			margin: 40rpx auto;
			width: 97%;
			border: 1px solid rgba(0, 0, 0, 0.2);
			height: 60rpx;
			border-radius: 5px;
		}

		/* #endif */


		:deep(.uni-numbox) {
			margin: 20rpx 0;

			input {
				height: 70rpx;
				max-height: 50px;
			}
		}

		.resert {
			width: 100%;
			height: 100rpx;
			max-height: 50px;
		}

		:deep(.uni-numbox-btns) {
			display: none;
		}

		:deep(.uni-numbox__value) {
			width: 100% !important;
			margin: auto;
			border: 1px solid rgba(0, 0, 0, 0.1);
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
		margin-bottom: 20rpx;
	}

	.message {
		position: sticky;
		background-color: #fff;
		z-index: 4;
		padding-top: 50rpx;
	}

	.gods {
		/* #ifdef APP */
		padding-top: 30px;
		/* #endif */
		text-align: center;

		.gods-list {
			max-height: 300px;
			width: 94%;
			margin: 10px auto;

			:deep(.uni-grid) {
				justify-content: center;
				overflow-x: hidden;
			}
		}




	}

	.statistics {
		font-size: 12px;

		text {
			margin-right: 20rpx;
		}
	}

	.crumbs {
		width: 94%;
		max-height: 10vh;
		margin: auto;
		font-size: 12px;
		padding-bottom: 0rpx;


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
		padding: 5px 0;

		>view {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
		}

		margin: auto;
		text-align: center;
		font-weight: 700;

		:deep(.gacha-information-item) {
			font-size: 16px;
			margin: 0 20rpx;

			.uni-icons {
				cursor: pointer;
				margin-left: 2px;
			}

			.value {
				color: red;
			}

		}
	}

	.operate {

		width: 100%;
		margin: 40rpx auto;
		display: flex;

		button {
			width: 350rpx;
			white-space: nowrap;
			min-width: 80px;
		}
	}
</style>