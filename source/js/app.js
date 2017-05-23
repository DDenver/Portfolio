$('#hamburger').click(function() {
   $(this).toggleClass('active');
   $('#overlay').toggleClass('open');
});


$('.down-arrow').on('click', function(e) {
		var offset = 0;
        e.preventDefault();
        $('html, body').animate ({
            scrollTop: $('#down').offset ().top - offset
        }, 500);

});

