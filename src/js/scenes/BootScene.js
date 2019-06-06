import BaseScene from "./BaseScene";
import i18next from "i18next";

class BootScene extends BaseScene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
        console.log("BootScene Constructor Data : RECIEVED"+test);
    }
    init() {
        // init
    }
    preload(){

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: i18next.t("loading")+"...",
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        // loading the menu img
        this.load.image("title_bg", "./src/img/urban8.jpg");
        this.load.image("options_button", "./src/img/options_button.png");
        this.load.image("play_button", "./src/img/play_button.png");
        
        this.load.image("green3", "./src/img/greenbar3.png");
        this.load.image("green2", "./src/img/greenbar2.png");
        this.load.image("rect", "./src/img/start.jpg");

        this.load.image("font", "./src/font/font.png");
        this.load.json("fontJSON","./src/font/font.json");


        this.load.image("logo", "./src/img/logo.png");
        this.load.image("on", "./src/img/audioOn.png");
        this.load.image("off", "./src/img/audioOff.png");
        this.load.image("back", "./src/img/Back_b.png");
        
        this.load.atlas('flags', './src/img/flags16_ce.gif','./src/data/imagesets/megaset.json');
        this.load.image("korea","./src/img/koreaflag.png");
        this.load.image("netherlands","./src/img/netherlandsflag.png");
        this.load.image("unitedKingdom","./src/img/unitedkingdomflag.png");
        this.load.image("usa","./src/img/usaflag.png");
        this.load.image("france","./src/img/franceflag.png");
        this.load.image("play_again","./src/img/play_again.png");
        this.load.image("exit","./src/img/exitLeft.png");
        this.load.image("exitR","./src/img/exitRight.png");

        this.load.image("first_intro_1","./src/img/ch1_intro/first_intro_1.png");
        this.load.image("continue","./src/img/continue_y.png");
        this.load.image("first_intro_2","./src/img/ch1_intro/first_intro_2.png");
        this.load.image("go","./src/img/go.png");
        this.load.image("goWhite","./src/img/goWhite.png");
        this.load.image("question","./src/img/question.png");
        this.load.image("first_intro_3","./src/img/ch1_intro/first_intro_3r.png");
        this.load.image("first_ending","./src/img/ch1_intro/first_ending.png");
        this.load.image("second_intro_1","./src/img/ch2_intro/second_intro_1.png");
        this.load.image("second_intro_2","./src/img/ch2_intro/second_intro_2.png");
        this.load.image("second_intro_3","./src/img/ch2_intro/second_intro_3.png");
        this.load.image("second_ending","./src/img/ch2_intro/second_ending.png");
        this.load.image("howcan","./src/img/howcan.png");
        this.load.image("howto","./src/img/howto.png");
        this.load.image("howtobutton","./src/img/howtobutton.png");
        this.load.image("promise","./src/img/promise.png");
        this.load.image("comingsoon","./src/img/comingsoon.png"); // comingsoon img
        
        this.load.spritesheet("cat", "./src/img/cat.png", {
            frameHeight: 32,
            frameWidth: 32
        });
        this.load.spritesheet("bullier", "./src/img/Hat1.png", {
            frameHeight: 32,
            frameWidth: 32
        });
        this.load.spritesheet("mar", "./src/img/Girly.png", {
            frameHeight: 32,
            frameWidth: 32
        });
        this.load.spritesheet("person", "./src/img/ch2.png", {
            frameHeight: 48,
            frameWidth: 32
        });

        // sound effects
        this.load.audio("title_music", "./src/sounds/Roots_of_Legend.mp3");
        this.load.audio("hit", "./src/sounds/SFX_Hit01.ogg");
        this.load.audio("healthp", "./src/sounds/fastS.ogg");
        this.load.audio("fastp", "./src/sounds/healthS.ogg");
        this.load.audio("item", "./src/sounds/item.ogg");

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff  //white
            }
        });

        this.load.on("progress", (percent)=>{
            console.log(percent);
            percentText.setText(parseInt(percent * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * percent, 30);
        });

        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });

        this.load.on("complete", ()=>{
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        this.load.image("platform", "./src/img/testPlatform6432.png");
        this.load.image("player", "./src/img/testPlayer3232.png");
        this.load.image("enemyBox","./src/img/testEnemy3232.png");
        this.load.image("pause", "./src/img/pause2.png");
        this.load.image("think","./src/img/feelings/think.png");
        this.load.image("normal","./src/img/feelings/serious.png");
        this.load.image("happy","./src/img/feelings/smile.png");
        this.load.image("sad","./src/img/feelings/sad.png");
        this.load.image("invisible_wall","./src/img/invisible_wall.png");
        this.load.image("firstBackground", "./src/img/Blue.bmp");
        this.load.image("secondBackground", "./src/img/BackgroundV2.bmp");
        this.load.image("worldmapBackground", "./src/img/V2World.png");

        // for ch1 game's items 
        this.load.image("cellphoneIcon", "./src/img/ch1_items/cellphoneIcon.png");
        this.load.image("paperIcon", "./src/img/ch1_items/paperIcon.png");
        this.load.image("polaroid", "./src/img/ch1_items/polaroid.png");
        this.load.image("personal_info", "./src/img/ch1_items/personal_info.png");

        // for ch2 game's items 
        this.load.image("hpPotion", "./src/img/ch2_items/hp_potion.png");
        this.load.image("speedPotion", "./src/img/ch2_items/speed_potion.png");
        this.load.image("levelupImg", "./src/img/Levelup.png");
        this.load.image("gameoverImg", "./src/img/gameover1.png");
        

        // for ch2 game's bad words
        for (let index = 1; index < 19; index++) {
            this.load.image("badWords" + index, "./src/img/badWords/Artboard" + index + ".png");
        }

        // for ch2 game's good words
        for (let index = 1; index < 8; index++) {
            this.load.image("goodWords" + index, "./src/img/goodWords/good2" + index + ".png");
        }        
    }
    create(){
        // super.changeScene('SimulationScene', "from the BootScene");
        const configFont = this.cache.json.get('fontJSON');
        this.cache.bitmapFont.add('font', Phaser.GameObjects.RetroFont.Parse(this, configFont));
        this.scene.start('TitleScene');
    }
}

export default BootScene;