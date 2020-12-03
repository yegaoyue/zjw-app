<template>
	<view>
		<text v-if="carList.length == 0" style="font-size: 35rpx;color:#708090; display: inline-block;position:absolute;top: 45%; left: 50%;  transform: translate(-50%, -50%);">
			-----暂无数据-----
		</text>
		<uni-list v-for="item in carList" :border="false" style="border-top: 1px solid #ccc;">
			<uni-list-item :title="item.scCarname" link @click="carSeries(item)"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import {
		getCarInfo
	} from '@/utils/interface.js';

	export default {
		data() {
			return {
				str: '',
				carList: []


			}
		},
		onLoad: function(options) {
			this.str = options.str


			// 类型
			getCarInfo({
				seriesId: options.carSeriesId,
				inssueYear: options.id
			}).then(res => {
				if (res[1].data.code === 0) {
					this.carList = res[1].data.data
				}

			})
		},
		methods: {
			carSeries(val) {
				let obj = JSON.parse(this.str)
				obj.maManufacturer = val.ssManufacturer //制造商
				obj.maCarName = val.scCarname //车型
				obj.maIssueYear = val.scIssueyear //生产日期
				obj.maDriveType = val.scDriveType //驱动形式
				this.str = JSON.stringify(obj)
				if (obj.maId === undefined) {
					// 添加申请单页面
					uni.reLaunch({
						url: `./requisitionAdd?str=${this.str}`
					})
				} else {
					// 修改申请单页面
					uni.reLaunch({
						url: `./requisitionModify?str=${this.str}`
					})

				}

			}
		}
	}
</script>

<style>
</style>
