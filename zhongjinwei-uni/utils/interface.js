import request from './request.js'
export let baseUrl = request.baseUrl
export let uploadUrl = request.uploadUrl



// 登入
export function loginApp(data) {
	return request.baseRequest({
		url: 'sys/loginApp',
		method: 'post',

	}, data)
}

// 确认打款
export function updateFinanceInfo(data) {
	return request.baseRequest({
		url: 'finance/updateFinanceInfo',
		method: 'post',

	}, data)
}

// 确认收款
export function confirmCollectionEntrusted(data) {
	return request.baseRequest({
		url: 'finance/confirmCollectionEntrusted',
		method: 'post',

	}, data)
}

// 申请单保存
export function addModApply(data) {
	return request.baseRequest({
		url: 'modApply/addModApply',
		method: 'post',

	}, data)
}

// 申请单修改
export function updateModApply(data) {
	return request.baseRequest({
		url: 'modApply/updateModApply',
		method: 'post',

	}, data)
}

// 申请单提报
export function updateModApplySubmit(data) {
	return request.baseRequest({
		url: 'modApply/updateModApplySubmit',
		method: 'post',

	}, data)
}

// 车管所
export function vehicleAdministration(data) {
	return request.baseRequest({
		url: 'dmv/getDmvForAdrress',
		method: 'post',

	}, data)
}

//车辆品牌
export function getBrandsListForApp(data) {
	return request.baseRequest({
		url: 'brands/getBrandsListForApp',
		method: 'get',

	}, data)
}

// 车系
export function getSeriesByIdForApp(data) {
	return request.baseRequest({
		url: 'serieses/getSeriesByIdForApp',
		method: 'get',

	}, data)
}

// 年份
export function getSeriesyearForApp(data) {
	return request.baseRequest({
		url: 'seriesyear/getSeriesyearForApp',
		method: 'get',

	}, data)
}

// 类型
export function getCarInfo(data) {
	return request.baseRequest({
		url: 'car/getCarInfo',
		method: 'get',

	}, data)
}

// 退出
export function logout(data) {
	return request.baseRequest({
		url: 'sys/user/logout',
		method: 'post',

	}, data)
}

// 修改密码
export function updatePassword(data) {
	return request.baseRequest({
		url: 'user/updatePassword',
		method: 'post',

	}, data)
}

// 申请单页面数据
export function getModApplyForApp(data) {
	return request.baseRequest({
		url: 'modApply/getModApplyForApp',
		method: 'get',

	}, data)
}

// 应付账单数据
export function handleMoneyForService(data) {
	return request.baseRequest({
		url: 'finance/handleMoneyForService',
		method: 'get',

	}, data)
}

// 收款账单数据
export function getFinanceEntrustedList(data) {
	return request.baseRequest({
		url: 'finance/getFinanceEntrustedList',
		method: 'get',

	}, data)
}

// 财务申请数量数据
export function getApplyFinance(data) {
	return request.baseRequest({
		url: 'finance/getApplyFinance',
		method: 'get',

	}, data)
}

// 委托机构申请数量数据
export function getApplyFinanceEntrusted(data) {
	return request.baseRequest({
		url: 'finance/getApplyFinanceEntrusted',
		method: 'get',

	}, data)
}

// 应收方银行信息
export function getFacilitatorInfoById(data) {
	return request.baseRequest({
		url: 'facilitator/getFacilitatorInfoById',
		method: 'get',

	}, data)
}


// 待办列表数据
export function getApplyListEntrusted(data) {
	return request.baseRequest({
		url: 'modApply/getApplyListEntrusted',
		method: 'get',

	}, data)
}

// 办理人员数据
export function getUserInfoBySfId(data) {
	return request.baseRequest({
		url: 'userinfo/getUserInfoBySfId',
		method: 'get',

	}, data)
}

// 办理中提交
export function confirmationModApply(data) {
	return request.baseRequest({
		url: 'modApply/confirmationModApply',
		method: 'get',

	}, data)
}

// 分配
export function distributionModApply(data) {
	return request.baseRequest({
		url: 'modApply/distributionModApply',
		method: 'get',

	}, data)
}

// 拒办
export function RefuseModApply(data) {
	return request.baseRequest({
		url: 'modApply/RefuseModApply',
		method: 'get',

	}, data)
}

// 菜单
export function getAppMenu(data) {
	return request.baseRequest({
		url: 'appMenu/getAppMenu',
		method: 'get',

	}, data)
}
