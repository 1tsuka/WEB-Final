var headerUrl = '../../template/header/header.tql'

$.get(headerUrl,function(result){
    $('#header').html(result);
})