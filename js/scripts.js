var url = 'https://restcountries.eu/rest/v2/name/';
var flagUrlPrefix = 'https://restcountries.eu/data/';
var flagUrlPostfix = '.svg';

var $countryInput = $('#country-name');
var $countries = $('#countries');

$('#search').on('click', searchCountries);
$('body').on('keypress', function (e) {
	if (e.keyCode === 13)
    searchCountries();
})

function searchCountries(){
	var countryName = $countryInput.val();
	if(!countryName.length) countryName = 'Poland';

	$.ajax({
		url: url + countryName,
		method: 'GET',
		success: countryCard
	});
}

function countryCard(resp) {
	$countries.empty(); 
	if(resp.length) { //jesli resp ma dlugosc (tzn zawartosc)

		resp.forEach(function(item) {
			var $country = $('<div>').addClass('country');
			$countries.append($country);
			createHeader(item);
			createList(item);

			function createHeader(item) {

				var code = item.alpha3Code.toLowerCase();
				var $header = $('<div>').addClass('header');
				var $flag = $('<span>').addClass('flag');
				var $name = $('<span>').addClass('name').text(item.name);
				var $countryImage = $('<img>').attr("src",flagUrlPrefix+code+flagUrlPostfix);
			
				$country.append($header);
				$header.append($flag)
						.append($name);
				$flag.append($countryImage);
	
				if(item.name.length>12) {
					$name.css("font-size", "14px");
				}
			}

			function createList(item) {
				var $countryList = $('<div>').addClass('countryList');
			
				$country.append($countryList);
				$countryList.append('<table>' +
										'<tr class="row-1">' +
											'<td class="detail">Country code: </td>' +
											'<td class="value">'+item.alpha2Code+'</td>' +
										'</tr>' +
										'<tr class="row-2">' +
											'<td class="detail">Capital: </td>' +
											'<td class="value">'+item.capital+'</td>' +
										'</tr>' +
										'<tr class="row-3">' +
											'<td class="detail">Population: </td>' +
											'<td class="value">'+item.population+'</td>' +
										'</tr>' +
										'<tr class="row-4">' +
											'<td class="detail">Currency: </td>' +
											'<td class="value">'+item.currencies[0].name+'</td>' +
										'</tr>' +
									'</table>');
			}
		});
	}
}