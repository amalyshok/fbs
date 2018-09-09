let Data;
let Matches;
let Competitions;
let secondAntillBlock = 0;
let remainRequest = 0;
let logo = 0;
let start = 0;
let timer = 0;
let socket = io();
socket.on('disconnect', () => console.log('Я закончил сессию сокет'));

$('.nav-toggle').on('click', function(){
$('#menu').toggleClass('active');
$('.main-nav').toggleClass('active');
});

function remove (par) {
while (par[0].firstChild) {
   par[0].removeChild(par[0].firstChild);
}
}

$(".valuer").on('input', function() {
  if (this.value == 1) {
		$('.start2').html('Предстоящие матчи на ближайший:');
		$('.strong').html('день.');
	} else
	if (this.value > 1 && this.value < 5) {
		$('.start2').html('Предстоящие матчи на ближайшиe:');
		$('.strong').html('дня.');
	} else
	if (this.value == 5) {
		$('.start2').html('Предстоящие матчи на ближайшиe:');
		$('.strong').html('дней.');
	} else
		this.value = '';
});

// срабатывают при загрузке страницы
$(function() {
	$('.mongo').click(startMongo);
	$('.loadlogo').hide();
	$('.start1').click(() => { if (logo === 0) {parserGo(); logo++} });
	//$('.start2').click(() => getMatches(+$(".valuer")[0].value));
	$('.start2').click(getMatches1);
	//$('.valuer').click(changeText);
		$('.widget1').click( (e) => {
			if ($('.widget-category-list').is(':visible') && logo !== 0) {
			$('.widget-category-list').slideUp(400, () => {$('.widget1').html('Доступные лиги ↓')}); }
						 else if (logo !== 0) {
			 $('.widget-category-list').slideDown('slow', () => {$('.widget1').html('Доступные лиги ↑')}); }
		});
		$('.widget2').click( () => {
			if ($('.widget-posts-list').is(':visible') && start !== 0) {
			$('.widget-posts-list').slideUp(400, () => {$('.widget2').html('Предстоящие матчи ↓')}) } 
						else if (start !== 0)
			{ $('.widget-posts-list').slideDown('slow', () => {$('.widget2').html('Предстоящие матчи ↑')}) }
		});
});

// вывод в консоль остатка запросов и сброса таймера отсчета запросов
function timerStart (resp) {
secondAntillBlock = resp.getResponseHeader('x-requestcounter-reset');
remainRequest = resp.getResponseHeader('x-requests-available-minute');
if (timer == 0) timer = setTimeout(secondAntillBlock*1000+1, () => {timer = 0});
}

// обертка для XMLHttpRequest с возвращением промиса
function httpGet(url) {

  return new Promise(function(resolve, reject) {

    var req = new XMLHttpRequest();
    req.open('GET', url, true);
	req.setRequestHeader('X-Auth-Token', 'f82baa0467604922bd663ed6d444e083');
    req.onload = function() {
      if (this.status == 200) {
        resolve(this);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    req.onerror = function() {
      reject(new Error("Network Error"));
    };

    req.send();
  });

}
// главная функция парсинга JSONa c football.org
function parserGo () {
	$('.loadlogo').show();
	$('.widget-category-list').show();
	httpGet('http://api.football-data.org/v2/competitions/')
	.then(resp => {

return JSON.parse(resp.response);
    }, function(error) {
        error.message 
    }).then(d => {
        Data = d;
		Competitions = d.competitions.filter( obj => obj.plan == 'TIER_ONE');
		$('.widget1').html('Доступные лиги ↑');
		addComp();
		$('.loadlogo').hide();
    });
}
// вывод доступных лиг в консоль
function showCompetitions () {
	Competitions.forEach( (item, i) => {
		console.log(i+1 + ': ' + item.area.name + ' - ' + item.name + ';');
	} );
}
// добавление доступных лиг в виджет1 "Доступные лиги"
function addComp () {
	 Competitions.forEach( item => {
     let newLi = document.createElement('li');
	 newLi.innerHTML = `<input type="checkbox" name="competition" value="${item.id}"> ${item.area.name} - ${item.name}`;
     document.body.querySelector('.widget-category-list').appendChild(newLi);
	 } );
}
// парсинг предстоящих матчей
function getMatches (stepDay = 1) {
	let dateFrom = new Date();
	$('.widget-posts-list').show();
	let monthFrom, dayFrom, monthTo, dayTo;
	if (dateFrom.getMonth()+1 < 10) monthFrom = '0' + (dateFrom.getMonth()+1); else monthFrom = (dateFrom.getMonth() + 1) + '';
	if (dateFrom.getDate() < 10) dayFrom = '0' + dateFrom.getDate(); else dayFrom = dateFrom.getDate() + '';
	let dateTo = dateFrom;
	dateTo.setDate(dateFrom.getDate() + stepDay);
	if (dateTo.getMonth()+1 < 10) monthTo = '0' + (dateTo.getMonth()+1); else monthTo = (dateTo.getMonth() + 1) + '';
	if (dateTo.getDate() < 10) dayTo = '0' + dateTo.getDate(); else dayTo = dateTo.getDate() + '';
	$('.loadlogo').show();
	httpGet(`http://api.football-data.org/v2/competitions/2021/matches?dateFrom=2018-${monthFrom}-${dayFrom}&dateTo=2018-${monthTo}-${dayTo}`)
	.then(resp => {
secondAntillBlock = resp.getResponseHeader('x-requestcounter-reset');
remainRequest = resp.getResponseHeader('x-requests-available-minute');
return JSON.parse(resp.response);
    }, function(error) {
        error.message 
    }).then(d => {
        Matches = d;
		$('.loadlogo').hide();
		if (Matches.count > 0) {remove($('.widget-posts-list'));addMatch();$('.widget2').html('Предстоящие матчи ↑'); start++} else {
			let dat = new Date();
			dat.setDate(dat.getDate() + +$('.valuer')[0].value);
			remove($('.widget-posts-list'));
			alert('Нет запланированных матчей до ' + dat.getDate() + ' числа');
			$('.widget2').html('Предстоящие матчи');
			start = 0;
		}
    });
}

function addMatch () {
	 Matches.matches.forEach( (item, i) => {
     let newLi = document.createElement('li');
	 newLi.innerHTML = `<div class="post-image-small">
          <strong>${+item.utcDate.slice(11, 13)+ 3 + item.utcDate.slice(13, 16)} ${item.utcDate.slice(8, 10) + '.' + item.utcDate.slice(5, 7)}</strong>
        </div>
		<a href="#">${item.homeTeam.name} - ${item.awayTeam.name}</a>`;
     document.body.querySelector('.widget-posts-list').appendChild(newLi);
	 } );
}

function mongoGet(url) {

  return new Promise(function(resolve, reject) {

    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    req.onerror = function() {
      reject(new Error("Network Error"));
    };

    req.send();
  });
}
  
function startMongo() {
	mongoGet("mongodb://amalyshok:S1pa2Wn3@footballdata-zxox4.mongodb.net/test?retryWrites=true").then
	( resp => console.log(resp) );
};

function getMatches1 () {
  $.ajax({
  url: 'http://api.football-data.org/v2/competitions/',
  headers: {'X-Auth-Token': 'f82baa0467604922bd663ed6d444e083'},
  method: 'GET',
  error: (err) => alert(err.statusText + ': Сорян, наш косяк')
}).then(function(data, status, xhr) {
  console.log(status);
});
}

