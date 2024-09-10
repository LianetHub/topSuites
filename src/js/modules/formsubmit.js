export const formSubmit = () => {
	const forms = document.querySelectorAll("form");
	forms.forEach((form) => {
		form.addEventListener("submit", formSend);

		if (!form.querySelector('[name="capcha"]')) {
			form.insertAdjacentHTML(
				"beforeend",
				'<input type="hidden" name="capcha" value="' +
				navigator.userAgent +
				'"/>'
			);
		}
	});

	async function formSend(e) {
		const form = e.target;
		const currentUrl = form.getAttribute("action");

		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);

		if (error === 0) {
			/*form send script*/
			form.classList.add("_sending");
			let response = await fetch(currentUrl, {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				let result = await response.json();
				form.reset();
				form.classList.remove("_sending");

				console.log('succes');
				getSucces(form);

				// if (result.status) {
				// 	succes(result);
				// } else {
				// 	fail(result.message);
				// }
			} else {
				// fail();
				console.log('fail');
				// getSucces(form);
				form.classList.remove("_sending");
			}
			/*form send script*/
		} else {
			/*required fields*/
			/*required fields*/
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = form.querySelectorAll("[data-required]");

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.name == "email") {
				if (!emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.name == "name") {
				if (input.value === "") {
					formAddError(input);
					error++;
				}
			} else if (input.name == "message") {
				if (input.value.length < 1) {
					formAddError(input);
					error++;
				}
			} else if (input.name == "phone") {
				if (!phoneTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.name == "privacy") {
				if (!input.checked) {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add("_error");
		input.classList.add("_error");
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove("_error");
		input.classList.remove("_error");
	}

	function emailTest(input) {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let result = re.test(String(input.value).toLowerCase());
		return result;
	}

	function phoneTest(input) {
		let value = input.value.length > 0 ? input.value.match(/\d/g).join('') : input.value;

		return /^\d[\d\(\)\-]{4,14}\d$/g.test(value);
	}


	function getSucces(form) {
		const formBody = form.closest('[data-form-body]');
		const succesBlock = formBody.parentElement.querySelector('[data-form-succes]');

		formBody.classList.add('hidden');
		succesBlock.classList.add('visible');

	}

	// function succes(result) {
	// 	if (document.querySelector(".popup.open")) {
	// 		document.querySelector(".popup.open").classList.remove("open");
	// 	}

	// 	const modalStatus = document.getElementById("modal-form");
	// 	modalStatus.classList.add("open");
	// 	if (!document.body.classList.contains('lock')) {
	// 		bodyLocking();
	// 	}

	// 	const modalTitle = modalStatus.querySelector(".popup-status__title");
	// 	const modalSubtitle = modalStatus.querySelector(".popup-status__text");

	// 	modalTitle.innerHTML = result.header ? `<div class="popup-status__icon icon-check"></div>` + result.header : `<div class="popup-status__icon icon-check"></div>` + "Спасибо!";
	// 	modalSubtitle.innerHTML = result.message ? result.message : "Наш специалист свяжется с Вами";
	// }

	// function fail(message) {
	// 	if (document.querySelector(".popup.open")) {
	// 		document.querySelector(".popup.open").classList.remove("open");
	// 	}

	// 	const modalStatus = document.getElementById("modal-form");
	// 	modalStatus.classList.add("open");
	// 	if (!document.body.classList.contains('lock')) {
	// 		bodyLocking();
	// 	}

	// 	const modalTitle = modalStatus.querySelector(".popup-status__title");
	// 	const modalSubtitle = modalStatus.querySelector(".popup-status__text");

	// 	modalTitle.innerHTML = message ? "Ошибка" : "404/500";
	// 	modalSubtitle.innerHTML = message ? message : "Пожалуйста, попробуйте снова";
	// }
};
