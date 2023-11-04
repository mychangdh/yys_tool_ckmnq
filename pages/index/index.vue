<template>
	<view class="bg">
		<view class="title">
			<uni-title type="h1" title="阴阳师抽卡模拟器v2.0.0" align="center"></uni-title>
		</view>
		<uni-row class="group">
			<uni-col :sm="24" :md="12">
				<uni-group title="抽卡模拟" mode="card">
					<view class="group-item" @click="goPath('/pages/guarantees60/index')"><uni-tag text="60保底模式"
							type="primary" /></view>
					<view class="group-item" @click="goPath('/pages/up3/index')"><uni-tag text="3up模式" type="primary" /></view>
				</uni-group>
			</uni-col>
			<uni-col :sm="24" :md="12">
				<uni-group title="敬请期待" mode="card">
					<view>敬请期待</view>
				</uni-group>
			</uni-col>
		</uni-row>
	</view>
</template>

<script setup lang="ts">
	const goPath = (url : string) => {
		uni.navigateTo({
			url,
			animationType: 'pop-in',
				animationDuration: 200
		})
	}
</script>
<style lang="scss" scoped>
	.bg {
		max-width: 800px;
		margin: auto;
	}

	.title {
		margin-top: 50rpx;
	}

	.group {
		margin: 50rpx 10rpx;

		.group-item {
			height: 50px;
			display: flex;
			align-items: center;
			
			:deep(.uni-tag){
				height: 60rpx;
				line-height: 40rpx;
				font-size: 15px;
				font-weight: 700;
			}
		}
	}
</style>