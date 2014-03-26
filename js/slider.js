var Slider;
(function (Slider) {
	var SliderControl = function (container) {
		var label = container.getAttribute("data-label");
		var minVal = container.getAttribute("data-min");
		var maxVal = container.getAttribute("data-max");

		var handlerName = container.getAttribute("event:onslideend");
		var slideEndCallback = Helper.parseCallbackFunction(handlerName);

		handlerName = container.getAttribute("event:onslidemove");
		var slideMoveCallback = Helper.parseCallbackFunction(handlerName);

		handlerName = container.getAttribute("event:onslidestart");
		var slideStartCallback = Helper.parseCallbackFunction(handlerName);

		console.debug("creating " + container.getAttribute("data-label"));
		console.debug(typeof window[container.getAttribute("event:onslideend")]);


		var handlerName = container.getAttribute("event:onslideend");

		var callback = Helper.parseCallbackFunction(handlerName);
		callback && callback();
	}

	Slider.SliderControl = SliderControl;
})(Slider || (Slider = {}));


(function (Slider) {
	var slidersOnPage;

	var init = function () {
		slidersOnPage = document.querySelectorAll("div[data-control=slider]");
		console.debug(slidersOnPage.length);

		for (var i = 0; i < slidersOnPage.length; i++) {
			new Slider.SliderControl(slidersOnPage[i]);
		}
	}

	init();
})(Slider || (Slider = {}));