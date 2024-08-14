<template>

	<view class="page">
		<uni-popup ref="popup" class="popup" type="bottom" background-color="#fff" border-radius="10px 10px 0 0">
			<selectGods :new-gods="myGacha.newGods" @close="popup && popup.close()" />
		</uni-popup>
		<view>
		</view>
		<cardMessage @init="init" :gacha="noIncluded" @changeCardType="changeCardType">
			<template v-slot:information="{myGacha,currentGodNumber}">

				<view class="gacha-information-item">

					<text class="text">当前保底：</text>
					<text class="value">{{myGacha?.currentGuaranteesGolden}}/</text>
					<text class="text">{{myGacha?.guaranteesGolden}}</text>
				</view>
				<view class="gacha-information-item" :class="{
					active:!myGacha?.isIncluded
				}">
					<text class="text">指定式神：</text>
					<text class="value">{{myGacha?.summonedDesignated?.name}}</text>
					<text class="text">{{myGacha.isSummonedDesignated?`(${currentGodNumber})`:''}}</text>
				</view>
				<view class="gacha-information-item" :class="{
					active:!myGacha?.isIncluded
				}">
					<text class="text">当前定向概率：</text>
					<text class="value">{{Math.floor(myGacha.showProbability * 100)}}%</text>
				</view>
			</template>
		<template #otherBtns>
				<button type="primary" class="setting-illustrated" @click="popup && popup.open()">点击设置图鉴（默认真全图）</button>
		</template>
		</cardMessage>
	
	</view>
</template>
<script lang="ts" setup>
	import cardMessage from '@/components/cards-message.vue'
	import { noIncluded } from '@/Gacha/main/not_included'
	import selectGods from './select-gods.vue'
	import { ref } from 'vue';
	const popup = ref<HTMLElement | null>(null)
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
	const myGacha = ref<noIncluded | null>(null)
	const init = (gacha : noIncluded) => {
		myGacha.value = gacha
	}
	const open = () => {
		popup.value && popup.value.open()
	}
</script>
<style scoped lang="scss">
	$fontColor: #ccc;

	.setting-illustrated {

		cursor: pointer;
		margin-top: 20px;
		display: flex;
		justify-content: center;
		font-weight: 700;
		text-decoration: #ccc;
	}

	.popup {
		background-color: #fff;
		max-width: 600px;
	}

	.active {
		color: $fontColor;

		:deep(text) {
			color: $fontColor !important;
		}
	}

	.open-btn {
		margin: auto;
		max-width: 600px;
		margin: 10px;
	}
</style>