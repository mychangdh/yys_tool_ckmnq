import { Guarantees60Data } from './config'
import { godsType } from '../../store/modules/gods';
import { Guarantees60 } from './Guarantees60'
import { getRandomElement } from '../function';
import { levelType, resultType } from '.';
export class NotIncluded extends Guarantees60 {
	// 是否未收录触发了
	_isIncluded : boolean = false
	// 未收录式神
	noIncludedGods : godsType[]
	// 周年庆式神
	newGods : godsType[]

	// 未收录式神数组
	constructor(noIncludedGods ?: godsType[]) {
		super()
		this.noIncludedGods = noIncludedGods || []
		this.newGods = [this.baseGods.SP[this.baseGods.SP.length - 1], this.baseGods.SSR[this.baseGods.SSR.length - 1]]
		this.summonedDesignated = this.newGods[0]

	}
	setProbabilityArray(isNotFull : boolean) {
		super.setProbabilityArray(isNotFull)
		this.probabilityArrays =
			Guarantees60Data['SSR'][isNotFull ? 'notFull' : 'full']
	}
	getOnceResult() {
		if (this.isIncluded) return super.getOnceResult()
		let randomNum = Math.random()
		// 获取概率up
		this.currentGachasNumber++
		this.currentGuaranteesGolden++
		let result = {} as resultType
		const getResult = (level : levelType | 'golen') => {
			result = {
				...getRandomElement(level === 'golen' ? [...this.noIncludedGods, ...this.newGods] : this.gods[level]),
				currentGachasNumber: this.currentGachasNumber
			}
			return result
		}
		if (this.currentGachasNumber === 60) this.autoSelectGod(getResult('golen'))
		else if (randomNum <= this.probabilityUP * 0.0125) this.autoSelectGod(getResult('golen'))
		else if (randomNum <= this.probabilityUP * 0.2125) getResult('SR')
		else getResult('R')
		this.result.push(result)
		return result
	}
	// 未收录结束后自动选择定向式神
	autoSelectGod(res : resultType) {
		this.currentGuaranteesGolden = 0
		this.isIncluded = true
		if (this.newGods.every(item => item.shishen_id !== res.shishen_id)) return
		const otherGod = this.newGods.find(item => item.shishen_id !== res.shishen_id)
		this.selectGod(otherGod.shishen_id)

	}
	// 手动选择定向式神
	selectGod(shishen_id : number) {
		this.summonedDesignated = this.newGods.find(item => item.shishen_id === shishen_id)
		if (!this.summonedDesignated) return
		this.restartCard(this.cardType)
	}
	get isIncluded() {
		return this._isIncluded
	}
	set isIncluded(value) {
		this._isIncluded = value
	}
}