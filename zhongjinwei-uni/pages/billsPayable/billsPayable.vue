<template>
	<view class="content">
		<view class="search"></view>
		<text v-if="list.length == 0" style="font-size: 35rpx;color:#708090; display: inline-block;position:absolute;top: 45%; left: 50%;  transform: translate(-50%, -50%);">
			-----暂无数据-----
		</text>

		<scroll-view scroll-y="true" class="scroll-Y">
			<view class="box">
				<view class="list " v-for="item in list" @click="details(item)">
					<view class="left">
						<image :src="'../../static/images/'+(item.sfcState === 3 ? '05.png' : item.sfcState === 2 ? '04.png': '')"></image>
					</view>
					<view class="right">
						<view class="right_top">
							<text>结算日期</text>
							<text>{{$utils.digitalConversion(item.sfcSummoney)}}</text>
						</view>
						<view class="right_bottom">
							<text>{{item.sfcSettletime}}</text>
							<text :style="'background-color:' + (item.sfcState === 3 ? '#2a92be;' : item.sfcState === 2 ? '#c2b81e;' : '' )">{{item.state}}</text>
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
		handleMoneyForService
	} from '@/utils/interface.js';

	export default {
		data() {
			return {
				inputValue: '', //搜索value
				inputId: '', //搜索id
				list: [],
			}
		},

		// 下拉刷新
		onPullDownRefresh() {
			this.handleMoneyForService()
		},

		onLoad: function() {
			this.handleMoneyForService()
		},

		methods: {
			// 列表数据
			handleMoneyForService(config) {
				handleMoneyForService({
					page: 1,
					limit: 1000,
				}).then(res => {
					if (res[1].data.code === 0) {
						this.list = res[1].data.data
						if (config) {
							config() //关闭下拉刷新
						}

					}
				})
			},


			// 列表点击
			details(val) {
				var str = JSON.stringify(val)
				uni.navigateTo({
					url: `./billsPayableDetail?str=${str}`
				})

			}
		}
	}
</script>

<style lang="less" scoped>
	.search {
		position: fixed;
		left: 0;
		right: 0;
		z-index: 9;
		padding: 40rpx 0;
		background-color: #2bb7aa;

	}

	.box {
		padding: 90rpx 20rpx 10rpx 20rpx;
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
			padding-right: 20rpx;
			display: flex;
			flex-direction: column;

			.right_top {
				display: flex;
				align-items: center;

				text:first-child {
					flex: 1;
					color: #333333;
					font-weight: 700;
					font-size: 30rpx;
					margin-bottom: 10rpx;
				}

				text:last-child {
					color: #d81e06;
					font-size: 24rpx;
				}
			}

			.right_bottom {
				display: flex;
				align-items: center;

				text:first-child {
					flex: 1;
					color: #333333;
					font-size: 26rpx;
				}

				text:last-child {
					// background-color: #c2b81e;
					color: #fff;
					padding: 4rpx 10rpx;
					border-radius: 4rpx;
					font-size: 20rpx;
				}


			}
		}
	}
</style>
