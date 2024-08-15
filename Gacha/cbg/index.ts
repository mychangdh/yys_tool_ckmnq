import { allAttributeName } from '../YuHun/Attribute'
interface attType {
	id : keyof typeof allAttributeName,
	name : string,
	showValue : string,
	value : number
}
interface yuhunType {
	level : number,
	name : string,
	pos : 1 | 2 | 3 | 4 | 5 | 6,
	qua : number,
	yuhun_id : number,
	data : {
		mainAtt : attType,
		subAtts : attType[],
		single_attr ?: attType,
	}

}
interface accountDetailsType {
	resource : {
		[key in string]: {
			id : string,
			name : string,
			value : number | string
		}
	}
	yuhunList : yuhunType[]
}
export class AccountDetails {
	yuhuns : {
		[key in 1 | 2 | 3 | 4 | 5 | 6]: yuhunType[]
	} = {
		1: [],
		2: [],
		3: [],
		4: [],
		5: [],
		6: []
	}
	constructor(data : accountDetailsType) {
		data.yuhunList.forEach(item => {
			this.yuhuns[item.pos].push(item)
		})
	}
}