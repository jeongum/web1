import BaseScene from "./BaseScene";
var recieved;
// playGame scene
class PreThird extends BaseScene {
    constructor(test) {
        super({
            key: 'PreThird'
        });
    }

    init(data){
        
        console.log("im pre3"+data);
        recieved = data;
    }

    create(){

    // setting the back ground
    if(recieved == '1'){
        this.add.image(0, 0, "firstBackground").setOrigin(0).setDepth(0);
        this.add.image(0,0,"first_intro_3").setOrigin(0).setDepth(0);
    }
    else if(recieved == '2'){
        this.background = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'secondBackground');
        this.background.setDisplaySize(this.game.config.width, this.game.config.height);
        this.add.image(0,0,"second_intro_3").setOrigin(0).setDepth(0);
    }

   //start game button
   let go = this.add.image(500,450,"go");

   go.setInteractive();
   go.on("pointerup",()=>{
       if(recieved == '1'){
        console.log("I recieve"+ recieved);
        this.scene.switch('FirstGameScene');
       }
       else if(recieved == '2'){
        this.scene.switch('SecondGameScene');
       }
       this.scene.stop();
   })

//start howto scene
    let howtobutton = this.add.image(300,450,"howtobutton");
   
    howtobutton.setInteractive();
    howtobutton.on("pointerup",()=>{
        if(recieved == '1'){
        //    this.scene.pause();
            this.scene.launch('HowtoScene',"1");
        }
        else if(recieved == '2'){
        //    this.scene.pause();
            this.scene.launch('HowtoScene',"2");
        }
        
       this.scene.stop(); 
       })
       this.scene.bringToTop();
    }
    update(){
    
    }

};

export default PreThird;