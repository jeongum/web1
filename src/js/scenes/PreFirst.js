import BaseScene from "./BaseScene";
var recieved;
// playGame scene
class PreFirst extends BaseScene {
    constructor(test) {
        super({
            key: 'PreFirst'
        });
    }
    
    init(data){
        
        console.log("im pre1"+data);
        recieved = data;
    }

    create(){
    // setting the back ground
    if(recieved == '1'){
        this.add.image(0, 0, "firstBackground").setOrigin(0).setDepth(0);
        this.add.image(0,0,"first_intro_1").setOrigin(0).setDepth(0);
    }
    else if(recieved == '2'){
        this.background = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'secondBackground');
        this.background.setDisplaySize(this.game.config.width, this.game.config.height);
        this.add.image(0,0,"second_intro_1").setOrigin(0).setDepth(0);
    }

    let conti= this.add.image(400,430,"continue");
    conti.setInteractive();
    conti.on("pointerup",()=>{
        if(recieved == '1'){
            this.scene.launch('PreSecond',"1")
            
         }
         else if(recieved == '2'){
             this.scene.launch('PreSecond',"2")
         }
         this.scene.stop();
    })
    this.scene.bringToTop();
    }
    update(){
    
    }

};

export default PreFirst;