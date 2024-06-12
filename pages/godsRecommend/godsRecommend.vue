<template>
	<view class="bg">
		<h1>最新式神养成推荐</h1>
		<view class="tip">
		注：PVP指斗技结界突破相关场景，PVE指除PVP外的其他场景。
		</view>
		<view class="total">
			<uni-card class="message" title="桃花妖" :isFull="false" type="line">
				<view class="title">
					<image src="https://yys.res.netease.com/pc/zt/20161108171335/data/shishen/200.png?v5"></image>
					<view class="box">
						<yys-icon title="SR" class="icon" :width="40" />
					</view>
				</view>
				<view class="content">
					<view class="content-column">
						<view class="content-title">
							PVE指数：
						</view>
						<view class="content-value">
						<uni-rate v-model="value" :max="10"/>
						</view>
					</view>
					<view class="content-column">
						<view class="content-title">
							PVE说明：
						</view>
						<view class="content-value">
							富商大贾很反感四方股份大概涣发大号王师傅公对公涣发大号放大而且第三帝国回复的刚发的
						</view>
					</view>
					<view class="content-column">
						<view class="content-title">
							PVP指数：
						</view>
						<view class="content-value">
						<uni-rate v-model="value" :max="10"/>
						</view>
					</view>
					<view class="content-column">
						<view class="content-title">
							PVP说明：
						</view>
						<view class="content-value">
							富商大贾很反感四方股份大概涣发大号王师傅公对公涣发大号放大而且第三帝国回复的刚发的
						</view>
					</view>
				</view>

			</uni-card>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
import yysIcon from '@/components/yys-icon.vue'
	const value = ref(1)
</script>

<style lang="scss" scoped>
	.bg {
		max-width: 1800px;
		.tip{
			text-align: center;
			font-size: 12px;
			margin-top:10px;
		}
		h1{
			text-align: center;
			margin-top: 20px;
		}
	}

	.total {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.message {
		font-weight: 700;
		max-width: 400px;
		// border-bottom: 1px solid #ccc;
		// border-top: 1px solid #ccc;
		padding: 10px;
		margin: 10px;
		border-radius: 10px;

		image {
			width: 50px;
			height: 50px;
			vertical-align: middle;
		}

		.title {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;

			.box {
				width: 100%;
				display: flex;
				justify-content: center;
			}

			font-size: 20px;
			font-weight: 700;

			.icon {
				margin: 0;
				vertical-align: middle;
				margin-top: 7px;
				margin-left: 40px;
				
			}
		}

		.content-column {
			display: flex;

			.content-title {
				font-weight: 700;
				width: 90px;
				display: flex;
				align-items: center;
				color:red;
			}

			.content-value {
				width: 100%;
				text-align: center;
			}
		}

	}

</style>