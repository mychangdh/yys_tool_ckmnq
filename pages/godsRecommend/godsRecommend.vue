<template>
	<view class="bg">
		<h1>最新式神养成推荐 </h1>
		<view class="setting" @click="editMoudle=!editMoudle" :style="`color:${editMoudle?'red':'black'}`">
			点击此处后{{editMoudle?'退出':'开启'}}编辑模式{{editMoudle?'':'，双击可编辑内容'}}
		</view>
		<view class="tip">
			注：PVP指斗技结界突破相关场景，PVE指除PVP外的其他场景。
		</view>
		<view class="total" v-if="godsData.length">
			<uni-card v-for="item,index in godsData" :key="index" class="message" :isFull="false" type="line">
				<template #title>
					<view class="card-title">
						<text @dblclick="getFocus('name',item)"
							v-if="canIEdit('name',item)">{{index+1}}.{{item.name}}</text>
						<uni-data-select v-else v-model="editConfig[item.name].name.value" :localdata="GODS"
							@change="changeGodName(item , editConfig[item.name].name.value)"></uni-data-select>
						<uni-icons v-if="editMoudle" style="cursor: pointer;" @click="deleteGods(item)" type="trash" size="30"></uni-icons>
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
						<view class="content-value">
							<view v-if="canIEdit('pve_content',item)" @dblclick="getFocus('pve_content',item)">
								{{item.pve_content}}
							</view>
							<textarea v-else focus v-model="editConfig[item.name].pve_content.value"
								@blur="editGod('pve_content',item)" placeholder="" />
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
						<view class="content-value">
							<view v-if="canIEdit('pvp_content',item)" @dblclick="getFocus('pvp_content',item)">
								{{item.pvp_content}}
							</view>
							<textarea v-else focus v-model="editConfig[item.name].pvp_content.value"
								@blur="editGod('pvp_content',item)" placeholder="" />
						</view>
					</view>
					<view class="content-column" v-if="editMoudle">
						<view class="content-title">
							排序：
						</view>
						<view class="content-value">
							<input type="number" v-if="canIEdit('sort',item)" v-model="item.sort"
								@blur="sortChange(item)" placeholder="" />
						</view>
					</view>
				</view>
			</uni-card>
			<uni-card class="message add-message" v-if="editMoudle" :isFull="false" @click="popup?.open">
				<uni-icons type="plusempty" size="60" color="red"></uni-icons>
			</uni-card>
		</view>
		<uni-popup ref="popup" border-radius="10px 10px 0 0" class="popup">
			<uni-forms :modelValue="formData" ref="formRef" :rules="rules" label-width="100" label-align="right">
				<uni-forms-item required label="名字" name="name">
					<uni-data-select v-model="formData.name" :localdata="GODS"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item required label="PVE评分" name="pve_score">
					<uni-rate v-model="formData.pve_score" :touchable="false" :max="10" />
				</uni-forms-item>
				<uni-forms-item required name="pve_content" label="PVE说明">
					<textarea v-model="formData.pve_content" placeholder="" />
				</uni-forms-item><uni-forms-item required label="PVP评分" name="pvp_score">
					<uni-rate v-model="formData.pvp_score" :touchable="false" :max="10" />
				</uni-forms-item>
				<uni-forms-item required name="pvp_content" label="PVP说明">
					<textarea v-model="formData.pvp_content" placeholder="" />
				</uni-forms-item><uni-forms-item required name="sort" label="排序">
					<input type="number" v-model="formData.sort" placeholder="" />
				</uni-forms-item>
			</uni-forms>
			<button @click="submitForm" type="primary">添加</button>
			<button @click="popup.close" type="warn" style="margin-top:10px">取消</button>
		</uni-popup>
	
	</view>
</template>

<script lang="ts" setup>
	import store from '@/store'
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app'
	import yysIcon from '@/components/yys-icon.vue'
	import { addGodsRecommendApi, deleteGodsRecommendApi, getGodsRecommendApi, updateGodsRecommendApi } from '../../requests';
	const godsData = ref<any>([])
	const GODS = ref([...store.state.gods.SSR, ...store.state.gods.SP,].reverse().map(item => ({
		text: item.name,
		value: item.name,
		level: item.level,
		disable: false,
		shishen_id: item.shishen_id
	})))
	function getData() {
		getGodsRecommendApi({}).then(res => {
			godsData.value = res.sort((x, y) => x.sort - y.sort)
		})
	}
	const editMoudle = ref(false)
	onLoad(() => {
		getData()
	})
	const editConfig = ref({
	})
	async function changeGodName(item, name) {
		if (!name) {
			editConfig.value[item.name]['name'].show = false
			editConfig.value[item.name]['name'].value = item.name
			return
		}
		const { shishen_id, level } = GODS.value.find(ite => ite.value === name)
		item.shishen_id = shishen_id
		item.level = level
		await updateGodsRecommendApi({
			type: 'shishen_id',
			value: shishen_id,
			id: item.id
		})
		await updateGodsRecommendApi({
			type: 'level',
			value: level,
			id: item.id
		})
		editGod('name', item)
	}
	function canIEdit(type, item) {
		if (!editConfig.value[item.name]) return true
		return !editMoudle.value || !editConfig.value[item.name][type]?.show
	}
	function getFocus(type, item) {
		if (!editConfig.value[item.name]) editConfig.value[item.name] = {}
		if (!editConfig.value[item.name][type]) editConfig.value[item.name][type] = {
			value: item[type],
			show: false
		}
		editConfig.value[item.name][type].show = true
	}
	function editGod(type, item) {
		if (!editConfig.value[item.name]) editConfig.value[item.name] = {}
		if (!editConfig.value[item.name][type]) editConfig.value[item.name][type] = {
			value: item[type],
			show: false
		}
		const data = editConfig.value[item.name][type]
		data.show = false
		if (data.value) {
			if ((data.value === item[type]) && !type.includes('score')) return
			uni.showLoading({
				title: '修改中'
			});
			updateGodsRecommendApi({
				type,
				value: data.value,
				id: item.id
			}).then(res => {
				editConfig.value[item.name][type] = undefined
				getData()
				uni.hideLoading();
			})
		}
	}
	function sortChange(item) {
		item.sort = parseFloat(item.sort)
		if (!item.sort) return
		uni.showLoading({
			title: '修改中'
		});
		updateGodsRecommendApi({
			type: 'sort',
			value: item.sort,
			id: item.id
		}).then(res => {
			getData()
			uni.hideLoading();
		})
	}
	const popup = ref(null)
	const formData = ref({})
	const formRef = ref(null)
	function submitForm() {
		const vdata = godsData.value.find(item => item.name === formData.value.name)
		if (vdata) return uni.showToast({
			title: '已存在该式神',
			icon: 'error',
			duration: 700
		})
		formRef.value.validate().then(res => {
			const data = GODS.value.find(item => item.value === formData.value.name)
			formData.value.level = data.level
			formData.value.shishen_id = data.shishen_id
			uni.showLoading({
				title: '添加中'
			})
			addGodsRecommendApi(formData.value).then(res => {
				uni.hideLoading()
				uni.showToast({
					title: '添加成功',
					duration: 1000
				})
				getData()
				popup?.value?.close()
			})
		})

	}
	const rules = {
		name: { rules: [{ required: true, errorMessage: '请填写姓名' }] },
		pve_score: { rules: [{ required: true, errorMessage: '请填写PVE评分' }] },
		pve_content: { rules: [{ required: true, errorMessage: '请填写PVE说明' }] },
		pvp_score: { rules: [{ required: true, errorMessage: '请填写PVP评分' }] },
		pvp_content: { rules: [{ required: true, errorMessage: '请填写PVP说明' }] },
		sort: { rules: [{ required: true, errorMessage: '请填写排序' }] },
	}
	const deletePopup = ref(null)
	const deleteGods = ({id})=>{
		uni.showModal({
			title: '提示',
			content: '确认要删除吗',
			success: function (res) {
				uni.showLoading({
					title:'删除中'
				})
				if (res.confirm) {
				deleteGodsRecommendApi(id).then(res=>{
					uni.showToast({
						title:'删除成功'
					})
					getData()
				})
				} 
			}
		});
	}
</script>

<style lang="scss" scoped>
	.bg {
		max-width: 1800px;

		.add-message {
			height: 100px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
		}

		.card-title {
			display: flex;
			border-bottom: 1px #EBEEF5 solid;
			flex-direction: row;
			align-items: center;
			padding: 10px;
			overflow: hidden;
			display: flex;
			justify-content: space-between;

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

				textarea {
					width: 100%;
					height: 100px;

				}
			}
		}

	}

	.setting {
		margin-top: 10px;
		font-size: 12px;
		display: flex;
		justify-content: center;
		cursor: pointer;
		
	}

	:deep(.card-title) {
		overflow: unset !important;
	}

	:deep(.uni-scroll-view) {
		height: 280px;
	}

	:deep(.uni-popup__wrapper) {
		width: 420px;
		padding: 10px;
		background-color: #fff !important;

		.uni-forms-item {
			width: 383px;
		}
	}

	:deep(.uni-forms-item__label) {
		margin: auto;
		width: 100px;
		padding-right: 20px;
		text-align: right;
	}

	:deep(.uni-forms-item__content) {
		margin-top: 7px;
	}

	:deep(.popup) {
		.uni-textarea-textarea {
			padding: 10px;
			border: 1px solid #e5e5e5;
			width: 260px;
			height: 121px;
			border-radius: 5px;
		}
	}
</style>