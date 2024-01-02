let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset-button");
let newGamebtn=document.querySelector("#New-button");
let msgContainer=document.querySelector(".message-container");
let msg=document.querySelector("#msg");
let count=0;

let turnO= true;// player O
const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box)=>
{
    box.addEventListener("click",()=>{
        if (turnO){
            box.innerText='O';
            turnO=false;
            box.style.color="RGB(0,0,0)";
        }
        else{
            box.innerText='X';
            turnO=true;
            box.style.color="#b0413e";
        }
        box.disabled=true;
        count++;
        let isWinner=checkWinner();

        if (count==9 && !isWinner)
        {
            gameDraw();
        }
    });
});

const gameDraw = () => 
{
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableboxes();
};

const disableboxes= () =>
{
    for (let box of boxes)
    {
        box.disabled= true;
    }
};

const enableboxes= () =>
{
    for (let box of boxes)
    {
        box.disabled= false;
        box.innerText= "";
    }
};

const showWinner=(winner)=>
{
    msg.innerText=`Congrtulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableboxes();
}

const checkWinner=() =>
{
    for (let pattern of winPatterns)
    {
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;
        
        if (pos1val !="" && pos2val !="" && pos3val !="")
        {
            if (pos1val==pos2val && pos2val==pos3val)
            {
                showWinner(pos1val);
            }
        }
    }
}

const resetGame=() =>
{
    turnO=true;
    count=0;
    enableboxes();
    msgContainer.classList.add("hide");
}

newGamebtn.addEventListener("click", resetGame);
reset.addEventListener("click",resetGame);
