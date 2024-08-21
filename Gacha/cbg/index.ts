
import { accountDetailsType, cbgYuhunType, cbgScoreType } from './type'
import { getAttackHidYuhun, findAttValue, getBossHidYuhun } from './function'
export class AccountDetails {
	// 通过位置区分御魂
	yuhunsByPos : {
		[key in number]: cbgYuhunType[]
	} = {}
	// 全部御魂
	yuhuns : cbgYuhunType[]
	// 头
	heads : cbgYuhunType[] = []
	// 非头满速
	not2FullSpeed : cbgYuhunType[] = []
	attackHidYuhun : cbgScoreType = {}
	bossHidYuhun : cbgScoreType = {}
	constructor(data : accountDetailsType) {
		this.yuhuns = data.yuhunList
		data.yuhunList.forEach(item => {
			if (!this.yuhunsByPos[item.pos]) this.yuhunsByPos[item.pos] = []
			this.yuhunsByPos[item.pos].push(item)
		})
		this.heads = this.getHead()
		this.not2FullSpeed = this.getNot2FullSpeed()
		this.attackHidYuhun = this.getHidAttYuhun()
		this.bossHidYuhun = this.getHidBossYuhun()
	}
	// 头
	getHead() {
		return this.yuhunsByPos[2].filter(item => {
			if (item.data.mainAtt.id !== 'speedAdditionVal') return false
			return item.data.subAtts.atts.filter(item => item === 'speedAdditionVal').length === 6
		}).sort((a, b) => {
			return findAttValue(b, 'speedAdditionVal').value
				- findAttValue(a, 'speedAdditionVal').value
		})
	}
	// 非头的满速
	getNot2FullSpeed() {
		const arr : cbgYuhunType[] = []
		for (let i = 1; i <= 6; i++) {
			if (i === 2) continue
			this.yuhunsByPos[i].forEach(item => {
				const speedList = item.data.subAtts.atts.filter(ite => ite === 'speedAdditionVal')
				if (speedList.length === 6) arr.push(item)
			})

		}
		// 从大到小排序
		arr.sort((a, b) => {
			return findAttValue(b, 'speedAdditionVal').value
				- findAttValue(a, 'speedAdditionVal').value
		})
		return arr
	}
	getHidAttYuhun() {
		return getAttackHidYuhun(this.yuhuns)
	}
	getHidBossYuhun() {
		return getBossHidYuhun(this.yuhuns)
	}
}