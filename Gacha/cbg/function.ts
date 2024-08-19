import { allAttributeName } from '@/Gacha/YuHun/Attribute'
import { cbgYuhunType } from './type'
// 攻击类型御魂
const attackTypeList = [300083, 300086, 300048, 300030, 300029, 300031, 300026, 300036, 300022, 300007, 300075, 300074] as const
type keyType = typeof attackTypeList[number]
const attackAtts = ['critRateAdditionVal', 'critPowerAdditionVal', 'attackAdditionRate'] as const
function isRightMainAtt(yuhun : cbgYuhunType) {
	const id = yuhun.data.mainAtt.id
	if (yuhun.pos === 6) {
		return ['critRateAdditionVal', 'critPowerAdditionVal'].includes(id)
	}
	if ([2, 4].includes(yuhun.pos)) return id === 'attackAdditionRate'
	return true
}
export function getAttackHidYuhun(yuhuns : cbgYuhunType[]) {
	const result = {} as {
		[key in keyType]: {
			score : number,
			data : cbgYuhunType
		}[]
	}
	// 筛选攻击类御魂
	const attackYuhuns = yuhuns.filter(item => {
		return attackTypeList.includes(item.yuhun_id as any)
	})
	attackYuhuns.forEach(item => {
		if (!isRightMainAtt(item)) return
		if (!attackTypeList.includes(item.yuhun_id as any)) return
		const subAtts = item.data.subAtts.atts
		const effectiveAtts = subAtts.filter(item => attackAtts.includes(item as any))
		if (!result[item.yuhun_id as keyType]) result[item.yuhun_id as keyType] = []
		result[item.yuhun_id as keyType].push({
			score: effectiveAtts.length,
			data: item
		})
	})
	Object.keys(result).forEach((key) => {
		result[parseInt(key) as keyof typeof result].sort((a, b) => {
			return b.score - a.score
		})
	})
	return result
}
// 获得某个御魂的某个属性值
export function findAttValue(item : cbgYuhunType, att : keyof typeof allAttributeName) {
	const findData = item.data.subAtts.data.find(item => item.id === att)
	return {
		value: findData?.value || 0,
		showValue: findData?.showValue || 0
	}
}