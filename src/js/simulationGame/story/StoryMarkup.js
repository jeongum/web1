class StoryMarkUp{
    typeEffect(paragraphElement = null, speed = 0, insertText = ""){
        const skippingSign = "%";
        var text = "";
        paragraphElement.innerHTML = "";
        if(insertText.length > 0){
            text = insertText;
        }else{
            text = "Text is not found";
        }
        var button = document.querySelector("#introduction button");
        if(speed === 0){
            text = text.replace("%", '');
            button.disabled = false;
            paragraphElement.innerHTML += text;
        }else{
            var i = 0;
            var timer = setInterval(function(){
                if(text.charAt(i) === skippingSign || i === insertText.length-2){
                    button.disabled = false;
                    i++;
                }
                if(i < text.length){
                    paragraphElement.innerHTML += text.charAt(i);
                    i++;
                }else{
                        clearInterval(timer);
                }            
            }, speed);
        }

    }


    setSimulationViewVisible(sceneType){
        var sceneSections = document.querySelectorAll("#simulation section");
        for(var i = 0; i < sceneSections.length; i++){
            console.log(sceneSections[i]);
            if(sceneSections[i].id.toLowerCase() === sceneType.toLowerCase()){
                //Set visible
                sceneSections[i].style.display = "block";
                
            }else{
                //Set invisable
                sceneSections[i].style.display = "none";
                
            }
        }
    }

    // makeUnvisible(q){
    //     var d = document.querySelectorAll("#simulation section");
    //     for(var i = 0; i < d.length; i++){
    //         if(d[i].id === q){
    //             //Set visible
    //         }
    //     }
    // }
}
export default StoryMarkUp