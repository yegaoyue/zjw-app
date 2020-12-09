const baseUrl = "http://172.16.9.200/collection/"; //200
// const baseUrl = "http://172.16.8.38:8088/collection/"; //马奎
// const baseUrl = "http://172.16.8.31:8088/collection/"; //顶重阳
const uploadUrl = "http://172.16.9.200:8055/"; //图片查看
// 定义基础请求路径(后端服务器地址)
const baseRequest = (opts, data) => {
	uni.showLoading({
		title: '加载中...',
		mask: true
	});

	// 获取token
	var toKen
	uni.getStorage({
		key: 'toKen',
		success: function(res) {
			toKen = res.data
		},
		fail() {
			uni.reLaunch({
				url: '/'
			})
		}
	});


	let baseDefaultOpts = {
		url: baseUrl + opts.url,
		// 请求接口地址
		data: data,
		// 传入请求参数
		method: opts.method,
		timeouut: 2000,

		// 配置请求类型
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			'toKen': toKen,
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			'toKen': toKen,
		},
		// 配置请求头
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(baseDefaultOpts).then(
			(res) => {
				uni.hideLoading(); //隐藏 loading 提示框。
				uni.stopPullDownRefresh(); //停止当前页面下拉刷新。

				if (res[1].data.code === 0) {
					// 请求成功
					// uni.showToast({
					// 	title: res[1].data.msg,
					// 	duration: 2000,
					// 	icon: 'none',
					// });

				} else if (res[1].data.code === 500) {
					// 系统错误
					uni.showToast({
						title: res[1].data.msg,
						duration: 2000,
						icon: 'none',
					});
				} else if (res[1].data.code === 5001) {
					// 账号或密码不正确
					uni.showToast({
						title: res[1].data.msg,
						duration: 2000,
						icon: 'none',
					});
				} else if (res[1].data.code === 403) {
					// touken过期
					uni.showToast({
						title: res[1].data.msg,
						duration: 2000,
						icon: 'none',
					});
					uni.reLaunch({
						url: '/'
					})
				} else if (res[1].data.code === 508) {
					// 旧密码错误
					uni.showToast({
						title: res[1].data.msg,
						duration: 2000,
						icon: 'none',
					});
				}
				resolve(res)
			}

		).catch(
			(response) => {
				uni.showToast({
					title: '请求出错啦!',
					duration: 2000,
					icon: 'none',
				});
				reject(response)
			}
		)
	})

	return promise
};

// 将对象导出外部引入使用
export default {
	baseUrl,
	uploadUrl,
	baseRequest,
}
