<template>
	<view class="yuhun">
		<view class="yuhun-message">
			<view class="icon">
				<image :src="`https://cbg-yys.res.netease.com/game_res/suit/${yuhun.yuhun_id}.png`" mode=""></image>
				<view class="yuhun-location">
					<image src="/static/yuhun_location_1.png"></image>
				</view>
			</view>
			<view class="name">
				{{yuhun.name}}+{{yuhun.level}}
				<view class="gouyu">
					<image src="/static/gouyu.png" />
					<image src="/static/gouyu.png" />
					<image src="/static/gouyu.png" />
					<image src="/static/gouyu.png" />
					<image src="/static/gouyu.png" />
					<image src="/static/gouyu.png" />
				</view>
			</view>
		</view>
		<view class="att">
			<view class="hr"></view>
			<view class="main-att">
				<view>
					{{yuhun.MainAttributeName}}
				</view>
				<view>
					+{{yuhun.showMainAttributeValue}}
				</view>
			</view>
			<view class="sub-att" v-for="item in yuhun.SubAttributeList">
				<view>
					{{item.nickname}}
				</view>
				<view>
					+{{item.showValue}}
				</view>
			</view>
			<view class="hr hr-bottom"></view>
		</view>
		<view class="yuhun-effect">
			<view class="two_piece_effect">
				2件套属性：{{yuhunData.two_piece_effect}}
			</view>
			<view v-if="yuhunData.four_piece_effect">
				4件套属性：{{yuhunData.four_piece_effect}}
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';

	import YuHun from '@/Gacha/YuHun'
	import Chutou from '@/Gacha/YuHun/chutou'
	const props = defineProps({
		yuhunData: {
			type: Object
		},
		location: {
			type: Number,
			default: 1
		},
		config: {
			type: Array,
			default: () => []
		},
		type: {
			type: String,
			default: 'nomral'
		}

	})
	const yuhunData = props.yuhunData as any
	const obj : any = {
		name: yuhunData.name,
		location: props.location,
		yuhun_id: yuhunData.yuhun_id
	}
	props.config.forEach(item => {
		obj[item] = true
	})
	const yuhun = ref((() => {
		switch (props.type) {
			case 'nomral':
				return new YuHun(obj)
			case 'Chutou':
				return new Chutou(obj)
		}

	})())
	const postion = {
		1: '0deg',
		2: '-45deg',
		3: '-90deg',
		4: '180deg',
		5: '135deg',
		6: '90deg'
	}
	const yuhun_location = computed(() => postion[yuhun.value.location])
</script>

<style lang="scss" scoped>
	.yuhun {
		border-radius: 5px;
		width: 220px;
		background-color: #cbb59c;
		border: 2px solid #765227;
		padding: 20px 14px;
		font-size: 14px;

		view {
			font-family: songti;
		}

		.yuhun-effect {
			color: #807263;
			margin-top: 5px;
			font-size: 12px;

			.two_piece_effect {
				margin-bottom: 2px;
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

		.att {
			border-top: 2px solid #ae8775;
			border-bottom: 2px solid #ae8775;

			.hr {
				margin-top: 1px;
				margin-bottom: 5px;
				border-top: 1px solid #ae8775;
			}

			.hr-bottom {
				margin-top: 10px;
				margin-bottom: 1px;
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