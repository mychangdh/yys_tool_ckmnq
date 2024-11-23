import type { cbgYuhunType } from '@/Gacha/cbg/type'
export function getSorces(arr : {
	score : number,
	data : cbgYuhunType
}[]) {
	if (!arr) return 0
	let sum = 0
	arr.forEach(item => {
		sum += item.score
	})
	return sum
}