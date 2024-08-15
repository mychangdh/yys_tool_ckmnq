<template>
	<view class="imagebox">
		<image @error="errorImage" class="image show" :style="`border: 2px solid ${COLOR_ONCE[god.level]};`" :src="src">
		</image>
		<!-- 	<image v-else  @error="errorImage" :style="`border: 2px solid ${COLOR_ONCE[god.level]};`" class="image new-god"
			:src="`/static/${god.shishen_id}.png`">
		</image> -->
	</view>
	<text class="text gradient"
		:style="`background-image: -webkit-linear-gradient(top, ${COLOR[god.level]});`">{{god.name}}</text>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { godsType } from '@/store/modules/gods';
	import { COLOR, COLOR_ONCE } from '@/config'
	type propsType = {
		god : godsType
	}
	const props = defineProps<propsType>()
	const src = ref('')
	watch(() => props.god, (god) => {
		src.value = `https://cbg-yys.res.netease.com/game_res/hero/${god.shishen_id}/${god.shishen_id}.png`

	}, { immediate: true, deep: true })
	const errorImage = (e) => {
		src.value = `/static/${props.god.shishen_id}.png`
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