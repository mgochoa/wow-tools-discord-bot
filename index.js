require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const { RichEmbed, MessageCollector } = require("discord.js")
const request = require('request')
const puppeteer = require('puppeteer')


client.on('message', message => {
  switch (message.content) {
    case '!mdt list':
      request({
        uri: "https://raider.io/api/news?tag=weekly-route",
      }, async (error, response, body) => {
        try {
          let messageEmbeded = new RichEmbed()
          messageEmbeded.setTitle("Dungeons")
          let responseText = ''
          let { articles } = JSON.parse(body)
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          page.setDefaultNavigationTimeout(0)
          await page.goto("https://raider.io" + articles[0].path,{waitUntil:'networkidle2'});
          await page.content()
        

          for (const frame of page.mainFrame().childFrames()) {
            if (frame.url().includes('https://wago.io')) {
              const text = await frame.$eval('#wago-header > h3 > div > span', element => element.textContent)
              responseText = responseText.concat(`${text} - ${frame.url()}\n`)
            }
          }
          messageEmbeded.setDescription(responseText)
          message.channel.send(messageEmbeded)
          await browser.close()
        } catch (error) {
          console.log(error.message)
        }
      })
      break;
    case '!mdt':
      message.reply("Fuck you, cunt.")
      break;
  }
})

client.login(process.env.BOT_TOKEN);