/**
 * selects HTML DOM element(s) and optionally changes their styles
 * @param {string} element [required] the element(s) that is/are going to be selected
 * @param {object} styles [optional] an object containing style(s) that is/are going to be applied to the element(s) [default = null]
 * @returns returns HTML DOM element(s) in type of HTMLElement or NodeList
 * @example _("div", { display: "flex" });
 */
function _(element, styles = null) {
	let el = document.querySelectorAll(element);

	if (styles !== null) {
		el.forEach(function (item) {
			for (let key of Object.keys(styles)) {
				item.style[key] = styles[key];
			}
		});
	}

	if (el.length === 1) {
		el = document.querySelector(element);
	}

	return el;
}

/**
 * toggles between values of the property (display/visibility) of an element(s). optionally it can also toggle the opacity too.
 * @param {string} property [optional] the property that is going to be toggled between its values (display/visibility) [default = display]
 * @param {boolean} opacity [optional] a boolean that specifies wether the opacity is going to change or not [default = false]
 * @example _("div").toggle("visibility", true);
 */
function toggle(property = "display", opacity = false) {
	let propSwitch;
	switch (property) {
		case "display":
			propSwitch = ["none", "block"];
			break;
		case "visibility":
			propSwitch = ["hidden", "visible"];
			break;
	}
	if (this.nodeType === Node.ELEMENT_NODE) {
		if (opacity) {
			this.style.opacity = window.getComputedStyle(this).getPropertyValue("opacity");
			if (this.style.opacity == 0) {
				this.style.opacity = 1;
			} else {
				this.style.opacity = 0;
			}
		}
		this.style[property] = window.getComputedStyle(this).getPropertyValue(property);
		if (this.style[property] == propSwitch[0]) {
			this.style[property] = propSwitch[1];
		} else {
			this.style[property] = propSwitch[0];
		}
	} else {
		if (opacity) {
			this.forEach((el) => {
				el.style.opacity = window.getComputedStyle(el).getPropertyValue("opacity");
				if (el.style.opacity == 0) {
					el.style.opacity = 1;
				} else {
					el.style.opacity = 0;
				}
			});
		}
		this.forEach((el) => {
			el.style[property] = window.getComputedStyle(el).getPropertyValue(property);
			if (el.style[property] == propSwitch[0]) {
				el.style[property] = propSwitch[1];
			} else {
				el.style[property] = propSwitch[0];
			}
		});
	}
}

Object.assign(Element.prototype, { toggle });
Object.assign(NodeList.prototype, { toggle });

/**
 * sends an asynchronous request to an url and returns the xhttp object to a function
 * @param {any} func [required] the call back function that will receive the xhttp object
 * @param {string} url [required] the url that the asynchronous request is going to fetch the response
 * @param {string} param [optional] the parameter(s) that is/are going to be sent
 * @param {boolean} post [optional] send as POST method [default = false]
 * @returns returns the xhttp response object
 * @example $(myFunction, "example.php", "name=david", true);
 */
function $(func, url, param = null, post = false) {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			func(this);
		}
	};

	if (post === false) {
		if (param === null) {
			xhttp.open("GET", url, true);
		} else {
			xhttp.open("GET", url + "?" + param, true);
		}
		xhttp.send();
	} else if (post === true) {
		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		if (param === null) {
			xhttp.send();
		} else {
			xhttp.send(param);
		}
	}
}
