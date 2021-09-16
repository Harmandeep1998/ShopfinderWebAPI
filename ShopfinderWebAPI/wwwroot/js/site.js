let address = '/api/Shops';

function displayAllShops() {
    $.ajax({
        type: "GET",
        url: address,
        cache: false,
        success: function (data) {
            console.log(data);
            $("#all_records").empty();
            if (data.length == 0) { 
                let html = "<h1>No Shop Available</h1>";
                $("#all_records").append(html);
            } else {                
                $.each(data, function (key, item) { 
                    let html = '<div class="col-md-6  mb-3"><div class="card col-md-12">';
                    html += '<div class="card-body">';
                    html += '<h5 class="card-title">' + item.shopName + '</h5>';
                    html += '<p class="card-text">' + item.details + '</p>';
                    html += '<p><i class="fa fa-address-book mr-2"></i>' + item.address + '</p>';
                    html += '<p><i class="fa fa-phone mr-2"></i>' + item.contactNo + '</p>';
                    html += '</div>';
                    html += '<div class="row mb-2">';
                    html += '<div class="col-md-6">';
                    html += '<button class="btn btn-info btn-block" onclick="getShopDetails(' + item.id + ')" data-toggle="modal" data-target="#edit">Edit</button>';
                    html += '</div>';
                    html += '<div class="col-md-6">';
                    html += '<button class="btn btn-danger btn-block" onclick="deleteShop(' + item.id + ')">Delete</button>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div></div>';
                    $("#all_records").append(html);
                });
            }
        }
    });
}

function addNewShop() {
    
    let shop_name = $('#shop_name').val();
    let shop_address = $('#shop_address').val();
    let shop_details = $('#shop_details').val();
    let shop_contact_no = $('#shop_contact_no').val(); 
    let schedule = {
        shopName: shop_name,
        address: shop_address,
        details: shop_details,
        contactNo: shop_contact_no
    };
    $.ajax({
        type: "POST",
        url: address,
        data: JSON.stringify(schedule),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        alert("New Shop Details are Saved");
        displayAllShops();
    }).fail(function (xhr, status) {
        alert("Shop Details are not Saved");
    });
}


function deleteShop(id) {
    let result = confirm("Are You Sure to Remove Shop Details?");
    if (result) {
        $.ajax({
            type: "DELETE",
            url: address + "/" + id,
        }).done(function (response) {
            alert("Shop Details are Removed From Database");
            displayAllShops();
        });
    }
}

function getShopDetails(id) {
    $.ajax({
        type: "GET",
        url: address + "/" + id,
        contentType: "application/json"
    }).done(function (shop) {
        $('#shop_id').val(shop.id);
        $('#shop_name_edit').val(shop.shopName);
        $('#shop_address_edit').val(shop.address);
        $('#shop_details_edit').val(shop.details);
        $('#shop_contact_no_edit').val(shop.contactNo);
    });
}

function updateShopDetails() {
    let shop_id = parseInt($("#shop_id").val());
    let shop_name = $('#shop_name_edit').val();
    let shop_address = $('#shop_address_edit').val();
    let shop_details = $('#shop_details_edit').val();
    let shop_contact_no = $('#shop_contact_no_edit').val(); 
    let shop = {
        id: shop_id,
        shopName: shop_name,
        address: shop_address,
        details: shop_details,
        contactNo: shop_contact_no
    };
    $.ajax({
        type: "PUT",
        url: address + "/" + shop_id,
        data: JSON.stringify(shop),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        alert("Shop Details are Updated");
        displayAllShops();
    }).fail(function (xhr, status) {
        alert("Shop Details are not Updated");
    });
}