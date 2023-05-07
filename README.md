<h1 style="text-align:center;">Discord.js v14 Tickets bot</h1>

## WARNING
The bot is still in earling development, its features aren`t fully done yet and there are more to come.

## Changelog
* Changed the blacklist system, it will now work for every server without additional configuration.

## Features

* ❓ Ticket Channels
* 🔥 Slash commands and prefix commmands
* ✉️ Saved Info on the DB
* 💪 Dm for custom version

## Future features
* 🔥 Dashboard
* 👏 More commands

## Available commands
* Blacklist - blacklists a user from using tickets(New implementation)
* Close - closes the current ticket
* Panel - Sends an embed to open a ticket

## Installation

Clone the repository then create a file named `.env` and fill it out accordingly

```js
TOKEN=YOURTOKENHERE
CLIENT_ID=BOTS CLIENT ID
PREFIX=!
MONGO_URI=YOUR MONGO CONNECTION STRING
MONGO_DATABASE_NAME=YOUR DATABASE NAME
```
## Running

* Firstly install all the dependencies `npm i`.
* Run `npm run dev` to build and run automatically.
* To build only `npm run build` | To run only `npm run start`.
