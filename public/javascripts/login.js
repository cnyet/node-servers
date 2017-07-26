/**
 * Created by yate on 2017/7/19.
 */
$("#submitBtn").click(function () {
    var params = $("form").serialize();
    console.log(params);
    $.ajax({
        url: "/login",
        type: "post",
        data: params
    }).done(function (data) {
        if(data.code == 1){
            window.location.href = "/list";
        }else{
            $(".form-tips").html(data.msg);
        }
        $("form")[0].reset();
        console.log(data);
    }).fail(function (data) {
        console.error(data);
    }).always(function () {
        console.log("complete");
    });
});