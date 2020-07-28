$(function() {
	var item = $('.footer_title ul li a');
	$(item).hover(function() {
		$(this).stop().animate({
			marginLeft: '5px',
		});

	});
	$(item).mouseleave(function() {
		$(this).stop().animate({
			marginLeft: '0px',
		});

	});
});
