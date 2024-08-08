import SubAttribute, { allAttributeName } from './Attribute'
import { attributeNameType, attributeType } from './Attribute'
import { getRandomElement } from '@/Gacha/function'

import { nomralAttributes, attackAttributeValues, defenseAttributeValues, functionalAttributes } from './attributesClassify'
type configType = {
	yuhun_id : number
	name : string
	location : 1 | 2 | 3 | 4 | 5 | 6,
	// 副属性条数
	subAttributeNum ?: 2 | 3 | 4
}
export default class YuHun {
	yuhun_id : number
	readonly name : string
	_level : number | undefined
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
	// 副属性列表
	SubAttributeList : SubAttribute[] = []
	// 用来展示的副属性列表
	showSubAttributeList : SubAttribute[] = []
	constructor(config : configType) {
		this.name = config.name
		this.location = config.location
		this.yuhun_id = config.yuhun_id
		this.init(config)
	}
	init(config : any) {
		this.getMainAttribute()
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
	// 属性数量
	getSubAttributes(num ?: number) {
		let times = num ? num : getRandomElement([2, 3, 4])
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
		this.aggrandizement(level)
		this._level = Math.min(level, 15)
	}
	// 强化御魂后的返回数据
	getYuhunData() {
		return {
			MainAttribute: {
				name: this.MainAttributeName,
				value: this.showMainAttributeValue
			},
			SubAttribute: (() => {
				return this.showSubAttributeList.map(item => {
					return {
						name: item.nickname,
						value: item.showValue,
						haveChange: false
					}
				})
			})()
		}
	}
	aggrandizementLevel(level : number) {
		// 记录强化前的数据
		const oldData = this.getYuhunData()
		this.level = level
		const newData = this.getYuhunData()
		newData.SubAttribute = newData.SubAttribute.map(item => {
			const res = oldData.SubAttribute.find(ite => ite.name === item.name)
			item.haveChange = !res || (parseFloat(res.value) <parseFloat(item.value))
			return item
		})
		return {
			oldData,
			newData
		}
	}
	aggrandizement(level : number) {

		let temporaryLevel = this.level || 0
		this.MainAttributeValue = this.MainInitAttributeValue + this.MainAttributeAdd * level
		this.showMainAttributeValue = String(this.MainAttributeValue) + (this.MainAttributeName.includes('加成') ? '%' : '')
		while (temporaryLevel < level) {
			temporaryLevel++
			if (temporaryLevel % 3 === 0) {
				// 不满条
				if (this.SubAttributeList.length < 4) {
					const randAtt = getRandomElement(Object.keys(allAttributeName)) as keyof typeof allAttributeName
					const att = new SubAttribute(randAtt)
					const sameAtt = this.SubAttributeList.find(item => item.name === randAtt)
					if (sameAtt) {
						sameAtt.value += att.value
						const haveP = sameAtt.showValue.includes('%') ? '%' : ''
						sameAtt.showValue = sameAtt.value.toFixed(2) + haveP
					}
					else this.SubAttributeList.push(att)
				}
				else {
					const att = getRandomElement(this.SubAttributeList).name
					this.SubAttributeList.push(new SubAttribute(att))
				}

			}
		}
		this.showSubAttributeList = []
		this.SubAttributeList.forEach(item => {
			const sameAtt = this.showSubAttributeList.find(ite => ite.name === item.name)
			if (sameAtt) {
				sameAtt.value += item.value
				const haveP = sameAtt.showValue.includes('%') ? '%' : ''
				sameAtt.showValue = sameAtt.value.toFixed(2) + haveP
			}
			else this.showSubAttributeList.push(Object.assign({}, item))
		})

	}
}