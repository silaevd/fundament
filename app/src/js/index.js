

$('.goodsItem').click(function () {

    const img = this.querySelector('.goodsItem__img').getAttribute('src');
    const title = this.querySelector('.goodsItem__title').textContent;
    const price = this.querySelector('.goodsItem__price').querySelector('.highlight').textContent;
    const desc = this.querySelector('.goodsItem__desc').textContent;
    const popUp = document.querySelector('.goodsPopUp');

    popUp.querySelector('.goodsPopUp__img').setAttribute('src', img);
    popUp.querySelector('.goodsPopUp__title').textContent = title;
    popUp.querySelector('.goodsPopUp__desc').textContent = desc;
    popUp.querySelector('.goodsPopUp__price').querySelector('.highlight').textContent = price;


});



//Request PopUp
$('.request__button').magnificPopup({
    items: {
        src: $('.requestPopUp'),
        type: 'inline',
    },
    preloader: false,
    showCloseBtn: false,
    mainClass: 'mfp-fade',
});

//Goods PopUp
$('.goodsItem').magnificPopup({
    items: {
        src: $('.goodsPopUp'),
        type: 'inline'
    },
    preloader: false,
    showCloseBtn: false,
    mainClass: 'mfp-fade',
});

//PopUp close
$('.popUp__close').on('click', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
});
