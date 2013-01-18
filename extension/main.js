// By default content_script is automatically run 
// after the browser fires window.onload

initalize();

function initalize(){

    // Let's start by grabbing the language the user is using on Etsy and the listing ID
    var userLanguage = $('a[href$="#language-select"]').text();
    var listingID = $("#listing_id").val();

    // Tracks length of request
    var startTime = new Date().getTime();

    // Creates a nice new div for us to work with
    $("<div class=\'section-content translate\'><h3> Translation (English > " + userLanguage + "): </h3></div>").insertAfter(".section-content");

    console.log("User Language: " + userLanguage);
    console.log("Listing ID: " + listingID);

    // If the users language is already english our work here is done
    // but where's the fun in that!
    if (!(properLanguage(userLanguage) == "en")) {
        makeRequest(listingID, userLanguage, startTime)
    }
    else {
        $(".section-content").append(" No translation needed.")
    }
}

// Converts current user language to the proper format
function properLanguage ( userLanguage ) {

    var languages = {
        "English (US)" : "en",
        "English (UK)" : "en",
        "Deutsch" : "de",
        "Español" : "es",
        "Français" : "fr",
        "Italiano" : "it",
        "Nederlands" : "nl"
    }

    if ( languages[userLanguage] ) {
        return languages[userLanguage]
    }
};

// Borrowed this dandy function from Sam Hasler which makes links in the description clickable
// [source: http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links]
function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,"<a href='$1'>$1</a>"); 
}

// Let's keep those newline characters! Let's add <br> tags like its 1998
function replaceNewlineWithBreaks(text) {
    return text.replace(/\n/g, "<br />")
}

function makeRequest(id, language, start) {

    //var requestURL = "http://localhost:9292/api/?q=" + id + "&lang=" + properLanguage(userLanguage);
    var requestURL = "http://langsy.herokuapp.com/api/?q=" + id + "&lang=" + properLanguage(language);
    $.getJSON(requestURL, function(data){
        var description = replaceNewlineWithBreaks(data.description);
        var shortened = "";

        // Append a little message letting users know the description has been shortened
        if (data.shortened === true){
            var shortened = "... (This description has been shortened — with great translation comes great responsability)"
        }

        // Finally let's make sure those URLs nice and pretty
        $(".translate").append(replaceURLWithHTMLLinks(description) + shortened);

        // And console.log the time it took to execute
        var requestTime = new Date().getTime() - start;
        console.log("Time for request: " + requestTime/1000 + " seconds.");
    });
}



