<template>
	<view>
		<view class="title">
			pve高收益御魂
			<view class="tip">
				(只看暴击爆伤攻击加成,评分大于4分,满收益为8分)
			</view>
		</view>
		<uni-segmented-control class="segmented-control" :current="current" :values="data" @clickItem="onClickItem"
			styleType="text" />
		<scroll-view class="scroll-view-attack" scroll-y="true">
			<view v-for="key in keys">
				<view class="title">
					{{getYuhunName(key)}}
				</view>
				<view class="detail">
					<view class="yuhun-detail" v-for="ite in myAnalyzAccount.attackHidYuhun[key]"
						v-show="((ite.data.pos === (current+1))&& ite.score>=5)">
						<view class="score">
							{{ite.score}}分
						</view>
						<yuhun-show-detail :yuhun="ite.data" />
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { AccountDetails } from '@/Gacha/cbg'
	import yuhunShowDetail from '@/components/yuhun-show-detail.vue'
	import store from '@/store';
	const props = defineProps({
		yuhun: {},
	})
	const yuhunList = computed(() => store.state.yuhuns.yuhuns)
	const keys = computed(() => {
		const data = Object.keys(myAnalyzAccount.attackHidYuhun)
		data.reverse()
		return data
	})


	const current = ref(0)
	const data = ['一号位', '二号位', '三号位', '四号位', '五号位', '六号位',]
	const onClickItem = ({ currentIndex }) => {
		current.value = currentIndex
	}
	const getYuhunName = (id : string) => {
		const res = yuhunList.value.find(item => item.yuhun_id === parseInt(id))
		return res?.name || '未知御魂'
	}
	let myAnalyzAccount = props.yuhun as AccountDetails
</script>

<style scoped lang="scss">
	.segmented-control {
		margin: 10px 0;
		margin-top: 10px;
	}

	.title {
		text-align: center;
		font-weight: 700;

		.tip {
			font-size: 12px;
			color: red;
		}
	}

	.scroll-view-attack {
		height: calc(100vh - 250px);
	}

	.detail {
		margin-top: 5px;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;


		.yuhun-detail {
			margin: 10px;

			.score {
				text-align: center;
				font-size: 14px;
				font-weight: 700;
				color: red;
				margin-bottom: 2px;
			}

		}

	}
</style>