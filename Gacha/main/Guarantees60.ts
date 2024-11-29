import { Gacha } from '.'
import { Guarantees60Data } from './config'
import Store from '@/store'
import { godsType } from '@/store/modules/gods'



export class Guarantees60 extends Gacha {
	// 保底出金数
	guaranteesGolden = 60
	// 保底获得当前式神的抽数
	private prguaranteesCurrent = 450
	// 保底累计抽数
	currentGuaranteesGolden = 0
	constructor(currentGods ?: godsType, isNotFull : boolean = false) {
		const { SP, SSR, SR, R } = Store.state.gods
		let newGods : godsType
		if (currentGods) newGods = currentGods
		else newGods = [...SSR, ...SP].sort((x, y) => y.sort - x.sort)[0]
		super({ SP, SSR, SR, R }, [], newGods)
		this.isNotFull = isNotFull
		this.cardType = '旭华召唤'
	}
	// 重写
	getOnceResult() {
		let isGlod = false
		// 对是否为60保底出金和450保底出当期式神进行判断
		if (this.currentGuaranteesGolden === this.guaranteesGolden - 1) isGlod = true
		else if (!this.isSummonedDesignated && (this.currentGachasNumber === this.prguaranteesCurrent - 1)) isGlod = true
		let result = super.getOnceResult(isGlod)
		if (result.level === 'SSR' || result.level === 'SP') this.currentGuaranteesGolden = 0
		else this.currentGuaranteesGolden++
		return result
	}
	// 设置概率数组
	setProbabilityArray(isNotFull : boolean) {
		if (this.summonedDesignated)
			this.probabilityArrays =
				Guarantees60Data[this.summonedDesignated.level as 'SP' | 'SSR'][isNotFull ? 'notFull' : 'full']
		this.prguaranteesCurrent = isNotFull ? 800 : 450
	}
	get isNotFull() {
		return this._isNotFull
	}
	set isNotFull(isNotFull) {
		this.setProbabilityArray(isNotFull)
		this._isNotFull = isNotFull
	}
	// 对保底450/800当期的判断，正常来说不用做判断
	get probability() {
		if (this.result.length === this.prguaranteesCurrent - 1) return 1
		return super.probability
	}

}