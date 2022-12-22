var upload = $.cookie("upload");
if (upload == undefined) {
    $.ajax({
        type: "GET",
        url: "js/charactorList.JSON",
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            localforage.setItem("charactorList", res, function (err, value) {
                console.log(value);
            });
        },
    });
    $.ajax({
        type:"GET",
        url:"js/houseList.JSON",
        dataType:"json",
        contentType:"application/json",
        success: function(res){
            localforage.setItem("houseList", res, function(err, value){
                console.log(value);
            })
        }
    })
    $.cookie("upload", true, { expires: 7, path: "/WEB-Final" });
}

function changeInfo() {
    var item = document.querySelector(".tab").querySelectorAll("li");
    var content = [];
    var charactor_info = document.getElementsByClassName("charactor_info");
    var actor_info = document.getElementsByClassName("actor_info");
    content.push(charactor_info);
    content.push(actor_info);

    for (var i = 0; i < item.length; i++) {
        item[i].setAttribute("index", i);
        item[i].onclick = function () {
            for (var j = 0; j < item.length; j++) {
                item[j].className = "";
                item[j].style.backgroundColor = "whitesmoke";
                item[j].style.color = "black";
            }
            this.className = "current";
            this.style.backgroundColor = "black";
            this.style.color = "white";
            for (var k = 0; k < content.length; k++) {
                for (var l = 0; l < content[k].length; l++) {
                    content[k][l].style.display = "none";
                }
            }
            var index = this.getAttribute("index");
            for (var l = 0; l < content.length; l++) {
                content[index][l].style.display = "block";
            }
        };
    }
}

function addWork(){
    $("#addBtn").on("click", function () {
        var types = [
            ["电影", "film"],
            ["电视剧", "TVSeries"],
            ["舞台剧", "play"],
            ["歌剧", "opera"],
        ];

        var works = document.getElementById("works");
        var newDiv = document.createElement("div");
        var addBtn = document.getElementById("addBtn");
        var timelabel;
        var typelabel;
        var worklabel;
        var rolelabel;
        var time;
        var typeSelect;
        var typeOption;
        var workName;
        var rolePlayed;
        var deleteBtn;

        newDiv.className = "work";

        timelabel = document.createElement("label");
        timelabel.innerText = " 时间: ";
        timelabel.setAttribute("for", "time");

        time = document.createElement("input");
        time.type = "month";
        time.setAttribute("id", "time");
        time.setAttribute("name", "work.time");

        newDiv.appendChild(timelabel);
        newDiv.appendChild(time);

        typelabel = document.createElement("label");
        typelabel.innerText = "  类型: ";
        typelabel.setAttribute("for", "type");

        typeSelect = document.createElement("select");
        typeSelect.setAttribute("name", "work.type");
        typeSelect.setAttribute("id", "type");

        for (var i = 0; i < 4; i++) {
            typeOption = document.createElement("option");
            typeOption.innerText = types[i][0];
            typeOption.setAttribute("value", types[i][1]);
            typeSelect.appendChild(typeOption);
        }
        newDiv.appendChild(typelabel);
        newDiv.appendChild(typeSelect);

        worklabel = document.createElement("label");
        worklabel.innerText = " 作品名字: ";
        worklabel.setAttribute("for", "workName");

        workName = document.createElement("input");
        workName.type = "text";
        workName.setAttribute("name", "work.workName");
        workName.setAttribute("id", "workName");

        newDiv.appendChild(worklabel);
        newDiv.appendChild(workName);

        rolelabel = document.createElement("label");
        rolelabel.innerText = " 饰演角色: ";
        rolelabel.setAttribute("for", "rolePlayed");

        rolePlayed = document.createElement("input");
        rolePlayed.type = "text";
        rolePlayed.setAttribute("name", "work.rolePlayed");
        rolePlayed.setAttribute("id", "rolePlayed");

        newDiv.appendChild(rolelabel);
        newDiv.appendChild(rolePlayed);

        deleteBtn = document.createElement("button");
        deleteBtn.innerText = "删除";
        deleteBtn.setAttribute("class", "deleteBtn");
        deleteBtn.addEventListener("click", () => {
            works.removeChild(newDiv);
        });
        newDiv.appendChild(deleteBtn);

        works.insertBefore(newDiv, addBtn);
    });
}



var index = function () {
    var swiperUrl = "/WEB-Final/template/swiper.tql";
    $("#pageStyle").attr("href", "css/indexStyle.css");
    $("#localScript").attr("src", "");
    $("#content-container").empty();
    $.get(swiperUrl, function (result) {
        $(".swiper").html(result);
        var swiper = new Swiper(".swiper", {
            direction: "horizontal", // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: true,

            // 如果需要前进后退按钮
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    });
};
var menu = function () {
    $("#pageStyle").attr("href", "/WEB-Final/css/menuStyle.css");
    $("#localScript").attr("src", "");
    $(".swiper").empty();
    localforage.getItem("houseList", function(err, value){
        var $container = $("#content-container"); //容器
        var source = $("#houseListTemplate").html(); //获取到html结构
        var template = Handlebars.compile(source); //编译成模板
        var html = template(value); //生成完成的html结构
        $container.html(html); //插入dom
    })
};

var charactor = function (id) {
    $("#pageStyle").attr("href", "/WEB-Final/css/charactorInfoStyle.css");
    $(".swiper").empty();
    if($.cookie("changed") != undefined){
        $.removeCookie("changed", { expires: 7, path: "" });
        location.reload();
    }
    localforage.getItem("charactorList", function (err, value) {
        var info;
        console.log("getInfo");
        for (var i = 0; i < value.charactors.length; i++) {
            if (value.charactors[i].id == id) {
                info = value.charactors[i];
                break;
            }
        }
        var $container = $("#content-container"); //容器
        var source = $("#InfoTemplate").html(); //获取到html结构
        var template = Handlebars.compile(source); //编译成模板
        var html = template(info); //生成完成的html结构
        $container.html(html); //插入dom
        $("#commentBtn").on("click", function () {
            $(".inputArea").before("<p>" + $("#commentContent")[0].value + "</p>");
            $("#commentContent").val("");
        });
        $("#modify").on("click",function(){
            window.location.href = "#/editCharactor/" + id;
        })
        changeInfo();
    });
    
    // addLoadEvent(changeInfo);
    // addLoadEvent(addComment);
};

var editCharactor = function (id) {
    var headerUrl = "/WEB-Final/template/charactorInfoForm.tql";
    var iconUrl, photoUrl;
    $("#pageStyle").attr("href", "/WEB-Final/css/charactorInfoFormStyle.css");
    $(".swiper").empty();
    $.get(headerUrl, function (result) {
        $("#content-container").html(result);
        $("#photo").on("change", (e) => {
            const file = e.target.files[0];
            const reader = new FileReader(); // 创建FileReader对象(文件对象)
            console.log(reader);
            reader.readAsDataURL(file);
            console.log(reader);
            reader.onload = (e) => {
                // 读取成功时：
                photoUrl = e.target.result;
            };
        });
        $("#icon").on("change", (e) => {
            const file = e.target.files[0];
            const reader = new FileReader(); // 创建FileReader对象(文件对象)
            console.log(reader);
            reader.readAsDataURL(file);
            console.log(reader);
            reader.onload = (e) => {
                // 读取成功时：
                iconUrl = e.target.result;
            };
        });
        addWork();
        $("#infoForm").on("submit", function (event) {
            event.preventDefault();
            var info = decodeURIComponent($("#infoForm").serialize()); //获取form id=title的表单数据
            var Json_info = formToJson(info);
            console.log(Json_info)
            localforage.getItem("charactorList", function (err, value) {
                for (var i = 0; i < value.charactors.length; i++) {
                    if (value.charactors[i].id == id) {
                        value.charactors[i] = Json_info;
                        break;
                    }
                }
                console.log(value);
                localforage.setItem("charactorList", value, function (err, data) {
                    console.log(data);
                });
            });
            var shortInfo = new Object();
            shortInfo["id"] = id;
            shortInfo["charactorName"] = Json_info.charactorName;
            shortInfo["charactorIconUrl"] = Json_info.charactorIconUrl;
            shortInfo["charactorInfoUrl"] = "#/charactor/"+id
            console.log(shortInfo)
            localforage.getItem("houseList", function(err, value){
                for(var i = 0; i < value.houses.length; i++){
                    for(var j = 0; j < value.houses[i].charactors.length; j++){
                        if(value.houses[i].charactors[j].id == id){
                            console.log(value.houses[i].charactors[j])
                            value.houses[i].charactors[j] = shortInfo;
                        }
                    }
                }
                console.log(value)
                localforage.setItem("houseList", value, function (err, data) {
                    console.log(data);
                });
                
            })
            $.cookie("changed", true, { expires: 7, path: "" });
            window.location.href = "#/charactor/" + id;
        }); 
    });
    

    

    function formToJson(data) {
        var info = new Object();
        var works = new Array();
        data = data.split("&");
        console.log(data)
        var i = 0;
        info["id"] = id;
        info["charactorIconUrl"] = iconUrl;
        info["actorIcon"] = photoUrl;
    
        while (i < data.length) {
            var index = data[i].indexOf("=");
            var item = data[i].slice(index + 1);
            var name = data[i].slice(0, index);
            if (name.includes("work")) {
                break;
            } else {
                info[name] = item;
            }
            i++;
        }
        while (i < data.length) {
            var work = new Object();
            var index = data[i].indexOf("=");
            var item = data[i].slice(index + 1);
            work["time"] = item;
            var index = data[i + 1].indexOf("=");
            var item = data[i + 1].slice(index + 1);
            work["type"] = item;
            var index = data[i + 2].indexOf("=");
            var item = data[i + 2].slice(index + 1);
            work["workName"] = item;
            var index = data[i + 3].indexOf("=");
            var item = data[i + 3].slice(index + 1);
            work["rolePlayed"] = item;
            works.push(work);
            i = i + 4;
        }
        info["works"] = works;
        return info;
    }

};
var login = function(){
    var loginUrl = "/WEB-Final/template/login.tql";
    $("#pageStyle").attr("href", "/WEB-Final/css/loginStyle.css");
    $("#localScript").attr("src", "");
    $("#content-container").empty();
    $.get(loginUrl, function (result) {
        $("#content-container").html(result);
        var user = {
            userName:"admin",
            userPwd:123456
        }
        
        $('#loginButton').on('click',function(){
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
                $.cookie('userName',userName,{expires: 7, path: '/WEB-Final' })
                window.location.href = ''
                location.reload();
            }
        })
    })
}
var routes = {
    "": index,
    "/menu": menu,
    "/charactor/:id": charactor,
    "/editCharactor/:id": editCharactor,
    "/login" :login
};
var router = Router(routes);
router.init();
