var url = 'https://restcountries.eu/rest/v2/name/';
var flagUrlPrefix = 'https://restcountries.eu/data/';
var flagUrlPostfix = '.svg';

var $countryInput = $('#country-name');
var $countries = $('#countries');

$('#search').on('click', searchCountries);

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
					$name.css("padding-top", "0");
				}
			}
	
			function createList(item) {
				var $countryList = $('<div>').addClass('countryList');
				var $row1 = $('<tr>').addClass('row-1');
				var $detail1 = $('<td>').addClass('detail').text('Country code:');
				var $value1 = $('<td>').addClass('value').text(item.alpha2Code);
				var $row2 = $('<tr>').addClass('row-2');
				var $detail2 = $('<td>').addClass('detail').text('Capital:');
				var $value2 = $('<td>').addClass('value').text(item.capital);
				var $row3 = $('<tr>').addClass('row-2');
				var $detail3 = $('<td>').addClass('detail').text('Population:');
				var $value3 = $('<td>').addClass('value').text(item.population);
				var $row4 = $('<tr>').addClass('row-2');
				var $detail4 = $('<td>').addClass('detail').text('Currency:');
				var $value4 = $('<td>').addClass('value').text(item.currencies[0].name);
			
				$country.append($countryList);
				$countryList.append($row1)
							.append($row2)
							.append($row3)
							.append($row4);
				$row1.append($detail1)
						.append($value1);
				$row2.append($detail2)
						.append($value2);
				$row3.append($detail3)
						.append($value3);
				$row4.append($detail4)
						.append($value4);
			}
		});
	}
}