<template>
	<view>
		<view style="padding: 20rpx;">
			<view class="box_content">
				<text class="title">办理提交</text>
				<view class="item_box">
					<view class="item">
						<text class="name" style="width: 200rpx;display: flex;align-items: center;">办理状态</text>
						<xfl-select :list="list" :clearable="false" :showItemNum="5" :isCanInput="false" :style_Container="'height: 40px; font-size: 16px;'"
						 :placeholder="'请选择办理状态'" @change="selectChange">
						</xfl-select>
					</view>
				</view>
				<view class="item_box">
					<view class="item">
						<text class="name">办理记录</text>
						<input class="value" type="text" v-model="form.srRemarks" placeholder="请输入办理记录" />
					</view>
				</view>
			</view>
			<view class="box_content">
				<text class="title">上传图片</text>
				<view style="padding: 10rpx;">
					<imageUp :aConnectionId="form.connectionId" :displayUp="true" :imageUrl="form.imgUrl" @resultUrl="resultUrl"></imageUp>
				</view>
			</view>

			<view style="display: flex;">
				<text style="flex: 1;text-align: center;background-color: #F0AD4E; padding: 20rpx 30rpx;border-radius: 10rpx;color: #fff;font-size: 32rpx;margin-right:10rpx"
				 @click="submit">提交</text>

			</view>
		</view>


		<carDetails :carData="carData"></carDetails>

	</view>
</template>

<script>
	import {
		confirmationModApply
	} from '@/utils/interface.js'
	import carDetails from '@/pages/common/carDetails.vue';
	import imageUp from '@/pages/common/imageUp.vue';
	import xflSelect from '@/components/xfl-select/xfl-select.vue';
	export default {
		components: {
			carDetails,
			imageUp,
			xflSelect
		},
		data() {
			return {
				carData: '', //详情数据
				list: [{
						value: '流转',
						id: 1
					},
					{
						value: '办理成功',
						id: 2
					},
					{
						value: '办理失败',
						id: 3
					},
				],
				form: {
					applyType: '', //办理状态
					maId: '', //单子id
					connectionId: '',
					imgUrl: '', //图片路径
					srRemarks: '', //办理记录
				},
			}
		},

		onLoad: function(options) {
			this.carData = options.str
			let obj = JSON.parse(options.str)
			this.form.maId = obj.maId
			this.form.connectionId = obj.maConnectionId
		},

		methods: {
			// 办理人员选中时触发
			selectChange(val) {
				this.form.applyType = val.orignItem.id
			},

			// 上传成功回调
			resultUrl(e) {
				this.form.imgUrl = e.data.url //图片路径
			},

			// 提交
			submit() {
				let form = this.form
				if (form.applyType === '') {
					uni.showToast({
						title: '请选择办理状态',
						duration: 2000,
						icon: 'none',
					});
				} else if (form.srRemarks === '') {
					uni.showToast({
						title: '请输入办理记录',
						duration: 2000,
						icon: 'none',
					});

				} else if (form.imgUrl === '' && form.applyType === 2) {
					uni.showToast({
						title: '请上传它证',
						duration: 2000,
						icon: 'none',
					});
				} else {
					uni.showModal({
						title: `确认提交?`,
						success: function(res) {
							if (res.confirm) {
								confirmationModApply(this.form).then(res => {
									uni.showToast({
										title: '提交成功',
										duration: 2000,
									});
									uni.reLaunch({
										url: './processing'
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
