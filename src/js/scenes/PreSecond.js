import BaseScene from "./BaseScene";
var recieved;
// playGame scene
class PreSecond extends BaseScene {
    constructor(test) {
        super({
            key: 'PreSecond'
        });
    }

    init(data){
        
        console.log("im pre2"+data);
        recieved = data;
    }

    create(){

    // setting the back ground
    if(recieved == '1'){
        this.add.image(0, 0, "firstBackground").setOrigin(0).setDepth(0);
        this.add.image(0,0,"first_intro_2").setOrigin(0).setDepth(0);
    }
    else if(recieved == '2'){
        this.background = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'secondBackground');
        this.background.setDisplaySize(this.game.config.width, this.game.config.height);
        this.add.image(0,0,"second_intro_2").setOrigin(0).setDepth(0);
    }

//start PreThird scene
    let howcan = this.add.image(400,450,"howcan");
   
    howcan.setInteractive();
    howcan.on("pointerup",()=>{
        if(recieved == '1'){
        //    this.scene.pause();
            this.scene.launch('PreThird',"1");
        }
        else if(recieved == '2'){
        //    this.scene.pause();
            this.scene.launch('PreThird',"2");
        }
        
       this.scene.stop(); 
       })
       this.scene.bringToTop();
    }
    update(){
    
    }

};

export default PreSecond;