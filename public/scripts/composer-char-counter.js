$(document).ready(function() {
  console.log('ready');

  $('#tweetbox').on('input', function(){
    const count = 140 - this.textLength;
    const $counter = $('#counter');
    $counter.text(count);
    if (count >= 0) {
      $counter.css('color', 'black');
    };
    if (count < 0) {
      $counter.css('color', 'red');
    };
    if(count >= 0){
      $('.errormsg').text("");
    };
  });
});