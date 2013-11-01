(function(window){
	// General utilities
	var doc = window.document,
			$ = function(selector){
				var result = doc.querySelectorAll(selector);
				return (result.length > 1) ? result : result[0];
			};

	Node.prototype.on = Node.prototype.addEventListener;
	NodeList.prototype.on = function(type, func, async) {
		[].forEach.call(this, function(node, index) {
			node.on(type, func, async);
		});
	};

	// App code starts here
	var AutoCompleter = {
		bindTo: $('#email'),
		domains: ["yahoo.com", "gmail.com", "google.com", "hotmail.com", "me.com", "aol.com", "mac.com", "live.com", "comcast.com", "googlemail.com", "msn.com", "hotmail.co.uk"],
		init: function(options) {
			this.bindTo = options.bindTo;
			this.addElements();
			this.bindEvents();
		},
		addElements: function() {
			// create the empty datalist
			this.dataList = doc.createElement('datalist');
			this.dataList.id = "email-options";
			this.bindTo.insertAdjacentElement("afterend", this.dataList);

			// corelate to the inpput
			this.bindTo.setAttribute('list', this.dataList.id);
		},
		bindEvents: function() {
			this.bindTo.on('keyup', this.testValue);
		},
		testValue: function(event) {
			var value = this.value;

			if(value.indexOf('@') !== -1) {
				value = value.split('@')[0];
				AutoCompleter.addDataList(value);
			} else {
				AutoCompleter.dataList.innerHTML = "";
			}
		},
		addDataList: function(value) {
			var i, newOptionsString, len = this.domains.length;

			for(i = 0; i < len; i++) {
				newOptionsString += '<option value="' + value + '@' + this.domains[i] + '">';
			}

			this.dataList.innerHTML = newOptionsString;
		}
	};

	AutoCompleter.init({ bindTo: $('#email') });

}(this));