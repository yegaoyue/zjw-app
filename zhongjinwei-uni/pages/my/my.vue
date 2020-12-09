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
				</view>
			</view>
		</view>

		<view class="btn">
			<text @click="changePassword">修改密码</text>
			<text @click="logout">退出登录</text>

		</view>
		<!-- 		<button class="btn" @click="changePassword">修改密码</button>
		<button class="btn" @click="logout">退出登录</button> -->
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
	.info_box {
		padding: 50rpx 0 40rpx 0;
		background-color: #2bb7aa;
		border-radius: 0 0 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		opacity: 1;

		.left {
			display: flex;
			justify-content: center;


			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}
		}

		.right {
			display: flex;
			flex-direction: column;


			.right_top {
				height: 75rpx;
				line-height: 75rpx;
				font-size: 38rpx;
				font-weight: 700;
				color: #fff;
				opacity: 0.8;
				text-align: center;
			}

			.right_bottom {
				height: 75rpx;
				line-height: 75rpx;
				text-align: center;

				.str {
					font-size: 30rpx;
					color: #fff;
					opacity: 0.8;
				}


			}
		}
	}

	.btn {
		position: fixed;
		width: 100%;
		bottom: 160rpx;
		display: flex;
		flex-direction: column;

		text {
			padding: 20rpx 0;
			text-align: center;
			border-radius: 10rpx;
			background-color: #2bb7aa;
			color: #fff;
			font-size: 32rpx;
			opacity: 0.9;
		}

		text:first-child {
			margin-bottom: 20rpx;
		}
	}
</style>
