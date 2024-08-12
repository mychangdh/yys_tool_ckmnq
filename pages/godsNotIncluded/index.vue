<template>
	<cardMessage :gacha="noIncluded"  @changeCardType="changeCardType">
		<template v-slot:information="{myGacha,currentGodNumber}">
			<view class="gacha-information-item">
				<text class="text">当前保底：</text>
				<text class="value">{{myGacha?.currentGuaranteesGolden}}/</text>
				<text class="text">{{myGacha?.guaranteesGolden}}</text>
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
	import { noIncluded } from '@/Gacha/main/not_included'
	const changeCardType = (myGacha : noIncluded) => {
		switch (myGacha.cardType) {
			case '旭华召唤':
				myGacha.cardType = '瑶归召唤'
				break
			case '瑶归召唤':
				myGacha.cardType = '旭华召唤'
				break
		}
	}
</script>