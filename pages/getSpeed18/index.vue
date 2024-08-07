<template>
	<view>
		<view class="yuhun">
			<view class="yuhun-message">
				<view class="icon">

				</view>
				<view class="name">
					{{yuhun.name}}+{{yuhun.level}}
				</view>
			</view>
			<view class="main-att">
				<view>
					{{yuhun.MainAttributeName}}
				</view>
				<view>
					{{yuhun.showMainAttributeValue}}
				</view>
			</view>
			<view class="sub-att" v-for="item in yuhun.SubAttributeList">
				<view>
					{{item.nickname}}
				</view>
				<view>
					{{item.showValue}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import YuHun from '@/Gacha/YuHun'
	const yuhun = ref(new YuHun({
		name: '破势',
		location: 2
	}))
	console.log(yuhun.value, 22);
</script>

<style lang="scss" scoped>
	.yuhun {
		width: 200px;
		height: 220px;
		background-color: #cbb59c;
		border: 2px solid #765227;
		padding: 20px 10px;
		font-size: 15px;

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