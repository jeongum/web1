import StoryFactory from "./story/StoryFactory";

class SimGameController{
    constructor(scene){
        this.initialChapter = "c1";
        this.initialId = 1;
        this.isStopped = false;
        this.viewScene = scene;
        this.storyFact = new StoryFactory();
    }
    
    index(){
        console.log(this.viewScene.cachedJson("intro"));
        this.startStory();
    }

    startStory(){
        console.log("Start the Game");
    }

    loadChapter(){
        //this.storyFact.createChapter(this.initialChapter,this.initialId);
    }
}
export default SimGameController;