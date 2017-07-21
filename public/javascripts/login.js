/**
 * Created by yate on 2017/7/19.
 */
$("#submitBtn").click(function () {
    var params = $("form").serialize();
    console.log(params);
    $.ajax({
        url: "/login/into",
        type: "post",
        data: params
    }).done(function (data) {
        if(data.err == 1){
            window.location.href = "/";
        }else{
            $(".form-tips").html("登录失败！");
        }
        $("form")[0].reset();
        console.log(data);
    }).fail(function (data) {
        console.error(data);
    }).always(function () {
        console.log("complete");
    });
});