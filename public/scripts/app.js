/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {


  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const createTweetElement = function(tweet) {
    let $post = $("<article>").addClass('wholetweet');
    let $header = $('<header>').addClass('user');
    let $img = $('<img>').addClass('propic');
    let $h2 = $('<h2>').addClass('name');
    let $h3 = $('<h3>').addClass('handle');
    let $p = $('<p>').addClass('tweetp');
    let $footer = $('<footer>');
    let $h6 = $('<h6>').addClass('timestamp');
  
    $post.append($header);
    $header.append($img);
    $img.attr("src", tweet.user.avatars.regular)
    $header.append($h2);
    $header.append($h3);
    $h2.text(tweet.user.name);
    $h3.text(tweet.user.handle);
    $post.append($p);
    $p.text(escape(tweet.content.text));
    $post.append($footer);
    $footer.append($h6)
    $h6.text(new Date(tweet.created_at));
  
    return $post;
  }

  const $container = $('.tweetContainer');


  const renderTweets = function(tweet) {
    $container.empty();
    for(var ea in tweet){
      const $tweet = createTweetElement(tweet[ea]);
      $container.prepend($tweet);
    }
  }



  const loadTweets = function() {
    $.ajax({url: '/tweets', 
      method: 'GET', 
      success: function(result) {
        renderTweets(result)
    }})
  }


  const submitHandler = function(event) {
    event.preventDefault();
    $.ajax({data: $(this).serialize(),
      url:'/tweets',
      method:"POST",
      success: function() {
        loadTweets()
    }})
    .done(function(){
      $('#tweetbox').val('');
      $('.counter').text(140);
    })
  }



  const $errormsg = $('.errormsg');

  const $tweetform = $(".tweetform");

  const $submittweet = $('.submittweet');

  $submittweet.bind('custom', function(err) {
    $('span')
     .stop()
     .css('opacity', 1)
     .text(err)
     .fadeIn( 30 )
     .fadeOut( 1000 );
  })

  $tweetform.on('submit', function(e){

    var flag =false;

    e.preventDefault();

    var content = $('#tweetbox').val();

    const $errormsg = $('.errormsg');


    if(!content){
      flag = true;
      $errormsg.text("Nothing to Tweet?").css('color', 'red');
    } else if (content.length >= 140) {
      flag = true;
      $errormsg.text("Too much to Tweet...").css('color', 'red')
    } else {
      flag = false;
    }
    
    if(!flag) {
      $tweetform.click(submitHandler);

    }
  });




  const $compose = $('.compose');
  
  var $newtweet = $('.new-tweet');
  
  $compose.click(function() {
    $newtweet.toggle();
  });

  loadTweets()

})
