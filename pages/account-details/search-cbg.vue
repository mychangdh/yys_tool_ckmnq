<template>
	<view class="search-cbg">
		<view class="search-box">
			<view class="title">请输入藏宝阁地址</view>
			<uni-easyinput class="search" v-model="url" placeholder="请输入藏宝阁地址" :clearable="true"></uni-easyinput>
			<button type="primary" @click="serchMessage">点击搜索</button>
		</view>
	</view>
</template>
<script setup lang="ts">
	import { ref } from 'vue';
	const url = ref('https://yys.cbg.163.com/cgi/mweb/equip/88/202407181401616-92-FNTXWOWNH05BF?view_loc=reco_home%7Ctag_key%3A%7B%22is_from_ad_reco%22%3A%200,%20%22tag%22%3A%20%22latest%22%7D&reco_request_id=1724058949973amgWY&tag=latest')
	function serchMessage() {
		if (!url.value.includes('yys.cbg.163.com')) return uni.showToast({
			title: '地址错误！',
			icon: 'error'
		})
		uni.navigateTo({
			url: `/pages/account-details/index?url=${url.value}`
		})
	}
</script>
<style scoped lang="scss">
	.search-cbg {
		height: 400px;
		margin: auto;

		.search-box {
			height: 100px;
			width: 90%;

			:deep(.uni-easyinput__content) {
				height: 54px;
			}

			button {
				margin-top: 10px;
			}
		}

		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 20px;
		max-width: 800px;

		.title {
			text-align: center;
			margin-bottom: 10px;
		}
	}
</style>