const parseCookie = str =>
    str.split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});

function checkLogin() {
    if (document.cookie == "") {//No Cookie, not logged in
        $('#logOutLbl').hide();
        return;
    }
    var cookie = parseCookie(document.cookie);
    if (typeof cookie.user !== 'undefined') {
        $('#loginBar').hide();
        $('#loggedInLbl').html("Logged in as " + cookie.user);
        $('#logOutLbl').show();
    }
}

function getRestaurants() {
    var filter = $('#restForm').serialize();
    console.log( filter );
    $.get("getrestaurants", filter)
        .fail(function () {
            console.log("Failed to get Restaurants...");
        })
        .done(function (data) {
            console.log(data);
            $('#content').html("");
        for (var i = 0; i < data.length; ++i)
        {
            var img = data[i].img1.slice(0,-5);     //Change URL to get fixed size images from yelp
            var cell = '<div class="card col-sm-4 px-0">' +
                '<a href="restaurant.html?id='+data[i].id+'">' + 
                '<img class="card-img-top img-fluid" src="'+img+'300s.jpg" alt="'+data[i].name+'">' +
                '<div class="card-body">' +
                '<h5 class="card-title">'+ data[i].name+'</h5></a>'+
                '<p class="card-text">'+data[i].description+'</p>' +
                '</div>' +
                '</div>';
            $('#content').append(cell);
        }
});

}

function getRestaurant() {
    let searchParams = new URLSearchParams(window.location.search)
    var ops = {id: searchParams.get('id')};
    console.log( ops );
    $.get("getrestaurant", ops)
        .fail(function () {
            console.log("Failed to get Restaurant...");
        })
        .done(function (data) {
            console.log(data);
            var img1 = data[0].img1.slice(0,-5);     //Change URL to get fixed size images from yelp
            $('#img0').attr("src", data[0].img1);
            $('#img1').attr("src", img1+'300s.jpg');
            
            var img2 = data[0].img2.slice(0,-5);     //Change URL to get fixed size images from yelp
            $('#img2').attr("src", img2+'300s.jpg');
            var img3 = data[0].img3.slice(0,-5);     //Change URL to get fixed size images from yelp
            $('#img3').attr("src", img3+'300s.jpg');
        });
}