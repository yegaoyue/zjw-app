<template>
	<view>
		<imgUpload :config="config" imgCount="1" :imgArr="imgArray" :displayUp="displayUp" :header="head" :formData="formData"
		 async @delImg="delImg" @result="resultUrl" :url="baseUrlImage+'sys/file/uploadName'"></imgUpload>
	</view>
</template>

<script>
	import {
		baseUrl,
		uploadUrl
	} from '@/utils/interface.js';
	import imgUpload from '@/components/poiuy-uImgUpload/imgUpload.vue';
	export default {
		props: ['aConnectionId', 'imageUrl', 'displayUp'],
		components: {
			imgUpload
		},
		data() {
			return {
				baseUrlImage: baseUrl,
				imgArray: [],
				head: [{
					token: uni.getStorageSync('toKen')
				}],

				config: {
					delIcon: '', //删除图片icon
					resultTip: true, //结果提示
					resultType: '1', //结果展示类型
					loadIcon: '', //加载时的图标
					loadText: '' //加载时的文字
				},

				formData: { //上传携带参数
					type: 'payment',
					aConnectionId: '',
				},

			}
		},

		watch: {
			// 上传id
			'aConnectionId': function(a) {
				this.formData.aConnectionId = a
			},


		},

		created() {
			if (this.imageUrl !== '') {
				let url = uploadUrl + this.imageUrl
				this.imgArray.push(url)
			}
			// 上传id
			if (this.aConnectionId !== '') {
				this.formData.aConnectionId = this.aConnectionId
			}

		},

		methods: {
			// 上传成功回调
			resultUrl(e) {
				this.$emit('resultUrl', e)
			},

			delImg(e) {
				this.imgArr.splice(e, 1) //为删除图片数组的下标
			}

		}
	}
</script>

<style>

</style>
