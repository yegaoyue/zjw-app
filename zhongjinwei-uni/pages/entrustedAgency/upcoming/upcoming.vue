<template>
	<view class="content">
		<view class="search">
			<input type="text" v-model="maNumber" placeholder="请输入申请编号" confirm-type="search" @input="getApplyListEntrusted()"
			 @confirm="confirm" />
			<icon style="position: absolute;top: 36rpx;left: 40rpx;" type="search" size="14" />
			<icon v-if="maNumber" @click="maNumber='',getApplyListEntrusted()" style="position:absolute;top: 24rpx;right: 30rpx; padding: 12rpx;"
			 type="clear" size="14" />
		</view>

		<text v-if="list.length == 0" style="font-size: 35rpx;color:#708090; display: inline-block;position:absolute;top: 45%; left: 50%;  transform: translate(-50%, -50%);">
			-----暂无数据-----
		</text>

		<scroll-view scroll-y="true" class="scroll-Y">
			<view class="box">
				<view class="list " v-for="item in list" @click="details(item)">
					<view class="left">
						<image src="../../../static/images/05.png"></image>
					</view>
					<view class="right">
						<view class="right_top">
							<text>{{item.maCustomerName}}</text>
						</view>
						<view class="right_bottom">
							<text style="color: #333333; font-size: 26rpx; float: left; margin-top: 10rpx;">{{item.maNumber}}</text>
							<text style="background-color: #F0AD4E;color: #fff;padding: 4rpx 10rpx;border-radius: 4rpx;font-size: 20rpx;float: right;margin-right: 16rpx;">{{item.maState}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {
		getApplyListEntrusted
	} from '@/utils/interface.js';
	export default {
		data() {
			return {
				maNumber: '', //搜索value
				list: []
			}
		},

		// 下拉刷新
		onPullDownRefresh() {
			this.getApplyListEntrusted()
		},

		onLoad: function() {
			this.getApplyListEntrusted()
		},

		methods: {
			// 列表数据
			getApplyListEntrusted() {
				getApplyListEntrusted({
					maState: 7,
					page: 1,
					limit: 1000,
					maNumber: this.maNumber,
				}).then(res => {
					if (res[1].data.code === 0) {
						this.list = res[1].data.data
					}
				})
			},


			// 列表点击
			details(val) {
				var str = JSON.stringify(val)
				uni.navigateTo({
					url: `./upcomingDetails?str=${str}`
				})

			},

			// 点击搜索
			confirm() {
				this.getApplyListEntrusted()
				uni.hideKeyboard()
			},
		}
	}
</script>

<style lang="less" scoped>
	.box {
		padding: 10rpx 20rpx 0rpx 20rpx;
	}

	.scroll-Y {
		padding-top: 100rpx;
		padding-bottom: 10rpx;
	}

	.search {
		position: fixed;
		left: 0;
		right: 0;
		z-index: 9;
		padding: 20rpx 24rpx;
		background-color: #2bb7aa;


		input {
			padding-left: 60rpx;
			padding-right: 40rpx;
			height: 60rpx;
			border-radius: 10rpx;
			background-color: #fff;
			font-size: 24rpx;
			opacity: 0.9;
		}
	}

	.list {
		background-color: #fff;
		display: flex;
		padding: 10rpx;
		height: 120rpx;
		margin-top: 2rpx;
		box-sizing: border-box;

		.left {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100rpx;
			margin-right: 10rpx;

			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 10rpx;
			}
		}

		.right {
			flex: 1;

			.right_top {
				height: 50%;

				text {
					color: #333333;
					font-weight: 700;
					font-size: 30rpx;
				}
			}

			.right_bottom {
				height: 50%;


			}
		}
	}
</style>
