<template>
	<view class="tab-bar">
		<view v-for="(item,index) in list" :key="index" class="tab-bar-item" @click="switchTab(item, index)">
			<view class="icon" :class="[item.fontIcon , selected == index ? 'selectedColor' : 'color']"></view>
			<!-- <image class="tab_img" :src="selected === index ? item.selectedIconPath : item.iconPath"></image> -->
			<view class="tab_text" :style="{color: selected == index ? selectedColor : color}">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selected: '', //点击tabBar-index
				color: "#909399",
				selectedColor: "#2bb7aa",
				list: [
					// {
					// 	pagePath: "/pages/entrustedAgency/upcoming/upcoming",  //页面路径
					// 	iconPath: "/static/images/home1.png",  //tabBar图1
					// 	selectedIconPath: "/static/images/home2.png",  //tabBar图2
					// 	text: "待办",  //tabBar标题
					// 	fontIcon: "iconfont icon-home-fill"  //字体图标
					// },

				]
			}
		},

		created() {
			try {
				const value = uni.getStorageSync('index');
				if (value) {
					this.selected = value
				}
			} catch (e) {
				// error
			}

			let that = this
			uni.getStorage({
				key: 'tabbarList',
				success(res) {
					that.list = res.data;
				}
			})


		},

		methods: {
			switchTab(item, index) {
				uni.setStorage({
					key: 'index',
					data: index

				})

				let url = item.pagePath;
				uni.reLaunch({
					url
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		background: white;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: env(safe-area-inset-bottom); // 适配iphoneX的底部

		.tab-bar-item {
			flex: 1;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.icon {
				font-size: 40rpx;
			}

			.selectedColor {
				color: #2bb7aa;
			}

			.color {
				color: #909399,
			}

			.tab_img {
				width: 37rpx;
				height: 41rpx;
			}

			.tab_text {
				font-size: 22rpx;
				margin-top: 9rpx;
			}
		}
	}
</style>
