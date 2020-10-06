const newQuoteBtn = document.querySelector('.btn-con .new-quote');
const qouteText = document.querySelector('.quote-con .quote-text');
const quoteAuthor = document.querySelector('.quote-author .author-name');
const loader = document.querySelector('.loader');
const qouteBox = document.querySelector('.quote-box');
const twitterBtn = document.querySelector('button.twitter-btn');
let errorCount = 0;
//show spinner
function spinner(){
    loader.hidden = false;
    qouteBox.hidden = true;
}

//hide spinner
function hideSpinner(){
    if(!loader.hidden){
        loader.hidden = true;
        qouteBox.hidden = false;
    }
}

//too many request
function requestFailed(){
    loader.hidden = true;
    qouteBox.innerHTML = '<p class="request-failed">Too many request detected, Please try again later</p>';
    qouteBox.hidden = false;
}
//fetching qoute
async function fetchQuote(){
    spinner();
    const antiCorsLink = 'https://cors-anywhere.herokuapp.com/';
    const quoteApiLink = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const fetchAPIURL = await fetch(antiCorsLink + quoteApiLink);
    const jsonFetchAPI = await fetchAPIURL.json();
    if(fetchAPIURL.ok){
        jsonFetchAPI.quoteAuthor === '' ? quoteAuthor.innerText = 'Unknown': quoteAuthor.innerText = jsonFetchAPI.quoteAuthor;
        jsonFetchAPI.quoteText.length > 75 ? qouteText.classList.add('long-quote') : qouteText.classList.remove('long-quote');
        qouteText.innerText = jsonFetchAPI.quoteText;
        hideSpinner();
    } else {
        fetchQuote()
    }
    // await fetch(antiCorsLink + quoteApiLink).then(function(response){
    //     const awitResponse = response.json();
    //     console.log(response)
    //     response.quoteAuthor === '' ? quoteAuthor.innerText = 'Unknown': quoteAuthor.innerText = response.quoteAuthor;
    //     if(response.quoteText !== ''){
    //         response.quoteText.length > 75 ? qouteText.classList.add('long-quote') : qouteText.classList.remove('long-quote');
    //     }
        
    //     qouteText.innerText = response.quoteText;
    // })
    /*try {
        const quoteResponse = await fetch(antiCorsLink + quoteApiLink);
        const data = await quoteResponse.json();
        data.quoteAuthor === '' ? quoteAuthor.innerText = 'Unknown': quoteAuthor.innerText = data.quoteAuthor;
        data.quoteText.length > 75 ? qouteText.classList.add('long-quote') : qouteText.classList.remove('long-quote');
        qouteText.innerText = data.quoteText;
        //quoteAuthor.innerText = data.quoteAuthor;
        hideSpinner();
    } catch(err){
        errorCount++
        if(errorCount > 2){
            requestFailed()
            return
        } else {
            fetchQuote();
        }
    }*/
}

//Tweet
function tweetIntent(){
    const tweetLink = 'https://twitter.com/intent/tweet?text=';
    const tweets = `https://twitter.com/intent/tweet?text=${qouteText.innerText} - ${quoteAuthor.innerText}`;
    window.open(tweets, '_blank');
}
//on load
fetchQuote();
//fetchQuote();

//new quote onclick

//const newQuoteBtn = document.querySelector('.btn-con .new-quote');
newQuoteBtn.addEventListener('click', fetchQuote);
twitterBtn.addEventListener('click', tweetIntent);
