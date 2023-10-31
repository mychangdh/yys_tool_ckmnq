<template>
	<view>
		1
	</view>
</template>

<script lang="ts" setup>
	import { mockGachaIndefinite } from '@/function/mockGacha'

	import type { levelType } from '@/function/mockGacha'

	type objType = {
		[key in levelType]: number 
	}
	const obj : objType = {} as objType
	mockGachaIndefinite(1000).forEach(item => {
		if (obj[item]) obj[item]++
		else obj[item] = 1
	})
	console.log(obj, 2423);
</script>