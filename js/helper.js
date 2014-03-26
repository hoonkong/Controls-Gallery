var Helper;

(function (Helper) {
	var parseCallbackFunction = function (callbackName) {
		if (!callbackName) {
			return null;
		}

		var callbackFunc = null;
		var cbLookup = callbackName.split(".");

		if (cbLookup.length > 1) {
			var cbFunc = null;
			switch (cbLookup.length) {
				case 2:
					cbFunc = window[cbLookup[0]][cbLookup[1]];
					break;
				case 3:
					cbFunc = window[cbLookup[0]][cbLookup[1]][cbLookup[2]];
					break;
				case 4:
					cbFunc = window[cbLookup[0]][cbLookup[1]][cbLookup[2]][cbLookup[3]];
					break;
				case 5:
					cbFunc = window[cbLookup[0]][cbLookup[1]][cbLookup[2]][cbLookup[3]][cbLookup[4]];
					break;
				case 6:
					cbFunc = window[cbLookup[0]][cbLookup[1]][cbLookup[2]][cbLookup[3]][cbLookup[4]][cbLookup[5]];
					break;
				default:
					break;
			}

			callbackFunc = typeof cbFunc === "function" && cbFunc;
		} else {
			callbackFunc = typeof window[callbackName] === "function" && window[callbackName]
		}

		return callbackFunc;
	}

	Helper.parseCallbackFunction = parseCallbackFunction;
})(Helper || (Helper = {}))