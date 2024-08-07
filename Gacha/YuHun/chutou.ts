import { getRandomElement } from '@/Gacha/function'
import Yuhun from './'
import SubAttribute, { attributeType } from './Attribute'
type configType = {
	yuhun_id : number
	name : string
	location : 1 | 2 | 3 | 4 | 5 | 6,
	// 指定主属性
	MainAttributeName ?: attributeType
	// 副属性条数
	subAttributeNum ?: 2 | 3 | 4
	// 是否必定满条
	isMaxAtt ?: boolean
	// 是否必定为二号位
	isTwo ?: boolean
	// 是否必定为速度
	isSpeed ?: boolean
	// 副属性是否带有为速度
	haveSpeed ?: boolean
}
// 出头模式
export default class Chutou extends Yuhun {
	// 是否必定满条
	isMaxAtt ?: boolean
	// 是否必定为二号位
	isTwo ?: boolean
	// 是否必定为速度
	isSpeed ?: boolean
	// 副属性是否带有为速度
	haveSpeed ?: boolean
	constructor(config : configType) {
		super(config)
	}
	init(config : configType) {
		if (config.isTwo) this.location = 2
		if (config .haveSpeed) this.SubAttributeList.push(new SubAttribute('speed'))
		this.getSubAttributes(config.isMaxAtt ? 4 : getRandomElement([2, 3, 4]))
		if (config .isSpeed) this.MainAttribute = 'speed'
		else this.getMainAttribute()
		this.level = 0
	}
}