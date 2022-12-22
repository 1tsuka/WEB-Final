var headerUrl = "/WEB-Final/template/header.tql";

$.get(headerUrl, function (result) {
    $("#header").html(result);
});
window.onload = function () {

    var charactorMenuUrl = "/WEB-Final/template/charactorMenu.tql";
    var show = false;
    var userName = $.cookie("userName");

    if (userName != undefined) {
        $("#loginBtn").hide();
        $("#loginInfo").text("您好，" + userName);
    } else {
        $("#loginBtn").show();
        $("#loginInfo").text("");
    }

    $("#houses").on("click", function () {
        if (show == false) {
            show = true;
            $("#tag").rotate({ animateTo: -180, duration: 600 });
            $.get(charactorMenuUrl, function (result) {
                $("#nav").after(result);
            });
        } else {
            show = false;
            $("#tag").rotate({ animateTo: 0, duration: 600 });
            $("#houseMenu").remove();
        }
    });

    $("#loginBtn").on("click", function () {
        window.location.href = "#/login";
    });

    $("#loginInfo").on("click", function () {
        var user = $("#user");
        if (user.is(":hidden")) {
            user.css("display", "flex");
        } else {
            user.hide();
        }
    });

    $("#logout").on("click", function () {
        $.removeCookie("userName", { expires: 7, path: "" });
        location.reload();
    });

    $(document).on('scroll',function() {
        var scroH = $(window).scrollTop();
        
        if(scroH != 0){
            $('#header').css("background","linear-gradient(to bottom,rgba(169,169,169,1),rgba(169,169,169,1))")
        }
        else{
            $('#header').css("background","linear-gradient(to bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.2))")
        }
    });
};
