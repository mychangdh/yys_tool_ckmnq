<template>
	<view class="setting">
		<uni-data-checkbox multiple v-model="config" :localdata="configList"></uni-data-checkbox>
	</view>
	<view class="yuhunDetail">
		<yuhunDetail v-for="item in randomYuhunList" :yuhunData="item" :config="config"
			:location="getRandomElement([1,2,3,4,5,6])" type="Chutou" />
	</view>
	<view>
		<button size="default" type="primary" @click="getRandomYuhun">点击生成随机御魂</button>
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
	const config = ref(['isMaxAtt', 'isTwo'])
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
	function getRandomYuhun() {
		randomYuhunList.value = []
		nextTick(() => {
			randomYuhunList.value.push(getRandomElement(yuhunList.value))
		})

	}
	onLoad(() => {
		getYuHun().then((data : any) => {
			yuhunList.value = data
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
		max-height: 500px;
		min-height: 350px;
		display: flex;
		justify-content: center;
	}

	button {
		margin: 20px auto;
		max-width: 400px;
	}
</style>