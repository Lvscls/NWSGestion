
$("#add_material").submit(function(event){
    alert("Data inserted Successfully")
})

$("#update_material").submit(function(event){
    event.preventDefault()

    var unindexed_array = $(this).serializeArray()
    var data = {}

    $.map(unindexed_array, function(n,i){
        data[n['name']] = n['value']
    })
    console.log(data)

    var request = {
        "url": `http://localhost:3000/api/materials/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response){
        alert("Data modified Successfully")
    })
})

if(window.location.pathname == '/'){
    $ondelete = $('.table tbody td a.delete')
    $ondelete.click(function(){
        var id = $(this).attr("data-id")
        var request = {
            "url": `http://localhost:3000/api/materials/${id}`,
            "method": "DELETE",
        }

        if(confirm("Do you really want to delete this ?")){
            $.ajax(request).done(function(response){
                alert("Data deleted Successfully")
                location.reload()
            })
        }
    })
}

if(window.location.pathname == '/loans'){
    $ondelete = $('.table tbody td a.delete')
    $ondelete.click(function(){
        var id = $(this).attr("data-id")
        var request = {
            "url": `http://localhost:3000/api/loans/${id}`,
            "method": "DELETE",
        }

        if(confirm("Do you really want to delete this ?")){
            $.ajax(request).done(function(response){
                alert("Data deleted Successfully")
                location.reload()
            })
        }
    })
}