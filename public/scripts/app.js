/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {
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
    $img.attr("src",tweet.user.avatars.regular)
    $header.append($h2);
    $header.append($h3);
    $h2.text(tweet.user.name);
    $h3.text(tweet.user.handle);
    $post.append($p);
    $p.text(tweet.content.text);
    $post.append($footer);
    $footer.append($h6)
    $h6.text(tweet.created_at);
  
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


  const $tweetform = $(".tweetform")
  $tweetform.on('submit', function(e){

    var flag =false;

    e.preventDefault();
    var content = $('#tweetbox').val();
    console.log(content.length)

    if(!content){
      flag = true;
      alert("Please enter some text before posting");
    } else if (content.length > 140) {
      flag = true;
      alert("too long");
    } else {
      flag = false;
    }
    
    if(!flag) {
      $tweetform.on('submit', submitHandler)
    }
  });
  

  loadTweets()
})
