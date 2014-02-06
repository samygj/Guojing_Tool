jQuery(document).ready( function($) {
	// Color Picker
	$('#colorpickerHolder').ColorPicker({flat: true});

	// Border Radius
	setInterval(function() { detectBorderRadiusInput($('#border-radius-text').val()); }, 100);
	$('#border-radius-text').keyup( function(event) {
		if (event.which == 38)
			$('#border-radius-text').val(parseInt($('#border-radius-text').val()) + 1);
		else if (event.which == 40) 
			$('#border-radius-text').val(parseInt($('#border-radius-text').val()) - 1);
	});
	function detectBorderRadiusInput(value) {
		$('#border-radius-rectangle').css('border-radius', value+'px');
		var borderRadiusCode = '-webkit-border-radius:' + value + 'px;<br>';
		borderRadiusCode += '-moz-border-radius:' + value + 'px;<br>';
		borderRadiusCode += 'border-radius:' + value + 'px;';
		$('#border-radius-code').html(borderRadiusCode);
	}
});