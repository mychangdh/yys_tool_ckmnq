export type probabilityType = {
	value : number,
	probavility : number

}
// 60保底的出货概率
export const Guarantees60Data : { [key in 'SSR' | 'SP']: probabilityType[] } = {
	SSR: [
		{
			value: 0,
			probavility: 0.15
		}, {
			value: 60,
			probavility: 0.17
		}, {
			value: 120,
			probavility: 0.19
		}, {
			value: 180,
			probavility: 0.25
		}, {
			value: 240,
			probavility: 0.35
		}, {
			value: 300,
			probavility: 0.45
		}, {
			value: 360,
			probavility: 0.60
		}, {
			value: 420,
			probavility: 0.8
		}, {
			value: 450,
			probavility: 1
		},
	],
	SP: [
		{
			value: 0,
			probavility: 0.12
		}, {
			value: 60,
			probavility: 0.14
		}, {
			value: 120,
			probavility: 0.16
		}, {
			value: 180,
			probavility: 0.18
		}, {
			value: 240,
			probavility: 0.25
		}, {
			value: 300,
			probavility: 0.4
		}, {
			value: 360,
			probavility: 0.55
		}, {
			value: 420,
			probavility: 0.8
		}, {
			value: 450,
			probavility: 1
		},
	]
}








