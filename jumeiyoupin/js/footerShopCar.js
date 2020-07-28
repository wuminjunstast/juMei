$(function(){
	var $footer_a = $('#a_out>a');
	var len_footer = $footer_a.length;
	for (var i = 0; i < len_footer; i++) {
		var position = -126 * i;
		$footer_a.eq(i).css('background-position', position + 'px 0');
	}
});
	