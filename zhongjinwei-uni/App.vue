<script>
	export default {
		onLaunch: function() {
			var _this = this;
			//#ifdef APP-PLUS  
			uni.request({
				url: `http://172.16.8.18:8089/testApp/hello`,
				method: 'POST',
				success: res => {
					if (res.data.code == 200) {
						plus.runtime.getProperty(plus.runtime.appid, function(inf) {
							if (inf.version != res.data.result.version) {
								uni.showModal({
									title: `发现新版本${res.data.result.version},当前版本${inf.version}`,
									content: "确认下载更新",
									success: (fage) => {
										if (fage.confirm) { //当用户确定更新，执行更新
											let url = res.data.result.url
											_this.updatedVersion(url)
										} else if (fage.cancel) { //用户取消，重启
											plus.runtime.restart();
										}
									}
								})
							}
						});
					}
				},
			})
			//#endif  
		},

		onShow: function() {
			// console.log('App Show')
		},

		onHide: function() {
			// console.log('App Hide')
		},

		methods: {
			updatedVersion(url) {
				uni.showLoading({
					title: '更新中……',
					mask: true
				})

				uni.downloadFile({ //执行下载
					url: url, //下载地址
					success: downloadResult => { //下载成功
						uni.hideLoading();
						if (downloadResult.statusCode == 200) {
							uni.showModal({
								title: '',
								content: '更新成功，确定现在重启吗？',
								confirmText: '重启',
								confirmColor: '#EE8F57',
								success: function(res) {
									if (res.confirm == true) {
										plus.runtime.install( //安装
											downloadResult.tempFilePath, {
												force: true
											},
											function(res) {
												utils.showToast('更新成功，重启中');
												plus.runtime.restart();
											}
										);
									}
								}
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
	@import url("./static/fonts/iconfont.css");

	/*每个页面公共css */
	page {
		background-color: #f7f7f7;
	}

	.content {
		padding-bottom: 100rpx;
	}
</style>
