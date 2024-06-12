<template>
	<view class="bg">
		<h1>最新式神养成推荐</h1>
		<view class="tip">
			注：PVP指斗技结界突破相关场景，PVE指除PVP外的其他场景。
		</view>
		<view class="total">
			<uni-card v-for="item,index in godsData" :key="index" class="message" :isFull="false" type="line">
				<template #title>
					<view class="card-title">
						<text @dblclick="getFocus('name',item)" v-if="canIEdit('name',item)">{{item.name}}</text>
						<input focus v-else v-model="editConfig[item.name].name.value" type="text"
							@blur="editGod('name',item)" />
					</view>

				</template>
				<view class="title">
					<image
						:src="`https://yys.res.netease.com/pc/zt/20161108171335/data/shishen/${item.shishen_id}.png?v5`">
					</image>
					<view class="box">
						<yys-icon :title="item.level" class="icon" :width="40" />
					</view>
				</view>
				<view class="content">
					<view class="content-column">
						<view class="content-title">
							PVE指数：
						</view>
						<view class="content-value">
							<uni-rate v-model="item.pve_score" :touchable="false" :disabled="!editMoudle"
								disabledColor="#ffca3e" :max="10" @change="editGod('pve_score',item)" />
						</view>
					</view>
					<view class="content-column">
						<view class="content-title">
							PVE说明：
						</view>
						<view class="content-value" >
							<view v-if="canIEdit('pve_content',item)" @dblclick="getFocus('pve_content',item)">
								{{item.pve_content}}
							</view>
							<textarea v-else focus v-model="editConfig[item.name].pve_content.value" @blur="editGod('pve_content',item)"  placeholder="" />
						</view>
					</view>
					<view class="content-column">
						<view class="content-title">
							PVP指数：
						</view>
						<view class="content-value">
							<uni-rate v-model=" item.pvp_score" :touchable="false" :disabled="!editMoudle"
								disabledColor="#ffca3e" :max="10" @change="editGod('pvp_score',item)" />
						</view>
					</view>
					<view class="content-column">
						<view class="content-title">
							PVP说明：
						</view>
						<view class="content-value" >
							<view v-if="canIEdit('pvp_content',item)" @dblclick="getFocus('pvp_content',item)">
								{{item.pvp_content}}
							</view>
							<textarea v-else focus v-model="editConfig[item.name].pvp_content.value" @blur="editGod('pvp_content',item)"  placeholder="" />
						</view>
					</view>
				</view>

			</uni-card>
			<uni-card class="message" :isFull="false">


			</uni-card>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import store from '@/store'
	import { computed, ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import yysIcon from '@/components/yys-icon.vue'
	import { getGodsRecommendApi, updateGodsRecommendApi } from '../../requests';
	const godsData = ref<any>([])
	const SP = computed(() => store.state.gods.SP.concat([]))
	const SSR = computed(() => store.state.gods.SSR.concat([]))
	const GODS = computed(() => [...SP.value, ...SSR.value])
	function getData() {
		getGodsRecommendApi({}).then(res => {
			console.log(res, 24325);
			godsData.value = res
		})
	}
	const editMoudle = ref(true)
	onLoad(() => {
		getData()
	})
	const editConfig = ref({
	})
	function canIEdit(type, item) {
		if (!editConfig.value[item.name]) return true
		return !editMoudle.value || !editConfig.value[item.name][type]?.show
	}
	function getFocus(type, item) {
		if (!editConfig.value[item.name]) editConfig.value[item.name] = {
			[type]: {
				value: item[type],
				show: false
			}
		}
		editConfig.value[item.name][type].show = true
	}
	function editGod(type, item) {
		if (!editConfig.value[item.name]) editConfig.value[item.name] = {
			[type]: {
				value: item[type],
				show: false
			}
		}
		const data = editConfig.value[item.name][type]
		data.show = false
		if (data.value) {
			if((data.value === item[type]) && !type.includes('score')) return 
			uni.showLoading({
				title: '加载中'
			});
			updateGodsRecommendApi({
				type,
				value: data.value,
				id:item.id
			}).then(res => {
				editConfig.value = {}
				uni.hideLoading();
				getData()
			})
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
		max-width: 1800px;

		.card-title {
			display: flex;
			border-bottom: 1px #EBEEF5 solid;
			flex-direction: row;
			align-items: center;
			padding: 10px;
			overflow: hidden;

			input {
				background-color: #fff;
			}
		}

		.tip {
			text-align: center;
			font-size: 12px;
			margin-top: 10px;
		}

		h1 {
			text-align: center;
			margin-top: 20px;
		}
	}

	.total {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.message {
		font-weight: 700;
		max-width: 500px;
		min-width: 340px;
		// border-bottom: 1px solid #ccc;
		// border-top: 1px solid #ccc;
		margin: 10px 24px;
		border-radius: 10px;

		image {
			width: 50px;
			height: 50px;
			vertical-align: middle;
		}

		.title {
			display: flex;
			justify-content: center;

			flex-wrap: wrap;

			.box {
				width: 100%;
				display: flex;
				justify-content: center;
			}

			font-size: 20px;
			font-weight: 700;

			.icon {
				margin: 0;
				vertical-align: middle;
				margin-top: 7px;
				margin-left: 40px;

			}
		}

		.content-column {
			display: flex;
			margin: 10px 0;

			.content-title {
				font-weight: 700;
				min-width: 80px;
				display: flex;
				align-items: center;
				color: red;
			}

			.content-value {
				width: 100%;
				display: flex;
				justify-content: center;
				textarea{
					width: 100%;
					height: 100px;
					
				}
			}
		}

	}
</style>