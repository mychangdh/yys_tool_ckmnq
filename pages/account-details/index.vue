<template>
	<view>
		11
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { AccountDetails } from '@/Gacha/cbg'
	import { getAnalyzAccount } from '@/requests'
	let myAnalyzAccount = ref<AccountDetails | null>(null)
	getAnalyzAccount('https://yys.cbg.163.com/cgi/mweb/equip/35/202408160101616-35-5YEHDVAOB026Y?view_loc=equip_list%7Ctag_key%3A%7B%22is_from_ad_reco%22%3A%200,%20%22tag%22%3A%20%22latest%22%7D&reco_request_id=1723743644293Lws_I&tag=latest').then(res => {
		myAnalyzAccount.value = new AccountDetails(res)
		console.log(myAnalyzAccount.value,1111);
	})
</script>

<style scoped lang="scss">

</style>