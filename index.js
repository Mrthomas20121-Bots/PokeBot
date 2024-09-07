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
                name: 'name',
                description: 'Get an ability',
                type: Constants.ApplicationCommandOptionTypes.STRING,
                required: true
            },
            {
                name: 'language',
                description: 'in what language should the ability be shown? (default to english if this is not set)',
                type: Constants.ApplicationCommandOptionTypes.STRING,
                choices: [
                    {
                        name: 'en',
                        value: 'en'
                    },
                    {
                        name: 'de',
                        value: 'de'
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
        else if(name == 'ability') {
            let args = interaction.data.options;

            if(typeof args !== 'undefined') {
                let lang = args.length == 1 ? 'en' : args[1].value;
                pokedex.getAbilityByName(args[0].value)
                .then(ability => {
                    let effect = ability.effect_entries.find(e => e.language.name == lang);
                    interaction.createMessage({
                        embeds: [
                            {
                                title: ability.names.filter(e => e.language.name == lang)[0].name,
                                description: effect.effect,
                                color:0xFFC58E
                            }
                        ]
                    });

                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }
});

bot.on('error', (err, id) => {
    logger.error(err.message);
});

// connect the bot
bot.connect();