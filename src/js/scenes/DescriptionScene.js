import BaseScene from "./BaseScene";

class DescriptionScene extends BaseScene{
   constructor(){
       super("DescriptionScene");
        this.discussion = null;
        this.images = [];
        this.sounds = [];
    }
    init(data){
        this.images.push(['bbutton','./src/img/Back_b.png']);
        this.images.push(['music_notet','./src/img/icon_nofree.png']);
        //this.sounds.push(["childhood","./src/sounds/shuinvy-childhood.mp3"]);
    }
    
    preload(){
        // load images
        for(var i = 0; i < this.images.length; i++){
            this.load.image(this.images[i][0], this.images[i][1]);
        }
        //load music
        for(var i = 0; i < this.sounds.length; i++){
            this.load.audio(this.sounds[i][0], this.sounds[i][1]);
        }
    }

    create(){
        this.add.image(Math.floor(Math.random() * 20), Math.floor(Math.random() * 10), "bbutton");
        this.add.image(Math.floor(Math.random() * 20)+200, Math.floor(Math.random() * 10)+200, "music_notet");

    }
}
export default DescriptionScene;