import { Module } from 'vuex';
import { IRootStore } from '@/store/rootStoreTypes';
import { getGodsApi } from '@/requests'
export type godsType = {
	id : number,
	name : string,
	level : keyof godsModuleTypes,
	index : number,
	sort : number,
	shishen_id : number,
	in_card_pool : boolean
}

export type godsModuleTypes = {
	SSR : godsType[],
	SP : godsType[],
	SR : godsType[],
	R : godsType[],
}
const godsModule : Module<godsModuleTypes, IRootStore> = {
	state: {
		SSR: [],
		SP: [],
		SR: [],
		R: [],
	},
	mutations: {
		GETGODS(state, res : godsType[]) {
			state.R = []
			state.SR = []
			state.SSR = []
			state.SP = []
			res.sort((x, y) => (x.sort - y.sort)).forEach(item => {
				if (item.level === 'N' as never) return
				if (!item.in_card_pool) return
				state[item.level].push(item)
			})
		}
	},
	actions: {
		async getGods({ commit }) {
			let result : any
			// 本地化存储
			const gods = uni.getStorageSync('Gods');
			try {
				result = JSON.parse(gods)

			}
			catch {
				uni.removeStorageSync('Gods')
				result = await getGodsApi({})
				uni.setStorageSync('Gods', JSON.stringify(result))
			}
			if (!Array.isArray(result)) {
				result = []
				return uni.showToast({
					title: '数据错误，请刷新',
					duration: 1000
				});
			}
			const res = (result.map((item : any) => {
				item.in_card_pool = Boolean(item.in_card_pool)
				return item
			}) as godsType[]).filter(item => item.in_card_pool)
			commit('GETGODS', res)

		}
	},
}
export default godsModule;