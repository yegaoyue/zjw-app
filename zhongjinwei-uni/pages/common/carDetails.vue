<template>
	<view class="box">
		<view class="box_content">
			<text class="title">客户信息</text>
			<view class="item_box">
				<view class="item">
					<text class="name">申请编号</text>
					<input disabled="true" class="value" v-model="form.maNumber" />
				</view>
			</view>
			<view class="item_box">
				<view class="item">
					<text class="name">申请时间</text>
					<input disabled="true" class="value" v-model="form.maCreatetime" />
				</view>
			</view>
			<view class="item_box">
				<view class="item">
					<text class="name">姓名</text>
					<input disabled="true" class="value" type="text" v-model="form.maCustomerName" />
				</view>
			</view>

			<view class="item_box">
				<view class="item">
					<text class="name">身份证号</text>
					<input disabled="true" class="value" type="text" v-model="form.maCard" />
				</view>
			</view>

			<view class="item_box">
				<view class="item">
					<text class="name">手机号</text>
					<input disabled="true" class="value" type="number" maxlength="11" v-model="form.maPhone" />
				</view>
			</view>

			<province provinceBisabled="true" :provinceStr="form.maProvince + ' ' + form.maCity"></province>

			<view class="item_box">
				<view class="item">
					<text class="name">车管所</text>
					<picker disabled="true" style="flex: 1;text-align: right;">
						<text class="value">{{form.sdvName}}</text>
					</picker>
				</view>
			</view>

			<view class="item_box">
				<view class="item">
					<text class="name">备注</text>
					<input disabled="true" class="value" type="text" v-model="form.maRemarks" />
				</view>
			</view>

		</view>

		<view style="position: relative;padding-bottom: 100rpx" :class="!fage ? '' : 'up'" class="box_content">
			<text class="title">车辆信息</text>
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
					<input disabled="true" class="value" type="number" v-model="form.maInvoicePrice" />
				</view>
			</view>

			<view class="item_box">
				<view class="item">
					<text class="name">发动机号</text>
					<input disabled="true" class="value" type="text" v-model="form.maEngine" />
				</view>
			</view>
			<view class="item_box">
				<view class="item">
					<text class="name">车架号</text>
					<input disabled="true" class="value" type="text" v-model="form.maFrameNumber" />
				</view>
			</view>
			<view class="item_box">
				<view class="item">
					<text class="name">合格证号</text>
					<input disabled="true" class="value" type="text" v-model="form.maQualified" />
				</view>
			</view>
			<view class="item_box">
				<view class="item">
					<text class="name">车牌号</text>
					<input :disabled="true" class="value" type="text" v-model="form.maPlatenumber" />
				</view>
			</view>

			<view style="position: absolute;bottom: 0;left: 50%;transform:translate(-50%,-10%);">
				<text @click="fage = !fage" style="font-size: 24rpx;color:#007AFF">{{fage? '展开' : '收起'}}</text>
			</view>

		</view>
	</view>
</template>

<script>
	import province from '@/pages/common/province.vue';
	export default {
		components: {
			province,
		},
		props: ['carData'],
		data() {
			return {
				form: {
					maNumber: '', //申请编号
					maCreatetime: '', //申请时间
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

				btnText: '', //其他页面进来没有操作
				fage: false, //展开收起


			}
		},

		created() {
			// 待办传的数据
			if (this.carData) {
				let obj = JSON.parse(this.carData)
				this.valueAdd(obj)
			}
		},



		onLoad: function(options) {
			// 应付-账单详情传的数据
			if (options.str) {
				let obj = JSON.parse(options.str)
				this.valueAdd(obj)
			}


		},

		methods: {
			valueAdd(obj) {
				this.form.maNumber = obj.maNumber //申请编号
				this.form.maCreatetime = obj.maCreatetime //申请时间
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
				this.btnText = obj.btnText //其他页面进来没有操作
			}

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
