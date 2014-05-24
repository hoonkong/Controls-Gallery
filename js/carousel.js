var Carousel;

(function (Carousel) {
	var createCardContent = function (cardContainer, data) {
		var title = document.createElement("p");
		title.appendChild(document.createTextNode(data.title));
		var img = document.createElement("img");
		img.src = data.imgUrl;
		var desc = document.createElement("p");
		desc.appendChild(document.createTextNode(data.description));
		cardContainer.appendChild(title);
		cardContainer.appendChild(img);
		cardContainer.appendChild(desc);
	}

	var render = function (container, data) {
		if (!data) {
			return;
		}

		var card = document.createElement("div");
		if (data.content) {
			card.innerHtml = data.content;
		} else {
			createCardContent(card, data);
		}

		container.appendChild(card);
	}

	var init = function () {
		var controls = document.querySelectorAll("data-control");
		for (var i = 0; i < controls.length; i++) {
			var controlName = controls[i].getAttribute("data-control");
			if (controlName.toLowerCase() === "carousel") {
				var carouselDataStr = controls[i].getAttribute("data-carousel");
				var carouselDataObj = JSON.parse(carouselDataStr);
				render(controls[i], carouselDataObj);
			}
		}
	}

	var showNext = function () {

	}

	var showPrev = function () {

	}
})(Carousel || (Carousel = {}));