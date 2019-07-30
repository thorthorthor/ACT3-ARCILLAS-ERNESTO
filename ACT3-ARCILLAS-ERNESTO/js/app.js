$(function(){
    //Cached selectors
    var jokeButton = $('#joke-button');
    var jokeResetButton = $('#joke-reset-button');
    var jokesList = $('#jokes-list');
    var reaction = $('#reaction');
    var jokeLoader = $('#joke-loader');
    var fetchLoader = $('#fetch');
    var statusContainer = $('#status-container');
    var maxJokeMessage = 'YOU HAVE ALREADY 5';
    var resetJoke = "GENERATE A JOKE";
    var count = 0;
    var maxJoke = 5;
    var funny = 3;
    var funnyGifLocation = "./img/funny.gif";
    var notFunnyGifLocation = "./img/not-funny.gif";
    var reactionCount = 0;

    jokeLoader.hide();
    jokeResetButton.hide();
  
    //Events
    jokeButton.on('click', function(e){
      //Do the magic here
      makeJoke();
    });
  
    jokeResetButton.on('click', function(){
      removeAllJoke();
    });
    
    async function makeJoke(){
      try{
        jokeButtonDisabled(true);
        jokeLoader.show();
        var randomJoke = await getRandomJoke();
        var randomAnswer = await getRandomAnswer();

        await makeJokeList(randomJoke, randomAnswer.image);
        
        jokeLoader.hide();

        if(randomJoke != null && randomAnswer != null){
          count++;
          if(randomAnswer.answer == "yes"){
            reactionCount++;
          }
        }
        if(count != 5){
          jokeButtonDisabled(false);
        }
        if(count == 5){
          jokeButtonDisabled(true);
          check();
          showReaction();
        }

        console.log(count);
      } catch(err){
        alert(err);
        jokeButtonDisabled(false);
        jokeLoader.hide();
      }
    }

    function jokeButtonDisabled(val){
      jokeButton.attr("disabled", val);
    }

    function getRandomJoke(){
      return JOKE_SERVICE.get();
    }

    function getRandomAnswer(){
      return JOKE_SERVICE.answer();
    }

    function makeJokeList(joke, img){
      var list = `<li>
                    <p>${joke}</p>
                    <img src="${img}" />
                  </li>`;
      jokesList.append(list);
    }

    function check(){
      
        jokeResetButton.show();
        jokeButton.text(maxJokeMessage);

    }

    function removeAllJoke(){
      count = 0;
      jokeButton.text(resetJoke);
      jokeButtonDisabled(false);
      jokesList.empty();
      reaction.empty();
      statusContainer.css("height", "10vh");
      jokeResetButton.hide();
    }

    function showReaction(){

      var funnyMessage = `
                            <img src="${funnyGifLocation}"/>
                            <p>Congratulations it's your lucky day my friend.
                            Spread the good vibes, make everyone smile.
                            </p>
                          
                          `;

      var notFunnyMessage = `
                              <img src="${notFunnyGifLocation}" />
                              <p>Were feelin' what you feel. it's okay, don't die yet. You can still breathe but not try be funny right now or else ...</p>
                            `;
                            
        if(reactionCount >= funny){
          reaction.append(funnyMessage);
        }
        if(reactionCount < funny){
          reaction.append(notFunnyMessage);
        }
      statusContainer.css("height", "48vh");
      
    }
  })