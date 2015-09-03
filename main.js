
$(document).ready(init);

	function init() {
		$('#go').click(goClicked);
		$('#location').keyup(function(e) {
			if (e.keyCode === 13) {
	      		goClicked();
	  		}
	  	});
	}

	function goClicked(event) {
		console.log('go clicked');
		$('#displayArea').remove();
		var city = $('#location').val();

		console.log(city);

		if (city === '') {
			city = "autoip";
		}

		$.getJSON('http://api.wunderground.com/api/ed7493f8cb5454e1/geolookup/q/' + city + '.json')
			.success(function(data){
				console.log(data);
				if (data.response.error) {
					console.log("error: ", data);
					$('.displayCity').text(data.response.error.description);
				} else {
				$('.displayCity').text('');
				$('.displayCity').append(data.location.city + ", " + data.location.state);
				}
			})
			.fail(function(error){
				console.log("fatal error", error);
				$('.displayCity').text("Please enter a valid city");
			});

		$.getJSON('http://api.wunderground.com/api/f072e1fa016ca1ac/forecast10day/q/' + city + '.json')
			.success(function(data){
				$('.container').append('<div class="animated rollIn" id="displayArea"></div>');
			console.log(data);
				data.forecast.txt_forecast.forecastday.forEach(function(val, index) {
				
					if (index%2 === 0) {
					
						$('#displayArea').append($("<h4>" + val.title + "</h4>"), 
							$('<img src="' + val.icon_url + '"></img>'), "  ",
							val.fcttext, '</br>');
					}
				});
				$('#location').val("");
			})
			.fail(function(error){
				console.log(error);
			});
	}

