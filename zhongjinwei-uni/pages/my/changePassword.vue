<template>
	<view style="padding:20rpx">
		<view class="box_content">
			<view class="item_box">
				<view class="item">
					<text class="name">用户名:</text>
					<input disabled="true" class="value" style="color: #0BD38A;" />
				</view>
			</view>

			<view class="item_box">
				<view class="item">
					<text class="name">旧密码:</text>
					<input class="value" password v-model="form.oldPass" placeholder="请输入旧密码(6-16个字符)" />
				</view>
			</view>
			<view class="item_box">
				<view class="item">
					<text class="name">新密码:</text>
					<input class="value" password v-model="form.newPass" placeholder="请输入新密码" />
				</view>
			</view>
			<view class="item_box">
				<view class="item" style="border: none;">
					<text class="name">确认密码:</text>
					<input class="value" password v-model="form.newPass1" placeholder="请再次确认新密码" />
				</view>
			</view>
		</view>
		<view class="btn" @click="updatePassword">
			<text>修 改</text>
		</view>
	</view>

</template>

<script>
	import {
		updatePassword
	} from '@/utils/interface.js';
	export default {
		data() {
			return {
				form: {
					oldPass: '', //旧密码
					newPass: '', //新密码
					newPass1: '', //确认新密码
				}

			}
		},
		methods: {
			updatePassword() {
				let form = this.form
				if (form.oldPass === '') {
					uni.showToast({
						title: '请输入旧密码',
						duration: 2000,
						icon: 'none',
					});
				} else if (form.newPass.length < 6 || form.newPass.length > 16) {
					uni.showToast({
						title: '新密码为(6-16个字符)',
						duration: 2000,
						icon: 'none',
					});

				} else if (form.newPass !== form.newPass1) {
					uni.showToast({
						title: '两次密码输入不一致',
						duration: 2000,
						icon: 'none',
					});
				} else {
					uni.showModal({
						title: `确认修改密码?`,
						success: function(res) {
							if (res.confirm) {
								updatePassword(this.form).then(res => {
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

			},
		}
	}
</script>

<style lang="less" scoped>
	.box_content {
		background-color: #fff;
		border-radius: 10rpx;
		padding-bottom: 20rpx;
		margin-bottom: 20rpx;


		.title {
			font-weight: 700;
			color: #333333;
			font-size: 35rpx;
			display: block;
			height: 100rpx;
			line-height: 100rpx;
			padding-left: 30rpx;
			border-bottom: 2rpx solid #f6f6f6;
		}

		.carclass {
			display: inline-block;
			font-size: 30rpx;
			width: 200rpx;
			text-align: center;
			height: 100rpx;
			line-height: 100rpx;
			color: #5697f4;
			float: right;
		}


		.item_box {
			padding: 0rpx 30rpx;

			.item {
				display: flex;
				padding: 30rpx 0rpx;
				border-bottom: 2rpx solid #f6f6f6;

				.name {
					width: 180rpx;
					font-size: 35rpx;
					color: #333333;
				}

				.value {
					flex: 1;
					font-size: 30rpx;
				}
			}

		}


	}

	.btn {
		background-color: #d81e06;
		display: flex;
		border-radius: 10rpx;
		justify-content: center;

		text {
			font-size: 32rpx;
			color: #fff;
			padding: 20rpx 0;
		}
	}
</style>
