import Chapter from "./Chapter";

class StoryFactory{
    constructor(scene){
        this.scene = scene;
    }

    createChapter(chapterId, fragmentId){
        var chap = new Chapter();
        chap.addStoryFragment();

       
    }

    createDescription(){
        
    }
    createDisccussion(){

    }

    findChapter(chapterId){
        return "Chap";
    }

    findFragment(chapterId, fragmentId){
        return "Frag";
    }
}
export default StoryFactory;