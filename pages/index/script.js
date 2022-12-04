var headerUrl = "../../template/header/header.tql";

$.get(headerUrl, function (result) {
    $("#header").html(result);
});

var mySwiper = new Swiper(".swiper", {
    direction: "horizontal", // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay: true,

    // 如果需要前进后退按钮
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

});
