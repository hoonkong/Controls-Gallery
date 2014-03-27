var Slider;
(function (Slider) {
	var sliderTemplate = '<svg width="{width}" height="20">';
	sliderTemplate += '<line x1="0" y1="5" x2="{width}" y2="5" stroke="black" stroke-width="2"/>';
	sliderTemplate += '<circle cx="{start}" cy="5" r="4"></svg>';

	var createSliderControl = function (container) {
		var label = container.getAttribute("data-label");
		var minVal = container.getAttribute("data-min");
		var maxVal = container.getAttribute("data-max");
		var width = container.getAttribute("data-width");
		var start = container.getAttribute("data-start");

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

		var svgTemplate = sliderTemplate.replace(/{width}/g, width).replace(/{start}/g, start);
		container.innerHTML = svgTemplate;

		var pointer = container.getElementsByTagName("circle")[0];
		pointer.addEventListener("mousemove", function(evt) {
			console.debug(pointer.getAttribute("transform") + "," + evt.pageX);
			pointer.setAttribute("transform", "translate(" + evt.pageX + ", 0)");
			slideMoveCallback && slideMoveCallback(); 
		});

		pointer.addEventListener("mouseend", function(evt) {

			slideEndCallback && slideEndCallback(); 
		});
	}

	Slider.createSliderControl = createSliderControl;
})(Slider || (Slider = {}));


(function (Slider) {
	var slidersOnPage;

	var init = function () {
		slidersOnPage = document.querySelectorAll("div[data-control=slider]");
		console.debug(slidersOnPage.length);

		for (var i = 0; i < slidersOnPage.length; i++) {
			Slider.createSliderControl(slidersOnPage[i]);
		}
	}

	init();
})(Slider || (Slider = {}));