import BaseScene from "./BaseScene";

var recieved; // global value for chapter

// playGame scene
class Ending extends BaseScene {
    constructor(test) {
        super({
            key: 'Ending'
        });
    }
    
    init(data){
        console.log("im ending"+data);
        recieved = data;
    }

    create(){
        // setting the back ground
        if(recieved == '1'){
            this.add.image(0, 0, "firstBackground").setOrigin(0).setDepth(0);
            this.add.image(0,0,"first_ending").setOrigin(0).setDepth(0);
        }
        else if(recieved == '2'){
            this.background = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'secondBackground');
            this.background.setDisplaySize(this.game.config.width, this.game.config.height);
            this.add.image(0,0,"second_ending").setOrigin(0).setDepth(0);

        }

        let promise= this.add.image(400,450,"promise");
        promise.setInteractive();
        promise.on("pointerup",()=>{
            if(recieved == '1'){
                this.scene.switch('WorldMap');
            }
            else if(recieved == '2'){
                this.scene.switch('WorldMap');
            }
            this.scene.stop();
        })
        
        this.scene.bringToTop();
    }
    
    update(){
    
    }

};

export default Ending;