var url = 'https://restcountries.eu/rest/v2/name/';
var flagUrlPrefix = 'http://www.countryflags.io/';
var flagUrlPostfix = '/shiny/64.png';

var countryInput = $('#country-name');
// var countryList = $('#countryList');

$('#search').on('click', searchCountries);

function searchCountries(){
	var countryName = countryInput.val();
	if(!countryName.length) countryName = 'Poland';

	$.ajax({
		url: url + countryName,
		method: 'GET',
		success: showCountries
	});
}

function showCountries(resp) {
	$('#countries').empty(); 
	if(resp.length) { //jesli resp ma dlugosc (tzn zawartosc)
		resp.forEach(function(item) {
			createHeader(item);
			createList(item);
		});
	}
}

function createHeader(item) {
	var header = $('<div>').attr('class', 'header').appendTo('#countries');
	var flag = $('<div>').attr('class', 'flag').appendTo(header);
	var name = $('<div>').attr('class', 'name').appendTo(header);
	$('<img>').attr("src",flagUrlPrefix+item.alpha2Code+flagUrlPostfix).appendTo(flag);
	$(name).append(item.name);
}

function createList(item) {
	var countryList = $('<div>').attr('class', 'countryList').appendTo('#countries');
	var row1 = $('<div>').attr('class', 'row-1').appendTo(countryList);
	$('<span>').attr('class', 'detail').text('Country code:').appendTo(row1);
	$('<span>').attr('class', 'value').text(item.alpha2Code).appendTo(row1);
	var row2 = $('<div>').attr('class', 'row-2').appendTo(countryList);
	$('<span>').attr('class', 'detail').text('Population:').appendTo(row2);
	$('<span>').attr('class', 'value').text(item.population).appendTo(row2);
}