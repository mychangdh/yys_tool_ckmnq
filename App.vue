<script lang="ts" setup>
	import { nextTick } from "vue"
	import Store from '@/store'
	import dayjs from 'dayjs'
	uni.showLoading({
		title: "正在获取式神信息。。",
		mask: true
	});
	(async () => {
		const oldtime = uni.getStorageSync('time')
		// 2天后清除
		if (!oldtime || (dayjs().valueOf() - +oldtime >= 2880000)) {
			uni.setStorageSync('time', dayjs().valueOf())
			uni.removeStorageSync('Gods')
		}
		await Store.dispatch('getGods')
		await nextTick(uni.hideLoading)
	})()
	console.log('页面加载完毕')
</script>