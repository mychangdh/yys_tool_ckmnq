<template>
	<view class="dialog">
		<view class="select-illustrated">
			<text>请选择定向式神（如果未收录抽到则自动转换为另一个）</text>
		</view>
		<view class="new-gods gods">
			<uni-grid :column="2" :showBorder="false" :square="false">
				<uni-grid-item v-for="item in _myGacha.newGods" :key="item.shishen_id" @click="changeUpGod(item)">
					<gods-avatar :god="item" />
					<view class="radio">
						<radio value="1" :checked="_myGacha['summonedDesignated'].shishen_id === item.shishen_id" />
					</view>
				</uni-grid-item>
			</uni-grid>

		</view>
		<view class="select-illustrated">
			<text>请设置你的图鉴（修改图鉴会重置抽卡进度）</text>
		</view>
		<scroll-view class="select-god-list" scroll-y="true">
			<view class="gods" v-for="lv in level">
				<yysIcon :title="lv" class="icon" />
				<uni-grid :column="5" :showBorder="false" :square="false" >
					<uni-grid-item v-for="item in getReversed(godsData[lv])" :key="item.shishen_id">
						<view :class="{
							active:!updataFormModel[lv][item.shishen_id].have
						}" @click="changeHaveGods(item)">
							<gods-avatar :god="item" />
							<view class="radio">
								<radio value="1" :checked="updataFormModel[lv][item.shishen_id].have"
									:disabled="_myGacha.newGods.some(p=>p.shishen_id === item.shishen_id)" />
							</view>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
		</scroll-view>
		<button type="warn" class="close-dialog" @click="closeDialog">关闭</button>
	</view>
</template>

<script lang="ts" setup>
	import {		ref, watch
	} from 'vue';
	import godsAvatar from '@/components/gods-avatar.vue'
	import yysIcon from '@/components/yys-icon.vue'
	import { godsType } from '@/store/modules/gods';
	import { noIncluded } from '@/Gacha/main/not_included';
	const emits = defineEmits(['close', 'changeHaveGods', 'getUpGod'])
	const props = defineProps({
		myGacha: {},
		godsData:{}
	})
		const updataFormModel = defineModel()
	const _myGacha = props.myGacha as noIncluded
	function closeDialog() {
		emits('close')
	}
	function getReversed<T>(arr : T[]) {
		const newArr = []
		for (let i = 1; i <= arr.length; i++) {
			newArr.push(arr[arr.length - i])
		}
		return newArr
	}
	const level = ['SP', 'SSR'] as const

	// 改变图鉴
	function changeHaveGods(item : godsType) {
		if (_myGacha.newGods.some(ite => ite.shishen_id === item.shishen_id)) return
		const level = item.level as 'SSR' | 'SP'
		updataFormModel.value[level][item.shishen_id].have = !updataFormModel.value[level][item.shishen_id].have
		emits('changeHaveGods', JSON.parse(JSON.stringify(updataFormModel.value)))
	}



	// 定向up式神
	watch(() => _myGacha['summonedDesignated'], (val) => {
		emits('getUpGod', val)
	}, {
		immediate: true,
		deep: true
	})

	function changeUpGod(item : godsType) {
		_myGacha['summonedDesignated'] = item
	}
</script>

<style scoped lang="scss">
	.select-god-list {
		padding-bottom: 10px;
		max-height: calc(100vh - 340px);

	}

	.new-gods {
		:deep(.uni-grid) {
			justify-content: center;
		}
	}

	.close-dialog {
		margin: 0 5px;

	}

	.dialog {
		margin: auto;
		max-width: 1000px;
		padding-bottom: 30px;
	}

	.gods {
		margin: auto;

		text-align: center;

		.icon {
			margin: 10px auto;
		}
	}

	.active {
		filter: grayscale(100%);
	}

	.radio {
		margin-bottom: 10px;
		margin-top: 2px;
	}

	.select-illustrated {

		font-size: 14px;
		text-align: center;
		font-weight: 700;
		margin: 10px 0;

	}
</style>