import 'jquery'

var show = false;
var userName = $.cookie('userName');
var houseMenu = '<div id="houseMenu"><ul><li>史塔克家族</li><li>拉尼斯特家族</li><li>提利尔家族</li><li>更多···</li></ul></div>'
if(userName != undefined){
    $('#loginBtn').hide();
    $('#loginInfo').text('您好，'+userName);
}
else{
    $('#loginBtn').show();
    $('#loginInfo').text('');
}

$('#houses').on("click",function(){
    if(show == false){
        show = true
        $('#tag').animate({rotate: '-180'}, 500);
        $('#nav').after(houseMenu);
        $('#houseMenu').animate({})
    }
    else{
        show = false;
        $('#tag').animate({rotate: '0'}, 500);
        $('#houseMenu').remove();
    }
})

$('#loginBtn').on('click',function(){
    window.location.href = '../login/login.html'
})

$('#loginInfo').on('click',function(){
    var user = $('#user')
    if(user.is(':hidden')){
        user.css("display","flex");
    }
    else{
        user.hide()
    }
})

$('#logout').on('click',function(){
    $.removeCookie('userName',{expires: 7, path: '/pages' })
    location.reload();
})
