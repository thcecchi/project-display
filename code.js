var Airtable = require('airtable');
var mykey = config.MY_KEY;
var base = new Airtable({apiKey: mykey}).base('appN4cpWc7TV3YYd1');

function getWord () {
  base('Table 1').select({
      view: 'Grid view'
  }).firstPage(function(err, records) {
      if (err) { console.error(err); return; }
      // SINGLE
      // const idx = records.length-1
      // const word = records[idx].fields.Word
      // $('#word').text(word);

      // STACKED
      const listLength = records.length
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
        var fontChoice = randomizeFont();
        wordMarkup.push('<li class="' + fontChoice + '">' + idx + '</li>')
      })
      var wordString = wordMarkup.join('');
      return '<ul>' + wordString + '</ul>'
    })
  $mq
    .marquee({duration: 9000, direction:'up'});

  $mq.on('finished', showRandomMarquee);
}

function randomizeFont() {
  var fonts = ['Gangster', 'PPWoodland', 'NeueMetana', 'NevradaNeue'];
  var index = Math.floor(Math.random() * fonts.length);
  var selectedFont = fonts[index]
  return selectedFont;
}


  // Single
  // getWord()

  //STACKED
  allWords = []
  getWord()
  //
  setInterval(function(){
    getWord()
  }, 3000);
