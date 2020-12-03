<template>
	<view class="content">
		<view class="box">
			<view class="box_content">
				<text class="title">客户信息</text>
				<view class="item_box">
					<view class="item">
						<text class="name">姓名</text>
						<input :disabled="form.maState === 2" class="value" type="text" v-model="form.maCustomerName" placeholder="请输入姓名" />
					</view>
				</view>

				<view class="item_box">
					<view class="item">
						<text class="name">身份证号</text>
						<input :disabled="form.maState === 2" maxlength="18" class="value" type="text" v-model="form.maCard" placeholder="请输入身份证号" />
					</view>
				</view>

				<view class="item_box">
					<view class="item">
						<text class="name">手机号</text>
						<input :disabled="form.maState === 2" class="value" type="number" maxlength="11" v-model="form.maPhone"
						 placeholder="(+86)请准确填写您的手机号" />
					</view>
				</view>

				<province :provinceBisabled="form.maState === 2" :provinceStr="form.maProvince + ' ' + form.maCity" @emitProvince="emitProvince"></province>

				<view class="item_box">
					<view class="item">
						<text class="name">车管所</text>
						<picker :disabled="form.maState === 2" style="flex: 1;text-align: right;" @change="bindPickerChange" :range="options"
						 :range-key="'sdvName'">
							<text class="value">{{form.sdvName}}</text>
						</picker>
					</view>
				</view>

				<view class="item_box">
					<view class="item">
						<text class="name">备注</text>
						<input :disabled="form.maState === 2" class="value" type="text" v-model="form.maRemarks" placeholder="请填写备注信息" />
					</view>
				</view>

			</view>

			<view style="position: relative;padding-bottom: 100rpx" :class="!fage ? '' : 'up'" class="box_content">
				<text class="title" style="display: inline-block; width: 67%;">车辆信息</text> <text v-if="form.maState !== 2" class="carclass iconfont icon-search"
				 @click="carSearch">查找车辆</text>
				<view class="item_box">
					<view class="item">
						<text class="name">制造商</text>
						<text class="value">{{form.maManufacturer}}</text>
					</view>
				</view>

				<view class="item_box">
					<view class="item">
						<text class="name">品牌</text>
						<text class="value">{{form.maBrandName}}</text>
					</view>
				</view>

				<view class="item_box">
					<view class="item">
						<text class="name">车系</text>
						<text class="value">{{form.maSeriesName}}</text>
					</view>
				</view>

				<view class="item_box">
					<view class="item">
						<text class="name">车型</text>
						<text class="value">{{form.maCarName}}</text>
					</view>
				</view>

				<view class="item_box">
					<view class="item">
						<text class="name">生产日期</text>
						<text class="value">{{form.maIssueYear}}</text>
					</view>
				</view>

				<view class="item_box">
					<view class="item">
						<text class="name">驱动形式</text>
						<text class="value">{{form.maDriveType}}</text>
					</view>
				</view>

				<view class="item_box">
					<view class="item">
						<text class="name">开票价</text>
						<input :disabled="form.maState === 2" class="value" type="number" v-model="form.maInvoicePrice" placeholder="请输入开票价" />
					</view>
				</view>

				<view class="item_box">
					<view class="item">
						<text class="name">发动机号</text>
						<input :disabled="form.maState === 2" class="value" type="text" v-model="form.maEngine" placeholder="请输入发动机号" />
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<text class="name">车架号</text>
						<input :disabled="form.maState === 2" class="value" type="text" v-model="form.maFrameNumber" placeholder="请输入车架号" />
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<text class="name">合格证号</text>
						<input :disabled="form.maState === 2" class="value" type="text" v-model="form.maQualified" placeholder="请输入合格证号" />
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<text class="name">车牌号</text>
						<input :disabled="form.maState === 2" class="value" type="text" v-model="form.maPlatenumber" placeholder="请输入车牌号" />
					</view>
				</view>

				<view style="position: absolute;bottom: 0;left: 50%;transform:translate(-50%,-10%);">
					<text @click="fage = !fage" style="font-size: 24rpx;color:#007AFF">{{fage? '展开' : '收起'}}</text>
				</view>

			</view>


			<!-- maId为空说明是添加页面 -->
			<view v-if="form.maId  === ''">
				<button type="primary" @click="saveModify('保存')">保 存</button>
			</view>
			<view v-if="form.maId  !== '' && form.maState !== 2">
				<button style="background-color: #e6a23c;color: #fff;margin-bottom: 20rpx;" @click="$refs.popup.open()">提 报</button>
				<button type="primary" @click="saveModify('修改')">修 改</button>
			</view>


		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="input" type="warn" title="确认提报?" value="申请单提报" placeholder="请填写备注信息" message="成功消息"
			 :duration="2000" :before-close="true" @close="close" @confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>


		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {
		addModApply,
		updateModApply,
		updateModApplySubmit
	} from '@/utils/interface.js';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
	import province from '@/pages/common/province.vue';
	import {
		vehicleAdministration
	} from '@/utils/interface.js'
	export default {
		components: {
			province,
			uniPopupDialog
		},
		props: ['data'],
		data() {
			return {
				form: {
					maCustomerName: '', //姓名
					maPhone: '', //手机
					maCard: '', //身份证
					maProvince: '', //车辆上牌省份
					maCity: '', //车辆上牌城市
					maSdvid: '', //车管所
					sdvName: '请选择', //车管所label
					maManufacturer: '', //制造商
					maBrandName: '', //品牌
					maSeriesName: '', //车系
					maCarName: '', //车型
					maIssueYear: '', //生产日期
					maDriveType: '', //驱动形式
					maInvoicePrice: '', //开票价
					maEngine: '', //发动机号
					maFrameNumber: '', //车架号
					maQualified: '', //合格证号
					maPlatenumber: '', //车牌号
					maRemarks: "", //备注
					maState: "", //状态
					maId: "", //修改id

				},
				reportData: {
					maConnectionId: '', //申请单id
					maRemark: '',
					maId: '',
				},
				fage: false, //展开收起
				options: [], //车管所数据


			}
		},

		created() {
			if (this.data) {
				let obj = JSON.parse(this.data)
				this.form.maCustomerName = obj.maCustomerName //姓名
				this.form.maPhone = obj.maPhone //手机
				this.form.maCard = obj.maCard //身份证
				this.form.maProvince = obj.maProvince //车辆上牌省份
				this.form.maCity = obj.maCity //车辆上牌城市
				this.form.maSdvid = obj.maSdvid //车管所
				this.form.sdvName = obj.sdvName //车管所label
				this.form.maManufacturer = obj.maManufacturer //制造商
				this.form.maBrandName = obj.maBrandName //品牌
				this.form.maSeriesName = obj.maSeriesName //车系
				this.form.maCarName = obj.maCarName //车型
				this.form.maIssueYear = obj.maIssueYear //生产日期
				this.form.maDriveType = obj.maDriveType //驱动形式
				this.form.maInvoicePrice = obj.maInvoicePrice //开票价
				this.form.maEngine = obj.maEngine //发动机号
				this.form.maFrameNumber = obj.maFrameNumber //车架号
				this.form.maQualified = obj.maQualified //合格证号
				this.form.maPlatenumber = obj.maPlatenumber //车牌号
				this.form.maRemarks = obj.maRemarks //备注
				this.form.maState = obj.maState //状态
				this.form.maId = obj.maId //修改id
				this.reportData.maId = obj.maId //修改id
				this.reportData.maConnectionId = obj.maConnectionId //申请单id

				// 改变标题
				let maState = this.form.maState
				uni.setNavigationBarTitle({
					title: maState === 1 ? '待提报-申请单' : maState === 2 ? '待审核-申请单' : maState === 3 ? '审核退回-申请单' : ''
				});

				// 获取车管所数据
				this.vehicleAdministration()
			}

			// 修改id为空说明是添加页面
			if (this.form.maId === '') {
				uni.setNavigationBarTitle({
					title: '添加-申请单'
				});
			}
		},

		methods: {
			// 提报取消
			close(done) {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				done()
			},

			// 提报确认
			confirm(done, value) {
				// 输入框的值
				this.reportData.maRemark = value
				updateModApplySubmit(this.reportData).then(res => {
					if (res[1].data.code === 0) {
						uni.reLaunch({
							url: '../requisitionData/requisitionData'
						})
					}
				})
				// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
				done()
			},

			// 上牌地区
			emitProvince(val) {
				this.form.maProvince = val[0].text
				this.form.maCity = val[1].text
				this.form.maSdvid = '' ////车管所id
				this.form.sdvName = '请选择' //车管所label
				this.vehicleAdministration()
			},

			// 获取车管所数据
			vehicleAdministration() {
				vehicleAdministration({
					maProvince: this.form.maProvince,
					maCity: this.form.maCity
				}).then(res => {
					if (res[1].data.code === 0) {
						this.options = res[1].data.data
					}

				})
			},

			// 车管所
			bindPickerChange(val) {
				this.form.maSdvid = this.options[val.detail.value].sdvId //车管所id
				this.form.sdvName = this.options[val.detail.value].sdvName //车管所label
			},

			// 查找车辆
			carSearch() {
				var str = JSON.stringify(this.form)
				uni.navigateTo({
					url: `./carData?str=${str}`
				})
			},

			// 保存
			saveModify(val) {
				let form = this.form
				let title = '不能为空'

				if (form.maCustomerName === '') {
					title = '请输入姓名'
				} else if (!this.$utils.isTrueValidateCodeBy18IdCard(form.maCard)) {
					title = '身份证有误'
				} else if (!(/^1[34578]\d{9}$/).test(form.maPhone)) {
					title = '手机号有误'
				} else if (form.maCity === '') {
					title = '请选择上牌地区'
				} else if (form.maSdvid === '') {
					title = '请选择车管所'
				} else if (form.maManufacturer === '') {
					title = '请选择车辆'
				} else if (form.maInvoicePrice === '') {
					title = '请输入开票价'
				} else if (form.maEngine === '') {
					title = '请输入发动机号'
				} else if (form.maFrameNumber === '') {
					title = '请输入车架号'
				} else {
					if (val === '保存') {
						addModApply(this.form).then(res => {
							if (res[1].data.code === 0) {
								uni.setStorage({
									key: 'index',
									data: 0
								})
								uni.reLaunch({
									url: '../requisitionData/requisitionData'
								})
							}

						})
					}
					if (val === '修改') {
						updateModApply(this.form).then(res => {
							if (res[1].data.code === 0) {
								uni.setStorage({
									key: 'index',
									data: 0
								})
								uni.reLaunch({
									url: '../requisitionData/requisitionData'
								})
							}

						})
					}

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
	.box {
		padding: 20rpx;
	}

	.up {
		height: 20rpx;
		overflow: hidden;
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
</style>
