<template>
	<view class="beian">
		<image src="./beian-icon.png" mode=""></image>
		<a href="https://beian.mps.gov.cn/#/query/webSearch" rel="noreferrer" target="_blank">鲁公网安备37050202371540</a><a
			href="https://beian.miit.gov.cn/" rel="noreferrer" target="_blank">鲁ICP备2022008257号</a>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
	.beian {
		width: 100%;
		line-height: 50px;
		text-align: center;
		color: #fff;
		font-size: 12px;
		background-color: #f2f2f2;
		background-color: #043e5a;

		image {
			width: 15px;
			height: 15px;
			margin-right: 5px;
			vertical-align: middle;
		}

		a {
			color: #fff;
			text-decoration: none;
			margin-right: 20px;
		}
	}
</style>