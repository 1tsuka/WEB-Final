function needVideo(){
    if(document.getElementById('yes').checked){
        document.getElementById('video').style.display = 'inline-block';
    }
    else if(document.getElementById('no').checked){
        document.getElementById('video').style.display = 'none';
    }
}