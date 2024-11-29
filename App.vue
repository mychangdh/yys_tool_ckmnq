<script lang="ts" setup>
	import { nextTick, onMounted } from "vue"
	import Store from '@/store'
	uni.showLoading({
		title: "正在获取式神信息。。",
		mask: true
	});
	(async () => {
		const oldtime = uni.getStorageSync('saveTime')
		// 10000分钟后清除
		if (!oldtime || (new Date().getTime() - +oldtime >= 60000000)) {
			uni.setStorageSync('saveTime', new Date().getTime())
			uni.removeStorageSync('Gods')
		}
		await Store.dispatch('getGods')
		await Store.dispatch('getYuhuns')
		await nextTick(uni.hideLoading)
		console.log('加载完成')
	})()
	function setVh() {
		let vh = window.innerHeight * 0.01
		document.documentElement.style.setProperty('--vh', `${vh}px`)
	}
	onMounted(setVh)
	uni.onWindowResize(() => {
		setVh()
		window.addEventListener('resize', () => {
			setVh()
		})
	})
</script>