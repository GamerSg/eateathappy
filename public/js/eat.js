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
    $.get("getrestaurants")
        .fail(function () {
            console.log("Failed to get Restaurants...");
        })
        .done(function (data) {
            console.log(data);
        for (var i = 0; i < data.length; ++i)
        {
            var img = data[i].img1.slice(0,-5);     //Change URL to get fixed size images from yelp
            var cell = '<div class="card col-sm-3 px-0">' +
                '<img class="card-img-top img-fluid" src="'+img+'300s.jpg" alt="'+data[i].name+'">' +
                '<div class="card-body">' +
                '<h5 class="card-title">'+ data[i].name+'</h5>'+
                '<p class="card-text">'+data[i].description+'</p>' +
                '</div>' +
                '</div>';
            $('#content').append(cell);
        }
});

}
