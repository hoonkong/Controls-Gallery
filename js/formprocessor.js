var FormProcessor;

(function (FormProcessor) {
	var Processor;
	(function (Processor) {
		var formInfo;

		var processSelects = function (form) {
			var selects = form.getElementsByTagName("select");

			for (var i = 0; i < selects.length; i++) {
				var options = selects[i].options;

				if (options.length) {
					var name = selects[i].getAttribute("name");
					formInfo[name] = [];
					for (var j = 0; j < options.length; j++) {
						options[j].selected && formInfo[name].push(options[j].value);
					}
				}
			}

			console.log(formInfo);
		}

		var processRadioButtons = function (form) {
			var inputs = form.querySelectorAll("input[type=radio]");
			for (var i = 0; i < inputs.length; i++) {
				if (inputs[i].checked)
				{
					formInfo[inputs[i].name] = inputs[i].value;
					break;
				}
			}
		}

		var processCheckBoxes = function (form) {
			var inputs = form.querySelectorAll("input[type=checkbox]");
			var name;
			for (var i = 0; i < inputs.length; i++) {
				name = inputs[i].name;
				if (!formInfo[name]) {
					formInfo[name] = [];
				}

				if (inputs[i].checked)
				{
					formInfo[name].push(inputs[i].value);
				}
			}
		}

		var processInputBoxes = function (form) {
			var inputs = form.querySelectorAll("input[type=text]");
			for (var i = 0; i < inputs.length; i++) {
				formInfo[inputs[i].name] = inputs[i].value;
			}
		}

		var processSubmit = function (evtArgs) {
			evtArgs.preventDefault();

			var form = evtArgs.target;
			formInfo = {};
			processSelects(form);

			return false;
		};

		//var form = document.getElementById(formId);
		//form.addEventListener("submit", processSubmit);

		Processor.processSubmit = processSubmit;
	})(Processor || (Processor = {}));

	var init = function (formId) {
		//processors = {};
		//processors[formId] = new Processor(formId);

		var form = document.getElementById(formId);
		form.addEventListener("submit", Processor.processSubmit);
	}

	FormProcessor.init = init;
})(FormProcessor || (FormProcessor = {}));

FormProcessor.init("myFrom");
FormProcessor.init("myFrom1");