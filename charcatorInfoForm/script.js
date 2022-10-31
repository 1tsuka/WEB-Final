function addWork(){
    var types = [
        ["电影", "film"],
        ["电视剧", "TVSeries"],
        ["舞台剧", "play"],
        ["歌剧", "opera"]
    ]

    var works = document.getElementById('works');
    var newDiv = document.createElement('div');
    var addBtn = document.getElementById('addBtn');
    console.log(addBtn);
    var timelabel;
    var typelabel;
    var worklabel
    var time; 
    var typeSelect; 
    var typeOption;
    var workName;
    var deleteBtn;

    newDiv.className = "work";

    timelabel = document.createElement("label");
    timelabel.innerText = " 时间: ";
    timelabel.setAttribute("for","time");

    time = document.createElement("input");
    time.type = "month";
    time.setAttribute("id", "time");
    time.setAttribute("name", "time");


    newDiv.appendChild(timelabel);
    newDiv.appendChild(time);

    typelabel = document.createElement("label");
    typelabel.innerText = "  类型: ";
    typelabel.setAttribute("for","type");

    typeSelect = document.createElement("select");
    typeSelect.setAttribute("name","type");
    typeSelect.setAttribute("id","type");

    for(var i=0; i<4; i++){
        typeOption = document.createElement("option");
        typeOption.innerText = types[i][0];
        typeOption.setAttribute("value", types[i][1]);
        typeSelect.appendChild(typeOption);
    }
    newDiv.appendChild(typelabel);
    newDiv.appendChild(typeSelect);

    worklabel = document.createElement("label");
    worklabel.innerText = " 作品名字: ";
    worklabel.setAttribute("for","workName");

    workName = document.createElement("input")
    workName.type = "text"
    workName.setAttribute("name", "workName");
    workName.setAttribute("id", "workName");

    newDiv.appendChild(worklabel);
    newDiv.appendChild(workName);

    deleteBtn = document.createElement("button");
    deleteBtn.innerText = "删除";
    deleteBtn.setAttribute("class","deleteBtn")
    deleteBtn.addEventListener("click",() => {
        works.removeChild(newDiv);
    });
    newDiv.appendChild(deleteBtn);

    works.insertBefore(newDiv,addBtn);
    
}