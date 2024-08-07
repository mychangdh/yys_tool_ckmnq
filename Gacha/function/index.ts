import html2canvas from "html2canvas";

export function getRandomElement<T>(arr : T[]) : T {
	if (!arr.length) console.error('传入数组不得为空')
	const randomNum = Math.floor(Math.random() * arr.length)
	return arr[randomNum]
}
// 随机从数组中取几个元素
export function getRandomElements<T>(arr : T[], count : number) : T[] {
	var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;  //只是声明变量的方式, 也可以分开写
	while (i-- > min) {
		//console.log(i);
		index = Math.floor((i + 1) * Math.random()); //这里的+1 是因为上面i--的操作  所以要加回来
		temp = shuffled[index];  //即值交换
		shuffled[index] = shuffled[i];
		shuffled[i] = temp;
		//console.log(shuffled);
	}
	return shuffled.slice(min);
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
			title: '图片生成成功，正在下载。。'
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