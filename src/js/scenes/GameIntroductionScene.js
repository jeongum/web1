import BaseScene from "./BaseScene";
import StoryMarkUp from "../simulationGame/story/StoryMarkup";

class GameIntroductionScene extends BaseScene{
    constructor(){
        super("GameIntroductionScene");
        this.nextScene = "";
        this.markUpStory = new StoryMarkUp();
        //this.button = new Button(this,20,20,"next story");
    }
    
    init(data){
        this.nextScene = data.nextDisplayItem;
    }

    preload(){
        this.load.json("storyJson",'src/data/story.json');
        this.load.html('intro','src/html/introduction.html');
        this.load.css('introductionCss', 'src/css/game.css');
    }

    create(){
        //var paragraph = document.createElement('p');
        this.add.dom(400,300).createFromCache('intro');
        var paragraph = document.querySelector("#introduction p");
        var tex = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
        "Aenean vel accumsan dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus." +
        "Fusce nunc nibh, auctor tincidunt sollicitudin eu, fringilla vitae sapien. Nunc quis feugiat ex, ut faucibus enim. Morbi lectus eros, pulvinar a cursus a, aliquet at diam. Integer sit amet finibus diam, ut volutpat quam. Duis maximus molestie leo, in laoreet sem facilisis at. Proin nec pulvinar felis. Sed fringilla quis sapien sed placerat. Aenean turpis sem, auctor vel luctus ut, laoreet a velit. Aenean eget sodales arcu. Vivamus luctus, sapien in hendrerit ultrices, %lorem ante ultrices libero, eu aliquet orci quam eget quam."+
        "Aenean vel accumsan dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus." +
        "Aenean vel accumsan dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus." +
        "%Aenean vel accumsan dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus." +
        "Aenean vel accumsan dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus." +
        "Aenean vel accumsan dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus." +
        "Aenean vel accumsan dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus." +
        "Aenean vel accumsan dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus." +
        "Aenean vel accumsan dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus.";
        this.markUpStory.typeEffect(paragraph, 1 , tex);
        document.querySelector("#introduction button").addEventListener("click", ()=>{
            this.changeScene("FirstGameScene");
        }); 
    }
}
export default GameIntroductionScene;