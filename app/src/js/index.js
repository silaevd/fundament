$(document).ready(function () {


    /* ---------------------------------------------- /*
         * Phone mask
    /* ---------------------------------------------- */

    $('input[name="phone"]').inputmask({"mask": "+7(999) 999-9999"});


    /* ---------------------------------------------- /*
         * Goods PopUp
    /* ---------------------------------------------- */

    $('.goodsItem').click(function () {

        const img = this.querySelector('.goodsItem__img').getAttribute('src');
        const title = this.querySelector('.goodsItem__title').textContent;
        const price = this.querySelector('.goodsItem__price').querySelector('.highlight').textContent;
        const desc = this.querySelector('.goodsItem__desc').textContent;
        const popUp = document.querySelector('.goodsPopUp');

        popUp.querySelector('.goodsPopUp__img').setAttribute('src', img);
        popUp.querySelector('.goodsPopUp__title').textContent = title;
        popUp.querySelector('input[name="project_name"]').setAttribute('value', title)
        popUp.querySelector('.goodsPopUp__desc').textContent = desc;
        popUp.querySelector('.goodsPopUp__price').querySelector('.highlight').textContent = price;

    });

    $('.goodsItem').magnificPopup({
        items: {
            src: $('#goodsPopUp'),
            type: 'inline'
        },
        preloader: false,
        showCloseBtn: false,
    });


    /* ---------------------------------------------- /*
         * Request PopUp
    /* ---------------------------------------------- */

    $('#callToMe').magnificPopup({
        items: {
            src: $('#requestPopUp'),
            type: 'inline',
        },
        preloader: false,
        showCloseBtn: false,
    });


    /* ---------------------------------------------- /*
         * PopUp close
    /* ---------------------------------------------- */

    $('.popUp__close').on('click', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });


    /* ---------------------------------------------- /*
         * Form submit
    /* ---------------------------------------------- */

    $('form').on('submit', function () {

        const form = $(this);
        const submitBtn = form.find('button[type="submit"]');

        $.ajax({
            type: "POST",
            url: "mail.php",
            data: form.serialize()
        }).done(function() {
            $.magnificPopup.open({
                items: {
                    src: $('#thankyouPopUp'),
                    type: 'inline',
                },
                preloader: false,
                showCloseBtn: false,

            });
            setTimeout(function() {
                // Done Functions
                form.trigger("reset");
                $.magnificPopup.close();
            }, 4000);
        });
        return false;
    });

});
