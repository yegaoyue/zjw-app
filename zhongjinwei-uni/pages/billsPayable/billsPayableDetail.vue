<template>
	<view class="box">
		<view class="box_content">
			<text class="title">应收方银行信息</text>
			<view class="item_box">
				<view class="item">
					<text class="name">银行名称</text>
					<input disabled="true" class="value" v-model="bankForm.bankName" />
				</view>
			</view>

			<view class="item_box">
				<view class="item">
					<text class="name">银行账号</text>
					<input disabled="true" class="value" v-model="bankForm.sfBankAccount" />
				</view>
			</view>

			<view class="item_box">
				<view class="item">
					<text class="name">开户人</text>
					<input disabled="true" class="value" v-model="bankForm.sfBankPerson" />
				</view>
			</view>
			<view class="item_box">
				<view class="item">
					<text class="name">开户行</text>
					<input disabled="true" class="value" v-model="bankForm.sfBankOpening" />
				</view>
			</view>
		</view>

		<view class="box_sum">
			<view class="sumTitle">
				<text>结单数量</text>
				<text @click="fage= !fage">({{sfcSumnumber}}){{fage ? '展开' : '收起'}}</text>
			</view>
			<view :class="fage ? 'packClass' : ''" class="sumBox">
				<view class="sumName">
					<text>申请单号</text>
					<text>结算费用</text>
					<text>操作</text>
				</view>
				<view class="sumItem" v-for="item in list">
					<view class="item">
						<text>{{item.maNumber}}</text>
					</view>
					<view class="item">
						<text>{{$utils.digitalConversion(item.maMoney)}}</text>
					</view>
					<view class="item">
						<text @click="look(item)">查看</text>
					</view>
				</view>
			</view>

		</view>

		<view class="box_content">
			<view class="item_box">
				<view class="item">
					<text class="name">打款金额</text>
					<input class="value" disabled="true" v-model="sfcSummoney" />
				</view>
			</view>
			<view class="item_box">
				<view class="item">
					<text class="name">打款备注</text>
					<input class="value" type="text" :disabled="sfcState !== 2" v-model="moneyData.dpRemark" placeholder="请输入备注信息" />
				</view>
			</view>
		</view>
		<view class="box_content">
			<text class="title">上传打款凭证</text>
			<view style="padding: 10rpx;">
				<imageUp :aConnectionId="aConnectionId" :displayUp="sfcState === 2" :imageUrl="moneyData.sfcUpload" @resultUrl="resultUrl"></imageUp>
			</view>
		</view>

		<view v-if="sfcState === 2" style="background-color: #E6A23C;padding: 20rpx 30rpx;text-align: center;border-radius: 10rpx;"
		 @click="confirmPayment">
			<text style="color: #fff;font-size: 32rpx;">确认打款</text>
		</view>
	</view>
</template>

<script>
	import {
		getApplyFinance,
		getFacilitatorInfoById,
		updateFinanceInfo
	} from '@/utils/interface.js';
	import imageUp from '@/pages/common/imageUp.vue'
	export default {
		components: {
			imageUp
		},
		data() {
			return {
				fage: true, //展开收起
				aConnectionId: '', //上传id
				sfcReceivableSfid: '', //应收方id
				sfcSumnumber: '', //结单数量
				sfcState: '', //结算状态(===2 没有任何操作)
				sfcSummoney: '', //打款金额

				checkForm: {
					page: 1,
					limit: 1000,
					sfcId: '', //账单id
				},

				bankForm: {}, //银行信息
				list: [], //结单数据

				moneyData: { //打款参数
					sfcUpload: '', //图片路径
					sfcId: '', //账单id
					dpRemark: '确认打款', //打款备注
					sfcType: '',
				},



			}
		},
		onLoad: function(options) {
			let obj = JSON.parse(options.str)
			this.checkForm.sfcId = obj.sfcId //账单id
			this.moneyData.sfcId = obj.sfcId //账单id
			this.sfcReceivableSfid = obj.sfcReceivableSfid //应收方id
			this.sfcSumnumber = obj.sfcSumnumber //结单数量
			this.sfcSummoney = this.$utils.digitalConversion(obj.sfcSummoney) //打款金额
			this.moneyData.sfcType = obj.sfcType
			this.sfcState = obj.sfcState //结算状态

			if (obj.sfcState === 3) {
				this.moneyData.sfcUpload = obj.sfcUpload //图片路径
				this.moneyData.dpRemark = obj.sfcRemitRemark //打款备注

			}
			// console.log(obj)


			this.getApplyFinance() // 结单数量
			this.getFacilitatorInfoById() // 应收方银行信息

		},
		methods: {
			// 结单数量
			getApplyFinance() {
				getApplyFinance(this.checkForm).then(res => {
					if (res[1].data.code === 0) {
						this.list = res[1].data.data
					}
				})
			},

			// 应收方银行信息
			getFacilitatorInfoById() {
				getFacilitatorInfoById({
					sfId: this.sfcReceivableSfid
				}).then(res => {
					if (res[1].data.code === 0) {
						this.bankForm = res[1].data.data
						this.aConnectionId = res[1].data.data.sfCode
					}
				})
			},

			// 查看
			look(val) {
				val.btnText = '查看'
				let str = JSON.stringify(val)
				uni.navigateTo({
					url: `../common/carDetails?str=${str}`
				})
			},

			// 上传成功回调
			resultUrl(e) {
				this.moneyData.sfcUpload = e.data.url //图片路径
			},


			// 确认打款
			confirmPayment() {
				let title = '不能为空'
				if (this.moneyData.dpRemark === '') {
					title = '请输入打款备注'
				} else if (this.moneyData.sfcUpload === '') {
					title = '请上传打款凭证'
				} else {
					uni.showModal({
						title: '确认打款?',
						success: function(res) {
							if (res.confirm) {
								updateFinanceInfo(this.moneyData).then(res => {
									if (res[1].data.code === 0) {
										uni.showToast({
											title: '打款成功',
											duration: 2000,
										});
										uni.reLaunch({
											url: './billsPayable'
										})
									}
								})
							} else if (res.cancel) {}
						}.bind(this),


					});
				}
				if (title != '不能为空') {
					uni.showToast({
						title: title,
						duration: 2000,
						icon: 'none',
					});
				}

			},
		}
	}
</script>

<style lang="less" scoped>
	.box_sum {
		background-color: #fff;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		overflow: hidden;

		.sumTitle {
			font-size: 35rpx;
			display: flex;
			align-items: center;
			padding: 20rpx 30rpx;
			margin-bottom: 10rpx;
			border-bottom: 2rpx solid #f6f6f6;


			text:nth-child(1) {
				flex: 1;
				font-weight: 700;
				color: #333333;
			}

			text:nth-child(2) {
				font-size: 24rpx;
				color: #007AFF;
			}

		}

		.sumBox {
			padding: 0 30rpx 30rpx 30rpx;

			.sumName {
				display: flex;

				text {
					flex: 1;
					font-size: 28rpx;
					font-weight: bold;
				}

				text:last-child {
					flex: 0.25;
					display: flex;
					justify-content: center;
				}

			}

			.sumItem {
				display: flex;
				padding: 10rpx 0;

				.item {
					flex: 1;
					display: flex;

					text {
						font-size: 22rpx;
						color: #909399;

					}
				}

				.item:last-child {
					flex: 0.25;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #409EFF;
					border-radius: 5rpx;

					text {
						color: #fff;
						font-size: 18rpx;
					}
				}
			}
		}

		.packClass {
			height: 60rpx;
		}


	}

	.box_content {
		background-color: #fff;
		border-radius: 10rpx;
		padding-bottom: 30rpx;
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
	}

	.box {
		padding: 20rpx;
	}


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
				padding: 20rpx 0rpx;
				border-bottom: 2rpx solid #f6f6f6;

				.name {
					width: 180rpx;
					font-size: 32rpx;
					color: #333333;
				}

				.value {
					flex: 1;
					font-size: 28rpx;
					font-weight: 400;
				}




			}


		}


	}

	.sumClass {
		height: 400rpx;
	}
</style>
