import { randomNum } from '@/function'
export const allAttributeName = {
	attackAdditionVal: '攻击',
	attackAdditionRate: '攻击加成',
	maxHpAdditionVal: '生命',
	maxHpAdditionRate: '生命加成',
	defenseAdditionVal: '防御',
	defenseAdditionRate: '防御加成',
	speedAdditionVal: '速度',
	critRateAdditionVal: '暴击',
	critPowerAdditionVal: '暴击伤害',
	debuffEnhance: '效果命中',
	debuffResist: '效果抵抗'
} as const
export type attributeType = keyof typeof allAttributeName
export type attributeNameType = typeof allAttributeName[attributeType]

// 副属性类
export default class SubAttribute {
	name : attributeType
	nickname : attributeNameType
	value : number = 0
	// 用来展示用的数值，包含百分比，用string类型
	showValue : string = ''
	constructor(name : attributeType) {
		this.name = name
		this.nickname = allAttributeName[name]
		this.getSubAttributes()
	}

	//得到副属性,副属性的值严格按照属性表随机生成
	getSubAttributes() {
		switch (this.name) {
			case "attackAdditionVal":
				this.value = randomNum(21.6, 27)
				this.showValue = String(this.value.toFixed(2))
				break
			case "attackAdditionRate":
			case "maxHpAdditionRate":
			case "defenseAdditionRate":
			case "critRateAdditionVal":
				this.value = randomNum(2.4, 3)
				this.showValue = String(this.value.toFixed(2)) + "%"
				break
			case "maxHpAdditionVal":
				this.value = randomNum(91.2, 114)
				this.showValue = String(this.value.toFixed(2))
				break
			case "defenseAdditionVal":
				this.value = randomNum(4, 5)
				this.showValue = String(this.value.toFixed(2))
				break
			case "speedAdditionVal":
				this.value = randomNum(2.4, 3)
				this.showValue = String(this.value.toFixed(2))
				break
			default:
				this.value = randomNum(3.2, 4)
				this.showValue = String(this.value.toFixed(2)) + "%"
				break
		}
	}
}