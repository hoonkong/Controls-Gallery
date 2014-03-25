var Slider;
(function (Slider) {
	var SliderControl = function (element) {
		console.debug("creating " + element.getAttribute("data-label"))
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