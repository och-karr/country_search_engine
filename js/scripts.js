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
	$('<div>').attr('class', 'header').appendTo('#countries');
	$('<div>').attr('class', 'flag').appendTo('.header');
	$('<div>').attr('class', 'name').appendTo('.header');
	$('<img>').attr("src",flagUrlPrefix+item.alpha2Code+flagUrlPostfix).appendTo('.flag');
	$('.name').append(item.name);
}

function createList(item) {
	$('<div>').attr('class', 'countryList').appendTo('#countries');
	$('<div>').attr('class', 'row-1').appendTo('.countryList');
	$('<span>').attr('class', 'detail').text('Country code:').appendTo('.row-1');
	$('<span>').attr('class', 'value').text(item.alpha2Code).appendTo('.row-1');
	$('<div>').attr('class', 'row-2').appendTo('.countryList');
	$('<span>').attr('class', 'detail').text('Population:').appendTo('.row-2');
	$('<span>').attr('class', 'value').text(item.population).appendTo('.row-2');
}