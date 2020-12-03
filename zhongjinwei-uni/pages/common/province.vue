<template>
	<view>
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<view class="cell-tit clamp">上牌地区</view>
				<text class="cell-tip" @click="toggleMaskLocation()">
					<text class="choose-text">{{addressByPcrs}}</text>
					<text class="iconfont icon-xiangxia"></text>
				</text>
			</view>
		</view>
		<gk-city :headtitle="headtitle" :provincedata="provincedata" :data="selfData" mode="cityPicker" ref="cityPicker"
		 @funcvalue="getpickerParentValue" :pickerSize="2"></gk-city>
	</view>
</template>

<script>
	import provinceData from './city.data.js';
	export default {
		props: ['provinceStr', 'provinceBisabled'],
		data() {
			return {
				provincedata: [{
					text: '',
					value: '',
				}, ],
				selfData: provinceData,
				headtitle: "请选择所在地",
				addressByPcrs: "请选择所在地"
			}
		},

		created() {
			if (this.provinceStr !== ' ') {
				this.addressByPcrs = this.provinceStr
			}
		},

		methods: {
			toggleMaskLocation() {
				if (!this.provinceBisabled) {
					this.$refs["cityPicker"].show();
				}
			},
			getpickerParentValue(data) {
				this.provincedata = data;
				this.addressByPcrs = data[0].text + " " + data[1].text
				this.$emit('emitProvince', this.provincedata)
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* 头条小程序组件内不能引入字体 */
	.yt-list {
		background: #fff;
	}

	.yt-list-cell-warnning {
		display: flex;
		padding: 10rpx 30rpx 10rpx 40rpx;
		color: red;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 6px 12px 6px 13px;
		line-height: 70rpx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30rpx;
			right: 30rpx;

		}

		.gray {
			flex: 1;
			font-size: 28rpx;
			margin-right: 10rpx;
			height: 25px;
			line-height: 20px;
			color: gray;
		}

		.cell-icon {
			height: 32rpx;
			width: 32rpx;
			font-size: 28rpx;
			color: #fff;
			text-align: center;
			line-height: 32rpx;
			background: #f85e52;
			border-radius: 4rpx;
			margin-right: 12rpx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 28rpx;
			color: #000;
			margin-left: 8rpx;
			margin-right: -10rpx;
		}

		.cell-tit {
			flex: 1;
			font-size: 35rpx;
			color: #333333;
			margin-right: 10rpx;
		}

		.money {
			color: red;
			font-weight: bold;
			margin-left: 10px;
		}

		.picker-class {
			display: inline-block;
		}

		.cell-tip {
			font-size: 14px;
			color: #000;
			flex-direction: column;

			&.disabled {
				color: #000;
			}

			&.active {
				color: #4BB5ED;
			}

			&.red {
				color: red;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90rpx;
			}
		}

		.desc {
			flex: 1;
			font-size: 14px;
			color: #000;
		}
	}

	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		bottom: 0;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		-webkit-transform: scaleY(0.5);
		-ms-transform: scaleY(0.5);
		transform: scaleY(0.5);
		border-bottom: 1px solid #E4E7ED;
	}

	.red_color {
		color: red;
		display: inline-flex;
		padding-right: 6px;
	}
</style>
