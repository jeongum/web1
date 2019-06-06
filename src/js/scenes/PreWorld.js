import BaseScene from "./BaseScene";
import i18next from "i18next";

class PreWorld extends BaseScene {

    constructor(test) {
        super({
            key: 'PreWorld'
        });
    }


    create(){

        let goButton = this.add.image(700, 550, "goWhite").setVisible(false);

        goButton.setInteractive();

        goButton.on("pointerdown", ()=>{ // starting the game -> to GameScene
               this.scene.switch('WorldMap');
        })

        const textArray = {
            text: [
                'AROUND THE WORLD A HUGE PERCENTAGE,\n\nOF KIDS ARE BEING CYBERBULLIED.',
                'LISTEN TO THEIR HISTORIES AND HELP\n\nTHEM TO COMBAT CYBERBULLYING ',
                'AND GET KNOWLEDGE ABOUT WHAT TO\n\nDO IF YOU SUFFER THIS PROBLEM.',
                ' ,\n\n ',
                'ARE YOU READY TO HELP THEM'
            ],
            count: 0
        };
        /*
        Around the world the are around #### number of kids being cyberbullied
        Listen to them histories and help them to combat cyberbullying and get knowledge
        about what to do if you suffer this problem.
        */

        const historyText = this.add.bitmapText(150, 80, 'font', textArray.text[0]);

        this.time.addEvent({
            delay: 750,
            callback: ()=>{
                const historyText = this.add.bitmapText(150, 180, 'font', textArray.text[1]);
            },
            loop: false
        })

        this.time.addEvent({
            delay: 1500,
            callback: ()=>{
                const historyText = this.add.bitmapText(150, 280, 'font', textArray.text[2]);
            },
            loop: false
        })

        this.time.addEvent({
            delay: 2250,
            callback: ()=>{
                const historyText = this.add.bitmapText(150, 380, 'font', textArray.text[3]);
            },
            loop: false
        })

        this.time.addEvent({
            delay: 3000,
            callback: ()=>{
                const historyText = this.add.bitmapText(150, 480, 'font', textArray.text[4]);
                this.add.image(585, 485, "question").setScale(0.8);
            },
            loop: false
        })

        this.time.addEvent({
            delay: 3750,
            callback: ()=>{
                goButton.setVisible(true);
            },
            loop: false
        })
    }

    /*text1() {
        const historyText = this.add.bitmapText(50, 100, 'font', textArray.text[1]);
        
    };*/

};

export default PreWorld;