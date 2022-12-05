var headerUrl = "../../template/header/header.tql";

$.get(headerUrl, function (result) {
    $("#header").html(result);
});

$.ajax({
    type: "GET",
    url: "houseList.JSON",
    dataType:'json',
    contentType:"application/json",
    success: function (data) {
        var $container = $("#houseList"); //容器
        var source = $("#houseListTemplate").html(); //获取到html结构
        var template = Handlebars.compile(source); //编译成模板
        var html = template(data); //生成完成的html结构
        $container.html(html); //插入dom
    },
});
