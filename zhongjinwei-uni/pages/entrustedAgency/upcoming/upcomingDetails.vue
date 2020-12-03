<template>
	<view>
		<view style="padding: 20rpx;">
			<view class="box_content">
				<text class="title">分配业务人员</text>
				<view class="item_box">
					<view class="item">
						<text class="name" style="width: 200rpx;display: flex;align-items: center;">办理人员</text>
						<xfl-select :list="list" :clearable="false" :showItemNum="5" :isCanInput="true" :style_Container="'height: 40px; font-size: 16px;'"
						 :placeholder="'请选择办理人员'" @change="selectChange">
						</xfl-select>
					</view>
				</view>

				<view class=" item_box">
					<view class="item">
						<text class="name">联系电话</text>
						<input class="value" type="number" maxlength="11" v-model="maPhone" placeholder="请输入联系电话" />
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<text class="name">备注</text>
						<input class="value" type="text" v-model="form.srRemarks" placeholder="请输入备注" />
					</view>
				</view>
			</view>

			<view style="display: flex;">
				<text style="flex: 1;text-align: center;background-color: #007AFF; padding: 20rpx 30rpx;border-radius: 10rpx;color: #fff;font-size: 32rpx;margin-right:10rpx"
				 @click="apportion">分配</text>
				<text style="flex: 1;text-align: center;background-color: #E6A23C; padding: 20rpx 30rpx;border-radius: 10rpx;color: #fff;font-size: 32rpx;margin-left:10rpx"
				 @click="refused">拒办</text>
			</view>
		</view>


		<carDetails :carData="carData"></carDetails>

	</view>
</template>

<script>
	import {
		getUserInfoBySfId,
		distributionModApply,
		RefuseModApply
	} from '@/utils/interface.js'
	import carDetails from '@/pages/common/carDetails.vue';
	import xflSelect from '@/components/xfl-select/xfl-select.vue';
	export default {
		components: {
			carDetails,
			xflSelect
		},
		data() {
			return {
				carData: '', //详情数据
				list: [], //要展示的数据
				form: {
					maId: '', //单子id
					maSuiid: '', //办理人员id
					connectionId: '',
					srRemarks: '', //备注
				},
				maPhone: '', //联系电话
				name: '', //分配人员name
			}
		},

		onLoad: function(options) {
			this.carData = options.str
			this.getUserInfoBySfId() //办理人员数据
			let obj = JSON.parse(options.str)
			this.form.maId = obj.maId
			this.form.connectionId = obj.maConnectionId
		},

		methods: {
			//办理人员数据
			getUserInfoBySfId() {
				getUserInfoBySfId({
					sdvId: ''
				}).then(res => {
					if (res[1].data.code === 0) {
						let arr = []
						res[1].data.data.forEach(item => {
							arr.push({
								value: item.name,
								id: item.value,
								mobile: item.mobile
							})
						})
						this.list = arr
					}
				})
			},

			// 办理人员选中时触发
			selectChange(val) {
				console.log(val)
				this.maPhone = val.orignItem.mobile
				this.form.maSuiid = val.orignItem.id
				this.name = val.orignItem.value
			},

			// 分配
			apportion() {
				if (!this.form.srRemarks) {
					this.form.srRemarks = '分配业务人员' //默认值
				}
				let form = this.form
				if (form.maSuiid === '') {
					uni.showToast({
						title: '请选择办理人员',
						duration: 2000,
						icon: 'none',
					});
				} else if (this.maPhone === '') {
					uni.showToast({
						title: '请输入联系电话',
						duration: 2000,
						icon: 'none',
					});
				} else if (form.srRemarks === '') {
					uni.showToast({
						title: '请输入备注',
						duration: 2000,
						icon: 'none',
					});
				} else {
					console.log(this.form)
					uni.showModal({
						title: `确认分配给-${this.name}?`,
						success: function(res) {
							if (res.confirm) {
								distributionModApply(this.form).then(res => {
									uni.showToast({
										title: '人员分配成功',
										duration: 2000,
									});
									uni.reLaunch({
										url: './upcoming'
									})
								})
							} else if (res.cancel) {}
						}.bind(this),


					});

				}

			},

			// 拒办
			refused() {
				if (!this.form.srRemarks) {
					this.form.srRemarks = '拒绝办理' //默认值
				}
				if (this.form.srRemarks === '') {
					uni.showToast({
						title: '请输入备注',
						duration: 2000,
						icon: 'none',
					});
				} else {
					uni.showModal({
						title: `确认拒绝办理?`,
						success: function(res) {
							if (res.confirm) {
								RefuseModApply(this.form).then(res => {
									uni.showToast({
										title: '拒办成功',
										duration: 2000,
									});
									uni.reLaunch({
										url: './upcoming'
									})
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
