require "sinatra"
require "sinatra/contrib"
require "google_fish"
require "httparty"
require "./etsy.rb"

set :views, settings.root + "/views"

# Route that accepts simple API queries
get "/api/*" do
	listing_id = params[:q]
	lang = params[:lang]

	$shortened = false
	etsy_connection = Etsy.new
	response = etsy_connection.description(listing_id, ETSY_KEY)
	translation_in = response["results"][0]["description"]

	api_query = GoogleFish.new(GOOGLE_KEY)
	translation_out = api_query.translate(:en, lang, clean(translation_in))

	json "description" => translation_out, "language" => lang, "shortened" => $shortened
end

def clean(text)

	# Not a pretty regex but in this situation its better to be explicit
	# Allows for most characters people want to use in description
	clean_text = text.gsub(/[^a-zA-Z0-9\-\.\s\,\!\&\%\(\)\@\#\/\:\\\?\_\r\n]/,"")
	
	# Google translate API doesn't permit queries in excess 
	# of 1300 characters so let's shorten the description
	# Future: It would be pretty easy to split the description into multiple calls
	if clean_text.length > 1300
		$shortened = true
		return clean_text[0..1298].rstrip
	else
		return clean_text.rstrip
	end
end


not_found do  
	halt 404, "These are not the droids you are looking for."  
end  
