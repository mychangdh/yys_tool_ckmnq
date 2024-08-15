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
		subAtts : {
			data : attType[],
			atts : (keyof typeof allAttributeName)[]
		},
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
		[key in number]: yuhunType[]
	} = {}
	heads : yuhunType[] = []
	not2FullSpeed : yuhunType[] = []
	constructor(data : accountDetailsType) {
		data.yuhunList.forEach(item => {
			if (!this.yuhuns[item.pos]) this.yuhuns[item.pos] = []
			this.yuhuns[item.pos].push(item)
		})
		this.heads = this.getHead()
		this.not2FullSpeed = this.getNot2FullSpeed()
	}
	getHead() {
		return this.yuhuns[2].filter(item => {
			if (item.data.mainAtt.id !== 'speedAdditionVal') return false
			return item.data.subAtts.atts.filter(item => item === 'speedAdditionVal').length === 6
		})
	}
	getNot2FullSpeed() {
		const arr : yuhunType[] = []
		for (let i = 1; i <= 6; i++) {
			if (i === 2) continue
			this.yuhuns[i].forEach(item => {
				const speedList = item.data.subAtts.atts.filter(ite => ite === 'speedAdditionVal')
				if (speedList.length === 6) arr.push(item)
			})

		}
		return arr
	}
}