<template>
	<view class="content">
		<view class="search" @click="searchFage=false">
			<picker @change="bindPickerChange" :disabled="searchFage" value="1" :range="satusList" :range-key="'maState'">
				<input disabled="true" @focus="searchFage=false" type="text" v-model="inputValue" placeholder="点击条件搜索" />
			</picker>
			<icon style="position: absolute;top: 36rpx;left: 40rpx;" type="search" size="14" />
			<icon v-if="inputValue" @click="searchFage=true;inputValue='';inputId='';getModApplyForApp()" style="position:absolute;top: 24rpx;right: 30rpx; padding: 12rpx;"
			 type="clear" size="14" />
		</view>

		<text v-if="list.length == 0" style="font-size: 35rpx;color:#708090; display: inline-block;position:absolute;top: 45%; left: 50%;  transform: translate(-50%, -50%);">
			-----暂无数据-----
		</text>

		<scroll-view scroll-y="true" class="scroll-Y">
			<view class="box">
				<view class="list " v-for="item in list" @click="details(item)">
					<view class="left">
						<image :src="'../../../static/images/'+ (item.maState === 1 ? '01.png' : item.maState === 2 ? '02.png' : item.maState === 3 ? '03.png' : '')"></image>
					</view>
					<view class="right">
						<view class="right_top">
							<text>{{item.maCustomerName}}</text>
						</view>
						<view class="right_bottom">
							<text style="color: #333333; font-size: 26rpx; float: left; margin-top: 10rpx;">{{item.maCreatetime}}</text>
							<!-- 1=>待提报
						         2=>待审核
							     3=>审核退回 -->
							<text :style="'background-color:'+(item.maState === 1 ? '#00b099;' : item.maState === 2 ? '#c2b81e;' : item.maState === 3 ? '#942938;' : '' )+'color: #fff;'+'padding: 4rpx 10rpx;'+'border-radius: 4rpx;'+'font-size: 20rpx;'+'float: right;'+'margin-right: 16rpx;'">{{item.maState === 1 ? '待提报' : item.maState === 2 ? '待审核' : item.maState === 3 ? '审核退回' : ''}}</text>
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
		getModApplyForApp
	} from '@/utils/interface.js';
	export default {
		data() {
			return {
				satusList: [{
						maState: '待提报',
						id: 1
					},
					{
						maState: '待审核',
						id: 2
					},
					{
						maState: '审核退回',
						id: 3
					},
				],
				inputValue: '', //搜索value
				inputId: '', //搜索id
				searchFage: false, //弹出层开关
				list: []
			}
		},

		// 下拉刷新
		onPullDownRefresh() {
			this.getModApplyForApp()
		},

		onLoad: function() {
			this.getModApplyForApp()
		},

		methods: {
			// 列表数据
			getModApplyForApp() {
				getModApplyForApp({
					maState: this.inputId
				}).then(res => {
					if (res[1].data.code === 0) {
						this.list = res[1].data.data
					}
				})

			},

			// 弹出层确认
			bindPickerChange(val) {
				this.inputValue = this.satusList[val.detail.value].maState
				this.inputId = this.satusList[val.detail.value].id
				this.getModApplyForApp()
			},

			// 列表点击
			details(val) {
				var str = JSON.stringify(val)
				uni.navigateTo({
					url: `../requisition/requisitionModify?str=${str}`
				})

			}
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
		background-color: #4fc08d;


		input {
			padding-left: 60rpx;
			padding-right: 40rpx;
			height: 60rpx;
			border-radius: 10rpx;
			background-color: #fff;
			font-size: 24rpx;
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
