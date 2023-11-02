import { Gacha } from '.'
import { Guarantees60Data } from './config'
import Store from '@/store'
import { computed } from 'vue'
import { godsType } from '@/store/modules/gods'
const { value: { SP, SSR, SR, R } } = computed(() => Store.state.gods)

export class Guarantees60 extends Gacha {
	// 保底出金数
	guaranteesGolden = 60
	// 保底获得当前式神的抽数
	private prguaranteesCurrent = 450
	// 保底累计抽数
	currentGuaranteesGolden = 0
	constructor(isNotFull : boolean = false, currentGods ?: godsType) {
		let newGods : godsType
		if (currentGods) newGods = currentGods
		else newGods = [...SSR, ...SP].sort((x, y) => y.sort - x.sort)[0]
		super({ SP, SSR, SR, R }, Guarantees60Data[newGods.level as 'SP' | 'SSR'], newGods)
		if (isNotFull) this.prguaranteesCurrent = 800

	}
	// 重写
	getOnceResult() {
		let isGlod = false
		if (this.currentGuaranteesGolden === this.guaranteesGolden - 1) isGlod = true
		if (this.currentGachasNumber === this.prguaranteesCurrent - 1) isGlod = true
		let result = super.getOnceResult(isGlod)
		if (result.level === 'SSR' || result.level === 'SP') this.currentGuaranteesGolden = 0
		else this.currentGuaranteesGolden++
		return result
	}
	get probability() {
		if (this.result.length === this.prguaranteesCurrent - 1) {
			return 1
		}
		return super.probability
	}
	
}