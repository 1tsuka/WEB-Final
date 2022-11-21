var show = false;
var userName = $.cookie('userName');
console.log(userName)

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
        show = true;
        $('#tag').animate({rotate: '-180'}, 500);
        $('ul').append
    }
    else{
        show = false;
        $('#tag').animate({rotate: '0'}, 500);
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
