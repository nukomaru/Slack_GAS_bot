var SLACK_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("slackAccessToken");
var CHANNEL_ID = "#general";
var TALK_API_URL = "https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk";
var TALK_API_KEY = PropertiesService.getScriptProperties().getProperty("talkApiKey");
var slackApp = SlackApp.create(SLACK_ACCESS_TOKEN);
var BOT_NAME = "雑談くん";
var BOT_USER_NAME = "slackbot";

function doPost(e){
  var inputMessage = e.parameter.text;
  var userName = e.parameter.user_name;
  if(userName !== BOT_USER_NAME){
    reply(sendHttpPost(inputMessage));
  }
  return null;
}

/*
* slack投稿関数
*/
function reply(message){
  var options = {
    username: BOT_NAME
  }
  slackApp.postMessage(CHANNEL_ID, message, options);
}

/* 
* API実行関数
*/
function sendHttpPost(message){
   var payload =
   {
     "apikey" : TALK_API_KEY,
     "query" : message
   };

   var options =
   {
     "method" : "post",
     "payload" : payload
   };

  var response = UrlFetchApp.fetch(TALK_API_URL, options).getContentText("UTF-8");
  return JSON.parse(response).results[0].reply;
}