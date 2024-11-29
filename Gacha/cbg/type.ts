import { allAttributeName } from '../YuHun/attribute'
export interface attType {
	id : keyof typeof allAttributeName,
	name : string,
	showValue : string,
	value : number
}
export interface cbgYuhunType {
	level : number,
	name : string,
	pos : 1 | 2 | 3 | 4 | 5 | 6,
	qua : number,
	yuhun_id : number,
	data : {
		mainAtt : attType,
		subAtts : {
			data : attType[],
			atts : (keyof typeof allAttributeName)[]
		},
		single_attr ?: attType,
	}

}
export type accountDetailsType = {
	resource : {
		[key in string]: {
			id : string,
			name : string,
			value : number | string
		}
	}
	yuhunList : yuhunType[]
}