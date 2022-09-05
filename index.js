
function remplirTab (t) {
    let i= 0;  
    let newTab= [];
    while(i<t.length) {
       let RandomItem = getRandomItem(t);
       newTab.push(RandomItem);
        if (t.indexOf(RandomItem) > -1) { 
            // only splice array when item is found
            t.splice(t.indexOf(RandomItem), 1);
            // 2nd parameter means remove one item only
        }
    }
    return newTab;

}

function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

function setItemInDiv (tab,id) {
 let container = document.getElementById(id);
 let elements = "";

 for(let i= 0;i<tab.length;i++) {
    elements+="<div class='item masked elt-"+i+"'>"+tab[i]+"</div>";
 }
 container.innerHTML = elements;

}
function setClick(idContainer,HighScore) {
 let items = document.querySelectorAll("#"+idContainer+" .item");
 let firstItem ="";
 let score=0;
 for(let i=0;i<items.length;i++) {
    items[i].addEventListener("click",()=>{
        console.log("element cliqued, ",items[i]);
        let nbrOpened = document.querySelectorAll("#"+idContainer+" .item.opened");
        if(firstItem!="") {

            if(items[i].className.indexOf("opened")!==-1) {
                items[i].classList.remove("opened");
                firstItem ="";
            } else {
                items[i].classList.add("opened");
                document.getElementById(idContainer).classList.add("NotAllowed");
                
                secondItem=items[i];
                console.log("second item : ",secondItem);
                if(firstItem.innerHTML == secondItem.innerHTML) {
                    console.log("we have match");
                    score++;
                    console.log("new Score : ", score);
                    if(score ==HighScore ) {
                        document.getElementById("js-timer-container-loader").remove();
                        GameOver(idContainer,score);
                    }                     


                    setTimeout(function(){
                        firstItem.remove();
                        secondItem.remove();
                        secondItem ="";
                        firstItem = "";
                        document.getElementById(idContainer).classList.remove("NotAllowed");
                    },1000);
                    console.log("element removed for match");
                } else {
                    console.log("it is not a match");
                    setTimeout(function(){
                        firstItem.classList.remove("opened");
                        secondItem.classList.remove("opened");
                        secondItem ="";
                        firstItem = "";
                        document.getElementById(idContainer).classList.remove("NotAllowed");
                    },1000);

                }
                
            }   

        } else {
            if(items[i].className.indexOf("opened")!==-1) {
                items[i].classList.remove("opened");
            } else {
                items[i].classList.add("opened");
                firstItem=items[i];
                console.log("first item : ",firstItem);
            }    
        }
            

    })


 }
}
function GameOver (container, score) {
    if(score==0) {
        console.log("************Score : "+score+"********");
        let str="<h1>Game over... You lose!</h1><br>";
        str+="<h2 id='restartButton'> <a href=''>Restart</a></h2>";
        document.getElementById(container).innerHTML =str;
    } else {
        console.log("************Score : "+score+"********");
        let str="<h1>Congratulations... You win!</h1><br>";
        str+="<h2 id='restartButton'> <a href=''>Restart</a></h2>";
        document.getElementById(container).innerHTML =str;
    }
  
    
}

function timer (idcontainer,timer) {
		const timerCountdown = document.getElementById("js-timer-countdown");
        const timerContainer = document.getElementById("js-timer-container-loader")
		if(timerCountdown) {
			timerCountdown.innerHTML = "<b>"+ timer + "</b> secondes";

			var interval = setInterval(function(){
				timerCountdown.innerHTML = "<b>"+ timer + "</b> secondes";
				timer--;
				if(timer < 0){
					timerContainer.remove();
					clearInterval(interval);
                    GameOver(idcontainer,0);
				}

			}, 1000);
		}
		

}

const itemTab = ["orange", 'Ananas',"Pomme","banane"];
console.log("**********Niveau de difficulte : "+itemTab.length);
console.log("itemTab : ",itemTab);
FinalTab = remplirTab(itemTab.concat(itemTab));
console.log("FinalTab : ",FinalTab);
setItemInDiv(FinalTab,"container");
setClick("container",itemTab.length);
timer ("container",itemTab.length*5)
