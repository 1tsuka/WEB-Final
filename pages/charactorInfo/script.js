var headerUrl = "../../template/header/header.tql";

$.get(headerUrl, function (result) {
    $("#header").html(result);
});

var item = document.querySelector('.tab').querySelectorAll('li');
var content = [];
var charactor_info = document.getElementsByClassName('charactor_info');
var actor_info = document.getElementsByClassName('actor_info');
content.push(charactor_info);
content.push(actor_info);

for(var i=0;i<item.length;i++){
    item[i].setAttribute('index',i);
    item[i].onclick = function(){
        for(var j=0;j<item.length;j++){
            item[j].className = '';
            item[j].style.backgroundColor = 'whitesmoke';
            item[j].style.color = 'black';
        }
        this.className = 'current';
        this.style.backgroundColor = 'black';
        this.style.color = 'white';
        for(var k=0;k<content.length;k++){
            for(var l=0;l<content[k].length;l++){
                content[k][l].style.display = 'none';
            }
        }
        var index = this.getAttribute('index');
        for(var l=0;l<content.length;l++){
            content[index][l].style.display = 'block';
        }
        
    }
}

function toModify(){
    window.location.href="../charcatorInfoForm/charactorInfoForm.html"
}


$('#commentBtn').on('click',function(){
    $('.inputArea').before("<p>"+$('#commentContent')[0].value+"</p>");
    $('#commentContent').val('');
})


