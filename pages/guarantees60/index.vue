<template>
	<view>
		<cardMessage :gacha="Guarantees60">
			<template v-slot:information="{myGacha}">
				
				<view class="gacha-information-item">
					<text class="text">当前保底：</text>
					<text class="value">{{myGacha?.currentGuaranteesGolden}}/</text>
					<text class="text">{{myGacha?.guaranteesGolden}}</text>
				</view>
				
				<view class="gacha-information-item">
					<text class="text">指定式神：</text>
					<text class="value">{{myGacha?.summonedDesignated?.name}}</text>
					<text class="text">{{myGacha.isSummonedDesignated?'(已召唤出)':''}}</text>
				</view>
				<view class="gacha-information-item">
					<text class="text">当前定向概率：</text>
					<text class="value">{{myGacha.probability * 100}}%</text>
				</view>
			</template>
		</cardMessage>
	</view>
</template>
<script lang="ts" setup>
	import cardMessage from '@/componments/cards-message.vue'
	import { Guarantees60 } from '@/Gacha/main/Guarantees60'
</script>