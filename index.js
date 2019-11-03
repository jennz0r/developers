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

  // $('body').on('touchstart click', function (e) {
  //   e.stopPropagation();
  //   if (e.type == 'touchstart') {
  //     var x = e.originalEvent.touches[0].pageX;
  //     var y = e.originalEvent.touches[0].pageY;
  //     createDiv(x, y);
  //     alert(x + 'yes' + y);
  //   } else if (e.type == 'click') {
  //     var a = e.pageX;
  //     var b = e.pageY;
  //     createDiv(a, b);
  //   }
  // });

  $('footer').on('touchstart click', function (e) {
    e.stopPropagation();
  });

  $('.webspeech').on('touchstart click', function (e) {
    e.stopPropagation();
  });

  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var synth = window.speechSynthesis || 
    webkitSpeechSynthesis;
  var voiceSelect = document.getElementById("voices");
  var voices = [];

  function testSpeech(clickEvent) {
    var diagnostic = document.querySelector('.output');
    var recognition = new SpeechRecognition();
    recognition.lang = voiceSelect.selectedOptions[0].getAttribute("data-lang");
    recognition.start();

    recognition.onresult = function(event) {
      var speechResult = event.results[0][0].transcript;
      // diagnostic.textContent = speechResult;

      if (speechResult.toLowerCase().includes('developers')) {
        var a = clickEvent.pageX;
        var b = clickEvent.pageY;
        createDiv(a, b);
        say(speechResult);
      }
    }

    recognition.onspeechend = function() {
      recognition.stop();
    }

    recognition.onerror = function(event) {
      diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
    }
  }

  document.body.onclick = function(clickEvent) {
    testSpeech(clickEvent);
  }

  function say(text) {
    var utterThis = new SpeechSynthesisUtterance(text);
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
  }

  function populateVoiceList() {
    voices = synth.getVoices();
    var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = "";
    for(i = 0; i < voices.length ; i++) {
      var option = document.createElement("option");
      option.textContent = voices[i].name + " (" + voices[i].lang + ")";

      if(voices[i].default) {
        option.textContent += " -- DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
    voiceSelect.selectedIndex = selectedIndex;
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
});
