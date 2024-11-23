<template>
	<view class="page">
		<view class="title">
			<uni-title type="h1" :title="`阴阳师抽卡模拟器v${version}`" align="center"></uni-title>
		</view>
		<view class="groups">
			<uni-row>
				<uni-col :sm="24" :md="12">
					<uni-group title="抽卡模拟" mode="card">
						<view class="group-item" @click="goPath('/pages/godsNotIncluded/index')"><uni-tag text="周年庆模式"
								type="primary" /></view>
						<view class="group-item" @click="goPath('/pages/guarantees60/index')"><uni-tag text="60保底模式"
								type="primary" /></view>
						<view class="group-item" @click="goPath('/pages/up3/index')"><uni-tag text="3up模式"
								type="primary" /></view>
					</uni-group>
					<uni-group title="御魂模拟" mode="card">
						<view class="group-item" @click="goPath('/pages/getSpeed18/index')"><uni-tag text="出头模式"
								type="primary" /></view>
					</uni-group>
					<uni-group title="藏宝阁相关" mode="card">
						<view class="group-item" @click="goPath('/pages/account-details/search-cbg')"><uni-tag
								text="账号御魂分析" type="primary" /></view>
					</uni-group>
				</uni-col>
				<uni-col :sm="24" :md="12">
					<uni-group title="图鉴" mode="card">
						<view class="group-item" @click="goPath('/pages/illustrated/illustrated')"><uni-tag
								text="查看式神图鉴" type="primary" /></view>
					</uni-group>
					<uni-group title="萌新养成推荐" mode="card">
						<view class="group-item" @click="goPath('/pages/godsRecommend/godsRecommend')"><uni-tag
								text="式神推荐" type="primary" /></view>
					</uni-group>
				</uni-col>
				<uni-col :sm="24" :md="12">
					<uni-group title="敬请期待" mode="card">
						<view>敬请期待</view>
					</uni-group>
				</uni-col>
			</uni-row>
		</view>
	</view>
	<view class="beian">
		<image src="./beian-icon.png" mode=""></image>
		<a href="https://beian.mps.gov.cn/#/query/webSearch" rel="noreferrer" target="_blank">鲁公网安备37050202371540</a><a
			href="https://beian.miit.gov.cn/" rel="noreferrer" target="_blank">鲁ICP备2022008257号</a>
	</view>
</template>

<script setup lang="ts">
	import { version } from '@/config'
	const goPath = (url : string) => {
		uni.navigateTo({
			url,
		})
	}
	
</script>
<style lang="scss" scoped>
	.beian {
		width: 100%;
		line-height: 50px;
		text-align: center;
		color: #fff;
		font-size: 12px;
		background-color: #f2f2f2;
		background-color: #043e5a;

		image {
			width: 15px;
			height: 15px;
			margin-right: 5px;
			vertical-align: middle;
		}

		a {
			color: #fff;
			text-decoration: none;
			margin-right: 20px;
		}
	}

	.page {
		max-width: 800px;
		margin: auto;
		overflow: hidden;
		min-height: calc(100vh - 50px);
	}

	.title {
		margin-top: 50rpx;
	}

	.groups {

		margin: 50rpx 10rpx;



		.group-item {
			height: 50px;
			display: flex;
			align-items: center;

			:deep(.uni-tag) {
				height: 40px;
				line-height: 30px;
				font-size: 15px;
				font-weight: 700;
			}
		}
	}
</style>