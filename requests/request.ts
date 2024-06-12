
type configType = {
	url : string,
	data ?: any,
	header ?: any,
	method ?: 'GET' | 'POST'
}
const requests = (config : configType) => {
	return new Promise((resolve, reject) => {

		uni.request({
			// #ifndef H5
			url: 'https://cdhtsl8.cn:8889/ckmnqapi' + config.url, 
			// #endif
			// #ifdef  H5
			url: '/ckmnqapi' + config.url, 
			// #endif
			data: config.data,
			method: config.method || 'GET',
			header: {
				...config.header || {}
			},
			timeout:100000,
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				console.log(err,2435);
				reject(err)
			}
		});
	})
}
export default requests