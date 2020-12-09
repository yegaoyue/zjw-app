<template>
	<view>
		<view class="login_box">
			<view class="title">
				中呈卫
			</view>

			<view class="image">
				<image src="../../static/images/3.png"></image>
			</view>
			<view class="input_box">
				<input v-model="username" class="iconfont icon-denglu-yonghuming" type="text" placeholder="请输入账号" />
				<view class="password_Input">
					<input v-model="password" class="iconfont  icon-denglu-mima" :password="fage ? false : true" type="text"
					 placeholder="请输入密码">
					<text v-if="fage" @click="fage = !fage" id="icon" class="iconfont icon-denglu-mimakejian" />
					<text v-if="!fage" @click="fage = !fage" id="icon" class="iconfont icon-denglu-mimabukejian" />
				</view>

				</input>
				<button type="default" @click="SignIn()">Sign in</button>
			</view>
			<view class="bottom">
			</view>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl,
		getAppMenu,
		loginApp
	} from '@/utils/interface.js';
	export default {
		data() {
			return {
				fage: false,
				username: 'xindao02',
				password: '123456',

				list: [
					// 委托机构
					// {
					// 	pagePath: "/pages/entrustedAgency/upcoming/upcoming",
					// 	text: "待办",
					// 	fontIcon: "iconfont icon-pending"
					// },
					// {
					// 	pagePath: "/pages/entrustedAgency/processing/processing",
					// 	text: "办理中",
					// 	fontIcon: "iconfont icon-banlizhongxin"

					// },
					// {
					// 	pagePath: "/pages/entrustedAgency/receivePayment/receivePayment",
					// 	text: "收款账单",
					// 	fontIcon: "iconfont icon-shouruzhangdan"
					// },
					// {
					// 	pagePath: "/pages/my/my",
					// 	text: "我的",
					// 	fontIcon: "iconfont icon-account-fill"

					// },

					// 委托商
					// {
					// 	pagePath: "/pages/serviceProvider/requisitionData/requisitionData",
					// 	text: "申请单",
					// 	fontIcon: "iconfont icon-order-fill"

					// },
					// {
					// 	pagePath: "/pages/serviceProvider/requisition/requisitionAdd",
					// 	text: "添加",
					// 	fontIcon: "iconfont icon-tianjiadanju"
					// },
					// {
					// 	pagePath: "/pages/billsPayable/billsPayable",
					// 	text: "应付账单",
					// 	fontIcon: "iconfont icon-tuikuanzhangdan"
					// },
					// {
					// 	pagePath: "/pages/my/my",
					// 	text: "我的",
					// 	fontIcon: "iconfont icon-account-fill"

					// },

					// 财务
					// {
					// 	pagePath: "/pages/billsPayable/billsPayable",
					// 	text: "应付账单",
					// 	fontIcon: "iconfont icon-home-fill"
					// },
					// {
					// 	pagePath: "/pages/my/my",
					// 	text: "我的",
					// 	fontIcon: "iconfont icon-account-fill"

					// },

				]
			}
		},

		onLoad: function() {
			uni.clearStorageSync(); //清除本地缓存
		},

		methods: {
			// 登入
			SignIn() {
				if (this.username === '') {
					uni.showToast({
						title: '请输入账号',
						duration: 2000,
						icon: 'none',
					});
				} else if (this.password === '') {
					uni.showToast({
						title: '请输入密码',
						duration: 2000,
						icon: 'none',
					});
				} else {
					loginApp({
						username: this.username,
						password: this.password
					}).then(res => {
						if (res[1].data.code === 0) {
							uni.setStorage({
								key: 'toKen',
								data: res[1].data.data.session_id

							})

							this.getAppMenu() //菜单

						}
					})

				}
			},

			// 菜单
			getAppMenu() {
				getAppMenu().then(res => {
					if (res[1].data.code === 0) {
						this.list = res[1].data.data
						uni.setStorage({
							key: 'tabbarList',
							data: this.list

						})
						uni.setStorage({
							key: 'index',
							data: 0

						})
						uni.reLaunch({
							url: this.list[0].pagePath
						})
					}
				})
			},
		}
	}
</script>

<style scoped>
	.login_box {
		height: 100vh;
		padding: 35% 0;
		background-color: #8fd1b4;
		box-sizing: border-box;
		opacity: 0.9;
	}

	.title {
		width: 100%;
		color: #fff;
		text-align: center;
		position: absolute;
		top: 10%;
		font-size: 50rpx;
		opacity: 0.9;
	}

	.image {
		text-align: center;
	}

	.image image {
		width: 298rpx;
		height: 360rpx;
		opacity: 0.9;
	}

	.input_box {
		padding: 100rpx;
		box-sizing: border-box;
	}

	.bottom {}

	.input_box input {
		font-size: 24rpx;
		padding-left: 80rpx;
		padding-right: 60rpx;
		background-color: #fff;
		margin-bottom: 50rpx;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 5px;
		color: #a9a9a9;
		position: relative;
		opacity: 0.7;
	}

	.input_box button {
		line-height: 100rpx;
		background-color: #0bd38a;
		color: #fff;
	}

	.password_Input {
		position: relative;
	}

	#icon {
		text-align: center;
		width: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 24rpx;
		position: absolute;
		bottom: 5rpx;
		right: 5rpx;
		z-index: 2;
	}
</style>
