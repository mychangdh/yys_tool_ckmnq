<template>
	<view class="setting">
		<uni-data-checkbox multiple v-model="config" :localdata="configList"></uni-data-checkbox>
	</view>
	<view class="yuhunDetail" v-show="randomYuhunList.length">
		<yuhunDetail class="yuhunDetail-item" v-for="item in randomYuhunList" :yuhunData="item" :config="config"
			:location="getRandomElement([1,2,3,4,5,6])" type="Chutou" />
	</view>
	<view class="btn">
		<button size="default" type="primary" @click="getRandomYuhun(1)">点击生成1个随机御魂</button>
		<button size="default" type="primary" @click="getRandomYuhun(n)">点击生成{{n}}个随机御魂</button>
		<button size="default" v-if="randomYuhunList.length" class="restart" type="warn"
			@click="randomYuhunList = []">点击重置</button>
	</view>
	<view class="customize">
		<text>自定义数量</text>
		<input class="my-input" v-model="n" type="number" placeholder="请输入自定义数量" />
	</view>
</template>

<script setup lang="ts">
	import { getYuHun } from '@/requests'
	import yuhunDetail from '@/components/yuhun-detail.vue'
	import { ref, nextTick } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import { getRandomElement } from '@/Gacha/function';
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
	}]
	function getRandomYuhun(times : number) {
		randomYuhunList.value = []
		nextTick(() => {
			for (let i = 0; i < times; i++) {
				randomYuhunList.value.push(getRandomElement(yuhunList.value))
			}

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
	.setting {
		margin-top: 10px;
		display: flex;
		justify-content: center;

		:deep(.uni-data-checklist) {
			display: flex;
			justify-content: center;
		}
	}

	.yuhunDetail {
		margin: 20px 0;
		max-width: 1000px;
		margin: auto;
		min-height: 350px;
		max-height: calc(100vh - 240px);
		overflow: auto;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;

		.yuhunDetail-item {
			margin: 5px;
			height: 400px;

		}
	}

	.btn {
		margin: auto;
		max-width: 800px;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;

		button {
			width: 100%;
			margin: 5px 20px;
			max-width: 360px;
			min-width: 250px;
		}

		.restart {
			width: 100%;
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