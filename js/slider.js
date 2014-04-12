var Slider;

(function (Slider) {
	var sliderTemplate = '<span class="sliderLabel">{minVal}</span>';
	sliderTemplate += '<svg width="{svgWidth}" height="{height}" class="slider">';
	sliderTemplate += '<line x1="{scaleBarPosX}" y1="{radius}" x2="{width}" y2="{radius}" />';
	sliderTemplate += '<circle cx="{start}" cy="{radius}" r="{radius}" />';
	//sliderTemplate += '<text x="0" y="{labelY}">{minVal}</text>';
	//sliderTemplate += '<text x="{labelX}" y="{labelY}">{maxVal}</text>';
	sliderTemplate += '</svg>';
	sliderTemplate += '<span class="sliderLabel">{maxVal}</span>';

	var createSliderControl = function (container) {
		var label = container.getAttribute("data-label");
		var minVal = parseInt(container.getAttribute("data-min")) || 0;
		var maxVal = parseInt(container.getAttribute("data-max")) || 10;
		var width = parseInt(container.getAttribute("data-width")) || 100;
		var start = parseInt(container.getAttribute("data-start")) || 0;
		var options = container.getAttribute("data-options");
		var pointerRadius = parseInt(container.getAttribute("data-pointerRadius")) || 6;

		var svgWidth = width + pointerRadius;
		var scaleBarPosX = pointerRadius;
		var trueStart = start + pointerRadius;
		var trueWidth = width - pointerRadius;

		var handlerName = container.getAttribute("event:onslideend");
		var slideEndCallback = Helper.parseCallbackFunction(handlerName);

		handlerName = container.getAttribute("event:onslidemove");
		var slideMoveCallback = Helper.parseCallbackFunction(handlerName);

		handlerName = container.getAttribute("event:onslidestart");
		var slideStartCallback = Helper.parseCallbackFunction(handlerName);

		var renderControl = function () {
			var svgTemplate = sliderTemplate.replace(/{svgWidth}/g, svgWidth)
											.replace(/{width}/g, width)
											.replace(/{scaleBarPosX}/g, scaleBarPosX)
											.replace(/{minVal}/g, minVal)
											.replace(/{maxVal}/g, maxVal)
											.replace(/{height}/g, pointerRadius * 2)
											.replace(/{start}/g, trueStart)
											.replace(/{radius}/g, pointerRadius)
											.replace(/{labelY}/g, pointerRadius + 12)
											.replace(/{labelX}/g, width - 13);
			container.innerHTML = svgTemplate;
		};

		var setUpMouseEvents = function () {
			var pointer = container.getElementsByTagName("circle")[0];
			var svg = container.getElementsByTagName("svg")[0];

			var mousedownHandler = function () {
				document.addEventListener("mouseup", mouseupHandler);
				document.addEventListener("mousemove", mousemoveHandler);			
			};

			var mousemoveHandler = function (evt) {				
				var startX = pointer.getAttribute("cx");
				var dx = evt.pageX - parseInt(startX) - pointerRadius;
				var truePosition = dx + parseInt(start);
				if (truePosition >= 0 && truePosition <= trueWidth)
				{
					pointer.setAttribute("transform", "translate(" + dx + ", 0)");
					slideMoveCallback && slideMoveCallback(truePosition);				
				}				
			};

			var mouseupHandler = function () {
				isPointerAttached = false;
				slideEndCallback && slideEndCallback();
				document.removeEventListener("mousemove", mousemoveHandler);
				document.removeEventListener("mouseup", mouseupHandler);
			};

			pointer.addEventListener("mousedown", mousedownHandler);			
		};

		renderControl();
		setUpMouseEvents();
	}

	Slider.createSliderControl = createSliderControl;
})(Slider || (Slider = {}));


(function (Slider) {
	var slidersOnPage;

	var init = function () {
		slidersOnPage = document.querySelectorAll("div[data-control=slider]");

		var numSliders = slidersOnPage.length;
		for (var i = 0; i < numSliders; i++) {
			Slider.createSliderControl(slidersOnPage[i]);
		}
	}

	init();
})(Slider || (Slider = {}));