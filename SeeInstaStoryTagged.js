var href = window.location.href;
if (href.slice(-1) === '/') {
    href = href.slice(0, -1)
}
var href = href.match('([^\/]+$)')[0];
var search_string = "//script[contains(., '\"pk\":\"" + href + "\"')]";

var xpath = document.evaluate(search_string, document, null, XPathResult.ANY_TYPE, null );
var script_element = xpath.iterateNext();
var stories = JSON.parse(script_element.innerText)['require'][0][3][0]['__bbox']['require'][0][3][1]['__bbox']['result']['data']['xdt_api__v1__feed__reels_media']['reels_media'][0]['items'];

function getStory(pk) {
    return stories.filter(
        function(stories){ return stories.pk == pk }
    );
  }

storyStickers = getStory(href)[0]['story_bloks_stickers'];

function showMentions() {
    for (let i = 0; i < storyStickers.length; i++) {
        full_name = storyStickers[i]['bloks_sticker']['sticker_data']['ig_mention']['full_name']
        username = storyStickers[i]['bloks_sticker']['sticker_data']['ig_mention']['username']
        console.log("@" + username + " (" + full_name + ")")
    }
}

showMentions()
