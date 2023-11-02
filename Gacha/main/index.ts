import type { godsType } from '@/store/modules/gods'
import { getRandomElement } from '@/Gacha/function'
import type { probabilityType } from './config'
export type myGodsType = { [key in levelType]: godsType[] }
export type levelType = 'R' | 'SR' | 'SSR' | 'SP'
export type resultType = {
	level : levelType,
	name : string,
	shishen_id : number,
	sort : number
	// 是否为当期式神
	isCurrent ?: boolean,
	currentGachasNumber : number
}
// 抽卡类
export class Gacha {
	// 式神
	gods : myGodsType
	// 概率up
	probabilityUP : 2.5 | 1 = 1
	// 当前抽数
	currentGachasNumber = 0
	// 当期式神的定向概率数组
	private _probabilityArrays : probabilityType[] = []
	private _probability : number = 0
	// 是否不进行当期式神的计算
	isSummonedDesignated = false
	// 当期式神，不传就没有定向计算
	summonedDesignated : godsType | undefined
	// 抽卡结果
	result : resultType[] = []
	// 构造函数，传入概率数组
	constructor(gods : myGodsType, probabilityArrays ?: probabilityType[], summonedDesignated ?: godsType) {
		if (probabilityArrays) this.probabilityArrays = probabilityArrays
		this.gods = gods
		if (summonedDesignated) {
			this.summonedDesignated = summonedDesignated
			// 先把当期式神踢出卡池，因为他的出现是用定向up去计算的
			this.gods[summonedDesignated.level] = this.gods[summonedDesignated.level].filter(item => item.shishen_id !== summonedDesignated.shishen_id)
		}
		else this.isSummonedDesignated = true
	}
	// 获得当期式神的定向概率
	get probability() {
		if(this.isSummonedDesignated) return this._probability
		for (let i = 1; i < this.probabilityArrays.length; i++) {
			if (this.probabilityArrays[i].value >= this.currentGachasNumber) {
				this._probability = this.probabilityArrays[i - 1].probavility
				return this._probability
			}
		}
		this._probability = this.probabilityArrays[this.probabilityArrays.length - 1].probavility
		return this._probability
	}

	// 抽卡一次的结果,传入true则必定出金
	getOnceResult(isGolden = false) : resultType {
		let randomNum = Math.random()
		const probability = this.probabilityUP
		this.currentGachasNumber++
		let result = {} as resultType
		const getResult = (level : levelType) => {
			result = {
				...getRandomElement(this.gods[level]),
				currentGachasNumber: this.currentGachasNumber
			}
		}
		if (isGolden) randomNum = 0
		// 首先判断是否为选定式神
		if (!this.isSummonedDesignated
			&& this.summonedDesignated
			&& (randomNum <= probability * 0.0125)) {
			// 获取概率
			if (this.probability >= Math.random()) {
				this.isSummonedDesignated = true
				// 抽到就放回卡池
				this.gods[this.summonedDesignated.level].push(this.summonedDesignated)
				result = {
					...this.summonedDesignated,
					isCurrent: true,
					currentGachasNumber: this.currentGachasNumber
				}
				this.result.push(result)
				return result
			}
		}
		// 再去计算概率
		if (randomNum <= probability * 0.0025) getResult('SP')
		else if (randomNum <= probability * 0.0125) getResult('SSR')
		else if (randomNum <= probability * 0.2125) getResult('SR')
		else getResult('R')
		this.result.push(result)
		return result
	}

	// 进行多次抽取
	getSomeResult(times : number) : resultType[] {
		const arr : resultType[] = []
		for (let i = 1; i <= times; i++) {
			arr.push(this.getOnceResult())
		}
		return arr
	}




	get probabilityArrays() {
		return this._probabilityArrays
	}
	set probabilityArrays(value) {
		// 对概率数组进行验证
		for (let i = 0; i < value.length; i++) {
			if (value[i].value < 0) {
				console.error('抽数不能小于0')
				return
			}
			if (value[i].probavility < 0) {
				console.error('概率不能小于0')
				return
			} if (value[i].probavility > 1) {
				console.error('概率不能大于1')
				return
			}
			if (i === 0) continue
			if (value[i].value <= value[i - 1].value) {
				console.error('抽数必须递增')
				return
			}
			if (value[i].probavility <= value[i - 1].probavility) {
				console.error('概率必须递增')
				return
			}
		}
		this._probabilityArrays = value
	}
}