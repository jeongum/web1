import BaseScene from "./BaseScene"

var recieved;

class HowtoScene extends BaseScene{

    constructor(test){
        super({
            key: 'HowtoScene'
        });
    }
    init(data){
        recieved = data;
    }
    create(){
        // setting the back ground
        if(recieved == '1'){
            this.add.image(0, 0, "firstBackground").setOrigin(0).setDepth(0);
        }
        else if(recieved == '2'){
            this.background = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'secondBackground');
            this.background.setDisplaySize(this.game.config.width, this.game.config.height);
        }
        
        this.add.image(0, 0, "howto").setOrigin(0).setDepth(0);

       //backbutton
       let back = this.add.image(150,450,'exit');

       back.setInteractive();
       back.on("pointerup",()=>{
           if(recieved=='1'){
              this.scene.launch('PreThird',"1");
           }
           else if(recieved == '2'){
               this.scene.launch('PreThird',"2");
           }
           this.scene.stop();
       })
       this.scene.bringToTop();
    }
    update(){

    }
};

export default HowtoScene;
