function toModify(){
    window.location.href="../familyForm/familyForm.html"
}

var headerUrl = '../../template/header/header.tql'

$.get(headerUrl,function(result){
    $('#header').html(result);
})