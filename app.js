var app = angular.module("HangmanApp",[]);
app.controller("GameController",["$scope", function($scope){
	var words = ["awkward","Bagpipes","dwarf","fishhook","Haphazard","Gazebo","jukebox","Memento","Numbskull","Ostracize","Rhythmic","zigzag","Zealous","Yacht"];
	var clues = ["Causing Or Feeling Uneasy Embarrassment or inconvenience","a woodwind instrument using enclosed reeds fed from","a human-shaped entity that dwells in mountains and in the earth","a device for catching fish","lacking any obvious principle of organization","a pavilion structure, sometimes octagonal or turret-shaped","a partially automated music-playing device","an object kept as a reminder of a person or event","a stupid or foolish person","exclude from a society or group","occurring regularly","a line or course having abrupt alternate right and left turns","having or showing zeal","a medium-sized sailing boat equipped for cruising or racing"]
	$scope.incorrectLetterChosen = [];
	$scope.correctLetterChosen = [];
	$scope.guesses = 10;
	$scope.displayWord = '';
	$scope.input = {
		letter : ''
	}
	var selectRandomWord = function(){
		var index = Math.round(Math.random()*words.length);
		return index;
	}
	var newGame = function(){
		$scope.incorrectLetterChosen = [];
		$scope.correctLetterChosen = [];
		$scope.guesses = 10;
		$scope.displayWord = '';

		selectedIndex = selectRandomWord();
		selectedWord = words[selectedIndex];
		$scope.clues = clues[selectedIndex].toUpperCase();
		var tempDisplayWord = '';
		for (var i = selectedWord.length - 1; i >= 0; i--) {
			tempDisplayWord+='*';
		}
		$scope.displayWord = tempDisplayWord;
	}

	$scope.letterChosen = function(){
		for (var i = $scope.correctLetterChosen.length - 1; i >= 0; i--) {
			if($scope.correctLetterChosen[i].toUpperCase()==$scope.input.letter.toUpperCase()){
				$scope.input.letter = "";
				return;
			}
		}

		for (var i = $scope.incorrectLetterChosen.length - 1; i >= 0; i--) {
			if($scope.incorrectLetterChosen[i].toUpperCase()==$scope.input.letter.toUpperCase()){
				$scope.input.letter = "";
				return;
			}
		}

		var correct = false;
		for (var i = selectedWord.length - 1; i >= 0; i--) {
			if(selectedWord[i].toUpperCase()==$scope.input.letter.toUpperCase()){
				$scope.displayWord = $scope.displayWord.slice(0,i)+$scope.input.letter.toUpperCase()+$scope.displayWord.slice(i+1);
				correct = true;
			}
		}
		if(correct){
			$scope.correctLetterChosen.push($scope.input.letter.toUpperCase());
		}else{
			$scope.incorrectLetterChosen.push($scope.input.letter.toUpperCase());
			$scope.guesses--;
		}
		$scope.input.letter="";
		if ($scope.guesses ==0) {
			alert("You Lost ohhh!");
			newGame();
		}
		if($scope.displayWord.indexOf("*")==-1){
			alert("You Won yeah!!"); 
		}
	}

	newGame();
}]);