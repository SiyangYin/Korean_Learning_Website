
var dataset = []
var data_entry = new Array()

 
var add_entry = function(data_entry){
    $.ajax({
        type: "POST",
        url: "/add_entry",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_entry),
        success: function(result){
            var Id = result["Id"];
//             console.log(51);
            add_link(Id);
            alert("Add successfully !");

        },
        error: function(request, status, error){
            alert("Fail to add !")        
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });    
}

var add_link = function(Id){
//     $("#link").empty();
    var a = $("<a>");
    var href = "/view_item/" + Id;  
    $(a).attr("href", href);
    var p = $("<p>");
    $(p).text("link to the new item");
    $(a).append(p);
//             var div = $("<div>")
//             $(div).append(a)
    $("#link").html(a);    
}

$(document).ready(function(){
//     $("#submit").unbind("click").click(function(){
    $("#add_form").unbind("click").submit(function(){
//     $("#submit").unbind("click").on("click", function(){    
        var form_data = $("#add_form").serializeArray();
        $("#add_form")[0].reset();
//         console.log(form_data);
        add_entry(form_data);
        return false;
    })
    
})