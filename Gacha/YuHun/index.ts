import SubAttribute, { allAttributeName } from './Attribute'
import { attributeNameType, attributeType } from './Attribute'
import { getRandomElement } from '@/Gacha/function'
import { nomralAttributes, attackAttributeValues, defenseAttributeValues, functionalAttributes } from './attributesClassify'
import { log } from 'console'
type configType = {
	yuhun_id : number 
	name : string
	location : 1 | 2 | 3 | 4 | 5 | 6,
	// 指定主属性
	MainAttributeName ?: attributeType
	// 副属性条数
	subAttributeNum ?: 2 | 3 | 4
}
export default class YuHun {
	yuhun_id:number
	readonly name : string
	_level : 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | undefined
	/** 位置  */
	private _location : 1 | 2 | 3 | 4 | 5 | 6 = 1
	/** 主属性  */
	private _MainAttribute : attributeType | undefined
	/** 主属性名称  */
	MainAttributeName : attributeNameType = '攻击'
	/** 主属性初始数值  */
	MainInitAttributeValue : number = 0
	/** 主属性数值  */
	MainAttributeValue : number = 0
	/** 用来展示的主属性数值  */
	showMainAttributeValue : string = ''
	/** 主属性加成  */
	MainAttributeAdd : number = 0

	SubAttributeList : SubAttribute[] = []
	constructor(config : configType) {
		this.name = config.name
		this.location = config.location
		this.yuhun_id = config.yuhun_id
		// 指定主属性
		if (this.MainAttribute) this.MainAttribute = config.MainAttributeName
		else this.getMainAttribute()
		this.getSubAttributes()
		this.level = 0
	}
	// 获得主属性
	getMainAttribute() {
		const res = Math.random() < 0.9
		const noralRes = getRandomElement(nomralAttributes)
		switch (this.location) {
			case 1:
				this.MainAttribute = 'attack'
				break
			case 2:
				this.MainAttribute = res ? noralRes : 'speed'
				break
			case 3:
				this.MainAttribute = 'defense'
				break
			case 4:
				this.MainAttribute = res ? noralRes : getRandomElement(['effectHits', 'effectResistant'])
				break
			case 5:
				this.MainAttribute = 'health'
				break
			case 6:
				this.MainAttribute = res ? noralRes : getRandomElement(['critical', 'criticalDamage'])
				break
		}
	}
	getSubAttributes(num ?: 2 | 3 | 4) {
		let times = num || getRandomElement([2, 3, 4])
		while (this.SubAttributeList.length < times) {
			const attProbability = Math.random()
			let probabilityArr : attributeType[] = []
			if (attProbability <= 0.36) probabilityArr = attackAttributeValues
			else if (attProbability <= 0.72) probabilityArr = defenseAttributeValues
			else probabilityArr = functionalAttributes
			const randomAtt = getRandomElement(probabilityArr)
			if (this.SubAttributeList.some(item => item.name === randomAtt)) continue
			this.SubAttributeList.push(new SubAttribute(randomAtt))
		}

	}
	get location() {
		return this._location
	}
	set location(value) {
		this._location = value
	}

	get MainAttribute() {
		return this._MainAttribute
	}
	set MainAttribute(value) {
		if (!value) return
		this.MainAttributeName = allAttributeName[value]
		switch (value) {
			case 'attack':
				this.MainInitAttributeValue = 81
				this.MainAttributeAdd = 27
				break
			case 'health':
				this.MainInitAttributeValue = 342
				this.MainAttributeAdd = 114
				break
			case 'defense':
				this.MainInitAttributeValue = 14
				this.MainAttributeAdd = 6
				break
			case 'speed':
				this.MainInitAttributeValue = 12
				this.MainAttributeAdd = 3
				break
			case 'criticalDamage':
				this.MainInitAttributeValue = 14
				this.MainAttributeAdd = 5
				break
			default:
				this.MainInitAttributeValue = 10
				this.MainAttributeAdd = 3
		}

		this._MainAttribute = value
	}
	get level() {
		return this._level
	}
	set level(level) {
		if (level === undefined) return
		if (this.level && (this.level >= level)) return
		this.MainAttributeValue = this.MainInitAttributeValue + this.MainAttributeAdd * level
		this.showMainAttributeValue = String(this.MainAttributeValue) + (this.MainAttributeName.includes('加成') ? '%' : '')
		this._level = level
	}
}