var Selector;

(function (Selector) {
	var selectorsOnPage;

	var singleSelect = function () {
		console.log("single select");
	}

	var multiSelect = function () {
		console.log("multi select");
	}

	var init = function () {
		selectorsOnPage = document.querySelectorAll("select[data-control=selector]");

		for (var i = 0; i < selectorsOnPage.length; i++) {
			if (selectorsOnPage[i].multiple) {
				multiSelect(selectorsOnPage[i]);
			} else {
				singleSelect(selectorsOnPage[i]);
			}
		}
	}

	Selector.init = init;
})(Selector || (Selector = {}));

Selector.init();