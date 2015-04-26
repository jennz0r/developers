$(document).ready(function() {
  var imgCounter = 0;
  var audioCounter = 0;

  var createDiv = function (x, y) {
    var newDiv = $('<div>');
    var newImg = $('<img>');
    var imgNumArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15'];
    var audioNumArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'];
    var centerX = x - 100;
    var centerY = y - 100;

    var newAudioName = 'developers-' + audioNumArray[audioCounter];
    var newAudio = new Audio('mp3/' + newAudioName + '.mp3');
    newAudio.play();

    var imgSrc = 'img/ballmer/png/ballmer-' + imgNumArray[imgCounter] + '.png';

    newImg.attr('src', imgSrc);

    newDiv.append(newImg);
    newDiv.css({
      position: 'absolute',
      top: centerY + 'px',
      left: centerX + 'px'
    });
    $('body').append(newDiv);

    if (imgCounter == imgNumArray.length - 1) {
      imgCounter = 0;
    } else {
      imgCounter++;
    }

    if (audioCounter == audioNumArray.length - 1) {
      audioCounter = 0;
    } else {
      audioCounter++;
    }
  };

  $('body').on('touchstart click', function (e) {
    e.stopPropagation();
    if (e.type == 'touchstart') {
      var x = e.originalEvent.touches[0].pageX;
      var y = e.originalEvent.touches[0].pageY;
      createDiv(x, y);
      alert(x + 'yes' + y);
    } else if (e.type == 'click') {
      var a = e.pageX;
      var b = e.pageY;
      createDiv(a, b);
    }
  });

  $('footer').on('touchstart click', function (e) {
    e.stopPropagation();
  });
});