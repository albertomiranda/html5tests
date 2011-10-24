define(['Voxine/tools/Tools.class'], function (Tools, data) {
	
	var whatever = function() {
		alert(Tools.getM());
		Tools.setM('rgsdfgnn');
	}
	return {
		whatever : whatever
	}
});