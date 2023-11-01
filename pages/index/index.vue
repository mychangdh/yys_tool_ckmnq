<template>
	<view>
		1
	</view>
</template>

<script lang="ts" setup>
	import { Guarantees60 } from '@/Gacha/main/Guarantees60'
	const obj : any = {}
	const a = new Guarantees60()
	for (let i = 1; i <= 100; i++) {
		const res = a.getOnceResult()
		if (obj[res.level]) obj[res.level]++
		else obj[res.level] = 1
	}
	console.log(obj);
</script>