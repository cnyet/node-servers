 /**
 * Created by yate on 2017/7/20.
 */
var vm = new Vue({
    el: "#app",
    delimiters: ['${', '}'],
    data: {
        title: "新增",
        listData: {
            id: "",
            name: "",
            url: "",
            country: ""
        }
    },
    methods: {
        editItem: function (event) {
            var id = $(event.target).parents("tr").children(":first").text();
            if(!id) return;
            this.title = "编辑";
            document.getElementById("formInfo").setAttribute("data-id", id);
            $("#newDlg").modal("show");
            $.ajax({
                url: "/list/findBy",
                type: "post",
                data: {id: id}
            }).done(function (data) {
                if(data.code == 1){
                    this.listData = data.data;
                    document.getElementById("name").value = this.listData.name;
                    document.getElementById("url").value = this.listData.url;
                    document.getElementById("country").value = this.listData.country;
                    console.log(this.listData);
                }
            }).fail(function (data) {
                console.error(data);
            }).always(function () {
                console.log("complete");
            });
        },
        delItem: function () {
            var id = $(event.target).parents("tr").children(":first").text();
            if(confirm("确定要删除吗？")){
                $.ajax({
                    url: "/list/deleteBy",
                    type: "post",
                    data: {id: id}
                }).done(function (data) {
                    if(data.code == 1){
                        window.location.reload();
                    }
                    document.getElementsByClassName("form-tips")[0].innerHTML = data.msg;
                }).fail(function (data) {
                    console.error(data);
                }).always(function () {
                    console.log("complete");
                })
            }
        },
        submitForm: function () {
            var param = {};
            var id = document.getElementById("formInfo").getAttribute("data-id");
            param.name = document.getElementById("name").value;
            param.url = document.getElementById("url").value;
            param.country = document.getElementById("country").value;
            if(param.name == ""){
                document.getElementById("name").className = "form-control error";
                return;
            }
            if(param.url == ""){
                document.getElementById("url").className = "form-control error";
                return;
            }
            if(this.listData.name == param.name && this.listData.url == param.url && this.listData.country == param.country){
                $("#newDlg").modal("hide");
                return ;
            }
            if(id){
                param.id = id;
                $.ajax({
                    url: "/list/update",
                    type: "post",
                    data: param
                }).done(function (data) {
                    if(data.code == 1){
                        window.location.reload();
                    }
                    document.getElementsByClassName("form-tips")[0].innerHTML = data.msg;
                    $("form")[0].reset();
                    $("#newDlg").modal("hide");
                    console.log(data);
                }).fail(function (data) {
                    console.error(data);
                }).always(function () {
                    console.log("complete");
                });
            }else{
                $.ajax({
                    url: "/list/add",
                    type: "post",
                    data: param
                }).done(function (data) {
                    if(data.code == 1){
                        window.location.reload();
                    }
                    document.getElementsByClassName("form-tips")[0].innerHTML = data.msg;
                    $("form")[0].reset();
                    console.log(data);
                }).fail(function (data) {
                    console.error(data);
                }).always(function () {
                    console.log("complete");
                });
            }
            
        },
        resetForm: function () {
            $("form")[0].reset();
        }
    }
});