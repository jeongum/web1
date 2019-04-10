var Links = {
  SetColor: function(color){
    // var alist = document.querySelectorAll('a');
    // var i = 0;
    // while(i<alist.length){
    //   console.log(alist[i]);
    //   alist[i].style.color =color;
    //   i = i+1;    }
    $('a').css('color',color);
  }
}
var Body = {
  SetColor: function(color){
  //    document.querySelector('body').style.color = color;
    $('body').css('color',color);
  },
  SetBackgroundColor: function(color){
  //  document.querySelector('body').style.backgroundColor = color;
    $('body').css('backgroundColor',color);
  }
}
function colorhandler(self){
  var target =document.querySelector('body');
  if(self.value ==='rose'){
    Body.SetBackgroundColor('mistyrose');
    Body.SetColor('rosybrown');
    Links.SetColor('IndianRed');
    self.value ='linen';
  }
  else{
    Body.SetBackgroundColor('linen');
    Body.SetColor('tan');
    Links.SetColor('darksalmon');
    self.value ='rose';
  }
}
