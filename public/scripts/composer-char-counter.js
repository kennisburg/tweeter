$(document).ready(function() {
  console.log('ready');

  const $tweetbox = $('#tweetbox');

  $tweetbox.on('input', function(){

    const count = 140 - this.textLength;
    const $counter = $('#counter')

    $counter.text(count);


    if (count >= 0) {
      $counter.css('color', 'black');
     
    }
    if (count < 0) {
      $counter.css('color', 'red');
    }
    if(count > 0){
      console.log("rohit");
      var $temp = $('<span></span>')
      $('.errormsg').text("");
    }
    


  })
})