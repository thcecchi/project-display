var Airtable = require('airtable');
var config = require('./config');
var mykey = config.MY_KEY;
var base = new Airtable({apiKey: mykey}).base('appN4cpWc7TV3YYd1');

////////////////////////////
//  Marquee  //////////////
//////////////////////////

function getWord () {
  base('Table 1').select({
      view: 'Grid view'
  }).firstPage(function(err, records) {
      if (err) { console.error(err); return; }

      if (allWords.length == 0) {
        for (i = allWords.length; i < records.length; i++) {
          allWords.push(records[i].fields.Word);
        }
        showRandomMarquee()
      } else if (records.length > allWords.length) {
          for (i = allWords.length; i < records.length; i++) {
            allWords.push(records[i].fields.Word);
          }
      }
  });
}

var $mq = $('.marquee');

function showRandomMarquee() {
  var wordMarkup = [];
  $mq
    .marquee('destroy')
    .html(function () {
      allWords.forEach(function(idx){
        // var fontChoice = randomizeFont();
        wordMarkup.push('<li class="' + 'Gangster' + '">' + idx + '</li>')
      })
      var wordString = wordMarkup.join('');
      return '<ul>' + wordString + '</ul>'
    })
  $mq
    .marquee({duration: 7000, direction:'up', delayBeforeStart: 0});

  $mq.on('finished', showRandomMarquee);
}

function randomizeFont() {
  var fonts = ['Gangster', 'PPWoodland', 'NeueMetana', 'NevradaNeue'];
  var index = Math.floor(Math.random() * fonts.length);
  var selectedFont = fonts[index]
  return selectedFont;
}



//  START  //////////////////
var version = true;

if (version==true) {
  allWords = []
  getWord()

  setInterval(function(){
    getWord()
  }, 3000);
}

if (version==false) {
  allRecords = []
  grabLatest();
  setInterval(function(){
    grabLatest()
  }, 3000);

  $('.marquee').addClass('bubbles');
}
////////////////////////////




////////////////////////////
//  Bubbles  //////////////
//////////////////////////

function grabLatest () {
  base('Table 1').select({
      view: 'Grid view'
  }).firstPage(function(err, records) {
      if (err) { console.error(err); return; }

      if (allRecords.length == 0) {
        for (i = allRecords.length; i < records.length; i++) {
          allRecords.push(records[i].fields.Word);
        }
        addRecords(allRecords);
      } else if (records.length > allRecords.length) {
          const newRecords = [];
          for (i = allRecords.length; i < records.length; i++) {
            newRecords.push(records[i].fields.Word);
            allRecords.push(records[i].fields.Word);
          }
          addNewRecords(newRecords);
      }
  });
}

function addRecords (records) {
  records.forEach(function(word) {
    var fontChoice = randomizeFont();
    $('.marquee').append('<li class="' + fontChoice + '">' + word + '</li>');
  })
  findScroll();
  initiateSmoothScroll();
}

function addNewRecords (records) {
  var time = 1000;
  records.forEach(function(word) {
    setTimeout( function(){
      var fontChoice = randomizeFont();
      var html = ('<li class="' + fontChoice + '">' + word + '</li>');
      // $(html).hide().appendTo('.marquee').fadeIn(800);
      $(html).appendTo('.marquee');
      findScroll();
    }, time)
      time += 1000;
  })
}

function findScroll () {
  var scrollToHeight = $(".marquee").height();
  if(scrollToHeight > $(window).height()) {
    $(window).scrollTop(scrollToHeight);
  }
}

function initiateSmoothScroll () {
$('html').css("scroll-behavior","smooth");
}
