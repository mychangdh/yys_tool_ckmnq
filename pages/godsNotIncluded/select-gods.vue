<template>
	<view class="dialog">
		<view class="select-illustrated">
			<text>请设置你的图鉴（修改图鉴会重置抽卡进度）</text>
		</view>
		<scroll-view class="select-god-list" scroll-y="true">
			<view class="gods" v-for="lv in level">
				<yysIcon :title="lv" class="icon" />
				<uni-grid :column="5" :showBorder="false" :square="false">
					<uni-grid-item v-for="item in getReversed(godsData[lv])" :key="item.shishen_id">
						<view :class="{
							active:!form[lv][item.shishen_id]
						}" @click="changeHaveGods(item)">
							<gods-avatar :god="item" />
							<view class="radio">
								<radio value="1" :checked="form[lv][item.shishen_id]"
									:disabled="newGods.some(p=>p.shishen_id === item.shishen_id)" />
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
	import { computed, ref, watch } from 'vue';
	import godsAvatar from '@/components/gods-avatar.vue'
	import yysIcon from '@/components/yys-icon.vue'
	import store from '../../store';
	import { godsType } from 'store/modules/gods';
	const emits = defineEmits(['close'])
	const props = defineProps({
		newGods: {
			type: Array,
			default: () => []
		}
	})
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
	type formType = {
		[key in 'SP' | 'SSR']: {
			[key in number]: boolean
		}
	}
	// 改变图鉴
	function changeHaveGods(item : godsType) {
		if (props.newGods.some(ite => ite.shishen_id === item.shishen_id)) return
		const level = item.level as 'SSR' | 'SP'
		form.value[level][item.shishen_id] = !form.value[level][item.shishen_id]
	}
	const godsData = computed(() => store.state.gods)
	const form = ref<formType>({
		SP: {},
		SSR: {}
	})
	watch(godsData, (data) => {
		[...data.SP, ...data.SSR].forEach(item => {
			form.value[item.level as 'SP' | 'SSR'][item.shishen_id] = true
		})
		props.newGods.forEach((item : any) => {
			form.value[item.level as 'SP' | 'SSR'][item.shishen_id] = false
		})
	}, {
		immediate: true,
		deep: true
	})
</script>

<style scoped lang="scss">
	.select-god-list {
		padding-bottom: 10px;
		max-height: calc(100vh - 191px);

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

		font-size: 16px;
		text-align: center;
		font-weight: 700;
		margin: 20px 0;

	}
</style>