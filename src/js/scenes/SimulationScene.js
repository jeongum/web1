import BaseScene from "./BaseScene";
import StoryMarkUp from "../simulationGame/story/StoryMarkup";
import SimGameController from "../simulationGame/SimGameController";

class SimulationScene extends BaseScene{
    constructor() {
        super();
        // this.images;
        // this.sounds;
        
        this.storyCtrllr;
    }

    // init(data){
    //     //  this.images.push(['bbutton','./src/img/Back_b.png']);
    //     //  this.images.push(['music_notet','./src/img/icon_nofree.png']);
    //     //  //this.sounds.push(["childhood","./src/sounds/shuinvy-childhood.mp3"]);
    //  }
     
     preload(){
        //  // load images
        //  for(var i = 0; i < this.images.length; i++){
        //      this.load.image(this.images[i][0], this.images[i][1]);
        //  }
        //  //load music
        //  for(var i = 0; i < this.sounds.length; i++){
        //      this.load.audio(this.sounds[i][0], this.sounds[i][1]);
        //  }
        this.load.html('simulationHtml','src/html/simulation.html');
        this.load.css('gameCss', 'src/css/game.css');
        this.load.json("intro",'src/data/introductions.json');

        this.storyCtrllr = new SimGameController(this);
     }
 
     create(){
        var domElement = this.add.dom(100,50).createFromCache('simulationHtml');
        this.storyCtrllr.index();
     }
}
export default SimulationScene;
