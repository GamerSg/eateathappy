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
