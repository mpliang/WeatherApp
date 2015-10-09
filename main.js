
var $ = require('jquery');
// var bootstrap = require('bootstrap');
require("./style.css");
require("./animate.css");

$(document).ready(init);

	function init() {
		// $('#go').click(goClicked);
		$('#location').on('keyup', function(e) {
			if (e.keyCode === 13) {
	      		goClicked();
	  		}
	  	});
	}

	function goClicked(event) {
		$('#displayArea').remove();
		$('#instructions').addClass('hidden');
		var city = $('#location').val();
		console.log(city);
		if (city === '') {
			city = "autoip";
		}

		$.getJSON('http://api.wunderground.com/api/f072e1fa016ca1ac/forecast10day/q/' + city + '.json')
			.success(function(data){

				$.getJSON('http://api.wunderground.com/api/ed7493f8cb5454e1/geolookup/q/' + city + '.json')
					.success(function(data){
					console.log(data);

						if (data.response.error) {
							console.log("error: ", data);
							$('.displayCity').text(data.response.error.description);
							$('#location').val("");
						} else {
						$('.displayCity').text('');
						var country = (data.location.country === 'US') ? data.location.state : data.location.country;
						$('.displayCity').append(data.location.city + ", " + country);
						}
					})
					.fail(function(error){
						console.log("fatal error", error);
						$('.displayCity').text("Please enter a valid city");
						$('#location').val("");
					});

				if (data.response.error){
					console.log("city not found");
				} else {
				$('.weatherapp').append('<div class="animated pulse" id="displayArea"></div>');
				console.log(data);
				data.forecast.txt_forecast.forecastday.forEach(function(val, index) {

					if (index%2 === 0 && index<14) {

						$('#displayArea').append($("<h4>" + val.title + "</h4>"),
							$('<img src="' + val.icon_url + '" class="thumb"></img>'), "  ",
							val.fcttext, '<hr/>');
					}
				});
				$('#location').val("");
				}
			})
			.fail(function(error){
				console.log(error);
			});
		}
