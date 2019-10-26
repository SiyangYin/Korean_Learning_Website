
var item_id = {{<item_id>}}
var item = {}

var init = function(){
    $.ajax({
        type: "POST",
        url: "/get_item",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(item_id),
        success: function(result){
//             alert("Init successfully !")
            item = result["item"]
            display(item)
        },
        error: function(request, status, error){
            alert("Fail to init !")        
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }    
    });          
}

var display = function(item){
    $("#window").empty()

    $.each(item, function(i, pair){
//         alert("1")
        var item = $("<div class='col-md-2 item'>");
        item.append(pair)
    });  
        $("#window").append(item)  
}

$(document).ready(function(){
//     alert("Successfully !");
    init();
})

    
    