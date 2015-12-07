"use strict";

$(document).ready(function(){  
	var g_maxNumberOfCardsInHand = 7;
	var g_numberOfSlots = 6;
	for (var i = 0 ; i < 7; ++i ){
		DrawCard(i);
	}
	InitSlots();
	/** Catch the Drop Event.
	 */
	$("html").on("drop", function(event) {
		event.preventDefault();  
		event.stopPropagation();
		alert("Dropped!");
	});
	/** Initialize the card slots.
	 */
	function InitSlots() {
		for (var i = 1; i <= 3; ++i) {
			SetSlotAcceptedClasses(i,"UnitCard");
		}
		for (var i = 4; i <= 6; ++i) {
			SetSlotAcceptedClasses(i,"TrapCard");
		}
	}
	/** Create a string for all accepted classes of a slot.
	 * This string is # + cardType + number where number
	 * goes from 0 to the max number of cards in hand.
	 * @param {int} index : index of the slot
	 * @param {string} cardType : for now UnitCard or TrapCard
	 */
	function SetSlotAcceptedClasses(slotIndex,cardType){
		var slotAcceptedCards = ""
		for(var j = 0; j < g_maxNumberOfCardsInHand; ++j){
			if(j == g_maxNumberOfCardsInHand - 1)
				slotAcceptedCards += "#" + cardType + j;
			else
				slotAcceptedCards += "#" + cardType + j +", ";
		}
		MakeSlotDroppable(slotIndex,slotAcceptedCards);
	}
	/** Make the Slot Droppable.
	 * @param {int} slotIndex : This contains the index of the Card Slot
	 * @param {string} slotAcceptedCards : This contains a string formatted "# + cardType"
	 */
	function MakeSlotDroppable(slotIndex, slotAcceptedCards) {
		$("#Slot" + slotIndex).droppable({
			accept : slotAcceptedCards,
			drop : function (event, ui) {
				$(this).droppable("option", "disabled", true)
				$(this).addClass("ui-state-highlight")
				$(this).find("p")
				$(this).html("Dropped!");
				// TODO : ADD IDs That should work.
				//$(ui.draggable).disabled =- true;
			}
		});
	}
	/** Draw card in hand
	 * @param {object} Card
	 */
	function DrawCard(Card){
		if (i % 2 != 0){
			$("body").append(
				"<div id='UnitCard"+i+"' class='ui-widget-content UnitCard'>"+
					"<p>Unit Card</p>"+
					"<p>Drag me to my target</p>"+
				"</div>");
			$("#UnitCard"+i).draggable({
				containment : "parent",
				revert : "invalid"
			});
		}
		else{
			$("body").append(
				"<div id='TrapCard"+i+"' class='ui-widget-content TrapCard'>"+
					"<p>Trap Card</p>"+
					"<p>Drag me to my target</p>"+
				"</div>");
			$("#TrapCard"+i).draggable({
				containment : "parent",
				revert : "invalid"
			});
		}
	}
});