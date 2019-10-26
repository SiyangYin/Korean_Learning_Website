var non_ppc_people
var ppc_people
var current_index = 0


function makeListItemWrapper(text, value, list){
    return "<div class='list_text ui-widget-header "+list+"'data-value="+value["Index"]+">"+text+"</div>"
}

var display_lists = function(non_ppc_people, ppc_people){
//     move_to_study_room(ppc_people[current_index])
    $("#non_ppc_list").empty()
    $.each(non_ppc_people, function(index, value){
//         console.log(value["Korean"])
//         console.log(value["English"])
        var text = (value["Index"]+1) + ": " + value["Korean"]// + ", " + value["English"]
        var text_wrapper = makeListItemWrapper(text, value, "entry non_ppc_entry")
        $("#non_ppc_list").append(text_wrapper)
        
        $(".non_ppc_entry").draggable({
            zIndex: 3,
            revert: function(droppableObj){
                if(droppableObj === false){
                    return true;
                }else{
                    return false;
                }
            }
        })
    })
    
    $("#ppc_list").empty()
    $.each(ppc_people, function(index, value){
        var text = (value["Index"]+1) + ": " + value["Korean"]// + ", " + value["English"]
        var text_wrapper = makeListItemWrapper(text, value, "entry ppc_entry")
        $("#ppc_list").append(text_wrapper)
        
        $(".ppc_entry").draggable({
            zIndex: 3,
            revert: function(droppableObj){
                if(droppableObj === false){
                    return true;
                }else{
                    return false;
                }
            }
        })        
    })
}

var init = function(){
    $.ajax({
        type: "POST",
        url: "/init",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(null),
        success: function(result){
//             non_ppc_people = result["non_ppc_people"]
//             ppc_people = result["ppc_people"]
//             display_lists(non_ppc_people, ppc_people)
            var name = {"name": 1}
            import_word_list(name);
            // move_to_study_room(ppc_people[current_index]);
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });    
}

var move_to_ppc = function(name){
    $.ajax({
        type: "POST",
        url: "/move_to_ppc",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(name),
        success: function(result){
            non_ppc_people = result["non_ppc_people"]
            ppc_people = result["ppc_people"]
            display_lists(non_ppc_people, ppc_people)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });        
}

var import_word_list = function(name){
    $.ajax({
        type: "POST",
        url: "/import_word_list",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(name),
        success: function(result){
            non_ppc_people = result["non_ppc_people"]
            ppc_people = result["ppc_people"]
            display_lists(non_ppc_people, ppc_people)
            move_to_study_room(ppc_people[current_index]);
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });        
}

var move_to_non_ppc = function(name){
    $.ajax({
        type: "POST",
        url: "/move_to_non_ppc",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(name),
        success: function(result){
            non_ppc_people = result["non_ppc_people"]
            ppc_people = result["ppc_people"]
            display_lists(non_ppc_people, ppc_people)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });         
}

var move_to_study_room = function(name_dropped){
    $("#study_room").empty()
    var p0 = $("<p class='num'>")
    $(p0).text(name_dropped["Index"]+1)   
    var p1 = $("<p class='ko'>")
    $(p1).text("Korean:  " + name_dropped["Korean"])    
    var p2 = $("<p class='en'>")
    $(p2).text("English:  " + name_dropped["English"])    
    var p3 = $("<p class='pro'>")
    $(p3).text("Pronunciation:  " + name_dropped["Pronunciation"]) 
    var audio = $("<audio id='audio'>")
    var src = name_dropped["Audio"]
    $(audio).attr("src", src)
    $("#study_room").append(p0)    
    $("#study_room").append(p1)
    $("#study_room").append(p2)
    $("#study_room").append(p3)
    $("#study_room").append(audio)   
    $("#study_room").prop("data-value", name_dropped["Index"])
//     $.each(ppc_people, function(i, val){
//         if(val["Index"] == name_dropped["Index"]){
//             alert(i)
//             current_index = i-1;
//         }
//     })
//     $("#study_room").data("value", name_dropped["Index"])    
//     console.log(name_dropped["Index"])
//     console.log($("#study_room").prop("data-value"))
//     console.log($("#study_room").data("value"))
    display_lists(non_ppc_people, ppc_people)
//     $.ajax({
//         type: "POST",
//         url: "/move_to_non_ppc",                
//         dataType : "json",
//         contentType: "application/json; charset=utf-8",
//         data : JSON.stringify(name),
//         success: function(result){
//             non_ppc_people = result["non_ppc_people"]
//             ppc_people = result["ppc_people"]
//             display_lists(non_ppc_people, ppc_people)
//         },
//         error: function(request, status, error){
//             console.log("Error");
//             console.log(request)
//             console.log(status)
//             console.log(error)
//         }
//     });         
}

var clear_to_learn = function(){
    $.ajax({
        type: "POST",
        url: "/clear_to_learn",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(null),
        success: function(result){
            non_ppc_people = result["non_ppc_people"]
            ppc_people = result["ppc_people"]
            display_lists(non_ppc_people, ppc_people)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });  
}

var clear_learned = function(){
    $.ajax({
        type: "POST",
        url: "/clear_learned",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(null),
        success: function(result){
            non_ppc_people = result["non_ppc_people"]
            ppc_people = result["ppc_people"]
            display_lists(non_ppc_people, ppc_people)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });  
}

var next = function(){
//     alert(current_index)
//     alert(ppc_people.length)
    if(current_index < ppc_people.length-1){
        var name_dropped = ppc_people[current_index+1]
//         alert(2)
        move_to_study_room(name_dropped)	            
    }	
    else if(current_index > 0){
        current_index = ppc_people.length - 2
//         alert("a")
//         current_index-=1
        var name_dropped = ppc_people[current_index]
//         console.log(JSON.stringify(name_dropped));
        move_to_study_room(name_dropped)	            
    }    
}

// var previous = function(){
//     if(current_index > 0){
//         var name_dropped = ppc_people[--current_index]
//         move_to_study_room(name_dropped)	            
//     }
// }
$(document).ready(function(){
    init();
//     display_lists(non_ppc_people, ppc_people)
	$("div").on('mouseenter', function () {		 
	    
	    $("#clear_to_learn").unbind("click").click(function(){
	        clear_to_learn();
	        
	    })

	    $("#clear_learned").unbind("click").click(function(){
	        clear_learned();
	        
	    })

	    $("#play").click(function(){
	        $("#audio")[0].play()
	    })

// 	    $("#previous").unbind("click").click(function(){
// 	        if(current_index > 0){
//                 var name_dropped = ppc_people[--current_index]
//                 move_to_study_room(name_dropped)	            
// 	        }
// 	    })
	    
// 	    $("#next").unbind("click").click(function(){
//             if(current_index < ppc_people.length-1){
//                 var name_dropped = ppc_people[++current_index]
//                 move_to_study_room(name_dropped)	            
//             }	
// 	    })

	    $("#got_it").unbind("click").click(function(){
// 	        if(current_index < ppc_people.length-1){
// //                 var name_dropped = ppc_people[current_index]
// //                 move_to_non_ppc(name_dropped)	
//                 
// //                 var name_dropped = $("#study_room").prop("data-value"）
//                 var name_dropped = $("#study_room").data("value")                
//                 var name = {"name": name_dropped}
//                 move_to_non_ppc(name)                   
// 	        }
            
            $.each(ppc_people, function(index, value){
//                 console.log(JSON.stringify($("#study_room").prop("data-value")));
                if(value["Index"] == $("#study_room").prop("data-value")){
//                     if(value["Index"] == $(ui.draggable[0]).data("value")){
//                         console.log($(ui.draggable[0]).prop("data-value"))
                    var name_dropped = value         
                    var name = {"name": name_dropped}
                    move_to_non_ppc(name) 
                    // next();
//                     alert(1);
//                     console.log(1)
//                     $("#study_room").empty()
                }	     
            })
            next();
//             if(current_index < ppc_people.length-1){
//                 next();
//             }
//             else if(current_index > 0){
//                 previous();
//             }
            
	    })
	
        $(".entry").hover(function(){
            $(this).css("cursor","move");
            $(this).css("background-color","LightYellow");
        },function(){
            $(this).css("background-color","White");
        });    
    
//         $("#ppc_label").droppable({
//             accept: ".non_ppc_entry",
//             classes: {
//                 "ui-droppable-active": "highlightDRAGGING",
//                 "ui-droppable-hover": "highlightHOVER"
//             },
//             drop: function(event, ui){
//                 var name_dropped = non_ppc_people[$(ui.draggable[0]).data("value")]
//                 var name = {"name": name_dropped}
//                 move_to_ppc(name)
//             }
//         })

//         $("#ppc_label").droppable({
//             accept: ".item",
//             classes: {
//                 "ui-droppable-active": "highlightDRAGGING",
//                 "ui-droppable-hover": "highlightHOVER"
//             },
//             drop: function(event, ui){
//                 var name_dropped = $(ui.draggable[0]).data("value")
//                 var name = {"name": name_dropped}
//                 import_word_list(name)
//                 
//             }
//         })

        $("#ppc_label").droppable({
            accept: ".item, #study_room, .non_ppc_entry",
            classes: {
                "ui-droppable-active": "highlightDRAGGING",
                "ui-droppable-hover": "highlightHOVER"
            },
            drop: function(event, ui){
                if($(ui.draggable[0]).parent()[0].id == "to_learn_window" || $(ui.draggable[0]).parent()[0].id == "learned_window"){
                    var Id = $(ui.draggable[0]).data("value")
                    var name = {"name": Id}
                    import_word_list(name)                    
                }
                else if($(ui.draggable[0]).parent()[0].id == "mid"){
                    $.each(non_ppc_people, function(index, value){
                        if(value["Index"] == $(ui.draggable[0]).prop("data-value")){
                            var name_dropped = value         
                            var name = {"name": name_dropped}
                            move_to_ppc(name)       
//                             next();
//                             $("#study_room").empty()
                        }     
                    })                
//                     next();
                }
                else if($(ui.draggable[0]).parent()[0].id == "non_ppc_list"){
                    var name_dropped = non_ppc_people[$(ui.draggable[0]).data("value")]
                    var name = {"name": name_dropped}
                    move_to_ppc(name)                
                }
            }
        })
    
//         $("#non_ppc_label").droppable({
//             accept: ".ppc_entry",
//             classes: {
//                 "ui-droppable-active": "highlightDRAGGING",
//                 "ui-droppable-hover": "highlightHOVER"
//             },
//             drop: function(event, ui){
//                 var name_dropped = ppc_people[$(ui.draggable[0]).data("value")]
//                 var name = {"name": name_dropped}
//                 move_to_non_ppc(name)
//             }
//         })   

        $("#non_ppc_label").droppable({
            accept: "#study_room, .ppc_entry",
            classes: {
                "ui-droppable-active": "highlightDRAGGING",
                "ui-droppable-hover": "highlightHOVER"
            },
            drop: function(event, ui){
                if($(ui.draggable[0]).parent()[0].id == "mid"){
                    $.each(ppc_people, function(index, value){
                        if(value["Index"] == $(ui.draggable[0]).prop("data-value")){
    //                     if(value["Index"] == $(ui.draggable[0]).data("value")){
    //                         console.log($(ui.draggable[0]).prop("data-value"))
                            var name_dropped = value         
                            var name = {"name": name_dropped}
                            move_to_non_ppc(name)   
//                             next();
//                             $("#study_room").empty()
                        }
                        
    //                     var text = (value["Index"]+1) + ": " + value["Korean"] + ", " + value["English"]
    //                     var text_wrapper = makeListItemWrapper(text, value, "entry ppc_entry")
    //                     $("#ppc_list").append(text_wrapper)
    //         
    //                     $(".ppc_entry").draggable({
    //                         revert: function(droppableObj){
    //                             if(droppableObj === false){
    //                                 return true;
    //                             }else{
    //                                 return false;
    //                             }
    //                         }
    //                     })        
                    })  
                    next();
                }
                else if($(ui.draggable[0]).parent()[0].id == "ppc_list"){
                    var name_dropped = ppc_people[$(ui.draggable[0]).data("value")]
                    var name = {"name": name_dropped}
                    move_to_non_ppc(name)                
                }

//                 var name_dropped = ppc_people[$(ui.draggable[0]).data("value")]
//                 var name = {"name": name_dropped}
//                 move_to_non_ppc(name)
            }
        })   

        $("#study_room").droppable({
            accept: ".ppc_entry, .non_ppc_entry",
            classes: {
                "ui-droppable-active": "highlightDRAGGING",
                "ui-droppable-hover": "highlightHOVER"
            },
            drop: function(event, ui){
//                 console.log($(ui.draggable[0]).parent()[0].id)
                if($(ui.draggable[0]).parent()[0].id == "ppc_list"){
                    $.each(ppc_people, function(index, value){
                        if(value["Index"] == $(ui.draggable[0]).data("value")){
                            current_index = $(ui.draggable[0]).data("value")
//                             current_index = index
                            var name_dropped = value  
                            move_to_study_room(name_dropped)
//                             move_to_study_room(ppc_people[current_index])
                        }   
                    })                
                  
                }
                else if($(ui.draggable[0]).parent()[0].id == "non_ppc_list"){
                    $.each(non_ppc_people, function(index, value){
                        if(value["Index"] == $(ui.draggable[0]).data("value")){
                            current_index = $(ui.draggable[0]).data("value")
                            var name_dropped = value  
                            move_to_study_room(name_dropped)
                        }   
                    })                   
//                     var name_dropped = non_ppc_list[$(ui.draggable[0]).data("value")]                    
                }
        
//                 var name = {"name": name_dropped}
//                 move_to_study_room(name_dropped)
            }
        })    
        
//         $("#study_room").droppable({
//             accept: ".non_ppc_entry",
//             classes: {
//                 "ui-droppable-active": "highlightDRAGGING",
//                 "ui-droppable-hover": "highlightHOVER"
//             },
//             drop: function(event, ui){
// //                 console.log($(ui.draggable[0]).parent()[0].id)
//                 if($(ui.draggable[0]).parent()[0].id == "non_ppc_list"){
//                     $.each(non_ppc_people, function(index, value){
//                         if(value["Index"] == $(ui.draggable[0]).data("value")){
//                             current_index = $(ui.draggable[0]).data("value")
//                             var name_dropped = value  
//                             move_to_study_room(name_dropped)
//                         }   
//                     })                
//                   
//                 }
// //                 if($(ui.draggable[0]).parent()[0].id == $("#non_ppc_list")){
// //                     var name_dropped = non_ppc_list[$(ui.draggable[0]).data("value")]                    
// //                 }
//         
// //                 var name = {"name": name_dropped}
//                 // move_to_study_room(name_dropped)
//             }
//         })    

        
        $("#study_room").draggable({
            zIndex: 2,
            revert: true,// function(droppableObj){
//                 if(droppableObj === false){
//                     return true;
//                 }else{
//                     return true;
//                 }
//             }// ,
            drag: function(event, ui){
//                 var wValue=0.5 * $(this).width(); 
//                 var hValue=0.5 * $(this).height(); 
//                 $(this).animate({width: wValue, 
//                 height: hValue, 
//                 left:("-"+(0.5 * $(this).width())/2), 
//                 top:("-"+(0.5 * $(this).height())/2)}, 1000);
//                 $(this).css("width", "50%");
//                 $(this).css("height","50%");
//                 $(this).children().css("width", "50%");
//                 $(this).children().css("height", "50%");
//                 $(this).children().hide();
//                 $(this).css('width','30%').css('height','30%');
//                 $(ui.draggable).attr({width:10%, height:10%});
//                 $(ui.draggable).css('width',10%).css('height',10%);
            },       
            stop: function(){
//                 $(this).css("width", "100%");
//                 $(this).css("height", "100%");
//                 $(this).children().css("width", "100%");
//                 $(this).children().css("height", "100%");                
//                 $(this).children().show();
//                 $(this).animate({width: "100", 
//                 height: "80", 
//                 left:"0px", 
//                 top:"0px"}, 1000 );             
//                 $(this).css('width','100%').css('height','100%');
            }
        })           
        
    })
})