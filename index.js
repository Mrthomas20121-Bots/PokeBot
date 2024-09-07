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

    bot.createCommand({
        name: 'ability',
        description: 'Look up an ability',
        options: [
            {
                name: 'list',
                description: 'List all ability by name',
                type: Constants.ApplicationCommandOptionTypes.STRING,
                required: true,
                choices: [
                    {
                        name: 'list',
                        value: 'list'
                    }
                ]
            }
        ],
        type: Constants.ApplicationCommandTypes.CHAT_INPUT
    });

    bot.createCommand({
        name: 'abilitylist',
        description: 'List all ability available',
        type: Constants.ApplicationCommandTypes.CHAT_INPUT
    });
});

bot.on("interactionCreate", async (interaction) => {
    if(interaction instanceof CommandInteraction) {
        let name = interaction.data.name;
        if(name == 'abilitylist') {
            pokedex.getAbilityByName('13')
                .then(ability => {
                    interaction.createMessage(ability.name);
                }).catch(error => {
                    console.log(error);
                });
        }
        else if(name == 'abilitylist') {
            let args = interaction.data.options;

            if(args[0] == 'list') {
                pokedex.getAbilityByName('13')
                .then(ability => {
                    interaction.createMessage(ability.name);
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }
});

bot.connect();