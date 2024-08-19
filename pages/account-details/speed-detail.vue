<template>
	<view>
		<view class="title">
			账号基本信息
		</view>
		<view class="detail-list">
			<view class="detail" v-for="item in detailList">
				<view v-if="item.name!=='图鉴'">
					<text class="key">{{item.name}}:</text>
					<text class="value">{{item.value}}</text>
				</view>
				<view v-else>
					<text class="key">{{item.name}}:</text>
					<text class="value"> SP:{{item.value.sp.got}}/{{item.value.sp.all}};
						SSR:{{item.value.ssr.got}}/{{item.value.ssr.all}}</text>
				</view>
			</view>
		</view>
		<view class="title">
			头数量：{{myAnalyzAccount.heads.length}}
		</view>
		<scroll-view class="scroll-view" scroll-y="true">
			<yuhun-show-detail class="dobule-speed-yuhun" hidAtt="速度" v-for="item in myAnalyzAccount.heads"
				:yuhun="item" />
		</scroll-view>
		<view class="title">
			其他位置满速数量：{{myAnalyzAccount.not2FullSpeed.length}}
		</view>
		<uni-segmented-control :current="dobuleSpeedCurrent" :values="dobuleSpeedData"
			@clickItem="dobuleSpeedOnClickItem" styleType="text" />
		<scroll-view class="scroll-view" scroll-y="true">
			<yuhun-show-detail class="dobule-speed-yuhun" hidAtt="速度" v-for="item in myAnalyzAccount.not2FullSpeed"
				:yuhun="item" v-show="item.pos === dobuleSpeedValue[dobuleSpeedCurrent]" />
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { AccountDetails } from '@/Gacha/cbg'
	import yuhunShowDetail from '@/components/yuhun-show-detail.vue'

	const props = defineProps({
		yuhun: {},
		detailList: {}
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

	.scroll-view {
		margin-top: 5px;
		max-height: 500px;

		:deep(.uni-scroll-view-content) {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;

		}

		.dobule-speed-yuhun {
			margin: 10px;
		}
	}

	.detail-list {
		max-width: 600px;
		margin: auto;
		margin-top: 10px;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		font-weight: 700;
		font-size: 14px;

		.detail {
			padding: 1px 3px;

			.value {
				color: #552131;
			}
		}
	}
</style>