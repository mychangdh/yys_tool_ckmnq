export type probabilityType = {
	value : number,
	probavility : number
}
export type levelType = 'N' | 'R' | 'SR' | 'SSR' | 'SP'
export type resultType = {
	level : levelType,
	// 是否为当期式神
	isCurrent ?: boolean,
	currentGachasNumber : number
}
// 抽卡类
export class Gacha {
	// 概率up
	probabilityUP : 2.5 | 1 = 1
	// 当前抽数
	currentGachasNumber = 0
	// 当期式神的定向概率数组
	private _probabilityArrays : probabilityType[] = []
	// 是否召唤出了当期式神
	isSummonedDesignated = false
	// 构造函数，传入概率数组
	constructor(probabilityArrays : probabilityType[]) {
		this.probabilityArrays = probabilityArrays
	}
	// 获得当期式神的定向概率
	getProbability(currentGachasNumber : number = this.currentGachasNumber) {
		for (let i = 1; i < this.probabilityArrays.length; i++) {
			if (this.probabilityArrays[i].value >= currentGachasNumber) {
				return this.probabilityArrays[i - 1].probavility
			}
		}
		return this.probabilityArrays[this.probabilityArrays.length - 1].probavility
	}




	// 抽卡一次的结果
	getOnceResult() : resultType {
		const randomNum = Math.random()
		const probability = this.probabilityUP
		this.currentGachasNumber++
		// 返回的默认结果
		const result : resultType = {
			level: 'R',
			isCurrent: false,
			currentGachasNumber: this.currentGachasNumber
		}
		// 首先判断是否为选定式神
		if (!this.isSummonedDesignated && (randomNum <= probability * 0.0125)) {
			const thisProbability = this.getProbability()
			if (thisProbability >= Math.random()) {
				this.isSummonedDesignated = true
				result.isCurrent = true
				result.level = 'SSR'
				return result
			}
		}
		// 再去计算概率
		if (randomNum <= probability * 0.0025) result.level = 'SP'
		else if (randomNum <= probability * 0.0125) result.level = 'SSR'
		else if (randomNum <= probability * 0.2125) result.level = 'SR'
		return result

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