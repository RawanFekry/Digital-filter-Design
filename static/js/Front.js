function toggleas(a){
  a.children[0].click();
  if (a.classList.contains("dark-button")){
    a.classList.toggle("dark-button");
    var childs = a.parentElement.children;
    for(var i =0; i<childs.length; i++){
      if(childs[i] != a){
        childs[i].classList.toggle("dark-button");
      }
    }
  }
  else{

  }
  }

function remove(a){
    a.children[0].click();
    
}
