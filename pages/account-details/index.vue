<template>
	<view v-if="myAnalyzAccount">
		<speedDetail :yuhun="myAnalyzAccount" :detailList="detailList" />
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { AccountDetails } from '@/Gacha/cbg'
	import { getAnalyzAccount } from '@/requests'
	import speedDetail from './speed-detail.vue'
	import { onLoad } from '@dcloudio/uni-app'
	import type { accountDetailsType } from '@/Gacha/cbg/type';
	type detailType = accountDetailsT2ype['resource'][string][]
	// 列表的形式
	const detailList = ref([] as detailType)
	const url = ref('https://yys.cbg.163.com/cgi/mweb/equip/35/202408160101616-35-5YEHDVAOB026Y?view_loc=equip_list%7Ctag_key%3A%7B%22is_from_ad_reco%22%3A%200,%20%22tag%22%3A%20%22latest%22%7D&reco_request_id=1723743644293Lws_I&tag=latest')
	let myAnalyzAccount = ref<AccountDetails | null>(null)

	onLoad((option : any) => {
		uni.showLoading({
			title: "正在加载中..."
		})
		serchMessage(option.url)
	})

	function serchMessage(url : string) {
		getAnalyzAccount(url).then((res) => {
			try {
				const reponse = res as accountDetailsType
				detailList.value = Object.values(reponse.resource)
				detailList.value.reverse()
				myAnalyzAccount.value = new AccountDetails(reponse)
			}
			catch {
				uni.showToast({
					title: '地址错误',
					icon: 'error',
					duration: 2000
				}).then(() => {
					setTimeout(uni.navigateBack, 1500)
				})
			}
			uni.hideLoading()
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