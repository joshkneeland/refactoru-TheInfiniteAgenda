$(document).ready(function() {

	// // Set variable for new date
	var today = moment();
	var tomorrow = moment(today).add(1, 'days');

	// Append the date to the appropriate area of the sub-container
	$('.subheader-date').append(today.format('MMMM Do, YYYY'));

	// THIS FUNCTION WILL CREATE ONE EDITABLE SUB-CONTAINER

	var day = function(){
		$('.subcontainer').first().clone().appendTo('.container').find('.subheader-date').text(tomorrow.format('MMMM Do, YYYY'));
		tomorrow = moment(tomorrow).add(1, 'days');
	};

	// .first() is necessary so you do not duplicate the sub-containers
	// .clone() copies the entire subcontainer, appends to the container
	// .find() and .text() change the moment.js date with the new variable

	// createDays function calls the function that clones the sub-container: day();
	// The ForLoop argument adjusts the number of times that day() would be called

	var createDays = function(dayCount) {
		for(var i=0;i<dayCount;i++){
			day();
		}
	}

	// CALL THE CREATE-DAYS FUNCTION - ARGUMENT OF FIVE MEANS FIVE EXTRA DAYS ARE CREATED
	createDays(7);


	// // Listen for clicks on elements with the "editable" class
	$(document).on('click', '.editable',function() {

		// store a reference to the clicked element,
    	// which we will need to use in the blur event later
		var originalField = $(this);

		// add a new textarea after the clicked element in the dom
		var input = $('<textarea class="edit-input" autofocus="autofocus"/> ');

		// add a submit button
		var submit = $('<button type="button">Submit</button>')

		// hide the clicked element
		$(this).hide();

		// Add the text area
		$(this).after(input);

		// Add the submit button
		$(this).after(submit);

		// Saves the textarea content after you hit submit
		input.val( originalField.text() );

		// Do this code when you click submit
		submit.on('click', function() { 

			// set the value of the textarea to match the current content
			originalField.text( input.val() );

			// Hide The Submit Button
			submit.hide();

			// Hide the Input Field
			input.hide();

			// Show the original field
			originalField.show();

		});	// END OF SUBMIT BUTTON CLICK

	}); // END OF .editable FORM ON CLICK

	// CONTINUOUS SCROLLING OF THE PAGE

	$(window).scroll(function() {
        //- 10 = desired pixel distance from the bottom of the page while scrolling)
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
        	createDays(7);
        }
});

}); // END OF jQUERY