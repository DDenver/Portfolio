'use strict';
var Slider = function(container) {
    var
        nextBtn     = container.find('.works-slider__control-btn_left'),
        prevBtn     = container.find('.works-slider__control-btn_right'),
        items       = nextBtn.find('.works-slider__control-item'),
        display     = container.find('.works-slider__display'), // Витрина слайдера
        title       = container.find('.subtitle'),
        skills      = container.find('.works__content-desc'),
        link        = container.find('.works__content-view'),
        itemsLength = items.length,
        duration    = 500,
	    flag        = true,
        _that = this;
    console.dir(this);
	var timeout;

    _that.counter = 0;

    // private
    // Генерация разметки кнопки следующий слайд
    var generateMarkups = function() {
        var list = nextBtn.find('.works-slider__control-list'),
            markups = list.clone();

        prevBtn
            .append(markups)
            .find('.works-slider__control-item')
            .removeClass('active')
            .eq(_that.counter + 1)
            .addClass('active');
    }
    // Вытащить данные из дата атрибутов для левой части слайдера
    var getDataArrays = function() {
        var dataObject = {
            pics : [],
            title : [],
            skills : [],
            link : []
        };

        $.each(items, function() {
            var $this = $(this);

            dataObject.pics.push($this.data('full'));
            dataObject.title.push($this.data('title'));
            dataObject.skills.push($this.data('skills'));
            dataObject.link.push($this.data('link'));
        });

        return dataObject;
    }

    var slideInLeftBtn = function(slide) {
        var
            reqItem = items.eq(slide - 1),
            activeItem = items.filter('.active');

        activeItem
            .stop(true, true)
            .animate({'top' : '100%'}, duration);

		    reqItem
			    .stop(true, true)
			    .animate({'top' : '0%'}, duration, function () {
				    $(this).addClass('active')
					    .siblings().removeClass('active')
					    .css('top', '-100%')
			    });


    }

    var slideInRightBtn = function (slide) {
        var
            items = prevBtn.find('.works-slider__control-item'),
            activeItem = items.filter('.active'),
            reqSlide = slide + 1;

        if (reqSlide > itemsLength - 1) {
            reqSlide = 0;
        }

        var reqItem = items.eq(reqSlide);

        activeItem
            .stop(true, true)
            .animate({'top' : '-100%'}, duration);

        reqItem
            .stop(true, true)
            .animate({'top' : '0%'}, duration, function () {
                $(this).addClass('active')
                    .siblings().removeClass('active')
                    .css('top', '100%')
            });
    };

    var changeMainPicture = function(slide) {
        var image = display.find('.works-slider__display-pic');
        var data = getDataArrays();

        image
            .stop(true, true)
            .fadeOut(duration / 2, function() {
                image.attr('src', data.pics[slide]);
                $(this).fadeIn(duration / 2);
            });
    }

    var aviatitle = {
        generate : function (string, block) {
        var
            wordsArray = string.split(' '), // найти массив слов
            stringArray = string.split(''), // найти массив всех симовлов в строке
            sentence = [],
            word = '';

        block.text(''); // очищаем блок вывода

        wordsArray.forEach(function(currentWord) {
            var wordsArray = currentWord.split(''); // массив символов в слове

            wordsArray.forEach(function(letter) {
                var letterHtml = '<span class="letter-span">' + letter + '</span>';
                // каждую букву оборачиваем в свой span
                word += letterHtml;
            });
            // берем отдельное слово и оборачиваем его в класс
            var wordHTML = '<span class="letter-word">' + word + '</span>'
            // добавим в массив предложения
            sentence.push(wordHTML);
            word = '';
        });
        // добавим в блок сгенерированую разметку для предложения
        block.append(sentence.join(' '));

        // анимация появления
        var
            letters = block.find('.letter-span'), // найдем все наши буквы
            counter = 0,
            timer,
            duration = 500 / stringArray.length; // находим длительность для каждой буквы

        function showLetters() {
            var currentLetter = letters.eq(counter);

            currentLetter.addClass('active');
            counter++;

            if (typeof timer !== 'undefined') {
                clearTimeout(timer);
            }

            timer = setTimeout(showLetters, duration);
        }

        showLetters();

        },
    }
    var changeTextData = function(slide) {
        var data = getDataArrays();

        // название работы
        aviatitle.generate(data.title[slide], title, 'ru');

        // описание технологий
        aviatitle.generate(data.skills[slide], skills, 'en');

        // ссылка
        link.attr('href', data.link[slide]);
    }

    // public
    this.setDefaults = function() {
        var
            _that = this,
            data = getDataArrays();

        // создаем разметку
        generateMarkups();

        // левая кнопка
        nextBtn
            .find('.works-slider__control-item')
            .eq(_that.counter - 1)
            .addClass('active');

        // правая кнопка
        prevBtn
            .find('.works-slider__control-item')
            .eq(_that.counter + 1)
            .addClass('active');

        // основное изображение
        display
            .find('.works-slider__display-pic')
            .attr('src', data.pics[_that.counter]);

        // текстовые описания
        changeTextData(_that.counter);

    };

    this.moveSlide = function(direction) {
        var _that = this;
        // if (direction === "next") {
        //     if (_that.counter < itemsLength - 1) {
        //             _that.counter++;
        //         } else {
        //             _that.counter = 0;
        //         }
        // } else {
        //          if (_that.counter > 0) {
        //             _that.counter--;
        //         } else {
        //             _that.counter = itemsLength - 1;
        //         }
        // }

       var directions = {
           next : function() {
               // закольцовывание слайдера
               if (_that.counter < itemsLength - 1) {
                   _that.counter++;
               } else {
                   _that.counter = 0;
               }
           },

           prev : function () {
               if (_that.counter > 0) {
                   _that.counter--;
               } else {
                   _that.counter = itemsLength - 1;
               }
           }
       };

       directions[direction]();

	    if (flag) {
			flag = false;

		    if (typeof timeout != 'undefined') {
				  clearTimeout(timeout);
		    }

		    timeout = setTimeout(function () {
			    flag = true;
		    }, duration + 50);

		    slideInLeftBtn(_that.counter);
		    slideInRightBtn(_that.counter);
		    changeMainPicture(_that.counter);
		    changeTextData(_that.counter);
	    }
    };
};




var slider = new Slider($('.works'));
slider.setDefaults();

$('.works-slider__control-btn_left').on('click', function(e){
    e.preventDefault();
    slider.moveSlide('prev');
});

$('.works-slider__control-btn_right').on('click', function(e){
    e.preventDefault();
    slider.moveSlide('next');
});

console.dir(slider);
