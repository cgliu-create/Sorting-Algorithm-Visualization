// array in question
var thearray = [];
var size = 0;
var range = 0;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateArray(){
    thearray = []
    for (let i = 0; i < size; i++) {
        random_num = getRandomInt(1, range);
        thearray.push(random_num)
    }
}

// controls
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#size').onchange = function(){
        document.querySelector("#arraysize").innerHTML = "Array Size:"+this.value;
        size = this.value;
    };
    document.querySelector('#num').onchange = function(){
        document.querySelector("#valuerange").innerHTML = "Value Range:"+this.value;
        range = this.value;
    };
    document.querySelector('#build').onclick = () => {
        generateArray();
        displayData(thearray);
    };
    document.querySelector('#sort').onclick = function(){
        let sort_method = document.querySelector('#sortmethod').value;
        if (sort_method == "selection"){ selectionsort();}
        else if (sort_method == "insertion"){ 
            highlight("b0");
        }
        else if (sort_method == "bubble"){ alert("moo");}
        else if (sort_method == "merge"){ alert("moo");}
    };
});

// display model
function clearWorkSpace(){
    let workspace = document.getElementById("workspace");
    while (workspace.firstChild) {
        workspace.removeChild(workspace.lastChild);
    }
}
function addBlock(num, color, id) {
    let block = document.createElement("div");
    block.className = "block";
    block.id = "b"+id;
    block.style.border = "solid 1px black";
    block.style.backgroundColor = color;
    block.style.width = "3px";
    block.style.height = num+"px";
    let pos = range - num;
    block.style.top = pos+"px";
    document.getElementById("workspace").appendChild(block);
};
function displayData(data){
    clearWorkSpace()
    for (let index = 0; index < data.length; index++) {
        addBlock(data[index], "blue", index);
    }
}

// animation
class Frame {
    constructor(data, highlighted) {
        this.data = data;
        this.highlighted = highlighted;
    }
}
function highlight(id){
    document.getElementById(id).style.backgroundColor = "red";
}
function animate(frames){
    var frame = 0;
    var id = setInterval(event, 100);
    function event(){
        if (frame == frames.length) {
            clearInterval(id);
        } else {
            content = frames[frame];
            displayData(content.data);
            for (const id of content.highlighted) {
                highlight(id);
            }
            frame += 1;
        }
    }
}
// sorting algorithms
// returns multiple arrays representing a frame/step 

// selection sort
function selectionsort(){ 
    let length = data.length
    //moves boundary of unsorted subarray 
    for (let index = 0; index < length; index++){ 
        // finds the min in unsorted array 
        let min_index = index; 
        for (let subindex = index+1; subindex < length; subindex++) {
            if (data[subindex] < data[min_index]) 
                min_index = subindex;       
        }
        // swaps the found min the first element   
        swap(index, min_index);
        displaysort(index, min_index);
    } 
}


