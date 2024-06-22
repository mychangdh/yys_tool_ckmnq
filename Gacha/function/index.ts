import html2canvas from "html2canvas";

export function getRandomElement<T>(arr : T[]) : T {
	if (!arr.length) console.error('传入数组不得为空')
	const randomNum = Math.floor(Math.random() * arr.length)
	return arr[randomNum]
}
export function drwDOM(dom : HTMLElement) {
	html2canvas(dom, {
		useCORS: true,
		height: dom.offsetHeight,
		width: dom.offsetWidth,
		allowTaint: true,  //开启跨域
		scrollY: 0,
		scrollX: 0
	}).then(async (canvas) => {
		uni.showLoading({
			title:'图片生成成功，正在下载。。'
			})
		let oImg = new Image();
		oImg.src = canvas.toDataURL();  // 导出图片
		let a = document.createElement("a");
		a.download = '萌新可抽取式神养成推荐';
		a.href = oImg.src;
		a.click();
		uni.hideLoading()
	})

}