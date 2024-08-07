import { randomNum } from '@/function'
export const allAttributeName = {
	attack: '攻击',
	attackPercentage: '攻击加成',
	health: '生命',
	healthPercentage: '生命加成',
	defense: '防御',
	defensePercentage: '防御加成',
	speed: '速度',
	critical: '暴击',
	criticalDamage: '暴击伤害',
	effectHits: '效果命中',
	effectResistant: '效果抵抗'
} as const
export type attributeType = keyof typeof allAttributeName
export type attributeNameType = typeof allAttributeName[attributeType]

export default class SubAttribute {
	name : attributeType
	nickname : attributeNameType
	value : number = 0
	showValue : string = ''
	constructor(name : attributeType) {
		this.name = name
		this.nickname = allAttributeName[name]
		this.getSubAttributes()
	}

	//得到副属性
	getSubAttributes() {
		console.log(this.name, 35436);
		switch (this.name) {
			case "attack":
				this.value = randomNum(21.6, 27)
				this.showValue = String(this.value.toFixed(2))
				break
			case "attackPercentage":
			case "healthPercentage":
			case "defensePercentage":
			case "critical":
				this.value = randomNum(2.4, 3)
				this.showValue = String(this.value.toFixed(2)) + "%"
				break
			case "health":
				this.value = randomNum(91.2, 114)
				this.showValue = String(this.value.toFixed(2))
				break
			case "defense":
				this.value = randomNum(4, 5)
				this.showValue = String(this.value.toFixed(2))
				break
			case "speed":
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