<template>
	<view class="page" v-if="myAnalyzAccount">
		<uni-segmented-control class="segmented-control" :current="current" :values="data" @clickItem="clickItem"
			styleType="button" />
		<view>
			<view class="cbg-message">
				<base-message v-show="current===0" :yuhun="myAnalyzAccount" :detailList="detailList" />
				<speed-detail v-show="current===1" :yuhun="myAnalyzAccount" />
				<attack-detail v-show="current===2" :yuhun="myAnalyzAccount" />
				<bossYuhunDetail v-show="current===3" :yuhun="myAnalyzAccount"  />
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, nextTick } from 'vue';
	import { AccountDetails } from '@/Gacha/cbg'
	import { getAnalyzAccount } from '@/requests'
	import speedDetail from './components/speed-detail.vue'
	import attackDetail from './components/attack-detail.vue'
	import baseMessage from './components/base-message.vue'
	import bossYuhunDetail from './components/boss-yuhun-detail.vue'
	import { onLoad } from '@dcloudio/uni-app'
	import type { accountDetailsType } from '@/Gacha/cbg/type';
	type detailType = accountDetailsType['resource'][string][]
	// 列表的形式
	const detailList = ref([] as detailType)
	let myAnalyzAccount = ref<AccountDetails | null>(null)
	const current = ref(0)
	const data : string[] = ['基本信息', '速度御魂', 'pve御魂','逢魔御魂']
	function clickItem(item : any) {
		current.value = item.currentIndex
	}
	onLoad((option : any) => {
		uni.showLoading({
			title: "正在加载中..."
		})
		serchMessage(option.url)
	})


	// function serchMessage() {
	// 	detailList.value = Object.values(dataJSON.resource)
	// 	detailList.value.reverse()
	// 	myAnalyzAccount.value = new AccountDetails(dataJSON)
	// 	uni.hideLoading()
	// }
	function serchMessage(url : string) {
		getAnalyzAccount(url).then((res:any) => {
			try {
				const reponse = res.data as accountDetailsType
				detailList.value = Object.values(reponse.resource)
				detailList.value.reverse()
				myAnalyzAccount.value = new AccountDetails(reponse)

			}
			catch {
				uni.showToast({
					title: res.data,
					icon: 'error',
					duration: 2000
				}).then(() => {
					setTimeout(uni.navigateTo, 1500)
				})
			}
			nextTick(uni.hideLoading)
		}).catch(err => {
			uni.hideLoading()
			uni.showToast({
				title: res.data,
				icon: 'error',
				duration: 2000
			})
		})
	}
</script>
<style scoped lang="scss">
	.segmented-control {
		max-width: 600px;
		margin: 10px auto;
	}

	.page {
		height: calc(100vh - 50px);
		max-width: 800px;
		margin: auto;
		padding: 5px;
		overflow-y: hidden;
	}

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