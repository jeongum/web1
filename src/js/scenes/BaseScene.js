export default class BaseScene extends Phaser.Scene {
    
    constructor(key) {
        super(key);
    }

    changeScene(key, data = null){
       // this.scene.manager.keys.GamepadScene.stop();
       // this.input.keyboard.removeAllListeners();
       // this.input.removeAllListeners();
       // this.scene.stop(this.sys.config.key);
        this.scene.start(key, data);
    }

    cachedJson(jsonName){
        return this.cache.json.get(jsonName);
    }
}