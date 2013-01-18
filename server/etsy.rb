# Simple class for sending requests to the Etsy API

class Etsy
	
	include HTTParty
	base_uri "openapi.etsy.com/v2"

	def description(id, key)
		self.class.get("/listings/#{id}?api_key=#{key}")
	end

end
