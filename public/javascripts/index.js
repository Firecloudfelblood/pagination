$(document).ready(function(){
    $(".hideme").attr("disabled",true);
    $("#editar").click(function(){
        $(".hideme").attr("disabled",false);
    });
    $(".hideme").keyup(function(e){
        if (e.keyCode == 13){
            $(".hideme").attr("disabled",true);
        }
    })
});