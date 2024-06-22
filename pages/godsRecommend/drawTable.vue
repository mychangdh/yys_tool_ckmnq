<template>
	<view>
		<view class="table">
			<view class="row" v-for="item in data" :key="item.id">
				<view class="head">
					<view class="head-icon">
						<image
							:src="`https://yys.res.netease.com/pc/zt/20161108171335/data/shishen/${item.shishen_id}.png?v5`"
							mode=""></image>
					</view>
					<view class="head-name">
						{{item.name}}
					</view>
				</view>
				<view class="score">
					<text class="title">PVE评分
						<view class="value">
							<uni-rate :value="item.pve_score" :max="10" />
						</view>
					</text>
				</view>
				<view class="content"><view class="title">PVE说明</view>
					<view class="value">{{item.pve_content}}</view>
				</view>
				<view class="score">
					<text class="title">PVP评分
						<view class="value">
							<uni-rate :value="item.pvp_score" :max="10" />
						</view>
					</text>
				</view>
				<view class="content"><view class="title">PVP说明</view>
					<view class="value">{{item.pvp_content}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { watch } from 'vue'
	import { COLOR } from '@/config'
	const props = defineProps({
		data: {}
	})
	watch(() => props.data, (data) => {
		console.log(data, 1111);
	})
</script>

<style lang="scss" scoped>
	.row {
		display: grid;
		grid-template-columns: repeat(5, 300px);

		.head {
			image {
				width: 100px;
				height: 100px;
			}

			font-weight: 700;

			.head-icon {
				image {
					border-radius: 1000px;
					overflow: hidden;
				}
			}
		}

		>view {
			border: 1px solid rgb(248, 189, 52);
			padding: 10px;
			text-align: center;

			.title {
				font-size: 14px;
				font-weight: 700;

			}



		}

		.score,
		.content {
		
			.title {
				height: 20px;
			}

			.value {
				height: calc(100% - 20px);
			}

		}

		.score {
				display: flex;
				justify-content: center;
			.value {
				margin-top: 34px;
			}
		}

		.content {
			.title {
				text-align: center;
			}
			.value{
				display:flex;
				justify-content: center;
				align-items: center;
			}
		}

	}
</style>