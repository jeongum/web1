import _ from 'lodash';
import Phaser from "phaser";
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import BootScene from './js/scenes/BootScene';
import TitleScene from './js/scenes/TitleScene';
import ScenePause from './js/scenes/ScenePause';

// For Mini Game Scenes
import WorldMap from './js/scenes/WorldMap';
import GameIntroductionScene from './js/scenes/GameIntroductionScene';
import FirstGameScene from './js/scenes/FirstGameScene';
import SecondGameScene from './js/scenes/SecondGameScene';

import PreFirst from './js/scenes/PreFirst';

import PreSecond from './js/scenes/PreSecond';
import HowtoScene from './js/scenes/HowtoScene';
import PreWorld from './js/scenes/PreWorld';


import SimulationScene from './js/scenes/SimulationScene';
import PreThird from './js/scenes/PreThird';
import Ending from './js/scenes/Ending';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.AUTO,
    pixelArt: true,
    roundPixels: true,
    parent: 'game_content',
    width: 800,
    height: 595,
    backgroundColor: 0x444444,
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        BootScene,
        GameIntroductionScene,
        TitleScene,
        WorldMap,
        ScenePause,
        FirstGameScene,
        SecondGameScene,
        PreFirst,
        PreSecond,
    //    PreSecond2,
        HowtoScene,
        PreWorld,
        PreThird,
        Ending
    ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars

let i18nOptions ={
    lng: 'en',
    fallbackLng: ["en", "nl",'es','ko'],
    //load:['nl','en'],
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    debug: true,
  };

i18next
    .use(XHR) // Watch out with XHR because it is async
    .init(i18nOptions, (err, t) => {
        if (err) return console.log('something went wrong loading', err);
        t('key'); // -> same as i18next.t
    });


