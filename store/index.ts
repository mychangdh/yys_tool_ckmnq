import { createStore } from "vuex";

import type { IRootStore } from "./rootStoreTypes";
import gods from './modules/gods'


const store = createStore<IRootStore>({
	modules: {
		gods
	}
});

export default store;