'use strict';

function tAJAXStorage() {
	var self = this;

	self.hashStorage = {};
	
	$.ajax("https://fe.it-academy.by/AjaxStringStorage2.php",
		{type: "POST", cache: false, dataType: "json", data: {f: "READ", n: "Arniyazov_Atabay_Zombie_Apocalypse_Minsk"}, success: DataLoadedRead, error: ErrorHandler}
	);

	function DataLoadedRead(data) {			
		if (data !== " ") {
			self.hashStorage = JSON.parse(data.result);			
		} else if (data === " ") {
			$.ajax("https://fe.it-academy.by/AjaxStringStorage2.php",
				{type: "POST", cache: false, dataType: "json", data: {f: "INSERT", n: "Arniyazov_Atabay_Zombie_Apocalypse_Minsk", v: JSON.stringify(self.hashStorage)}, success: DataLoadedInsert, error: ErrorHandler}
			);

			function DataLoadedInsert(data) {

			}				
		}
	}

	self.addValue = function(key, value) {
		self.hashStorage[key] = value;
		addValueOnTheServer(self.hashStorage);
	}

	self.getValue = function(key) {
		if (key in self.hashStorage) {
			return self.hashStorage[key];
		} else {
			return undefined;
		}
	}

	self.deleteValue = function(key) {
		if (key in self.hashStorage) {
			delete self.hashStorage[key];
			addValueOnTheServer(self.hashStorage);
			return true;
		} else {
			return false;
		}
	}

	self.getKeys = function() {
		var keys = [];
		for (var key in self.hashStorage) {
			keys.push(key);
		}

		return keys;
	}
	// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// function that will store the modified hash on the server
	function addValueOnTheServer(hash) {
		var password = Math.random();

		$.ajax("https://fe.it-academy.by/AjaxStringStorage2.php",
			{type: "POST", cache: false, dataType: "json", data: {f: "LOCKGET", n: "Arniyazov_Atabay_Zombie_Apocalypse_Minsk", p: password}, success: DataLoadedLockget, error: ErrorHandler}
		);

		function DataLoadedLockget(data) {

			$.ajax("https://fe.it-academy.by/AjaxStringStorage2.php",
				{type: "POST", cache: false, dataType: "json", data: {f: "UPDATE", n: "Arniyazov_Atabay_Zombie_Apocalypse_Minsk", p: password, v: JSON.stringify(hash)}, success: DataLoadedUpdate, error: ErrorHandler}
			);

			function DataLoadedUpdate(data) {

			}
		}	
	}

	function ErrorHandler(jqXHR, StatusStr, ErrorStr) {
		console.log(StatusStr + " " + ErrorStr);
	}
	// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
}