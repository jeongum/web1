import BaseScene from "./BaseScene";
import { setInterval } from "timers";
import i18next from "i18next";

// global game options
var spawnAllowed = true; // check the value for spawn 
var spawnTimer = 0; // timer for spawn the enemy (bad words)
var spawnTeamTimer = 0; // timer for spawn the team (good words)
var spawnItemTimer = 0; // timer for spawn the items
var scorePoint = 0; // for dispaly of score
var scoreLevel = 1; // for game levels
var levelText = 0; // for display game levels 
var charVelocity = 180; // setting the speed and plused by speed item(speedPotion)
let health; // for global health up sound effect
let faster; // for global fast potion sound effect 
var textTimer = 0; // text effect when eat some items
var itemText; // text effect
var itemSpawned = false;

var tconfig = { // text config
    x: 200,
    y: 50,
    text: '',
    style: {
      fontSize: '22px',
      fontFamily: 'Arial',
      color: '#8ED6FF',
      align: 'center',
      lineSpacing: 12,
    }
};

var timedEvent2;
var text2;
var scoreText2;

var touch;
var ResumeText;

class SecondGameScene extends BaseScene {

    constructor(test) {
        super({
            key: 'SecondGameScene'
        });
    }

    create(){

        health = this.sound.add('healthp',{loop:false});
        faster = this.sound.add('fastp',{loop:false});

        // for the HP bar
        touch = 0;

        // setting the back ground
        this.background = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'secondBackground');
        this.background.setDisplaySize(this.game.config.width, this.game.config.height);

        // player assets
        this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'person');
        this.cursors = this.input.keyboard.createCursorKeys();

        // item effect text setting
        itemText = this.make.text(tconfig);
        itemText.setWordWrapWidth(100, false);

        // Ading pause btn and pause scene and score and Time and exit/// AKA HUD
        let PauseButton2 = this.add.image(625,65,"pause").setScale(0.8).setDepth(1);
        this.add.image(275,95, "green3").setScale(2); //original
        this.Green = this.add.image(275,125, "green2").setScale(2);
        scoreText2 = this.add.text(150, 100,  i18next.t("score")+": " + scorePoint).setScale(2); // display score
        levelText = this.add.text(150, 125,  i18next.t("Level")+": " + scoreLevel).setScale(2); // display levels
        timedEvent2 = this.time.addEvent({ delay: 100000, loop: true });
        text2 = this.add.text(this.game.config.width / 2, 50);
        let exitD= this.add.image(625,105,'exit');

        ////ANIMATE THE PERSON
        ///front
        this.anims.create({
            key: "front",
            frameRate: 5,
            repeat: -1,   //repeat forever
            frames: this.anims.generateFrameNumbers("person", {
                frames: [0,1,2]
            })
        })
        ///left
        this.anims.create({
            key: "left",
            frameRate: 5,
            repeat: -1,   //repeat forever
            frames: this.anims.generateFrameNumbers("person", {
                frames: [3,4,5]
            })
        })
        ///right
        this.anims.create({
            key: "right",
            frameRate: 5,
            repeat: -1,   //repeat forever
            frames: this.anims.generateFrameNumbers("person", {
                frames: [6,7,8]
            })
        })
        ///behind
        this.anims.create({
            key: "behind",
            frameRate: 5,
            repeat: -1,   //repeat forever
            frames: this.anims.generateFrameNumbers("person", {
                frames: [9,10,11]
            })
        })

        // enemy assets (Objects to Avoid) group with all active platforms.
        this.enemyGroup = this.add.group({
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.enemyPool.add(platform);
            }
        });
 
        // pool
        this.enemyPool = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.enemyGroup.add(platform);
            }
        });

        // team assets (Objects to get -> for score, good words) group with all active platforms.
        this.teamGroup = this.add.group({
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.teamPool.add(platform);
            }
        });
    
        // pool
        this.teamPool = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.teamGroup.add(platform);
            }
        });

        // item assets (Objects to get -> for effects)
        this.itemGroup = this.add.group({
            removeCallback: function(platform){
                platform.scene.itemPool.add(platform);
            }
        });
    
        // pool
        this.itemPool = this.add.group({
            removeCallback: function(platform){
                platform.scene.itemGroup.add(platform);
            }
        });

        // to go back to world
        exitD.setInteractive();
        exitD.on("pointerup", ()=>{
            this.scene.start('WorldMap');
            this.restartGame();
        })

        // to pause the game
        PauseButton2.setInteractive();
        PauseButton2.on("pointerup", ()=>{ 
            this.scene.pause();
            this.scene.launch('sceneP', "4");
        });

        // to limit player area
        {
            this.invisible_wallLeft = this.physics.add.sprite(100, 0, 'invisible_wall');
            this.invisible_wallRight = this.physics.add.sprite(this.game.config.width - 100, 0, 'invisible_wall');
            this.invisible_wallLeft.setDisplaySize(30, this.game.config.height * 2);
            this.invisible_wallRight.setDisplaySize(30, this.game.config.height * 2);
            this.invisible_wallLeft.fixedToCamera = true;
            this.invisible_wallLeft.body.immovable = true;
            this.invisible_wallLeft.body.allowGravity = false;
            this.invisible_wallRight.fixedToCamera = true;
            this.invisible_wallRight.body.immovable = true;
            this.invisible_wallRight.body.allowGravity = false;
            this.physics.add.collider(this.player, this.invisible_wallLeft);
            this.physics.add.collider(this.player, this.invisible_wallRight);
        }
    }

    // the core of the script: platform are added from the pool or created on the fly
    addPlatform(kindofWord){

        let platform;
        if(kindofWord == "enemy"){ // when make the badwords
            platform = this.physics.add.sprite(Phaser.Math.Between(100, this.game.config.width - 100), 
                Phaser.Math.Between(0, this.game.config.height), 
                "badWords" + Phaser.Math.Between(1, 18)
            ).setScale(0.39);

            // the last parameter is speed
            this.physics.moveTo(platform, this.player.x, this.player.y, Phaser.Math.Between(120, 200) + scoreLevel*10);
            this.enemyGroup.add(platform);

        } else { // when make the goodwords
            platform = this.physics.add.sprite(Phaser.Math.Between(100, this.game.config.width - 100), 
                Phaser.Math.Between(0, this.game.config.height), 
                "goodWords" + Phaser.Math.Between(1, 7)
            ).setScale(0.39);

            // the last parameter is speed
            this.physics.moveTo(platform, this.player.x, this.player.y, Phaser.Math.Between(120, 200) + scoreLevel*10);
            this.teamGroup.add(platform);

        }        
    }

    // for spawn the items
    addItems(){
        let items;
        var kindofItem = Phaser.Math.Between(0, 1); // random number of different types for items

        if(kindofItem == 0){ // hp potion
            items = this.physics.add.sprite(Phaser.Math.Between(100, this.game.config.width - 100), 
                Phaser.Math.Between(0, this.game.config.height), 
                "hpPotion"
            ).setScale(0.05);
        } else if(kindofItem == 1){ // speed potion
            items = this.physics.add.sprite(Phaser.Math.Between(100, this.game.config.width - 100), 
                Phaser.Math.Between(0, this.game.config.height), 
                "speedPotion"
            ).setScale(0.05);            
        }

        // moveTo items to random position
        this.physics.moveTo(items, 
            Phaser.Math.Between(0, this.game.config.width), 
            Phaser.Math.Between(0, this.game.config.height), 
            Phaser.Math.Between(120, 200) + scoreLevel*10
        );

        this.itemGroup.add(items);
    }

    // make the value go back to first
    restartGame(){
        scoreLevel = 1;
        scorePoint = 0;
        charVelocity = 180;
        touch = 0;
        this.setPercent(50-touch*5);
    }

    // Hp bar setting
    setPercent(percent){
        percent = percent/100;
        this.Green.setDisplaySize(300*percent*2, 145*2);

        // die action
        if(percent == 0){
            this.scene.pause();
            this.scene.launch('sceneP', "2"); // alert 'Game over'
            this.restartGame();
        }
    }

    update(){
        // char moving actions and Animations (keyboard isDown)
        if(this.player.active === true){
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-charVelocity);
                // player.anims.play('left', true);
                this.player.play("left");
            }
            else if (this.cursors.right.isDown) {
                this.player.setVelocityX(charVelocity);
                // player.anims.play('right', true);
                this.player.play("right");
            }
            else if (this.cursors.up.isDown && this.player.y > 0) {
                this.player.setVelocityY(-charVelocity);
                // player.anims.play('right', true);
                this.player.play("behind");
            }
            else if (this.cursors.down.isDown && this.player.y < this.game.config.height) {
                this.player.setVelocityY(charVelocity);
                // player.anims.play('right', true);
                this.player.play("front");
            }   

            if(this.cursors.left.isUp && this.cursors.right.isUp){
                this.player.setVelocityX(0);
            }
            if(this.cursors.up.isUp && this.cursors.down.isUp){
                this.player.setVelocityY(0);
            }
        }

        //Time elapsed
        text2.setText(Math.trunc(timedEvent2.getProgress().toString().substr(0, 4)*100)).setScale(2);

        // recycling platforms
        this.enemyGroup.getChildren().forEach(function(platform){
            if(platform.x < - platform.displayWidth / 2 || platform.y < - platform.displayHeight / 2 ){
                this.enemyGroup.killAndHide(platform);
                this.enemyGroup.remove(platform);
            } // if

            if(this.physics.overlap(this.player, platform, null, null, this)){
                this.enemyGroup.killAndHide(platform);
                this.enemyGroup.remove(platform);
                touch++;
                this.setPercent(50-touch*5);
            }
        }, this);
    
        // recycling platforms
        this.teamGroup.getChildren().forEach(function(platform){
            if(platform.x < - platform.displayWidth / 2 || platform.y < - platform.displayHeight / 2 ){
                this.teamGroup.killAndHide(platform);
                this.teamGroup.remove(platform);
            } // if

            if(this.physics.overlap(this.player, platform, null, null, this)){
                this.teamGroup.killAndHide(platform);
                this.teamGroup.remove(platform);

                // getting point between 100 ~ 200, when we overlap with any good words
                scorePoint = scorePoint + Phaser.Math.Between(100, 200);
                i18next.t();
            }
        }, this);

        // for each items action
        this.itemGroup.getChildren().forEach(function(items){
            if(items.x < - items.displayWidth / 2 || items.y < - items.displayHeight / 2 ){
                this.teamGroup.killAndHide(items);
                this.teamGroup.remove(items);
            } // if

            if(this.physics.overlap(this.player, items, null, null, this)){
                itemSpawned = true;
                itemText.x = this.player.x; itemText.y = this.player.y; 
                if(items.texture.key == 'hpPotion'){ // hp healing potion
                    itemText.setText(i18next.t("heal the hp!"));
                    this.itemGroup.killAndHide(items);
                    this.itemGroup.remove(items);
                    touch = 0; // heal the HP point
                    this.setPercent(50-touch*5);
                    health.play();
                }
                else { // speed up potion
                    itemText.setText(i18next.t("speed up!"));
                    this.itemGroup.killAndHide(items);
                    this.itemGroup.remove(items);
                    charVelocity += 10;
                    faster.play();
                }
            }
        }, this);

        // text timer (item effect)
        if(itemSpawned) {
            textTimer++;
        }

        // delete text 
        if(textTimer > 60) {
            itemText.setText("");
            itemSpawned = false;
            textTimer = 0;
        }

        // keep displaying the score
        scoreText2.setText(i18next.t("score")+": " + scorePoint);

        // adding new platforms
        if(spawnTimer > 40 && spawnAllowed){
            this.addPlatform("enemy");
            if(spawnTeamTimer%2 == 0){
                this.addPlatform("team");
            } // inner if
            spawnTimer = 0;
        }

        if(spawnItemTimer > 240 && spawnAllowed){
            this.addItems();
            spawnItemTimer = 0;
        }

        // spawn Time counter
        spawnTimer++;
        spawnTeamTimer++;
        spawnItemTimer++;

        ////////////////////////////////////////////////////////////////////////////////////

        // clear the game and go to next level
        if(scorePoint > 2000 * (scoreLevel / 2)) {
            if(scoreLevel!=3){
            this.scene.pause();
            this.scene.launch('sceneP', "3"); // "2" is over, "3" is level up
            }
            scoreLevel++;
            levelText.setText(i18next.t("Level")+": " + scoreLevel);
            scorePoint = 0;
            touch = 0;
            this.setPercent(50-touch*5);
        }

        // game clear
        if(scoreLevel == 4){
            this.scene.launch('Ending', "2");
            this.scene.stop();
        }
    }
};

export default SecondGameScene;