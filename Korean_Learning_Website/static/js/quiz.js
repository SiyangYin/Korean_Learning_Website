var non_ppc_people = []
var dataset
var answer_list = [];
var list_range = 12;
var current_id
var word_learned_lists
var question_number = 0;
var question_list  = [
"What is the <span class='emphasis2'>meaning</span> of <span class='emphasis1'>'replaceable'</span> ?",
"Which <span class='emphasis2'>meaning</span> corresponding to this <span class='emphasis2'>pronunciation</span> ?",
"How to say <span class='emphasis1'>'replaceable'</span> in <span class='emphasis2'>Korean</span> ?",
"Which <span class='emphasis2'>word</span> corresponding to this <span class='emphasis2'>pronunciation</span> ?",
"What is the <span class='emphasis2'>pronunciation</span> of <span class='emphasis1'>'replaceable'</span> ?",
"How to say <span class='emphasis1'>'replaceable'</span> in <span class='emphasis2'>Korean</span> ?"
]
var answer_options = ["A", "B", "C", "D"]

function makeSpanWrapper(i, text){
    return "<span class='other'>"+i+". "+text+"</span>"
}

function makeInputWrapper(name, value, text){
    return "<input type='radio' name="+name+" value="+value+">"+"<span class='options'>"+text+"</span>"
}

function makeAudioWrapper(id, src){
    return "<audio id="+id+" src="+src+">"
}

function makeButtonWrapper(id, text){
    return "<button class='btn btn-outline-primary col-md-1' id="+id+">"+text
}

var init_quiz = function(){
    question_number = 0;
    $.ajax({
        type: "POST",
        url: "/init_quiz",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(),
        success: function(result){
            non_ppc_people = result["non_ppc_people"];
            if(!non_ppc_people.length){
                alert("There is no word to be test, please return to the study room!");
                show_review();
            }
            else{
            dataset = result["dataset"];
            current_id = result["current_id"];
//             alert(current_id);
//             console.log(current_id);
            generate_quiz(non_ppc_people);            
            }

//             alert("Add successfully !");

        },
        error: function(request, status, error){
//             alert("Fail to add !")        
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });     
}

var generate_quiz = function(non_ppc_people){
    question_number = 0;
    $("#quiz_form").empty();
    answer_list = [];
    var left_col = $("<div id='left_col' class='col-md-6'>");
    var right_col = $("<div id='right_col' class='col-md-6'>");    
    $.each(non_ppc_people, function(i, word){
        var div = $("<div class='quiz ui-widget-header'>");
    //     div.text("Your score of this quiz is: " + Math.round(score*100/6));
        var question_index = Math.floor(Math.random()*6);
        var answer_index = Math.floor(Math.random()*4);
        answer_list.push(answer_options[answer_index]);
        if(question_index==0 || question_index==4){
            var question = makeSpanWrapper(i+1, question_list[question_index].replace(/replaceable/,word["Korean"])); 
            div.append(question);
            div.append($("<br><br>"));
            if(question_index==0){
                $.each(answer_options, function(j, option){
                    if(j==answer_index){
                        var input = makeInputWrapper(i, option, " "+option+". "+word["English"]+" ");  
                        div.append(input);
                    }
                    else{
//                         console.log(non_ppc_people.length);
//                         var random_word = dataset[Math.floor(Math.random())]["Words"][Math.floor(Math.random()*list_range)]
                        var random_word = dataset[Math.floor(Math.random()*dataset.length)]["Words"][Math.floor(Math.random()*non_ppc_people.length)]
//                         console.log(random_word["English"]);                        
                        var input = makeInputWrapper(i, option, " "+option+". "+random_word["English"]+" ");
                        div.append(input);
                    }                    
                })                
            } 
            else if(question_index==4){
                $.each(answer_options, function(j, option){
                    if(j==answer_index){
                        var input = makeInputWrapper(i, option, " ");
                        var audio = makeAudioWrapper("aud_"+i+option, word["Audio"]);
                        var button = makeButtonWrapper("btn_"+i+option, option);  
                        $("#btn_"+i+option).click(function(){
                            $("#aud_"+i+option)[0].play();
                        })                        
                        div.append(input);
                        div.append(audio);
                        div.append(button);                        
                        
                    }
                    else{
                        var input = makeInputWrapper(i, option, " ");
//                         console.log(non_ppc_people.length);
//                         var random_word = dataset[Math.floor(Math.random())]["Words"][Math.floor(Math.random()*list_range)];
                        var random_word = dataset[Math.floor(Math.random()*dataset.length)]["Words"][Math.floor(Math.random()*non_ppc_people.length)];
//                         console.log(random_word["Audio"]);                        
                        var audio = makeAudioWrapper("aud_"+i+option, random_word["Audio"]);
                        var button = makeButtonWrapper("btn_"+i+option, option);  
                        $("#btn_"+i+option).click(function(){
                            $("#aud_"+i+option)[0].play();
                        }) 
                        div.append(input);
                        div.append(audio);
                        div.append(button);                        
                        
                    }                    
                })                
            } 
            div.append($("<br><br>"));
        }
        else if(question_index==2 || question_index==5){
            var question = makeSpanWrapper(i+1, question_list[question_index].replace(/replaceable/,word["English"]));    
            div.append(question);
            div.append($("<br><br>"));
            if(question_index==2){
                $.each(answer_options, function(j, option){
                    if(j==answer_index){
                        var input = makeInputWrapper(i, option, " "+option+". "+word["Korean"]+" ");  
                        div.append(input);
                    }
                    else{
//                         console.log(non_ppc_people.length);
//                         var random_word = dataset[Math.floor(Math.random())]["Words"][Math.floor(Math.random()*list_range)]
                        var random_word = dataset[Math.floor(Math.random()*dataset.length)]["Words"][Math.floor(Math.random()*non_ppc_people.length)]
//                         console.log(random_word["Korean"]);                        
                        var input = makeInputWrapper(i, option, " "+option+". "+random_word["Korean"]+" ");
                        div.append(input);
                    }                    
                })                
            }
            else if(question_index==5){
                $.each(answer_options, function(j, option){
                    if(j==answer_index){
                        var input = makeInputWrapper(i, option, " ");
                        var audio = makeAudioWrapper("aud_"+i+option, word["Audio"]);
                        var button = makeButtonWrapper("btn_"+i+option, option);  
                        $("#btn_"+i+option).click(function(){
                            $("#aud_"+i+option)[0].play();
                        })                        
                        div.append(input);
                        div.append(audio);
                        div.append(button);                        
                        
                    }
                    else{
                        var input = makeInputWrapper(i, option, " ");
//                         console.log(non_ppc_people.length);
//                         var random_word = dataset[Math.floor(Math.random())]["Words"][Math.floor(Math.random()*list_range)];
                        var random_word = dataset[Math.floor(Math.random()*dataset.length)]["Words"][Math.floor(Math.random()*non_ppc_people.length)];
//                         console.log(random_word["Audio"]);                        
                        var audio = makeAudioWrapper("aud_"+i+option, random_word["Audio"]);
                        var button = makeButtonWrapper("btn_"+i+option, option);  
                        $("#btn_"+i+option).click(function(){
                            $("#aud_"+i+option)[0].play();
                        }) 
                        div.append(input);
                        div.append(audio);
                        div.append(button);                        
                    }                    
                })                
            }    
            div.append($("<br>"));
        }  
        else if(question_index==1 || question_index==3){
            var question = makeSpanWrapper(i+1, question_list[question_index]);
            var audio = makeAudioWrapper("aud_"+i+"Q", word["Audio"]);
            var button = makeButtonWrapper("btn_"+i+"Q", "Play");  
            $("#btn_"+i+"Q").click(function(){
                $("#aud_"+i+"Q")[0].play();
            })                            
            div.append(question);
            div.append(audio);
            div.append(button);
            div.append($("<br><br>"));
            if(question_index==1){
                $.each(answer_options, function(j, option){
                    if(j==answer_index){
                        var input = makeInputWrapper(i, option, " "+option+". "+word["English"]+" ");  
                        div.append(input);
                    }
                    else{
//                         console.log(non_ppc_people.length);
//                         var random_word = dataset[Math.floor(Math.random())]["Words"][Math.floor(Math.random()*list_range)]
                        var random_word = dataset[Math.floor(Math.random()*dataset.length)]["Words"][Math.floor(Math.random()*non_ppc_people.length)]
//                         console.log(random_word["English"]);                        
                        var input = makeInputWrapper(i, option, " "+option+". "+random_word["English"]+" ");
                        div.append(input);
                    }                    
                })                
            }
            else if(question_index==3){
                $.each(answer_options, function(j, option){
                    if(j==answer_index){
                        var input = makeInputWrapper(i, option, " "+option+". "+word["Korean"]+" ");  
                        div.append(input);
                    }
                    else{
//                         console.log(non_ppc_people.length);
//                         var random_word = dataset[Math.floor(Math.random())]["Words"][Math.floor(Math.random()*list_range)]
                        var random_word = dataset[Math.floor(Math.random()*dataset.length)]["Words"][Math.floor(Math.random()*non_ppc_people.length)]
//                         console.log(random_word["Korean"]);                        
                        var input = makeInputWrapper(i, option, " "+option+". "+random_word["Korean"]+" ");
                        div.append(input);
                    }                    
                })                
            }       
            div.append($("<br><br>"));
        }         
//         question.text()   ;
//         var A = makeInputWrapper(i, "A", "A. "+)
        question_number++;
//         var left_col = $("<div id='left_col' class='col-md-5'>");
//         var right_col = $("<div id='right_col' class='col-md-5'>");
        if(question_number%2==1){
            left_col.append(div);
        }
        else if(question_number%2==0){
            right_col.append(div);
        }
//         var row = $("<div class='row'>");
//         row.append(left_col);
//         row.append(right_col);  
//         $("#quiz_form").append(row);
//         $("#quiz_form").append(left_col);
//         $("#quiz_form").append(right_col);        
//         $("#quiz_form").append(div);    
    });
    var row = $("<div class='row'>");
    var mid_col = $("<div id='mid_col' class='col-md-2'>");
    row.append(left_col);
//     row.append(mid_col);
    row.append(right_col);      
    $("#quiz_form").append(row);
    $("#quiz_form").append($('<button id="submit" class="btn btn-outline-success col-md-2" type="submit">Submit</button>'));
//     $("#quiz_form").append($("<br><br>"));
    $("#quiz_form").append($('<button id="show_answer" class="btn btn-outline-success col-md-2">Show Correct Answer</button>'));
}

var show_score = function(point){
    $("#score_bar").empty();
    var div = $("<div class='score'>");
    var span = $("<span class='score_statement'>Your score of this quiz is: </span>");
    div.append(span);
    div.append(Math.round(point*100/non_ppc_people.length));
//     div.text("<span class='score_statement'>Your score of this quiz is: </span>" + Math.round(point*100/non_ppc_people.length));
    $("#score_bar").append(div);
}

var add_to_word_learned_lists = function(word_learned_lists){
//     console.log(word_learned_lists[0]["Id"]);
//     console.log(word_learned_lists[0]["List_name"]);
    $("#learned_window").empty()
//     $("#window").append($("<br>"))
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
}

var check_answer = function(form_data){
    var point = 0;
    $.each(form_data, function(i, val){
//         console.log(val["value"]);
//         console.log(answer_list[i]);
//         if(val["value"]==answer_list[i]){
//             point++;
//         }
        if(i<non_ppc_people.length/2 && val["value"]==answer_list[2*i]){
            point++;
        }
        if(i>=non_ppc_people.length/2 && val["value"]==answer_list[2*(i-non_ppc_people.length/2+1)-1]){
            point++;
        }        
    })
    show_score(point);
//     alert(form_data.length);
//     alert(dataset[current_id-1]['Words'].length);
//     alert(point);
    if(form_data.length == dataset[current_id-1]['Words'].length && point == form_data.length){
//         word_learned_lists.append(dataset[current_id-1])
        var name = {"name": current_id}
        $.ajax({
            type: "POST",
            url: "/update_achievement",                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(name),
            success: function(result){
                    show_cong();
//                     alert("Congratulations! You have successfully competed word list "+current_id);            
                    word_learned_lists = result["word_learned_lists"]
//                     console.log(word_learned_lists[0]["Id"]);
//                     console.log(word_learned_lists[0]["List_name"]);
                    add_to_word_learned_lists(word_learned_lists);
//                 non_ppc_people = result["non_ppc_people"];
//                 dataset = result["dataset"];
//                 current_id = result["current_id"];
//     //             console.log(51);
//                 generate_quiz(non_ppc_people);
    //             alert("Add successfully !");

            },
            error: function(request, status, error){
    //             alert("Fail to add !")        
                console.log("Error")
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });            
//         alert("Congratulations! You have successfully competed word list "+current_id);
//         $("#learned_window").empty()
//     //     $("#window").append($("<br>"))
//         $.each(word_learned_lists, function(i, data_entry){
//     //         alert("1")
//             var list = $("<div class='col-md-12 item'>");
//     //         var  = 
//             var a = $("<a>")
//     //         $(a).text(data_entry["List_name"].substring(0,10));
//             var href = "/view_item/" + data_entry["Id"]
//             $(a).attr("href", href);
//     //         var img = $("<img>")
//     // //         var src = "../static/images/pic7.jpg"
//     //         var src = data_entry["Poster"]
//     //         $(img).attr("src", src)
//     // //         var li = $("<li>")
//     // //         $(li).text(data_entry["List_name"])
//             var p1 = $("<p>")
//             $(p1).text(data_entry["List_name"]);
//     //         var p2 = $("<p>")
//     //         $(p2).text(data_entry["Genre"])        
//     //         a.append(img)
//     //         a.append(li)
//             a.append(p1)    
//     //         a.append(p2)
//             list.append(a)
//     //         $("#window").append($("<div class='col-md-1'>"))
//             $(list).attr("data-value", data_entry["Id"])
//     //         $(a).attr("data-value", data_entry["Id"])
//             $("#learned_window").append(list)  
//             $("#learned_window").append($("<div class='col-md-1'>"))  
//         })
    }
    else{
    show_review();
    }
//     $.ajax({
//         type: "POST",
//         url: "/check_answer",                
//         dataType : "json",
//         contentType: "application/json; charset=utf-8",
//         data : JSON.stringify(form_data),
//         success: function(result){
//             var score = result["score"];
// //             var Id = result["Id"];
// //             console.log(51);
//             show_score(score);
// //             alert("Add successfully !");
// 
//         },
//         error: function(request, status, error){
// //             alert("Fail to add !")        
//             console.log("Error")
//             console.log(request)
//             console.log(status)
//             console.log(error)
//         }
//     });       
}

var show_answer = function(answer_list){   
//     alert(1);
    $("#answer_bar").empty();
    var div = $("<div class='answer'>");
    var span = $("<span class='answer_statement'>The correct answers of this quiz are: </span>");
    div.append(span);
    div.append($("<br>"));
    $.each(answer_list, function(i, val){
        var answer = $("<span>");
        answer.text(i+1+". "+val+" ");
        div.append(answer);
        if((i+1)%5==0){
            div.append($("<br>"));
        }
    })
    $("#answer_bar").append(div);   
//     alert(2);
}

var show_cong = function(){   
//     alert(1);
    $("#cong_bar").empty();
    var div = $("<div class='cong'>");
    var a = $("<a href='/view_item'>")
    a.text("Congratulations! You have successfully completed word list "+current_id);
    div.append(a);
    $("#cong_bar").append(div);    
}

var show_review = function(){   
//     alert(1);
    $("#cong_bar").empty();
    var div = $("<div class='cong'>");
    var a = $("<a href='/view_item'>")
    if(current_id){
        a.text("You can click here to review word list "+current_id);    
    }
    else{
        a.text("You can click here to go back to the study room");
    }
    div.append(a)
    $("#cong_bar").append(div);    
}


$(document).ready(function(){
    init_quiz();
//     $.each(non_ppc_people, function(i, val){
//         $.each(answer_options, function(j, option){       
//             $("#btn_"+i+option).click(function(){
//                 $("#aud_"+i+option)[0].play();
//             })
//         })        
//         $("#btn_"+i+"Q").click(function(){
//             $("#aud_"+i+"Q")[0].play(); 
//         })
//     })
    $("div").on('mouseenter', function () {	
        $("#btn_0A").click(function(){
            $("#aud_0A")[0].play()
        })    
        $("#btn_0B").click(function(){
            $("#aud_0B")[0].play()
        })    
        $("#btn_0C").click(function(){
            $("#aud_0C")[0].play()
        })    
        $("#btn_0D").click(function(){
            $("#aud_0D")[0].play()
        })    
        $("#btn_0Q").click(function(){
            $("#aud_0Q")[0].play()
        })    
        $("#btn_1A").click(function(){
            $("#aud_1A")[0].play()
        })    
        $("#btn_1B").click(function(){
            $("#aud_1B")[0].play()
        })    
        $("#btn_1C").click(function(){
            $("#aud_1C")[0].play()
        })    
        $("#btn_1D").click(function(){
            $("#aud_1D")[0].play()
        })    
        $("#btn_1Q").click(function(){
            $("#aud_1Q")[0].play()
        })    
        $("#btn_2A").click(function(){
            $("#aud_2A")[0].play()
        })    
        $("#btn_2B").click(function(){
            $("#aud_2B")[0].play()
        })    
        $("#btn_2C").click(function(){
            $("#aud_2C")[0].play()
        })    
        $("#btn_2D").click(function(){
            $("#aud_2D")[0].play()
        })    
        $("#btn_2Q").click(function(){
            $("#aud_2Q")[0].play()
        })    
        $("#btn_3A").click(function(){
            $("#aud_3A")[0].play()
        })    
        $("#btn_3B").click(function(){
            $("#aud_3B")[0].play()
        })    
        $("#btn_3C").click(function(){
            $("#aud_3C")[0].play()
        })    
        $("#btn_3D").click(function(){
            $("#aud_3D")[0].play()
        })    
        $("#btn_3Q").click(function(){
            $("#aud_3Q")[0].play()
        })    
        $("#btn_4A").click(function(){
            $("#aud_4A")[0].play()
        })    
        $("#btn_4B").click(function(){
            $("#aud_4B")[0].play()
        })    
        $("#btn_4C").click(function(){
            $("#aud_4C")[0].play()
        })    
        $("#btn_4D").click(function(){
            $("#aud_4D")[0].play()
        })    
        $("#btn_4Q").click(function(){
            $("#aud_4Q")[0].play()
        })    
        $("#btn_5A").click(function(){
            $("#aud_5A")[0].play()
        })    
        $("#btn_5B").click(function(){
            $("#aud_5B")[0].play()
        })    
        $("#btn_5C").click(function(){
            $("#aud_5C")[0].play()
        })    
        $("#btn_5D").click(function(){
            $("#aud_5D")[0].play()
        })    
        $("#btn_5Q").click(function(){
            $("#aud_5Q")[0].play()
        })    
        $("#btn_6A").click(function(){
            $("#aud_6A")[0].play()
        })    
        $("#btn_6B").click(function(){
            $("#aud_6B")[0].play()
        })    
        $("#btn_6C").click(function(){
            $("#aud_6C")[0].play()
        })    
        $("#btn_6D").click(function(){
            $("#aud_6D")[0].play()
        })    
        $("#btn_6Q").click(function(){
            $("#aud_6Q")[0].play()
        })    
        $("#btn_7A").click(function(){
            $("#aud_7A")[0].play()
        })    
        $("#btn_7B").click(function(){
            $("#aud_7B")[0].play()
        })    
        $("#btn_7C").click(function(){
            $("#aud_7C")[0].play()
        })    
        $("#btn_7D").click(function(){
            $("#aud_7D")[0].play()
        })    
        $("#btn_7Q").click(function(){
            $("#aud_7Q")[0].play()
        })    
        $("#btn_8A").click(function(){
            $("#aud_8A")[0].play()
        })    
        $("#btn_8B").click(function(){
            $("#aud_8B")[0].play()
        })    
        $("#btn_8C").click(function(){
            $("#aud_8C")[0].play()
        })    
        $("#btn_8D").click(function(){
            $("#aud_8D")[0].play()
        })   
        $("#btn_8Q").click(function(){
            $("#aud_8Q")[0].play()
        })         
        $("#btn_9A").click(function(){
            $("#aud_9A")[0].play()
        })    
        $("#btn_9B").click(function(){
            $("#aud_9B")[0].play()
        })    
        $("#btn_9C").click(function(){
            $("#aud_9C")[0].play()
        })    
        $("#btn_9D").click(function(){
            $("#aud_9D")[0].play()
        })  
        $("#btn_9Q").click(function(){
            $("#aud_9Q")[0].play()
        })         
        $("#btn_10A").click(function(){
            $("#aud_10A")[0].play()
        })    
        $("#btn_10B").click(function(){
            $("#aud_10B")[0].play()
        })    
        $("#btn_10C").click(function(){
            $("#aud_10C")[0].play()
        })    
        $("#btn_10D").click(function(){
            $("#aud_10D")[0].play()
        })    
        $("#btn_10Q").click(function(){
            $("#aud_10Q")[0].play()
        })         
        $("#btn_11A").click(function(){
            $("#aud_11A")[0].play()
        })    
        $("#btn_11B").click(function(){
            $("#aud_11B")[0].play()
        })    
        $("#btn_11C").click(function(){
            $("#aud_11C")[0].play()
        })    
        $("#btn_11D").click(function(){
            $("#aud_11D")[0].play()
        })    
        $("#btn_11Q").click(function(){
            $("#aud_11Q")[0].play()
        })         
        $("#btn_12A").click(function(){
            $("#aud_12A")[0].play()
        })    
        $("#btn_12B").click(function(){
            $("#aud_12B")[0].play()
        })    
        $("#btn_12C").click(function(){
            $("#aud_12C")[0].play()
        })    
        $("#btn_12D").click(function(){
            $("#aud_12D")[0].play()
        })  
        $("#btn_12Q").click(function(){
            $("#aud_12Q")[0].play()
        })         
        $("#submit").unbind("click").click(function(){
    //     $("#submit").unbind("click").on("click", function(){    
            var form_data = $("#quiz_form").serializeArray();
//             $("#quiz_form")[0].reset();
    //         console.log(form_data);
            check_answer(form_data);
            return false;
        })
        $("#show_answer").unbind("click").click(function(){
    //     $("#submit").unbind("click").on("click", function(){    
//             var form_data = $("#quiz_form").serializeArray();
//             $("#quiz_form")[0].reset();
    //         console.log(form_data);
            show_answer(answer_list);
            return false;
        })
    })

})