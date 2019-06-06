import BaseScene from "./BaseScene";
import i18next from "i18next";

var ResumeText;
var recieved;
var PButton;

var ScenePause = new Phaser.Class({

    Extends: BaseScene,

    initialize:

    function ScenePause (){
        Phaser.Scene.call(this, { key: 'sceneP' });
        console.log("this is sceneP");
    },

    init: function(data){
        console.log('init', data);
        recieved = data;
    },

    preload: function ()
    {
        //this.load.image('face', 'assets/pics/bw-face.png');
    },

    create: function ()
    {
        //console.log('Im good', recieved);
        //this.add.image(400, 300, 'face').setAlpha(0.5);
        var W=this.game.config.width / 2;
        var H=this.game.config.height / 2;
        
       // let ResumeText = this.add.text( W- 250, H+100, i18next.t('exitpause')).setScale(2);

        PButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        let pause = this.add.image(W,H,'play_again').setScale(3);
        let gameover = this.add.image(0,0,'gameoverImg').setOrigin(0).setDepth(0);
        let levelup = this.add.image(W,H,'levelupImg').setScale(3);
        pause.visible = false;
        gameover.visible = false;
        levelup.visible = false;

        let contenedor = this.add.container(0,-300);

        if(recieved == '1'){
            pause.visible = true;
            contenedor.add([pause]);
        }else if(recieved == '2'){
            // (hyeon) change to start, cuz data of game
            gameover.visible = true;
            contenedor.add([gameover]);
        }else if(recieved == '3'){ // '3' is level up
            levelup.visible = true;
            contenedor.add([levelup]);
        }else if(recieved == '4'){ // '4' is just pause of SecondGameScene
            pause.visible = true;
            contenedor.add([pause]);
        }else { // other value is from First game and "Game over"
            gameover.visible = true;
            contenedor.add([gameover]);
        }

        this.tweens.add({
            targets: contenedor,
            duration: 600,
            ease: 'Power1',
            y: 0
        });

        // Make can press 'p' button even this pause scene
        if (Phaser.Input.Keyboard.JustDown(PButton) && recieved == '1'){
            pause.visible = false;
            this.scene.resume('FirstGameScene');
        }

        this.input.once('pointerdown', function () {
            if(recieved == '1'){
                pause.visible = false;
                this.scene.resume('FirstGameScene');
            }else if(recieved == '2'){
                // (hyeon) change to start, cuz data of game
                gameover.visible = false;
                this.scene.start('SecondGameScene');
            }else if(recieved == '3'){ // '3' is level up
                levelup.visible = false;
                this.scene.resume('SecondGameScene');
            }else if(recieved == '4'){ // '4' is just pause of SecondGameScene
                pause.visible = false;
                this.scene.resume('SecondGameScene');
            }else{ // other value is from First game and "Game over"
                gameover.visible = false;
                this.scene.start('FirstGameScene');
            }
            this.scene.stop();
        }, this);
        this.scene.bringToTop();
    }
});

export default ScenePause;