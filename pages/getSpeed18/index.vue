<template>
	<view class="page">
		<view class="setting">
			<uni-data-checkbox multiple v-model="config" :localdata="configList" @change="change"></uni-data-checkbox>
		</view>
		<view class="map" v-show="yuhunData.length">
			头数量：{{headYuhuns.length}}
			<text v-show="headYuhuns.length"> ,最大的头：{{getMaxHeads(headYuhuns)[0]}}</text>
		</view>
		<scroll-view v-if="randomYuhunList.length" class="yuhunDetail" :scroll-y="true" @scrolltolower="scrolltolower">
			<yuhunDetail class="yuhunDetail-item" v-for="item,index in randomYuhunList" :yuhunData="item" :config="config"
				:location="getRandomElement([1,2,3,4,5,6])" :loading="index>=current*step"
				:showDetail="randomYuhunList.length<=50" type="Chutou" @getYuHun="getMyYuhun"
				@aggrandizement="aggrandizement" />
		</scroll-view>
		<view class="btn">
			<button size="default" type="primary" @click="getRandomYuhun(1)">1个随机御魂</button>
			<button size="default" type="primary" @click="getRandomYuhun(n)">{{n}}个随机御魂</button>
			<button size="default" class="restart" type="primary" v-if="randomYuhunList.length"
				@click="allAggrandizement">全部强化到15</button>
		</view>
		<view class="customize">
			<text>自定义数量</text>
			<uni-number-box v-model="n" :min="1" :step="1" :max="9999"></uni-number-box>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { getYuHun } from '@/requests'
	import yuhunDetail from '@/components/yuhun-detail.vue'
	import { ref, nextTick} from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import { getRandomElement } from '@/Gacha/function';
	import YuHun from 'Gacha/YuHun/chutou';
	import { judgmentHead } from '@/function';
	const yuhunList = ref([])
	const randomYuhunList = ref([])
	const config = ref(['isMaxAtt', 'isTwo', 'isSpeed', 'haveSpeed'])
	const n = ref(10)
	const configList = [{
		text: '必定满条',
		value: 'isMaxAtt'
	}, {
		text: '必为二号位',
		value: 'isTwo'
	}, {
		text: '二号位主属性必为速度',
		value: 'isSpeed'
	},
	{
		text: '副属性必带速度',
		value: 'haveSpeed'
	},
	{
		text: '强化必加速度',
		value: 'isAddSpeed'
	}]
	const current = ref(1)
	const step = ref(12)
	function scrolltolower() {
		if ((current.value * step.value) >= randomYuhunList.value.length) return
		uni.showLoading({
			title: '加载中。。。'
		})
		setTimeout(() => {
			current.value++
			nextTick(uni.hideLoading)
		}, 100)


	}
	function getMaxHeads(yuhuns : YuHun[]) {
		if (!yuhuns) return 0
		const arr : number[] = []
		yuhuns.forEach(item => {
			const speedList = item.SubAttributeList.filter(ite => ite.name === 'speed').map(ite => ite.value)
			arr.push(speedList.reduce((a, b) => (a + b)))
		})
		return arr.sort((a, b) => b - a)
	}

	function change(data) {
		if (data.detail.value.includes('isAddSpeed')) {
			yuhunData.value.forEach(item => {
				item.isAddSpeed = true
			})
		}
		else item.isAddSpeed = false
	}
	function restart() {
		current.value = 1
		randomYuhunList.value = []
		yuhunData.value = []
		headYuhuns.value = []
		aggrandizementList.value = []
	}
	async function getRandomYuhun(times : number) {
		restart()
		await nextTick()
		for (let i = 0; i < times; i++) {
			randomYuhunList.value.push(getRandomElement(yuhunList.value))
		}

	}
	const yuhunData = ref<YuHun[]>([])
	const headYuhuns = ref<YuHun[]>([])
	const aggrandizementList = ref<any>([])
	function getMyYuhun(data : any) {
		yuhunData.value.push(data.myYuhun)
		aggrandizementList.value.push(data.aggrandizement)
	}
	// 手动强化
	function aggrandizement(yuhun : YuHun) {
		if (judgmentHead(yuhun)) {
			headYuhuns.value.push(yuhun)
		}
	}
	function allAggrandizement() {
		aggrandizementList.value.forEach((item : any, index : number) => {
			item(15)
		})
	}
	onLoad(() => {
		uni.getStorage({
			key: 'yuhuns'
		}).then(res => {
			if (res.data) yuhunList.value = res.data
		}).finally(() => {
			if (!yuhunList.value || !yuhunList.value.length) getYuHun().then((data : any) => {
				yuhunList.value = data
				uni.setStorage({
					key: 'yuhuns',
					data
				})
			})
		})


	})
</script>

<style lang="scss" scoped>
	.page{
		overflow: auto;
	}
	.setting {
		margin-top: 20px;
		display: flex;
		justify-content: center;

		:deep(.uni-data-checklist) {
			display: flex;
			justify-content: center;
		}

	}

	.map {
		text-align: center;
		margin: 10px 0;
	}

	.yuhunDetail {
		:deep(.uni-scroll-view-content) {
			margin: 20px 0;
			max-width: 1000px;
			margin: auto;
			max-height: calc(100vh - 420px);
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
		}


		.yuhunDetail-item {
			margin: 5px;
			// height:350 px;

		}
	}

	.btn {
		margin: auto;
		max-width: 800px;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding-top: 10px;

		button {
			width: 44%;
			margin: 5px ;
		}

		.restart {
			margin: 2px 18px;
			width:  90%;
			max-width: 100%;
		}
	}

	:deep(.checklist-group) {
		justify-content: center;
	}

	.customize {
		padding: 10rpx;
		width: 100%;
		max-width: 800px;
		text-align: center;
		margin: auto;

		:deep(.uni-numbox-btns) {
			display: none;
		}

		:deep(.uni-numbox__value) {
			width: 92% !important;
			margin: auto;
			border: 1px solid rgba(0, 0, 0, 0.1);
			height: 80rpx;
			border-radius: 5px;

			input {
				text-align: center;
				font-size: 14px;
			}
		}

		:deep(.uni-numbox) {
			margin: 20rpx 0;

			input {
				height: 70rpx;
				max-height: 50px;
			}
		}

		text {
			font-size: 12px;
			font-weight: 700;
		}

		.my-input {
			margin: 10rpx auto;
			width: 92%;
			border: 1px solid rgba(0, 0, 0, 0.2);
			height: 40px;
			border-radius: 5px;
		}
	}
</style>