import { attributeType } from "Gacha/YuHun/Attribute";

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
		case "attack":
		case "health":
		case "defense":
		case "speed":
			return ''
		default:
			return '%'
	}
}