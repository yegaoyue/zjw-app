<template>
	<view>
		<text v-if="carList.length == 0" style="font-size: 35rpx;color:#708090; display: inline-block;position:absolute;top: 45%; left: 50%;  transform: translate(-50%, -50%);">
			-----暂无数据-----
		</text>
		<uni-list v-for="item in carList" :border="false" style="border-top: 1px solid #ccc;">
			<uni-list-item :title="item.label" link @click="carSeries(item)"></uni-list-item>
		</uni-list>

	</view>
</template>

<script>
	import {
		getSeriesByIdForApp
	} from '@/utils/interface.js';
	export default {

		data() {
			return {
				str: '',
				carList: [],




			}
		},
		onLoad: function(options) {
			// 品牌字段添加到对象集合
			let obj = JSON.parse(options.str)
			obj.maBrandName = options.name
			this.str = JSON.stringify(obj)


			// 车系
			getSeriesByIdForApp({
				brandId: options.id
			}).then(res => {
				if (res[1].data.code === 0) {
					this.carList = res[1].data.data
				}

			})

		},
		methods: {
			carSeries(val) {
				uni.navigateTo({
					url: `./carYear?str=${this.str}&id=${val.id}&name=${val.label}`
				})
			}
		}
	}
</script>

<style>
</style>
