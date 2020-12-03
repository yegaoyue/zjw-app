<template>
	<view class="content">
		<view class="info_box">
			<view class="left">
				<image src="../../static/images/20181018162951_kgwzm.jpeg" />
			</view>

			<view class="right">
				<view class="right_top">叶嵩
				</view>
				<view class="right_bottom">
					<text class="str">微信号:wx_165656</text>
					<uni-icons type="arrowright" color="#b3b3b3" size="16"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 		<uni-list :border="false">
			<uni-list-item style="line-height: 80rpx;" title="默认 navigateTo" link to="/pages/vue/index/index" @click="onClick($event,1)"></uni-list-item>
			<uni-list-item style="line-height: 80rpx;" title="reLaunch 方式跳转页面" link="reLaunch"></uni-list-item>
		</uni-list> -->
		<button class="btn" @click="changePassword">修改密码</button>
		<button class="btn" @click="logout">退出登录</button>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {
		logout
	} from '@/utils/interface.js';
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons,

		},
		data() {
			return {


			}
		},

		methods: {
			// 修改密码
			changePassword() {
				uni.navigateTo({
					url: './changePassword'
				})
			},

			// 退出
			logout() {
				uni.showModal({
					title: `确认退出?`,
					success: function(res) {
						if (res.confirm) {
							// uni.reLaunch({
							// 	url: '../login/login'
							// })
							logout().then(res => {
								if (res[1].data.code === 0) {
									uni.reLaunch({
										url: '../login/login'
									})
								}
							})
						} else if (res.cancel) {}
					}.bind(this),
				});
			}

		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100vh -50;
		background: #f7f7f7;
	}

	.info_box {
		width: 100%;
		height: 300rpx;
		padding: 100rpx 3px 100rpx 50rpx;
		border-radius: 5px;
		box-sizing: border-box;
		background-color: #fefefe;
		margin-bottom: 20rpx;

		.left {
			width: 25%;
			float: left;

			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 10%;
			}
		}

		.right {
			width: 75%;
			float: left;
			// margin-left: 20rpx;

			.right_top {
				height: 75rpx;
				line-height: 75rpx;
				font-size: 38rpx;
				font-weight: 700;
			}

			.right_bottom {
				height: 75rpx;
				line-height: 75rpx;

				.str {
					display: inline-block;
					width: 90%;
					font-size: 30rpx;
					color: #808080;
					margin-right: 8rpx;
				}


			}
		}
	}

	.btn {
		background-color: #fff;
		font-size: 30rpx;
		font-weight: 500;
		margin-top: 20rpx;
		color: #000;
	}
</style>
