console.log("Is it Working?");
console.log("How are you my console?");

var input=document.getElementById("userinput");
var button=document.getElementById('enter');
var ul=document.getElementById('ul');
var cnt=0

/*function giveName(event)
 {
    console.log("Target="+event.target.nodeName);
    //console.log("Current target="+event.currentTarget.nodeName);
    //event.target.classList.toggle("done");
 }*/

function removeElement(identity)
 {
    console.log('Id='+identity);
    var identity=document.getElementById(identity);
    ul.removeChild(identity);
 }

function addToLi() 
 {
    var li=document.createElement("li");
    var btn=document.createElement("button");
    li.appendChild(document.createTextNode(input.value));
    btn.appendChild(document.createTextNode("X"));
    btn.setAttribute('onclick', 'removeElement("Id'+(++cnt)+'")');
    li.setAttribute('id','Id'+cnt);
    li.appendChild(btn);
    document.querySelector("ul").appendChild(li);
    input.value="";
 }

function addOnClick()
 {
    if(input.value.length>0){addToLi();}
 }

function addOnEnter(event)
 {
    if(input.value.length>0 && event.keyCode===13){addToLi();}
 }

button.addEventListener("click",addOnClick);
input.addEventListener("keypress",addOnEnter);