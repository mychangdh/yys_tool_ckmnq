<template>
	<view class="imagebox">
		<image v-if="!haveError" @error="errorImage" class="image show"
			:style="`border: 2px solid ${COLOR_ONCE[god.level]};`"
			:src="`https://cbg-yys.res.netease.com/game_res/hero/${god.shishen_id}/${god.shishen_id}.png`">
		</image>
		<image v-else  @error="errorImage" :style="`border: 2px solid ${COLOR_ONCE[god.level]};`" class="image new-god"
			:src="`/static/${god.shishen_id}.png`">
		</image>
	</view>
	<text class="text gradient"
		:style="`background-image: -webkit-linear-gradient(top, ${COLOR[god.level]});`">{{god.name}}</text>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { COLOR, COLOR_ONCE } from '@/config'
	import { godsType } from '@/store/modules/gods';
	type props = {
		god : godsType
	}
	const { god } = defineProps<props>()
	const haveError = ref(false)
	const errorImage = () => {
		haveError.value = !haveError.value
	}

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
		border-radius: 2px;
	}

	.new-god {
		image {
			position: relative;
			top: 100px;
		}
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