const fs = require("fs")
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const Constants = require('./ConstantsHelper');


var $ = require('jquery');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

//$.support.cors = true;
$.ajaxSettings.xhr = function () {
    return new XMLHttpRequest();
};

client.login(config.token);

client.on("ready", () => {
    console.log("Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.");
});

client.on("message", (message) => {
    // Set the prefix
    let prefix = config.prefix;
    let validCommand = false;

    // Exit and stop if the prefix is not there or if user is a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (hasWhiteSpace(message.content)) {

        if(message.content.startsWith(prefix + "test")) {
            validCommand = true;

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=5d340a588774b863f69e21741c34a9bc&tags=miyawaki+sakura&format=json&nojsoncallback=1&auth_token=72157685292708415-f8b508c8a2c8486f&api_sig=aee63d1ef5d2a76e9a72f6adc9dd0738",
                "method": "GET",
                "headers": {}
            }
            
            $.ajax(settings).done(function (data) {
                message.channel.send(data);
            });

        }

        if (message.author.id === config.ownerID) {
            if (message.content.startsWith(prefix + "prefix")) {
                validCommand = true;
                let newPrefix = message.content.split(" ").slice(1, 2)[0];
                prefix = newPrefix;
                config.prefix = prefix;
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
            }
        }

        if (!validCommand)
            message.channel.send(Constants.Error.CommandNotFound);

    } else
        message.channel.send(Constants.Error.InvalidCommand);


});

function hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
}