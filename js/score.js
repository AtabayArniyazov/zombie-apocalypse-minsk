// ==========================================================================================
// let scoretorage = new tAJAXStorage();

// let score = document.querySelector(".score");

// score.onclick = function() {
// 	this.innerHTML = '';
	
// 	var answer;
// 	var answer2 = drinkStorage.getKeys();
// 	var tempArr = [];

// 	for (var i = 0; i < answer2.length; i++) {
// 		answer = drinkStorage.getValue(answer2[i]);
// 		tempArr.push([answer2[i], answer.recipe]);
// 	}

// 	tempArr.sort(sortFunction);
// 	tempArr.reverse();

// 	for (var i = 0; i < tempArr.length; i++) {

// 		this.innerHTML += i + ') ' + tempArr[i].join(' - ') + '<br>';
// 	}

// 	function sortFunction(a, b){
// 	  if(a[1] < b[1])
// 	     return -1;
// 	  if(a[1] > b[1])
// 	     return 1;
// 	  return 0
// 	}
// }
// ==========================================================================================