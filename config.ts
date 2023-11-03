export const COLOR = {
	SSR: '#db5f13,#e0941c,#f0e321',
	SP: '#f8313b,#fd7f8e,#f8aaac',
	SR: '#9213c0,#cc48dd',
	R: '#1360aa,#38adf8'
} as const
//一次刷新多少抽，太小的话页面更新速度慢，太大的话页面会卡顿
export let STEP = 4173
export const STEPDESC = '一次刷新多少抽，太小的话页面更新速度慢，太大的话页面会卡顿'