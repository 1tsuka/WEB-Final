var headerUrl = '../../template/header/header.tql'

$.get(headerUrl,function(result){
    $('#header').html(result);
})


var user = {
    userName:"admin",
    userPwd:123456
}

$('#loginBtn').on('click',function(){
    var userName = $('#userName').val();
    var userPwd = $('#userPwd').val();
    console.log(userName,userPwd);
    if(userName == ''){
        $('#errorMsg').text('需要输入用户名');
        return;
    }
    else if(userPwd == ''){
        $('#errorMsg').text('需要输入密码');
    }
    else if(userName != user.userName || userPwd != user.userPwd){
        $('#errorMsg').text('用户名或密码错误');
    }
    else{
        // $.cookie('login','true',{expires: 7, path: '/pages' })
        $.cookie('userName',userName,{expires: 7, path: '/WEB-Final/pages' })
        // console.log($.cookie('login '))
        window.location.href = '../index/index.html'
    }
})