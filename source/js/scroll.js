var scrollMenu = (function () {
  var $news = $('.articles__item'),
    $item = $('.articles-title__item'),
    $wrapMenu = $('.left__articles-title'),
    body = document.body,
    isPositionArticle = [],
    offsetHeight = 200,

    positionArticle = function (element) {
      var len = element.length;
      for (let i = 0; i < len; i++) {
        isPositionArticle[i] = {};
        isPositionArticle[i].top = element
          .eq(i)
          .offset()
          .top - offsetHeight;
        isPositionArticle[i].bottom = isPositionArticle[i].top + element
          .eq(i)
          .innerHeight();
      }
    },

    scrollPageFixMenu = function (e) {
      var scroll = window.pageYOffset;
      if (scroll < $news.offset().top) {
        $wrapMenu.removeClass('fixed');
      } else {
        $wrapMenu.addClass('fixed');
      }
    },

    scrollPage = function (e) {
      var scroll = window.pageYOffset;
      for (let i = 0; i < isPositionArticle.length; i++) {
        if (scroll >= isPositionArticle[i].top && scroll <= isPositionArticle[i].bottom) {
          $item
            .eq(i)
            .addClass('articles-title__item_active')
            .siblings()
            .removeClass('articles-title__item_active');
            console.log(i);
        }
      }
    },

    clickOnMenu = function (e) {
      var index = $(e.target).index();
      var sectionOffset = $news
        .eq(index)
        .offset()
        .top;
      $(document).off('scroll', scrollPage);
      $('body, html').animate({
        'scrollTop': sectionOffset
      }, function () {
        $(e.target)
          .addClass('articles-title__item_active')
          .siblings()
          .removeClass('articles-title__item_active');
        $(document).on('scroll', scrollPage);
      });
    },

    addListener = function () {
      $('.articles-title__items').on('click', clickOnMenu);

      $(document).on('scroll', scrollPage);
      $(document).on('scroll', scrollPageFixMenu);

      $(window).on('load', function (e) {
        positionArticle($news);
      })

      $(window).on('resize', function (e) {
        positionArticle($news);
      })
    }

$('.articles-menu__btn').on('click', function(e){
    console.log('da');
    var $this = $(this),
				container = $this.closest('.left__articles-title');
		if (!$this.hasClass('articles-menu__btn_active')){
      $this.addClass('articles-menu__btn_active');
      container.addClass('left__articles-title_active');
      container.addClass('fixed');
    } else{
      $this.removeClass('articles-menu__btn_active');
      container.removeClass('left__articles-title_active');
    }
});

$(document).on('click', function(e){

		var $this = $(e.target);
    if (!$this.closest('.left__articles-title').length) {
			$('.left__articles-title').removeClass('left__articles-title_active').removeClass('articles-menu__btn_active');
      $('.articles-menu__btn').removeClass('articles-menu__btn_active');
    } 
});

  return {
    init: addListener
  }
})();

scrollMenu.init();