import { createStore } from "vuex";

import type { IRootStore } from "./rootStoreTypes";
import gods from './modules/gods'
import yuhuns from './modules/yuhuns'


const store = createStore<IRootStore>({
	modules: {
		gods,
		yuhuns
	}
});

export default store;