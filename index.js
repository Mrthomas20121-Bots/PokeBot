import { Constants, Client, CommandInteraction } from 'eris';
import Pokedex from 'pokedex-promise-v2';
import { token } from './auth.js';

// pokedex
const pokedex = new Pokedex();

const bot = new Client(token, {
    autoreconnect: true
});

bot.on('ready', async () => {
    console.log('bot is online');

    bot.editStatus('online', {
        name: `to the pokemon theme song`,
        type: 2 // type '2' is listening to
    });
});