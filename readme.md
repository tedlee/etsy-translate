##Etsy Translate

A simple Chrome extension that let's you view Etsy in your language — automagically!

###How to Install
1) Download the Chrome extension (.crx): [here](http://cl.ly/MHEd)  
2) Click the Settings icon on the browser toolbar (Top Right Corner) in Chrome  
3) Select Tools > Extensions  
4) Locate the "crx" extension file on your computer - drag and drop the file onto the Extensions page from step 2 and click Install.  
5) Ever tried navigating Etsy in another language? Now's your chance! Head to the bottom of any page and select a language other than english mi amigo.  
6) Once the extension is installed it will work its magic when you navigate to a listing.  

###How the Extension Works
After installing the extension, when a user hits an Etsy listing **[etsy.com/listing/*]** the extension records the listing ID and their current language (German, Engish, Spanish, Spanish, French, Italian, or Dutch) and makes an JSON request to a server that handles the rest server side. The Sinatra based server source can be found in the **server** folder.

####To Deploy Locally  
    git clone git://github.com/tedlee/etsy-translate.git  
    cd etsy-translate/server  
    bundle install  
    
Grab API Keys for [Etsy](http://www.etsy.com/developers) and [Google Translate](http://developers.google.com/translate) and add them to your `.env` file in the root of the app. You should be good to go. Run:  
    
    rackup

You should now be able to `curl` the api:  
    `curl localhost:9292/api/q=LISTING_ID&lang=DESTINATION_LANGUAGE`

**Note**: You'll need to uncomment `line 63` (and comment out line 64) of `extension/main.js` for the extension to work locally.

###Server Explained
Once a request is received from the browser, the server queries the Etsy API for that listing ID and is returned the description for that item. That description is then passed along to the Google Translate API along with the desired destination language (we assume the native language is English). We're returned the translated description which then gets passed back to the browser. The translation is appended to the DOM below the original language.

###Language Support
Translation is currently offered in: German, Engish, Spanish, Spanish, French, Italian, or Dutch.
