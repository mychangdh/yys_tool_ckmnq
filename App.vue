<script lang="ts" setup>
	import { nextTick } from "vue"
	import Store from '@/store'
	import dayjs from 'dayjs'
	uni.showLoading({
		title: "正在获取式神信息。。",
		mask: true
	});
	(async () => {
		const oldtime = uni.getStorageSync('saveTime')
		// 1000分钟后清除
		if (!oldtime || (dayjs().valueOf() - +oldtime >= 6000000)) {
			uni.setStorageSync('saveTime', dayjs().valueOf())
			uni.removeStorageSync('Gods')
		}
		await Store.dispatch('getGods')
		await nextTick(uni.hideLoading)
		console.log('app加载完成')
	})()
	console.log('页面加载完毕')
</script>