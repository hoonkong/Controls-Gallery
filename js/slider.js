var Slider;

(function (Slider) {
	var sliderTemplate = '<svg width="{width}" height="{height}" class="slider">';
	sliderTemplate += '<line x1="0" y1="{radius}" x2="{width}" y2="{radius}" />';
	sliderTemplate += '<circle cx="{start}" cy="{radius}" r="{radius}" />';
	sliderTemplate += '<text x="0" y="{labelY}">Sample</text>';
	sliderTemplate += '</svg>';

	var createSliderControl = function (container) {
		var label = container.getAttribute("data-label");
		var minVal = container.getAttribute("data-min") || 0;
		var maxVal = container.getAttribute("data-max") || 10;
		var width = container.getAttribute("data-width") || 100;
		var start = container.getAttribute("data-start") || 0;
		var options = container.getAttribute("data-options");
		var pointerRadius = parseInt(container.getAttribute("data-pointerRadius")) || 6;

		var handlerName = container.getAttribute("event:onslideend");
		var slideEndCallback = Helper.parseCallbackFunction(handlerName);

		handlerName = container.getAttribute("event:onslidemove");
		var slideMoveCallback = Helper.parseCallbackFunction(handlerName);

		handlerName = container.getAttribute("event:onslidestart");
		var slideStartCallback = Helper.parseCallbackFunction(handlerName);

		var renderControl = function () {
			var svgTemplate = sliderTemplate.replace(/{width}/g, width)
											.replace(/{height}/g, pointerRadius * 2 + 10)
											.replace(/{start}/g, start)
											.replace(/{radius}/g, pointerRadius)
											.replace(/{labelY}/g, pointerRadius + 10);
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
				if (truePosition >= 0 && truePosition <= width)
				{
					pointer.setAttribute("transform", "translate(" + dx + ", 0)");
					slideMoveCallback && slideMoveCallback();				
				}				
			};

			var mouseupHandler = function () {
				isPointerAttached = false;
				slideEndCallback && slideEndCallback();
				document.removeEventListener("mousemove", mousemoveHandler);
				document.removeEventListener("mouseup", mouseupHandler);
			}

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