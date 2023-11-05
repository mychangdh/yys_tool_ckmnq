<template>
	<uni-nav-bar left-icon="left" :border="false" title="图鉴" @clickLeft="back" background-color="#f8f8f8" :fixed="true">
		<template #right>
			<uni-icons v-if="!isReloadGod" type="reload" @click="reloadGods"></uni-icons>
		</template>
	</uni-nav-bar>
	<view class="bg">
		<view v-for="(gods,index) in godsMessage" :key="index">
			<yys-icon :title="gods.name" :width="60" />
			<uni-grid class="illustrated" :column="5" :showBorder="false" :square="false">
				<uni-grid-item class="illustrated-item" v-for="item,index in gods.value" :key="index">
					<gods-avatar :god="item" />
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script setup lang="ts">
	import yysIcon from '@/components/yys-icon.vue'
	import store from '@/store';
	import godsAvatar from '@/components/gods-avatar.vue'
	import { ref } from 'vue'
	const back = () => {
		uni.navigateTo({
			url: '/pages/index/index'
		})
	}
	const isReloadGod = ref(false)
	const reloadGods = async () => {
		uni.showLoading({
			title: '重新拉取式神中！'
		})
		uni.removeStorageSync('Gods')
		await store.dispatch('getGods')
		uni.hideLoading()
		isReloadGod.value = true
	}
	const { SP, SSR } = store.state.gods
	const godsMessage = [
		{
			name: 'SP',
			value: SP.reverse()
		}, {
			name: 'SSR',
			value: SSR.reverse()
		},
	]
</script>

<style lang="scss" scoped>
	:deep(.uni-nav-bar-text) {
		font-weight: 700;
	}

	.bg {
		padding-top: 20rpx;

	}

	.illustrated {
		padding-top: 20rpx;

		.illustrated-item {
			position: relative;
			text-align: center;

			.text {
				font-weight: 700;
				font-size: 12px;
			}
		}
	}
</style>