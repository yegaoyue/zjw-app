<template>
	<view>
		<uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list>
	</view>
</template>

<script>
	import {
		getBrandsListForApp
	} from '@/utils/interface.js';
	import uniIndexedList from "@/components/uni-indexed-list/uni-indexed-list.vue";
	export default {
		components: {
			uniIndexedList
		},
		data() {
			return {
				str: '',
				list: []
			}
		},
		onLoad: function(options) {
			//车辆品牌
			getBrandsListForApp().then(res => {
				// console.log(res[1].data.data)
				if (res[1].data.code === 0) {
					this.list = res[1].data.data
				}
			})

			this.str = options.str
			// console.log(this.str)
		},

		methods: {
			bindClick(val) {
				let obj = val.item.name
				uni.navigateTo({
					url: `./carSeries?str=${this.str}&id=${obj.id}&name=${obj.label}`
				})

			}
		}
	}
</script>

<style>

</style>
