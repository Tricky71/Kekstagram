var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают.',
    'Как можно было поймать такой неудачный момент?!'
    ];
var descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
    ]; 
var picture = document.querySelector('#picture-template').content.querySelector('.picture'); 
var picturesContainer = document.querySelector('.pictures');
var TOTAL_OBJECTS = 25;
var photoList = [];   
var adIndex = 0;
var gallery = document.querySelector('.gallery-overlay');
var fragment = document.createDocumentFragment();

// Получение случайного числа в заданном диапазоне 
var getRandomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Получение случайного элемента из массива (элеменеты не повторяются)
var getRandomElement = function (array, key) {
    var randomElementIndex = getRandomNumber(0, array.length - 1);
    var randomElement = array[randomElementIndex];
    if (key) {
        array.splice(randomElementIndex, 1);
    }; 
    return randomElement;
};

// Создание массива произвольной или заданной длинны из массива (элементы не повторяются)
var getRandomArray = function (array, length) {
    var copiedArray = array.slice(0, array.length);
    var randomArray = [];
    var adLength = copiedArray.length;
    if (length) {
    var randomArrayLength = getRandomNumber(1, length)
    } else {
        randomArrayLength = getRandomNumber(1, copiedArray.length)
    };
    for (var i = 0; i < randomArrayLength; i++) {
        var randomArrayElement = getRandomElement(copiedArray, true);
        randomArray.push(randomArrayElement);
    };
    return randomArray;
};

// Подбор адреса изображения
var getPhotoUrl = function () {
    var path = 'photos/';
    adIndex++;
    return path + adIndex + '.jpg';
};

// Создание обьекта 
var getPhotoItem = function () {
    var photoItem = {
        'url': getPhotoUrl(),
        'likes': getRandomNumber(15, 200),
        'comments': getRandomArray(comments, 3),
        'description': getRandomElement(descriptions)
    };
    return photoItem;
}; 

var item = getPhotoItem();

// Создание списка обьектов
var getPhotoList = function () {
    for (var i = 0; i < TOTAL_OBJECTS; i++) {
        photoList.push(getPhotoItem());
    };
    return photoList;
};

var photos = getPhotoList();

// Создание фото для галереи
var renderPicture = function (ad) {
    var pictureItem = picture.cloneNode(true); 
    pictureItem.querySelector('img').src = ad.url;
    pictureItem.querySelector('.picture-likes').textContent = ad.likes;
    pictureItem.querySelector('.picture-comments').textContent = ad.comments;
    return pictureItem;
};

// Добавление фото в DocumenFragment
for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPicture(photos[i]));
};

// Добавление фото в разметку
picturesContainer.appendChild(fragment);

gallery.classList.remove('hidden');

// Оформление preview фото
var getGalleryPicture = function () {
    gallery.querySelector('.gallery-overlay-image').src = photos[0].url;
    gallery.querySelector('.likes-count').textContent = photos[0].likes;
    gallery.querySelector('.comments-count').textContent = photos[0].comments.length;
    
};

getGalleryPicture();

console.log(picture);
