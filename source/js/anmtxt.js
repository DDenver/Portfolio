'use strict';

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
