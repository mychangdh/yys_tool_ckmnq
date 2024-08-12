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
	// 是否为非玩家全图玩家
	_isNotFull : boolean = false
	// 全部可抽取式神
	gods : myGodsType
	// 复制一份，也是全部式神但是只读
	readonly baseGods : myGodsType
	// 概率up
	probabilityUP : 2.5 | 1 = 1
	// 卡池分界式神编号
	readonly demarcationGodSort = 144
	// 当前抽数
	currentGachasNumber = 0
	// 当期式神的定向概率数组
	private _probabilityArrays : probabilityType[] = []
	private _probability : number = 0
	// 当期式神是否已经出了，没有选择当期式神的话则为true不进行当期式神的计算
	isSummonedDesignated : boolean
	// 当期式神，不传就没有定向计算
	summonedDesignated : godsType | undefined
	// 抽卡结果
	result : resultType[] = []
	_cardType : '旭华召唤' | '瑶归召唤' | '全部卡池' = '全部卡池'
	// 构造函数，传入概率数组
	constructor(gods : myGodsType, probabilityArrays ?: probabilityType[], summonedDesignated ?: godsType) {
		if (probabilityArrays) this.probabilityArrays = probabilityArrays
		if (summonedDesignated) this.summonedDesignated = summonedDesignated
		this.gods = gods
		this.baseGods = JSON.parse(JSON.stringify(gods))
		this.isSummonedDesignated = !summonedDesignated
	}
	// 展示概率和实际概率，因为展示的概率要比实际的多1抽
	getProbability(isShow = false) {
		if (this.isSummonedDesignated) return this._probability
		for (let i = 0; i < this.probabilityArrays.length - 1; i++) {
			if (this.probabilityArrays[i + 1].value >= (this.currentGachasNumber + +isShow)) {
				return this.probabilityArrays[i].probavility
			}
		}
		return this.probabilityArrays[this.probabilityArrays.length - 1].probavility
	}
	// 获得当期式神真正的的定向概率
	get probability() {
		this._probability = this.getProbability()
		return this._probability
	}
	// 只是为了展示的概率
	get showProbability() {
		return this.getProbability(true)
	}
	// 抽卡一次的结果,传入true则必定出金
	getOnceResult(isGolden = false,goldenGods?:godsType[]) : resultType {
		let randomNum = Math.random()
		// 获取概率up
		this.currentGachasNumber++
		let result = {} as resultType
		const getResult = (level : levelType) => {
			result = {
				...getRandomElement(this.gods[level]),
				currentGachasNumber: this.currentGachasNumber
			}
		}
		if (isGolden) randomNum = Math.random() * 0.0125 * this.probabilityUP
		// 首先判断是否为选定式神
		if (!this.isSummonedDesignated
			&& this.summonedDesignated
			&& (randomNum <= this.probabilityUP * 0.0125)) {
			// 确定是当期式神
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
		if (randomNum <= this.probabilityUP * 0.0025) getResult('SP')
		else if (randomNum <= this.probabilityUP * 0.0125) getResult('SSR')
		else if (randomNum <= this.probabilityUP * 0.2125) getResult('SR')
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

	get isNotFull() {
		return this._isNotFull
	}
	set isNotFull(value) {
		this._isNotFull = value
	}
	// 卡池类型
	get cardType() {
		return this._cardType
	}
	set cardType(value) {
		const { SP, SSR } = this.baseGods
		switch (value) {
			case "全部卡池":
				this.gods.SP = SP
				this.gods.SSR = SSR
				break
			case "旭华召唤":
				this.gods.SP = SP.filter(item => item.sort > this.demarcationGodSort)
				this.gods.SSR = SSR.filter(item => item.sort > this.demarcationGodSort)
				break
			case "瑶归召唤":
				this.gods.SP = SP.filter(item => item.sort <= this.demarcationGodSort)
				this.gods.SSR = SSR.filter(item => item.sort <= this.demarcationGodSort)
		}
		if (!this.isSummonedDesignated && this.summonedDesignated) {
			// 分卡池后如果还未召唤出当期式神，就把当期式神踢了，因为他的出现是用定向up去计算的
			const level = this.summonedDesignated.level
			this.gods[level] = this.baseGods[level].filter(item => item.shishen_id !== this.summonedDesignated?.shishen_id)
		}
		this._cardType = value
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