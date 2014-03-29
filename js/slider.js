var Slider;
(function (Slider) {
	var sliderTemplate = '<svg width="{width}" height="{height}">';
	sliderTemplate += '<line x1="0" y1="{radius}" x2="{width}" y2="{radius}" stroke="black" stroke-width="2"/>';
	sliderTemplate += '<circle cx="{start}" cy="{radius}" r="{radius}" style="fill:red;"></svg>';

	var createSliderControl = function (container) {
		var label = container.getAttribute("data-label");
		var minVal = container.getAttribute("data-min");
		var maxVal = container.getAttribute("data-max");
		var width = container.getAttribute("data-width");
		var start = container.getAttribute("data-start");
		var options = container.getAttribute("data-options");
		var pointerRadius = parseInt(container.getAttribute("data-pointerRadius")) || 4;

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

		var renderControl = function () {
			var svgTemplate = sliderTemplate.replace(/{width}/g, width)
											.replace(/{height}/g, pointerRadius * 2)
											.replace(/{start}/g, start)
											.replace(/{radius}/g, pointerRadius);
			container.innerHTML = svgTemplate;
		}

		var setUpMouseEvents = function () {
			var isPointerAttached = false;

			var pointer = container.getElementsByTagName("circle")[0];

			var svg = container.getElementsByTagName("svg")[0];

			pointer.addEventListener("mousedown", function () {
				isPointerAttached = true;
			})

			pointer.addEventListener("mouseup", function () {
				isPointerAttached = false;
			})

			svg.addEventListener("mousemove", function(evt) {
				if (isPointerAttached)
				{
					console.debug(evt.pageX);
					var startX = pointer.getAttribute("x") || pointer.getAttribute("cx");
					var dx = evt.pageX - parseInt(startX);
					pointer.setAttribute("transform", "translate(" + dx+ ", 0)");
					pointer.setAttribute("x", dx);
					//pointer.setAttribute("x", evt.pageX);
					slideMoveCallback && slideMoveCallback(); 
				}
			});

			pointer.addEventListener("mousemoveend", function(evt) {
				slideEndCallback && slideEndCallback(); 
			});
		}

		renderControl();
		setUpMouseEvents();
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