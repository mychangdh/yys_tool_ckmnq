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
			<view v-if="!changeData">
				<view class="main-att">
					<view>
						{{yuhun.MainAttributeName}}
					</view>
					<view>
						+{{yuhun.showMainAttributeValue}}
					</view>
				</view>
				<view class="sub-att" v-for="item in yuhun.showSubAttributeList">
					<view>
						{{item.nickname}}
					</view>
					<view>
						+{{item.showValue}}
					</view>
				</view>
			</view>
			<view v-else>
				<view class="main-att">
					<view class="att-name">
						{{yuhun.MainAttributeName}}
					</view>
					<view class="old-data">
						{{changeData.oldData.MainAttribute.value}}
					</view>
					<view class="point">
						<image src="/static/point-right.png"></image>
					</view>
					<view class="new-data">
						{{yuhun.showMainAttributeValue}}
					</view>
				</view>
				<view class="sub-att" v-for="item,index in changeData.newData.SubAttribute">
					<view class="att-name">
						{{item.name}}
					</view>
					<view class="old-data">
						{{
							changeData.oldData.SubAttribute.length>index?
						changeData.oldData.SubAttribute[index].value:0
						}}
					</view>
					<view class="point">
						<image src="/static/point-right.png"></image>
					</view>
					<view class="new-data"
						:style="`color:${item.haveChange?'#a72c01':'black'};font-weight:${item.haveChange?'700':'400'}`">
						{{item.value}}
					</view>
				</view>
			</view>
			<view class="hr hr-bottom"></view>
		</view>
		<view class="yuhun-effect">
			<view class="two_piece_effect">
				2件套属性：{{yuhunData.two_piece_effect}}
			</view>
			<view class="four_piece_effect" v-if="yuhunData.four_piece_effect">
				4件套属性：{{yuhunData.four_piece_effect}}
			</view>
		</view>
		<view class="select-level">
			<button :disabled="yuhun.level>=3" @click="aggrandizementNum=3">3</button>
			<button :disabled="yuhun.level>=6" @click="aggrandizementNum=6">6</button>
			<button :disabled="yuhun.level>=9" @click="aggrandizementNum=9">9</button>
			<button :disabled="yuhun.level>=12" @click="aggrandizementNum=12">12</button>
			<button :disabled="yuhun.level>=15" @click="aggrandizementNum=15">15</button>
		</view>
		<view class="aggrandizement">
			<button @click="aggrandizement" :disabled="yuhun.level===15">强化 </button>
			<view class="aggrandizement-num">
				到<uni-number-box class="aggrandizement-num-box" :min="Math.min(yuhun.level+1 ,15)" :max="15"
					v-model="aggrandizementNum"></uni-number-box>级
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { haveProbability } from '@/function'
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
	const aggrandizementNum = ref(15)
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
	const changeData = ref<null | {}>(null)
	const yuhun_location = computed(() => postion[yuhun.value.location])
	function aggrandizement() {
		if (!yuhun.value) return
		changeData.value = yuhun.value.aggrandizementLevel(aggrandizementNum.value)
		console.log(changeData.value, 21);
	}
</script>

<style lang="scss" scoped>
	.yuhun {
		border-radius: 5px;
		width: 220px;
		background-color: #cbb59c;
		border: 2px solid #765227;
		padding: 20px 14px;
		font-size: 13px;

		.att-name {
			width: 100px;
		}

		.old-data,
		.new-data {
			width: 77px;
			text-align: left;
		}

		.old-data {
			margin-right: 30px;
			text-align: right;
		}

		.select-level {
			display: flex;
			margin-top: 30px;
			margin-bottom: 7px;

			button {
				&::after {
					border-radius: 0;
				}

				height: 20px;
				font-size: 12px;
				line-height: 20px;

				background-color: transparent;
			}
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

		:deep(.uni-numbox-btns) {
			display: none;
		}

		.four_piece_effect {
			height: 70px;
		}

		.aggrandizement {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			font-size: 20px;
			line-height: 28px;

			button {
				line-height: 29px;
				width: 100px;
				height: 35px;
				background-color: #f3b25e;
				border: 2px solid #963a2e;
			}

			.aggrandizement-num {
				font-size: 14px;
				margin-top: 2px;
				display: flex;
				justify-content: center;

				.aggrandizement-num-box {
					margin: 0 0px;
				}

				:deep(.uni-input-input) {
					background-color: #cbb59c;
				}
			}

			input {
				line-height: 15px;
				width: 30px;
				color: red;
				font-size: 20px;
				border: 1px solid #cbb59c;
			}
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