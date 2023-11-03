import { Gacha } from "."
import { godsType } from "@/store/modules/gods"
import { computed } from 'vue'
import Store from '@/store'
import { UP_3Data } from "./config"
const { value: { SP, SSR, SR, R } } = computed(() => Store.state.gods)
export class UP_3 extends Gacha {
	// 是否为非玩家全图玩家
	_isNotFull : boolean = false
	// 保底数量，-1则无保底
	prguaranteesCurrent = 600
	// 出了几个金了
	goldsNumber = 0
	constructor(isNotFull : boolean = false, currentGods ?: godsType) {
		let newGods : godsType
		if (currentGods) newGods = currentGods
		else newGods = [...SSR, ...SP].sort((x, y) => y.sort - x.sort)[0]
		super({ SP, SSR, SR, R }, [], newGods)
		this.isNotFull = isNotFull
		this.probabilityUP = 2.5

	}
	getOnceResult() {
		this.probabilityUP = this.goldsNumber >= 3 ? 1 : 2.5
		const res = super.getOnceResult(!this.isSummonedDesignated && this.currentGachasNumber === this.prguaranteesCurrent)
		if (res.level === 'SP' || res.level === 'SSR') this.goldsNumber++
		return res
	}

	get isNotFull() {
		return this._isNotFull
	}
	set isNotFull(isNotFull) {
		if (this.summonedDesignated)
			this.probabilityArrays =
				UP_3Data[this.summonedDesignated.level as 'SP' | 'SSR'][isNotFull ? 'notFull' : 'full']
		this.prguaranteesCurrent = isNotFull ? -1 : 600
		this._isNotFull = isNotFull
	}
	get probability() {
		if (!this.isSummonedDesignated && this.currentGachasNumber === this.prguaranteesCurrent) return 1
		return super.probability
	}
}