<template>
	<scroll-view class="speed-page" scroll-y="true">
		<view class="title">
			头数量：{{myAnalyzAccount.heads.length}}
		</view>
		<view class="yuhun-list">
			<yuhun-show-detail class="dobule-speed-yuhun" hidAtt="速度" v-for="item in myAnalyzAccount.heads"
				:yuhun="item" />
		</view>
		<view class="title">
			其他位置满速数量：{{myAnalyzAccount.not2FullSpeed.length}}
		</view>
		<uni-segmented-control :current="dobuleSpeedCurrent" :values="dobuleSpeedData"
			@clickItem="dobuleSpeedOnClickItem" styleType="text" />
		<view class="yuhun-list dobule-speed-yuhun-list">
			<yuhun-show-detail class="dobule-speed-yuhun" hidAtt="速度" v-for="item in myAnalyzAccount.not2FullSpeed"
				:yuhun="item" v-show="item.pos === dobuleSpeedValue[dobuleSpeedCurrent]" />
		</view>
	</scroll-view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { AccountDetails } from '@/Gacha/cbg'
	import yuhunShowDetail from '@/components/yuhun-show-detail.vue'

	const props = defineProps({
		yuhun: {},
	})
	let myAnalyzAccount = props.yuhun as AccountDetails

	const dobuleSpeedCurrent = ref(0)
	const dobuleSpeedData = ['一号位', '三号位', '四号位', '五号位', '六号位',]
	const dobuleSpeedValue = [1, 3, 4, 5, 6,]

	function dobuleSpeedOnClickItem(e) {
		if (dobuleSpeedCurrent.value !== e.currentIndex) {
			dobuleSpeedCurrent.value = e.currentIndex;
		}
	}
</script>

<style scoped lang="scss">
	.title {
		text-align: center;
		margin-top: 10px;
		font-weight: 700;
	}

	.speed-page {
		height: calc(100vh - 50px);
	}

	.yuhun-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.dobule-speed-yuhun {
			margin: 10px;
		}

	}

	.dobule-speed-yuhun-list {
		padding-bottom: 100px;
	}
</style>