//生成从minNum到maxNum的随机数
export function randomNum(n : number, m : number) {
	let result = Math.random() * (m + 1 - n) + n;
	while (result > m) {
		result = Math.random() * (m + 1 - n) + n;
	}
	return result;
}
