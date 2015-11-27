$(function () {

	var g_numberOfSlots = 6;
	MakeUIResponsive();

	/**
	 * Initialize the User Interface.
	 */
	function MakeUIResponsive() {
		$("#TrapCard, #UnitCard").draggable({
			containment : "parent",
			revert : "invalid"
		});
		for (var i = 1; i <= g_numberOfSlots; ++i) {
			if (i < ((g_numberOfSlots / 2) + 1))
				MakeSlotDroppable(i, "#UnitCard");
			else
				MakeSlotDroppable(i, "#TrapCard");
		}
	}
	/**
	 * Make the Slot Droppable.
	 * @param {int} slotIndex : This contains the index of the Card Slot
	 * @param {string} slotAcceptedCards : This contains a string formatted "# + cardType"
	 */
	function MakeSlotDroppable(slotIndex, slotAcceptedCards) {
		$("#Slot" + slotIndex).droppable({
			accept : slotAcceptedCards,
			drop : function (event, ui) {
				$(this)
				.addClass("ui-state-highlight")
				.find("p")
				.html("Dropped!");
			}
		});
	}
});