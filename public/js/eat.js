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

function deleteReview()
{
    let searchParams = new URLSearchParams(window.location.search);

    var dat = "";
    var cookie = parseCookie(document.cookie);
    dat += 'userID='+cookie.id;
    dat += '&restID='+searchParams.get('id');
    console.log(dat);
    $.ajax('review', {
        type: 'DELETE',  // http method
        data: dat,  // data to submit
        success: function (data, status, xhr) {
           console.log(data);
           if(data == "success")
           {
            noReviewUI();
           }           
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.log("Failed to submit review");
        }
    });
    return false;
}

function sendReview()
{
    let searchParams = new URLSearchParams(window.location.search);

    var dat = $('#reviewForm').serialize();
    var cookie = parseCookie(document.cookie);
    dat += '&userID='+cookie.id;
    dat += '&restID='+searchParams.get('id');
    console.log(dat);
    $.ajax('review', {
        type: 'PUT',  // http method
        data: dat,  // data to submit
        success: function (data, status, xhr) {
           console.log(data);
           reviewSubmitted();
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.log("Failed to submit review");
        }
    });
    return false;
}

function reviewSubmitted()
{
    $('#userReviewForm').prop("disabled", true);
    $('#reviewBtn').prop("disabled", true);
    //Show Edit/Delete btns
    $('#editBtn').show();
    $('#deleteBtn').show();
    $('#reviewBtn').html("Update");

}

function noReviewUI()
{
    $('#userReviewForm').prop("disabled", false);
    $('#reviewForm').trigger('reset');
    $('#reviewBtn').prop("disabled", false);
    //Show Edit/Delete btns
    $('#editBtn').hide();
    $('#deleteBtn').hide();
    $('#reviewBtn').html("Submit");
}

function editReviewUI()
{
    $('#userReviewForm').prop("disabled", false);
    $('#reviewBtn').prop("disabled", false);
    //Show Edit/Delete btns
    $('#editBtn').hide();
    $('#deleteBtn').hide();
    $('#reviewBtn').html("Update");
}

function getReviews()
{
    let searchParams = new URLSearchParams(window.location.search);
    var cookie;
    var restID = searchParams.get('id');
    var ops = {restID: restID};

    var userLogged = false;
    //Is user logged in
    if (document.cookie != "") {//have cookie, logged in
        userLogged = true;
        cookie = parseCookie(document.cookie);      
    }
    else
    {
        $('#reviewCard').hide();
    }



    $.get("review", ops)
    .fail(function () {
        console.log("Failed to get Restaurants...");
    })
    .done(function (data) {
        console.log(data);
        $('#pubreviews').html("");
        var count = 0;
        var score = 0;
        for(var r of data)
        {
            var reviewDat = r.reviewTxt.split(':');
            if(userLogged && r.userID == cookie.id)
            {
                reviewSubmitted();
                $('#heading').val(reviewDat[0]);
                $('#review').val(reviewDat[1]);
                $('#score').val(r.score);
           
            }
            else
            {
                var date = new Date(r.dateCreated);
                var cell = "<div class='card w-75 p-3 mx-auto'>" +
                            "<div class='row'>" +
                            " <div class='col-sm-2'>"+
                            "<img src='/image/user.png' class='uicon mx-auto d-block'>" +
                            "<p class='text-center'>"+r.firstName+"</p>" +
                            " </div>" +
                            " <div class='col'>"+
                            "<h5 class='card-title'>"+reviewDat[0]+"</h5>" +
                            "<p>"+reviewDat[1]+"</p>"+
                            "<small class='text-secondary'>"+date+"</small>"+
                            " </div>" +
                            " <div class='col-sm-2'>"+
                            "<p class='text-danger text-right'>"+r.score+"/5</p>" +
                            " </div>" +
                            "</div>" +                           
                            "</div>";
                $('#pubreviews').append(cell);
            }
            score += r.score;
            ++count;
        }

        score = parseFloat(score/count).toFixed(1);
        if(count == 0)
        {
            $('#restRating').html("No Rating");
        }
        else
        {
            $('#restRating').html(score + "/5");
        }

    });
}

function doSearch()
{
    var url = document.getElementById('searchBar').value;
    location.href = 'restaurants.html?search='+url;
    return false;    
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
            $('#img1b').attr("src", data[0].img1);
            $('#img2b').attr("src", data[0].img2);
            $('#img3b').attr("src", data[0].img3);
            $('#img1').attr("src", img1+'300s.jpg');
            
            var img2 = data[0].img2.slice(0,-5);     //Change URL to get fixed size images from yelp
            $('#img2').attr("src", img2+'300s.jpg');
            var img3 = data[0].img3.slice(0,-5);     //Change URL to get fixed size images from yelp
            $('#img3').attr("src", img3+'300s.jpg');

            $('#restName').html(data[0].name);
            $('#restCuisine').html(data[0].cuisine);
            $('#restDesc').html(data[0].description);
            
            //Get branch info
            var ops2 = {id: data[0].id}
            $.get("getbranch", ops2)
            .fail(function () {
                console.log("Failed to get Branch info...");
            })
            .done(function (dat) {
                console.log(dat);
                var finalTxt="<p class='font-weight-bold'>Opening Hours</p>";
                const days = ['UN','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
                var openhrs = dat[0].openingHrs.slice(0,-1).split(';');
                finalTxt += "<div class='row'>";
                for(var d of openhrs )
                {
                    var dayDat = d.split(':');
                    finalTxt += "<div class='col-sm-3 font-weight-bold'>";
                    finalTxt += days[ dayDat[0] ]+" ";
                    finalTxt += "</div>";
                    var times = dayDat[1].split(',');
                    finalTxt += "<div class='col-sm-9'>";
                    finalTxt += times[0] +" - "+times[1];
                    finalTxt += "</div>";
                }
                finalTxt += "</div><BR>";
                finalTxt += "<span class='font-weight-bold'>Address:</span><BR>";
                finalTxt += dat[0].address.replace(/,Singapore$/, '' ).replace(/,/g,'<BR>');
                finalTxt += "<BR><BR><span class='font-weight-bold'>Contact:</span><BR>";
                finalTxt += dat[0].contactNumber;
                finalTxt += "<BR><BR><span class='font-weight-bold'>Website:</span><BR>";
                finalTxt += data[0].website;
                
                $('#restDetails').html(finalTxt);
            });           
        });
}