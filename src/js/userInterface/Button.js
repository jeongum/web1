class Button extends Phaser.GameObjects.Text {
  // Thanks to ragin-mages on 2019-04-28: https://github.com/ignacioxd/ragin-mages/blob/master/game/src/js/objects/ui/Button.js
  constructor(scene, x, y, text, options = {}) {
    super(scene, x, y, text, {
      fontSize: 40,
      fontFamily: "Arial, sans-serif"
    });

    this.props = {
      width: 400,
      disabled: false,
      fontColorNormal: '#d3d3d3',
      fontColorOver: '#ffffff',
      fontColorDisabled: '#333333',
      backgroundColorNormal: '#ffffff00',
      backgroundColorOver: '#ffffff55',
      backgroundColorDisabled: '#00000000',
    };

    let padding = {left: 5, right: this.props.width - this.width, top: 0, bottom: 0};

    this.setFill(this.props.fontColorNormal);
    this.setStroke('#000000', 6);
    this.setShadow(0, 0, '#000000', 4, false, false);
    this.setBackgroundColor(this.props.backgroundColorNormal);
    this.setPadding(padding);
    this.setInteractive();

    this.setDisabled(this.props.disabled);

    this.on('pointerover', () => {
      if(!this.props.disabled) {
        this.setFill(this.props.fontColorOver);
        this.setBackgroundColor(this.props.backgroundColorOver);
        
        this.setStroke('#00000000', 6);
        this.setShadow(0, 0, '#000000', 4, false, true);
      }
    });

    this.on('pointerout', () => {
      if(!this.props.disabled) {
        this.setFill(this.props.fontColorNormal);
        this.setBackgroundColor(this.props.backgroundColorNormal);
        this.setStroke('#000000', 6);
        this.setShadow(0, 0, '#000000', 4, false, false);
      }
    });
    
    scene.add.existing(this);
  }

  buttonDown(handler) {
    this.on('pointerdown', () => {
      if(!this.props.disabled) handler(this);
    })
  }

  setDisabled(value) {
    this.props.disabled = value;
    if(this.props.disabled) {
      this.setFill(this.props.fontColorDisabled);
      this.setBackgroundColor(this.props.backgroundColorDisabled);
    }
    else {
      this.setFill(this.props.fontColorNormal);
      this.setBackgroundColor(this.props.backgroundColorNormal);
    }
  }
  
}
export default Button;