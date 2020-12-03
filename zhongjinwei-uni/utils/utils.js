var utils = {}
utils.isTrueValidateCodeBy18IdCard = (idCard) => {
	if (idCard.length !== 18) {
		return
	}
	var a_idCard = idCard.split("")
	var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
	var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
	var sum = 0; // 声明加权求和变量
	if (a_idCard[17].toLowerCase() == "x") {
		a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
	}
	for (var i = 0; i < 17; i++) {
		sum += Wi[i] * a_idCard[i]; // 加权求和
	}
	let valCodePosition = sum % 11; // 得到验证码所位置
	if (a_idCard[17] == ValideCode[valCodePosition]) {
		return true;
	} else {
		return false;
	}
}

utils.digitalConversion = function(num) {
	var num1 = "";
	var num = (num || 0).toString(),
		result = "";
	if (num.indexOf(".") > -1) {
		num1 = num.split(".")[1];
		num = num.split(".")[0];
	}
	while (num.length > 3) {
		result = "," + num.slice(-3) + result;
		num = num.slice(0, num.length - 3);
	}
	if (num) {
		result = num + result;
	}
	if (num1 != "") {
		console.log()
		if (num1.length == 1) {
			num1 += '0'
		}
		return result + "." + num1;
	} else {
		return result + '.00';
	}
}

export default utils
