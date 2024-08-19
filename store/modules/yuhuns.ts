import { Module } from 'vuex';
import { IRootStore } from '@/store/rootStoreTypes';
import { getYuHun } from '@/requests'
import YuHun from 'Gacha/YuHun/chutou';
export type yuhunsModuleType = {
	yuhuns : YuHun[]
}
const yuhunsModule : Module<yuhunsModuleType, IRootStore> = {
	state: {
		yuhuns: []
	},
	mutations: {
		SETYUHUN(state, data) {
			state.yuhuns = data
		}
	},
	actions: {
		async getYuhuns({ commit }) {
			const yuhunStorage = uni.getStorageSync('yuhuns');
			try {
				commit('SETYUHUN', JSON.parse(yuhunStorage))
			}
			catch {
				getYuHun().then((data : any) => {
					commit('SETYUHUN', data)
					uni.setStorageSync('yuhuns',JSON.stringify(data))
				})
			}

		}
	},
}
export default yuhunsModule;