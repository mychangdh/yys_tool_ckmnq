<template>
	<view>
		<view class="title">
			账号基本信息
		</view>
		<view class="detail-list">
			<view class="detail" v-for="item in detailList">
				<view class="detail-data" v-if="item.name!=='图鉴'">
					<text class="key">{{item.name}}:</text>
					<text class="value">{{item.value}}</text>
				</view>
				<view class="detail-data" v-else>
					<text class="key">{{item.name}}:</text>
					<text class="value"> SP:{{item.value.sp.got}}/{{item.value.sp.all}};
						SSR:{{item.value.ssr.got}}/{{item.value.ssr.all}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	defineProps({
		yuhun: {},
		detailList: {}
	})
</script>

<style scoped lang="scss">
	.title {
		text-align: center;
		margin-top: 10px;
		font-weight: 700;
	}


	.detail-list {
		background: #f7f7f7;
		max-width: 600px;
		margin: auto;
		padding: 10px;
		border-radius: 10px;
		margin-top: 10px;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		font-weight: 700;
		font-size: 14px;

		.detail {
			width: 100%;
			margin: 5px;

			.detail-data {
				margin: auto;
				width: 60%;
				display: flex;
				justify-content: space-between;
				padding: 3px;

				text {
					width: 200px;
				}

				.key {
					text-align: right;
				}

				.value {
					margin-left: 70px;
					text-align: left;
				}
			}

		}
	}
</style>