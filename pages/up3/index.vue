<template>
	<cardMessage :gacha="UP3" @changeCardType="changeCardType">
		<template v-slot:information="{myGacha,currentGodNumber}">
			<view class="gacha-information-item">
				<text class="text">概率UP：</text>
				<text class="value">{{myGacha.probabilityUP}}倍</text>
			</view>
			<view class="gacha-information-item">
				<text class="text">指定式神：</text>
				<text class="value">{{myGacha?.summonedDesignated?.name}}</text>
				<text class="text">{{myGacha.isSummonedDesignated?`(${currentGodNumber})`:''}}</text>
			</view>
			<view class="gacha-information-item">
				<text class="text">当前定向概率：</text>
				<text class="value">{{Math.floor(myGacha.showProbability * 100)}}%</text>
			</view>
		</template>
	</cardMessage>
</template>
<script lang="ts" setup>
	import cardMessage from '@/components/cards-message.vue'
	import { UP3 } from '@/Gacha/main/UP3'
	const changeCardType = (myGacha : UP3) => {
		switch (myGacha.cardType) {
			case '全部卡池':
				myGacha.cardType = '旭华召唤'
				break
			case '旭华召唤':
				myGacha.cardType = '瑶归召唤'
				break
			case '瑶归召唤':
				myGacha.cardType = '全部卡池'
				break
		}
	}
</script>