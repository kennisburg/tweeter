/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {

  

  const $tweetform = $(".tweetform");
  const $compose = $('.compose');
  const $newtweet = $('.new-tweet');
  const $container = $('.tweetContainer');

  const escape = function(str) {
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
    let $footer = $('<footer>').addClass('tweetfoot');;
    let $footspan = $('<span>')
    let $timespan = $('<span>').addClass('timestamp');
    let $options = $('<span>').addClass('options')
    let $flag = $('<img>').addClass('flag')
    let $retweet = $('<img>').addClass('retweet')
    let $like = $('<img>').addClass('like')
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
    $footer.append($footspan);
    $footspan.append($timespan);
    $footspan.append($options);
    $options.append($like, $retweet, $flag);
    $flag.attr('src', function() {
      return 'images/flag.png'
    })
    $retweet.attr('src', function() {
      return 'images/refresh.png'
    })
    $like.attr('src', function() {
      return 'images/heart.png'
    })

    var now = Date.now();
    var then = tweet.created_at;
    var since = (now - then) / 1000;

    if (since < 60) {
      $timespan.text(since + ' seconds ago')
    } 
    
    if (since > 60) {
      $timespan.text(Math.floor(since/60) + ' min ago')
    }
    
    if (since/60 > 60) {
      $timespan.text(Math.floor((since/60)/60) + ' hours ago')
    }
    
    if (Math.floor((since/60)/24 > 24)) {
      $timespan.text(Math.floor(((since/60)/60)/24) + ' days ago')
    }

    return $post;
  }

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

  $tweetform.on('submit', function(e){
    e.preventDefault();

    var flag =false;
    const content = $('#tweetbox').val();
    const $errormsg = $('.errormsg');
    if(!content){
      flag = true;
      $errormsg.text("Nothing to Tweet?").css('color', 'red');
    } else if (content.length >= 140) {
      flag = true;
      $errormsg.text("Too much to Tweet...").css('color', 'red');
    } else {
      flag = false;
    }
    if(!flag) {
      $tweetform.click(submitHandler);
    }
  });
  
  $compose.click(function() {
    $newtweet.toggle();
  });

  loadTweets();

})
