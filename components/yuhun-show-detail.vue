<template>
	<view class="yuhun">
		<view class="yuhun-message">
			<view class="icon">
				<image :src="`https://cbg-yys.res.netease.com/game_res/suit/${yuhunData.yuhun_id}.png`" mode=""></image>
				<view class="yuhun-location">
					<image src="/static/yuhun_location_1.png"></image>
				</view>
			</view>
			<view class="name">
				{{yuhunData.name}}+{{yuhunData.level}}
				<!-- <view class="gouyu">
					<image src="/static/gouyu.png" />
					<image src="/static/gouyu.png" />
					<image src="/static/gouyu.png" />
					<image src="/static/gouyu.png" />
					<image src="/static/gouyu.png" />
					<image src="/static/gouyu.png" />
				</view> -->
			</view>
		</view>
		<view class="att">
			<view>
				<view class="main-att">
					<view>
						{{yuhunData.data.mainAtt.name}}
					</view>
					<view>
						+{{yuhunData.data.mainAtt.showValue}}
					</view>
				</view>
				<view class="sub-att" v-for="item in yuhunData.data.subAtts.data">
					<view>
						{{item.name}}
					</view>
					<view :class="hidAtt === item.name?'active':''">
						+{{item.showValue}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { cbgYuhunType } from '@/Gacha/cbg/type'
	import { ref, computed } from 'vue';
	const props = defineProps({
		yuhun: {
			type: Object
		},
		hidAtt: {
			type: String,
			default: ''
		}
	})
	const yuhunData = props.yuhun as cbgYuhunType
	const postion = {
		1: '0deg',
		2: '-45deg',
		3: '-90deg',
		4: '180deg',
		5: '135deg',
		6: '90deg'
	}
	const yuhun_location = computed(() => postion[yuhunData.pos])
</script>

<style lang="scss" scoped>
	.active {
		color:#572cef;
	}

	.yuhun {
		border-radius: 5px;
		width: 170px;
		max-height: 200px;
		background-color: #cbb59c;
		border: 2px solid #765227;
		padding: 20px 14px;
		font-size: 13px;
		font-weight: 700;

		.att-name {
			width: 100px;
		}

		.point {
			width: 10px;
			height: 10px;
			position: relative;
			right: 18px;

			image {
				width: 100%;
				height: 100%;
			}
		}


		.gouyu {
			margin-top: 2px;
			width: 100px;
			height: 20px;

			image {
				height: 80%;
				width: 12%;
				margin-left: -2px;
			}
		}



		.yuhun-message {
			display: flex;
		}

		.yuhun-location {
			position: relative;
			top: -53px;
			left: -9px;
			width: 59px;
			height: 59px;
			transform: rotate(v-bind(yuhun_location));

			image {
				width: 100%;
				height: 100%;
			}
		}

		.icon {
			position: relative;
			width: 40px;
			height: 40px;
			margin-left: 5px;
			margin-top: -6px;
			margin-right: 20px;
			margin-bottom: 20px;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.main-att,
		.sub-att {
			width: 100%;
			margin-bottom: 5px;
			display: flex;
			justify-content: space-between;
		}

		.main-att {
			color: #a72c01;
		}
	}
</style>