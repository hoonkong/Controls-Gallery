var FormProcessor;

(function (FormProcessor) {
	function Processor(formId) {
		var processSelects = function (form) {
			var selects = form.getElementByTags("select");
		}

		var processSubmit = function (evtArgs) {
			evtArgs.preventDefault();

			var form = evtArgs.target;
			processSelects(form);

			return false;
		};

		var form = document.getElementById(formId);
		form.addEventListener("submit", processSubmit);
	}

	var processors;

	var init = function (formId) {
		processors = {};
		processors[formId] = new Processor(formId);
	}

	FormProcessor.init = init;
})(FormProcessor || (FormProcessor = {}));

FormProcessor.init("myFrom");