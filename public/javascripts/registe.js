/**
 * Created by yate on 2017/7/26.
 */
$("#submitBtn").click(function () {
    var name = document.getElementById("userName");
    var password = document.getElementById("pwd");
    var confirmPwd = document.getElementById("confirmPwd");
    name.className = "form-control";
    password.className = "form-control";
    confirmPwd.className = "form-control";
    if(name.value == ""){
        name.className = "form-control error";
        return;
    }
    if(password.value == ""){
        password.className = "form-control error";
        return;
    }
    if(confirmPwd.value != password.value){
        confirmPwd.className = "form-control error";
        return;
    }
    console.log(name.value+"\n"+password.value);
    $.ajax({
        url: "/registe",
        type: "post",
        data: {
            user: name.value,
            pwd: password.value
        }
    }).done(function (data) {
        if(data.code == 1){
            $(".form-tips").html('<a href="/login">'+data.msg+'，去登录吧</a>');
        }else{
            $(".form-tips").html(data.msg);
        }
        $("form")[0].reset();
        console.log(data);
    }).fail(function (data) {
        console.error(data);
    }).always(function () {
        console.log("complete");
    })
});