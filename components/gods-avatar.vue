<template>
	<view class="imagebox">
		<image class="image show"
			:src="`https://cbg-yys.res.netease.com/game_res/hero/${god.shishen_id}/${god.shishen_id}.png`">
		</image>
		<image  class="image" :src="`/static/${god.shishen_id}.png`">
		</image>
	</view>
	<text class="text gradient"
		:style="`background-image: -webkit-linear-gradient(top, ${COLOR[god.level]});`">{{god.name}}</text>
</template>

<script setup lang="ts">
	import { COLOR } from '@/config'
	import { godsType } from '@/store/modules/gods';
	type props = {
		god : godsType
	}
	const { god } = defineProps<props>()
</script>

<style lang="scss" scoped>
	.imagebox {
		position: relative;
		width: 130rpx;
		height: 130rpx;
		max-width: 100px;
		max-height: 100px;
		margin: auto;

	}

	.image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 2px solid rgb(248,189,52);
	}

	.show {
		z-index: 3;
	}

	.text {
		font-size: 12px;
		margin: 10rpx 0;
		font-weight: 700;
	}
</style>