//Selecting the required elements 
const colorSelector=document.getElementById("paint-color");
const colorbtn=document.getElementById("brush-selector");
const backSelector=document.getElementById("back-color");
const rainbow=document.getElementById("rainbow");
const eraser=document.getElementById("eraser");
const toggleHover=document.getElementById("toggle-hover");
const clearPaint=document.getElementById("clear-paint");
const reset=document.getElementById("reset");
const bar=document.querySelector(".range");
const rangeBar=document.getElementById("range-bar")
const grid=document.querySelector(".grid")

//Setting up buttons
const buttons=document.querySelectorAll("button");
const buttonno=buttons.length;
colorMode="brush-selector"
colorbtn.classList.add("active")
function activeButton(e)
{
    button=e.target;
    if(button.id=="clear-paint")
    return
    if(button.id=="toggle-hover")
    {
        button.classList.toggle("active");
        return 
    }
    for(i=0;i<buttonno;++i)
    {
    if(buttons[i].id=="toggle-hover")
    continue
    buttons[i].classList.remove("active")
    }
    if(button.id=="brush-selector"||button.id=="rainbow"||button.id=="eraser")
    {
    button.classList.add("active");
    colorMode=button.id
    }
}
for(i=0;i<buttonno;++i)
buttons[i].addEventListener("click",activeButton)

//Setting up the paint brush and painting,rainbow color and eraser
paintColor=colorSelector.value;
colorSelector.style.background=paintColor;
function painting(e)
{
   
   if(colorMode=="brush-selector")
    {
        paintColor=colorSelector.value;
        colorSelector.style.background=paintColor;
    }
    else if(colorMode=="rainbow")
    {
        rainbowR=Math.floor(Math.random()*256)
        rainbowG=Math.floor(Math.random()*256)
        rainbowB=Math.floor(Math.random()*256)
        paintColor=`rgb(${rainbowR},${rainbowG},${rainbowB})`;
    }
    else if(colorMode=="eraser")
    paintColor=backColor;
    if(e.target.id=="paint-color")
    e.target.style.backgroundColor=colorSelector.value;
    else if(e.target.id!="eraser"&&e.target.id!="brush-selector")
    e.target.style.backgroundColor=paintColor
}

colorSelector.addEventListener("change",painting)
colorbtn.addEventListener("click",painting)
eraser.addEventListener("click",painting)


//Setting up the background color
backColor=backSelector.value;
backSelector.style.backgroundColor=backColor;
function backChange(e)
{
    backColor=e.target.value;
    backSelector.style.background=backColor;
    setUpGrid(rangeBar.value)
    if(colorMode=="eraser")
    paintColor=backColor
}
backSelector.addEventListener("change",backChange)

//Setting up the grid andp painting
mode="mousedown"

function paintModeChange()
{
    if(mode=="mousedown")
    {mode="mouseover"
    toggleHover.textContent="Toggle Hover:ON";
    setUpGrid(rangeBar.value)
    }
    else
    {mode="mousedown"
    toggleHover.textContent="Toggle Hover:OFF";
    setUpGrid(rangeBar.value)
    }
}

toggleHover.addEventListener("click",paintModeChange)

let mouseDown = false
document.body.onmousedown = () => mouseDown = true
document.body.onmouseup = () => mouseDown = false

let squares;
function setUpGrid(size)
{
    grid.innerHTML=""
    for(i=0;i<size*size;++i)
    {
        const div=document.createElement("div");
        div.style.backgroundColor=backSelector.value
        grid.appendChild(div);
    }
    squares=document.querySelectorAll(".grid>div");
    grid.style.gridTemplateColumns=`repeat(${size},1fr)`
    grid.style.gridTemplateRows=`repeat(${size},1fr)`
    //Setting up the painting
        for(i=0;i<squares.length;++i)
        {
            squares[i].addEventListener("click",painting)
            if(mode=="mouseover")
        squares[i].addEventListener("mouseover",painting)
        else
        {
            squares[i].addEventListener("mouseover",(e)=>
            {
                if (e.type === 'mouseover' && !mouseDown) return
                painting(e)
            })
        
        }
        }



}
setUpGrid(rangeBar.value)

rangeBar.addEventListener("change",(e)=>{
    setUpGrid(e.target.value);
    bar.textContent=`Brush-size : ${e.target.value} x ${e.target.value}`
});

//Setting up clear paint and reset buttons
clearPaint.addEventListener("click",()=>setUpGrid(rangeBar.value));
reset.addEventListener("click",()=>
{
    colorbtn.classList.add("active")
    colorSelector.value="#000000";
    paintColor=colorSelector.value;
    colorSelector.style.background=paintColor;
    backSelector.value="#ffffff"
    backColor=backSelector.value;
    backSelector.style.backgroundColor=backColor;
    rangeBar.value=50;
    setUpGrid(rangeBar.value)
    bar.textContent=`Brush-size : ${rangeBar.value} x ${rangeBar.value}`
    paintModeChange()
    toggleHover.classList.remove("active")
})