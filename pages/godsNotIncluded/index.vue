<template>

	<view class="page">
		<uni-popup ref="popup" class="popup" type="bottom" background-color="#fff" border-radius="10px 10px 0 0">
			<selectGods v-model="form" :myGacha="myGacha" :godsData="godsData" @close="popup && popup.close()"
				@changeHaveGods="changeHaveGods" @changeUpGod="changeUpGod" @getUpGod="getUpGod" />
		</uni-popup>
		<view>
		</view>
		<cardMessage @init="init" :gacha="noIncluded" @changeCardType="changeCardType" @resert="resert">
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
				<button type="primary" class="setting-illustrated" @click="open">设置定向UP式神和图鉴（默认真全图）</button>
			</template>
		</cardMessage>

	</view>
</template>
<script lang="ts" setup>
	import cardMessage from '@/components/cards-message.vue'
	import { noIncluded } from '@/Gacha/main/not_included'
	import selectGods from './select-gods.vue'
	import { computed, ref, watch } from 'vue';
	import store from '../../store';
	import { godsType } from '../../store/modules/gods';
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
	// 重置函数
	let restart = () => { }
	const myGacha = ref<noIncluded | null>(null)
	const godsData = computed(() => store.state.gods)
	const form = ref({} as formType)
	const init = (gacha : noIncluded, res : () => void) => {
		myGacha.value = gacha
		restart = res
		if (JSON.stringify(form.value) !== '{}') return
		godsData.value.SP.concat(godsData.value.SSR).forEach(data => {
			if (!form.value[data.level as 'SP' | 'SSR']) form.value[data.level as 'SP' | 'SSR'] = {}
			form.value[data.level as 'SP' | 'SSR'][data.shishen_id] = {
				'have': true,
				data
			}
		})
		myGacha.value.newGods.forEach((data : any) => {
			form.value[data.level as 'SP' | 'SSR'][data.shishen_id] = {
				'have': false,
				data
			}
		})

	}
	const open = () => {
		popup.value && popup.value.open()
	}
	type formType = {
		[key in 'SP' | 'SSR']: {
			[key in number]: {
				have : boolean,
				data : godsType
			}
		}
	}

	// 定向up式神
	let upGod = {} as godsType
	function getUpGod(val : godsType) {
		upGod = val
	}
	// 未收录式神
	let noIncludedGods : godsType[] = []
	// 重置后把图鉴挂上去
	function resert() {
		myGacha.value.noIncludedGods = noIncludedGods
		myGacha.value.summonedDesignated = upGod
		const noNewGods = Object.values(form.value.SSR).filter(item => {
			return myGacha.value.newGods.every(ite => ite.shishen_id !== item.data.shishen_id)
		})
		myGacha.value.isNotFull = noNewGods.some(item => !item.have)
	}

	const changeHaveGods = (forms : formType) => {
		const newSP = Object.values(forms.SP).filter(ite => !ite.have).map(ite => ite.data)
		const newSSR = Object.values(forms.SSR).filter(ite => !ite.have).map(ite => ite.data)
		noIncludedGods = [...newSP, ...newSSR]
		restart()
		resert()
	}
	function changeUpGod(item : godsType) {
		upGod = item
		myGacha.value.summonedDesignated = item
	}
	watch(myGacha, (_myGacha) => {
		if (!_myGacha) return

	}, {
		immediate: true,
		deep: true
	})
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