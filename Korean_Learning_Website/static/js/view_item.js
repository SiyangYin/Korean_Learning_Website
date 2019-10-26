var dataset = []
var word_learned_lists = []
var start = function(){
    $.ajax({
        type: "POST",
        url: "/init",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(null),
        success: function(result){
//             alert("Init successfully !")
            dataset = result["dataset"]
            word_learned_lists = result["word_learned_lists"]
            display(dataset, word_learned_lists)
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

function clone(obj){
    var o;
    switch(typeof obj){
    case 'undefined': break;
    case 'string'   : o = obj + '';break;
    case 'number'   : o = obj - 0;break;
    case 'boolean'  : o = obj;break;
    case 'object'   :
        if(obj === null){
            o = null;
        }else{
            if(obj instanceof Array){
                o = [];
                for(var i = 0, len = obj.length; i < len; i++){
                    o.push(clone(obj[i]));
                }
            }else{
                o = {};
                for(var k in obj){
                    o[k] = clone(obj[k]);
                }
            }
        }
        break;
    default:        
        o = obj;break;
    }
    return o;    
}

function clone3(obj){  
    function Clone(){}  
   Clone.prototype = obj;  
    var o = new Clone();  
    for(var a in o){  
        if(typeof o[a] == "object") {  
            o[a] = clone3(o[a]);  
        }  
    }  
  return o;  
}

var display = function(dataset, word_learned_lists){
    $("#to_learn_window").empty()
    $("#learned_window").empty()
//     $("#window").append($("<br>"))
    $.each(dataset, function(i, data_entry){
//         alert("1")
        var list = $("<div class='col-md-12 item'>");
//         var  = 
        var a = $("<a>")
//         $(a).text(data_entry["List_name"].substring(0,10));
        var href = "/view_item/" + data_entry["Id"]
        $(a).attr("href", href);
//         var img = $("<img>")
// //         var src = "../static/images/pic7.jpg"
//         var src = data_entry["Poster"]
//         $(img).attr("src", src)
// //         var li = $("<li>")
// //         $(li).text(data_entry["List_name"])
        var p1 = $("<p>")
        $(p1).text(data_entry["List_name"]);
//         var p2 = $("<p>")
//         $(p2).text(data_entry["Genre"])        
//         a.append(img)
//         a.append(li)
        a.append(p1)    
//         a.append(p2)
        list.append(a)
//         $("#window").append($("<div class='col-md-1'>"))
        $(list).attr("data-value", data_entry["Id"])
//         $(a).attr("data-value", data_entry["Id"])
        $("#to_learn_window").append(list)  
        $("#to_learn_window").append($("<div class='col-md-1'>"))  
//         if(data_entry["Id"]==1){
//             var list2 = $("<div class='col-md-12 item'>");
//     //         var  = 
//             var a2 = $("<a>")
//     //         $(a).text(data_entry["List_name"].substring(0,10));
//             var href = "/view_item/" + data_entry["Id"]
//             $(a2).attr("href", href);
//     //         var img = $("<img>")
//     // //         var src = "../static/images/pic7.jpg"
//     //         var src = data_entry["Poster"]
//     //         $(img).attr("src", src)
//     // //         var li = $("<li>")
//     // //         $(li).text(data_entry["List_name"])
//             var p2 = $("<p>")
//             $(p2).text(data_entry["List_name"]);
//     //         var p2 = $("<p>")
//     //         $(p2).text(data_entry["Genre"])        
//     //         a.append(img)
//     //         a.append(li)
//             a2.append(p2)    
//     //         a.append(p2)
//             list2.append(a2)
//             $("#learned_window").append(list2)  
//             $("#learned_window").append($("<div class='col-md-1'>"))             
//         }
//         $(".item").draggable({
//             zIndex: 2,
//             revert: function(droppableObj){
//                 if(droppableObj === false){
//                     return true;
//                 }else{
//                     return true;
//                 }
//             }// ,
// //             drag: function(event, ui){
// //                 $(ui.draggable).attr("z-index", 2)
// //             }            
//         })        
        

//         $("#window").append(<br>)
//         alert("2")
    });  
//     $(".item").draggable({
//         zIndex: 2,
//         revert: function(droppableObj){
//             if(droppableObj === false){
//                 return true;
//             }else{
//                 return true;
//             }
//         }// ,
// //             drag: function(event, ui){
// //                 $(ui.draggable).attr("z-index", 2)
// //             }            
//     })       
    $.each(word_learned_lists, function(i, data_entry){
//         alert("1")
        var list = $("<div class='col-md-12 item'>");
//         var  = 
        var a = $("<a>")
//         $(a).text(data_entry["List_name"].substring(0,10));
        var href = "/view_item/" + data_entry["Id"]
        $(a).attr("href", href);
//         var img = $("<img>")
// //         var src = "../static/images/pic7.jpg"
//         var src = data_entry["Poster"]
//         $(img).attr("src", src)
// //         var li = $("<li>")
// //         $(li).text(data_entry["List_name"])
        var p1 = $("<p>")
        $(p1).text(data_entry["List_name"]);
//         var p2 = $("<p>")
//         $(p2).text(data_entry["Genre"])        
//         a.append(img)
//         a.append(li)
        a.append(p1)    
//         a.append(p2)
        list.append(a)
//         $("#window").append($("<div class='col-md-1'>"))
        $(list).attr("data-value", data_entry["Id"])
//         $(a).attr("data-value", data_entry["Id"])
        $("#learned_window").append(list)  
        $("#learned_window").append($("<div class='col-md-1'>"))  
    })    
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
    
}

$(document).ready(function(){
//     alert("Successfully !");
    start();
})

    
    