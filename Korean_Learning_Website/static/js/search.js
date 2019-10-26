
var dataset = []
var data_entry = new Array()
var result = []

var search = function(input){
    $.ajax({
        type: "POST",
        url: "/search_input",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(input),
        success: function(result){
//             console.log(result["result"])
            if (result["result"].length !== 0){
                alert("Found !")
                dataset = result["result"]
                display(dataset)                
                }
            else{
                alert("Not Found !")
            }

        },
        error: function(request, status, error){
            alert("Not found !")        
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });    
}

// var display = function(dataset){
//     $("#window").empty()
//     
//     $.each(dataset, function(i, data_entry){
// //         alert("1")
//         var item = $("<div class='col-md-2 item'>");
// //         var  = 
//         var a = $("<a>")
//         var href = "/view_item/" + data_entry["Id"]
//         $(a).attr("href", href);
//         var img = $("<img>")
// //         var src = "../static/images/pic7.jpg"
//         var src = data_entry["Poster"]
//         $(img).attr("src", src)
//         var li = $("<li>")
//         $(li).text(data_entry["Rating"])
//         var p1 = $("<p>")
//         $(p1).text(data_entry["Title"])
//         var p2 = $("<p>")
//         $(p2).text(data_entry["Genre"])        
//         a.append(img)
//         a.append(li)
//         a.append(p1)
//         a.append(p2)
//         item.append(a)
// //         $("#window").append($("<div class='col-md-1'>"))
//         $("#window").append(item)  
//         $("#window").append($("<div class='col-md-1'>"))        
// 
// //         $("#window").append(<br>)
// //         alert("2")
//     });  
// }

var display = function(dataset){
    $("#window").empty()
    // $("#window").append(<br><br>)
    $.each(dataset, function(i, data_entry){
//         alert("1")
        var item = $("<div class='col-md-2 item'>");
//         var  = 
        var a = $("<a>")
        var href = "/view_item/" + data_entry["Id"]
        $(a).attr("href", href);
        var img = $("<img>")
//         var src = "../static/images/pic7.jpg"
        var src = data_entry["Poster"]
        $(img).attr("src", src)
//         var li = $("<li>")
//         $(li).text(data_entry["List_name"])
        var p1 = $("<p>")
        $(p1).text(data_entry["List_name"])
//         var p2 = $("<p>")
//         $(p2).text(data_entry["Genre"])        
//         a.append(img)
//         a.append(li)
        a.append(p1)
//         a.append(p2)
        item.append(a)
//         $("#window").append($("<div class='col-md-1'>"))
        $(item).attr("data-value", data_entry["Id"])
                
        $("#window").append(item)  
        $("#window").append($("<div class='col-md-1'>"))  
        
        $(".item").draggable({
            zIndex: 2,
            revert: function(droppableObj){
                if(droppableObj === false){
                    return true;
                }else{
                    return true;
                }
            }// ,
//             drag: function(event, ui){
//                 $(ui.draggable).attr("z-index", 2)
//             }            
        })        
        

//         $("#window").append(<br>)
//         alert("2")
    });  
}

$(document).ready(function(){
//     $("#search").unbind("click").click(function(){
    $("#search_form").submit(function(){
//     $("#submit").unbind("click").on("click", function(){    
    var input = $("#input").val();

    search(input);
    return false;
    })
    
})