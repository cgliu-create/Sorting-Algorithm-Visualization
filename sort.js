// array in question
var thearray = [];
var size = 0;
var range = 0;
var max = 0

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getMax(){
    let length = thearray.length;
    let index = length -1;
    max = -Infinity;
    while(index>=0) {
        if (thearray[index] > max) {
            max = thearray[index];
        }
        index -= 1;
    }
    return max;
}
function generateArray(){
    thearray = []
    for (let i = 0; i < size; i++) {
        random_num = getRandomInt(1, range);
        thearray.push(random_num)
    }
    max = getMax();
}

// controls
var override = false;

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#size').onchange = function(){
        document.querySelector("#arraysize").innerHTML = "Array Size: "+this.value;
        size = this.value;
    };
    document.querySelector('#num').onchange = function(){
        document.querySelector("#valuerange").innerHTML = "Value Range: "+this.value;
        range = this.value;
    };
    document.querySelector('#build').onclick = () => {
        generateArray();
        document.getElementById("workspace").style.height = max + 10;
        let height = document.getElementById("top").offsetHeight;
        document.getElementById("bottom").style.top = height + max + 10;
        displayData(thearray);
    };
    document.querySelector('#sort').onclick = function(){
        override = false;
        let sort_method = document.querySelector('#sortmethod').value;
        if (sort_method == "selection"){ 
            let steps = selectionsort();
            animate(steps);
        }
        if (sort_method == "insertion"){ 
            let steps = insertionsort();
            animate(steps);
        }
        if (sort_method == "bubble"){ alert("moo");}
        if (sort_method == "merge"){ alert("moo");}
    };
    document.querySelector('#clear').onclick = function(){
        override = true;
        clearWorkSpace();
        thearray = [];
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
    block.style.backgroundColor = color;
    block.style.width = "5px";
    block.style.height = num+5+"px";
    let pos = max - num;
    block.style.top = pos+"px";
    document.getElementById("workspace").appendChild(block);
};
function displayData(data){
    clearWorkSpace()
    for (let index = 0; index < data.length; index++) {
        addBlock(data[index], "lightblue", index);
    }
}

// animation
class Frame {
    constructor(data, highlighta, highlightb) {
        this.data = data;
        this.highlighta = highlighta;
        this.highlightb = highlightb;
    }
}
function highlight(id, color){
    document.getElementById(id).style.backgroundColor = color;
}
function animate(frames){
    var frame = 0;
    var id = setInterval(event, 10);
    function event(){
        if (frame == frames.length || override) {
            clearInterval(id);
            alert("done");
        } else {
            content = frames[frame];
            displayData(content.data);
            for (const num of content.highlighta) {
                highlight("b"+num, "red");
            }
            for (const num of content.highlightb) {
                highlight("b"+num, "yellow");
            }
            frame += 1;
        }
    }
}
// sorting algorithms
// returns multiple arrays representing a frame/step 

function selectionsort(){ 
    var frames = [];
    // selection sort algorithm
    let length = thearray.length;
    //moves boundary of unsorted subarray 
    for (let index = 0; index < length; index++){ 
        // finds the min in unsorted array 
        let min_index = index; 
        for (let subindex = index+1; subindex < length; subindex++) {
            /* snapshot */
                let focusa = [index, subindex];
                let focusb = [min_index];
                let data = new Array();
                for (const num of thearray) { data.push(num);}
                let snapshot = new Frame(data, focusa, focusb);
                frames.push(snapshot);
            /* snapshot */
            if (thearray[subindex] < thearray[min_index]) 
                min_index = subindex;    
        }
        // swaps the found minimum with first element of the unsorted subarray 
        temp = thearray[min_index];
        thearray[min_index] = thearray[index];
        thearray[index] = temp;
    } 
    frames.push(new Frame(thearray, [], []))
    return frames;
}

function insertionsort(){
    var frames = [];
    // insertion sort algorithm
    let length = thearray.length;
    // moves boundary of unsorted subarray 
    for (let index = 0; index < length; index++){ 
        // moves elements before in front until the end is reached or a lower value if found
        let valueinquestion = thearray[index];
        let testindex = index - 1;
        while (testindex >= 0 && thearray[testindex] > valueinquestion) { 
            /* snapshot */
            let focusa = [index];
            let focusb = [testindex];
            let data = new Array();
            for (const num of thearray) { data.push(num);}
            let snapshot = new Frame(data, focusa, focusb);
            frames.push(snapshot);
            /* snapshot */
            thearray[testindex + 1] = thearray[testindex]; 
            testindex -= 1;
        } 
        thearray[testindex + 1] = valueinquestion; 
    } 
    frames.push(new Frame(thearray, [], []))
    return frames;
}
