
// var dataset = []
// var data_entry = new Array()
// 
// var add_entry = function(data_entry){
//     $.ajax({
//         type: "POST",
//         url: "/add_entry",                
//         dataType : "json",
//         contentType: "application/json; charset=utf-8",
//         data : JSON.stringify(data_entry),
//         success: function(result){
//             alert("Add successfully !")
// //             dataset = result
// //             console.log(dataset)
// //             view_item()
// //             var status = result["status"]
// //             var bounding_box = JSON.stringify(result["bounding_box"])   
// //             console.log(status)
// //             console.log("bounding_box: "+ bounding_box)
// //             return bounding_box
//         },
//         error: function(request, status, error){
//             alert("Fail to add !")        
//             console.log("Error")
//             console.log(request)
//             console.log(status)
//             console.log(error)
//         }
//     });    
// }

// var view_item = function(){
//     $("#window").empty()
//     if(sales.length == 0){
//         var row = $("<div class='row'>")
//         var col_client = $("<div class='col-md-4'>")
//         $(col_client).append("No Sales")
//         $("#sales").append(row)
//     }else {


//     $.each(dataset, function(i, data_entry){
//     
//         var item = $("<div>");
// 
//         var a = $("<a>")
//         var href = "/view_item/" + data_entry["Id"]
//         $(a).attr("href", href);
//         var img = $("<img>")
//         var src = "../static/images/pic7.jpg"
// //         var src = data_entry["Poster"]
//         $(img).attr("src", src)
//         var li = $("<li>")
//         $(li).text(data_entry["Rating"])
//         var p = $("<p>")
//         $(p).text(data_entry["Title"])
//         a.append(img)
//         a.append(li)
//         a.append(p)
//         item.append(a)
//         $("#window").append(item)            
//     })     


//             var entry=$("<div class='row other_row'>");
//             var col=[4];
//             col[0]=$("<span class='col-md-3 col1'>");
//             col[0].text(sale["salesperson"]);
//             col[1]=$("<span class='col-md-5 col2'>");
//             col[1].text(sale["client"]);
//             col[2]=$("<span class='col-md-2 col3'>");	
//             col[2].text(sale["reams"]);
//             col[3]=$("<botton class='btn btn-primary col4 X'>");
//             col[3].text('X');
//             $(col[3]).click(function(){
//                 delete_sale(i)
//             })            
//             $.each(col,function(index,value){
//                 entry.append(value)
//             })
//             $("#sales").prepend(entry)         

//     }

//     $.ajax({
//         type: "POST",
//         url: "/view_item",                
//         dataType : "json",
//         contentType: "application/json; charset=utf-8",
//         data : JSON.stringify(null),
//         success: function(result){
// //             alert("Add successfully !")
// //             dataset = result
// //             view_item(dataset)
// //             var status = result["status"]
// //             var bounding_box = JSON.stringify(result["bounding_box"])   
// //             console.log(status)
// //             console.log("bounding_box: "+ bounding_box)
// //             return bounding_box
//         },
//         error: function(request, status, error){
// //             alert("Fail to add !")        
//             console.log("Error")
//             console.log(request)
//             console.log(status)
//             console.log(error)
//         }
//     });       
// 
// }


// $(document).ready(function(){
//     $("#submit").unbind("click").click(function(){
// //     $("#submit").unbind("click").on("click", function(){    
//         var form_data = $("#add_form").serializeArray();
// //         console.log(form_data);
//         add_entry(form_data);
// //         data_entry = $("#add_form").serialize();
// //         $.each(form_data, function(index,value){
// //             console.log(value["name"]);
// //             console.log(value["value"]);
// // //             data_entry[value["name"]] = value["value"];
// //         })
// //         data_entry = JSON.parse(JSON.stringify(data_entry));
// //         console.log(data_entry);
// //         add_entry(data_entry);
//     })
//     
// })