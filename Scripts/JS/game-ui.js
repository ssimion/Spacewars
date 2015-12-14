"use strict";
/** Wrap the canvas in Jquery
 */
$(function () {
	// Constants
	var g_background = document.getElementById('AnimatedBackground');
	var g_table = document.getElementById('board');
	var g_backgroundContext = g_background.getContext("2d");
	var g_NeedsRefresh = false;
	var g_gameWidth = 625;
	var g_gameHeight = 625;
	var g_currentWidth = g_gameWidth;
	var g_currentHeight = g_gameHeight;
	g_background.width = g_gameWidth;
	g_background.height = g_gameHeight;
	resize();
	/** Resize the screen according to the window size
	 * Based on the presentation slides.
	 */
	function resize() {
		var ratio = g_gameHeight / g_gameWidth;
		g_currentWidth = g_gameWidth;
		g_currentHeight = ratio * g_currentWidth;

		g_background.style.width = g_currentWidth + 'px';
		g_background.style.height = g_currentHeight + 'px';
		g_table.style.left = (window.innerWidth - g_table.offsetWidth) / 2 + 'px';
		g_background.style.left = (window.innerWidth - g_currentWidth) / 2 + 'px';

		// We use a timeout here because of some mobile browsers.
		window.setTimeout(function () {
			window.scrollTo(0, 1);
		}, 1);
	}

	window.addEventListener('resize', function () {
		resize();
	});
	DrawBackground();

	/** Retuns a number between the bounds.
	 * @param {int} min:
	 * @param {int} max:
	 */
	function RandomNumber(min, max) {
		return Math.floor(Math.random() * max) + min;
	}

	/** This Function draws a gradient in the background
	 */
	function DrawBackground() {
		var width = g_background.width;
		var height = g_background.height;
		for (var i = height; i >= 0; --i) {
			var indexColor = i;
			g_backgroundContext.fillStyle = "rgb(" + indexColor + "," + indexColor + "," + indexColor + ")";
			g_backgroundContext.fillRect(0, i, width, 360);
		}
		g_backgroundContext.strokeStyle = "rgba(0,0,255,0.8)";
		// Draw the Big Rectangle
		g_backgroundContext.strokeRect(15, 15, width - 30, height - 30);
		g_backgroundContext.strokeRect(16, 16, width - 32, height - 32);
	}

});
/** Document ready waits for the page to be loaded before doing anything.
 * We therefore make sure to be able to access all the items on the webpage.
 */
$(document).ready(function () {
	var g_maxNumberOfCardsInHand = 7;
	var g_numberOfSlots = 6;

	/** Catch the Drop Event.
	 */
	$("html").on("drop", function (event, ui) {
		event.preventDefault();
		event.stopPropagation();
		// shouldn't be able to drop more cards when there are no more moves
		// ideally we wouldn't let the user pick them up in the first place
		// but this will have to do for now
		if (currentGame.activePlayer.GetRemainingNumberOfMoves() > 0)
		{
			//currentGame.activePlayer.RemoveOneMove();
			var Card = FindMatchingCardInHand(ui.helper[0].lastChild.innerHTML);
			var CardName = ui.helper[0].firstChild.innerHTML;
			currentGame.activePlayer.AddCardsToBoard(Card);
			currentGame.activePlayer.RemoveCardsFromHand(Card);
			if (CardName == "Trap Card(1)") {
				var TrapCard = FindMatchingCardOnBoard(ui.helper[0].lastChild.innerHTML);
				if (TrapCard.GetType() === "damage") {
					console.log(TrapCard);
					currentGame.GetInactivePlayer().RemoveHealth(TrapCard.GetDamage());
					console.log(currentGame.GetInactivePlayer().GetHealth());
				}
				if (TrapCard.GetType() === "move") {
					console.log(TrapCard);
					// removing one to keep the number of moves in sync (max 2)
					currentGame.activePlayer.RemoveOneMove();
					currentGame.activePlayer.AddMove();
				}

				// Destroy the Card After Usage and reenable the slot
				$(ui.helper[0]).show().fadeOut("slow");
				console.log($(event.target));
				currentGame.activePlayer.RemoveCardsFromBoard(Card);
				$(this).droppable("option", "disabled", false);
				return;
			} else if (CardName == "Spaceship(1)") {
				//Add the attacking Property
				$(ui.helper[0]).draggable('disable')
				$(ui.helper[0]).click(function () {
					//If the player has remaining moves
					if (currentGame.activePlayer.GetRemainingNumberOfMoves() > 0) {
						currentGame.activePlayer.RemoveOneMove();
						var UnitCard = FindMatchingCardOnBoard(ui.helper[0].lastChild.innerHTML);
						currentGame.GetInactivePlayer().RemoveHealth(UnitCard.GetAttack());
						console.log(currentGame.GetInactivePlayer().GetHealth());
					}
					return false;
				});

			}
		}

	});
	/**
	 */
	function FindMatchingCardInHand(CardID) {
		for (var i = 0; i < currentGame.activePlayer.GetCardsInHand().length; ++i)
			if (CardID == currentGame.activePlayer.GetCardsInHand()[i].GetID())
				return currentGame.activePlayer.GetCardsInHand()[i];
	}
	function FindMatchingCardOnBoard(CardID) {
		for (var i = 0; i < currentGame.activePlayer.GetCardsOnBoard().length; ++i)
			if (CardID == currentGame.activePlayer.GetCardsOnBoard()[i].GetID())
				return currentGame.activePlayer.GetCardsOnBoard()[i];
	}
	/** Initialize the card slots.
	 */
	function InitSlots() {
		for (var i = 1; i <= 3; ++i) {
			SetSlotAcceptedClasses(i, "UnitCard");
		}
		for (var i = 4; i <= 6; ++i) {
			SetSlotAcceptedClasses(i, "TrapCard");
		}
	}
	/** Create a string for all accepted classes of a slot.
	 * This string is # + cardType + number where number
	 * goes from 0 to the max number of cards in hand.
	 * @param {int} index : index of the slot
	 * @param {string} cardType : for now UnitCard or TrapCard
	 */
	function SetSlotAcceptedClasses(slotIndex, cardType) {
		var slotAcceptedCards = ""
			for (var j = 0; j < g_maxNumberOfCardsInHand; ++j) {
				if (j == g_maxNumberOfCardsInHand - 1)
					slotAcceptedCards += "#" + cardType + j;
				else
					slotAcceptedCards += "#" + cardType + j + ", ";
			}
			MakeSlotDroppable(slotIndex, slotAcceptedCards);
	}
	/** Make the Slot Droppable.
	 * @param {int} slotIndex : This contains the index of the Card Slot
	 * @param {string} slotAcceptedCards : This contains a string formatted "# + cardType"
	 */
	function MakeSlotDroppable(slotIndex, slotAcceptedCards) {
		$("#Slot" + slotIndex).droppable({
			accept : slotAcceptedCards,
			drop : function (event, ui) {
				if (currentGame.activePlayer.GetRemainingNumberOfMoves() > 0) {
					$(this).droppable("option", "disabled", true);
					$(this).addClass("SlotHighLight");
					$(this).find("p");
					$(this).html("");
				}
			}
		});
	}

	InitSlots();
});
/** Draw card in hand
 * @param {object} Card
 * @param {int} id for the css.
 * @param {string} Cardlocation : the id of the place you want to put your card
 * @param {bool} draggable : should the card be draggable
 */
function DrawCardInHand(Card, i,Cardlocation,draggable) {
	$(document).ready(function () {
		if (Card.toString() === '[UnitCard "' + Card.health + '"]') {
			$(Cardlocation).append(
				"<div id='UnitCard" + i + "' class='ui-widget-content UnitCard'>" +
				"<p>" + Card.GetNameOfCard() + "(" + Card.GetCardCost() + ")</p>" +
				"<p><center><img src='http://digital-art-gallery.com/oid/93/640x360_16237_The_ship_2d_sci_fi_concept_art_spaceship_picture_image_digital_art.jpg' alt='Smiley face' height='42' width='42'></center></p>" +
				"<p>" + Card.GetCardDescription() + "</p>" +
				"<p>" + Card.GetHealth() + "/" + Card.GetAttack() + "</p>" +
				"<p style='display:none;'>" + Card.GetID() + "</p>" +
				"</div>");
			if (draggable){
				$("#UnitCard" + i).draggable({
					snap : ".squaredotted",
					snapMode : "inner",
					revert : function (valid) {
						return IsDropValid(valid);
					}
				});				
			}
		} else {
			$(Cardlocation).append(
				"<div id='TrapCard" + i + "' class='ui-widget-content TrapCard'>" +
				"<p>" + Card.GetNameOfCard() + "(" + Card.GetCardCost() + ")</p>" +
				"<p>&nbsp;</p>" +
				"<p>" + Card.GetCardDescription() + "</p>" +
				"<p style='display:none;'>" + Card.GetID() + "</p>" +
				"</div>");
			if (draggable){
				$("#TrapCard" + i).draggable({
					snap : ".squaredotted",
					snapMode : "inner",
					revert : function (valid) {
						return IsDropValid(valid);
					}
				});
			}
		}
	});
}
/** This function draws the playerData
 * (Health,NumberOfMovesRemaining) on screen.
 */
function DrawPlayerData() {
	$(document).ready(function () {
		var Health1 = currentGame.PlayerArray[0].GetHealth();
		var Health2 = currentGame.PlayerArray[1].GetHealth();
		var Moves1 = currentGame.PlayerArray[0].GetRemainingNumberOfMoves();
		var Moves2 = currentGame.PlayerArray[1].GetRemainingNumberOfMoves();
		if (Moves1 == -1)
			Moves1 = 0;
		if (Moves2 == -1)	
			Moves2 = 0;
		document.getElementById("BottomHealth").innerHTML = Health1 + "/20";
		document.getElementById("BottomMove").innerHTML = Moves1;
		document.getElementById("TopHealth").innerHTML = Health2 + "/20";
		document.getElementById("TopMove").innerHTML = Moves2;
	});
}
/** This function checks wether the card should dropped or not
 * @param {object} object : the object that is being tested
 * @return true if move is invalid, !object otherwise.
 */
function IsDropValid(object){
	console.log(object);
	console.log(currentGame.activePlayer.GetRemainingNumberOfMoves());
	
	if (object && currentGame.activePlayer.GetRemainingNumberOfMoves() > 0) {
		currentGame.activePlayer.RemoveOneMove();
		console.log("valid move");
	} else {
		console.log("invalid move");
		return true;
	}

	return !object;	
}

/**
 */
function DisplayFriendList() {
	$(document).ready(function () {
		$('body').append(
			"<div id='FriendList' class='FriendList'>" +
			"</div>");
		$("#FriendList").show();	
	});
	$(document).ready(function () {
		for (var i = 0; i < usersFriends.length; ++i) {
			$('#FriendList').append(
				"<p id='paragraph" + i + "'onclick='opposingPlayerID = usersFriends[" + i + "].id;$('#FriendList').hide'>" + usersFriends[i].displayName + "</p>")
		}
	});
}
