import YuHun from "Gacha/YuHun";
import SubAttribute, { attributeType } from "Gacha/YuHun/Attribute";

//生成从minNum到maxNum的随机数
export function randomNum(n : number, m : number) {
	let result = Math.random() * (m + 1 - n) + n;
	while (result > m) {
		result = Math.random() * (m + 1 - n) + n;
	}
	return result;
}
export function haveProbability(str : attributeType) {
	switch (str) {
		case "attackAdditionVal":
		case "maxHpAdditionVal":
		case "defenseAdditionVal":
		case "speedAdditionVal":
			return ''
		default:
			return '%'
	}
}
export function judgmentHead(yuhun : YuHun) {
	if (yuhun.MainAttribute !== 'speedAdditionVal') return false
	const num = yuhun.SubAttributeList.filter(item => {
		return item.name === 'speedAdditionVal'
	})
	return num.length === 6
}