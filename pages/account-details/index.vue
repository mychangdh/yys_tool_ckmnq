<template>
	<view class="page" v-if="myAnalyzAccount">
		<uni-segmented-control class="segmented-control" :current="current" :values="data" @clickItem="clickItem"
			styleType="button" />
		<view class="page">
			<view>
				<base-message v-show="current===0" :yuhun="myAnalyzAccount" :detailList="detailList" />
				<speed-detail v-show="current===1" :yuhun="myAnalyzAccount" />
				<attack-detail v-show="current===2" :yuhun="myAnalyzAccount" />
				<speedDetail v-show="current===3" :yuhun="myAnalyzAccount" :detailList="detailList" />
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
	import { onLoad } from '@dcloudio/uni-app'
	import type { accountDetailsType } from '@/Gacha/cbg/type';
	type detailType = accountDetailsType['resource'][string][]
	// 列表的形式
	const detailList = ref([] as detailType)
	let myAnalyzAccount = ref<AccountDetails | null>(null)
	const current = ref(0)
	const data : string[] = ['基本信息', '速度御魂', 'pve御魂', '其他']
	function clickItem(item : any) {
		current.value = item.currentIndex
		show.value = false
		setTimeout(() => {
			show.value = true
		}, 300)
	}
	onLoad((option : any) => {
		console.log(option,223);
		uni.showLoading({
			title: "正在加载中..."
		})
		serchMessage(option.url)
	})

	const show = ref(false)
	function serchMessage(url : string) {
		getAnalyzAccount(url).then((res) => {
			try {
				const reponse = res.data as accountDetailsType
				detailList.value = Object.values(reponse.resource)
				detailList.value.reverse()
				myAnalyzAccount.value = new AccountDetails(reponse)
				show.value = true
			}
			catch {
				uni.showToast({
					title: '地址错误',
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
				title: err,
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
		height: 94vh;
		overflow: hidden;
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