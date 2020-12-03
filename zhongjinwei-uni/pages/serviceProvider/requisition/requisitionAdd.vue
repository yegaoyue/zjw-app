<template>
	<requisition :data="str"></requisition>
</template>

<script>
	import requisition from './requisition.vue'
	export default {
		components: {
			requisition
		},

		data() {
			return {
				str: '',


			}
		},


		onLoad: function(options) {
			if (options.str !== undefined) {
				this.str = options.str
			}
		},

		methods: {



		}
	}
</script>

<style lang="less" scoped>

</style>
