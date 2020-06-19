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

// model display 
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
var frames = [];
class Frame {
    constructor(data, highlighted) {
        this.data = data;
        this.highlighted = highlighted;
    }
}
function highlight(id, color){
    document.getElementById(id).style.backgroundColor = color;
}
function clearframes(){
    frames = [];
}
function finalframe(){
    frames.push(new Frame(thearray, []));
}

function snapshot(focus){
    let data = new Array();
    for (const num of thearray) { data.push(num);}
    let frame = new Frame(data, focus);
    frames.push(frame);
}
function animate(){
    var frame = 0;
    var id = setInterval(event, 10);
    function event(){
        if (frame == frames.length || override) {
            clearInterval(id);
            alert("done");
        } else {
            content = frames[frame];
            displayData(content.data);
            for (const num of content.highlighted) {
                highlight("b"+num, "red");
            }
            frame += 1;
        }
    }
}

// sorting algorithms
// return multiple arrays representing a frame/step 

// selection sort algorithm
function selectionsort(){ 
    clearframes()
    let length = thearray.length;
    //moves boundary of unsorted subarray 
    for (let index = 0; index < length; index++){ 
        // finds the min in unsorted array 
        let min_index = index; 
        for (let subindex = index+1; subindex < length; subindex++) {
            /* snapshot */
                let focus = [index, min_index, subindex];
                snapshot(focus);
            /* snapshot */
            if (thearray[subindex] < thearray[min_index]) 
                min_index = subindex;    
        }
        // swaps the found minimum with first element of the unsorted subarray 
        temp = thearray[min_index];
        thearray[min_index] = thearray[index];
        thearray[index] = temp;
    } 
    finalframe();
    return frames;
}

// insertion sort algorithm
function insertionsort(){
    clearframes()
    let length = thearray.length;
    // moves boundary of unsorted subarray 
    for (let index = 1; index < length; index++){ 
        // moves elements before in front until the end is reached or a lower value if found
        let valueinquestion = thearray[index];
        let testindex = index;
        while (testindex > 0 && thearray[testindex -1] > valueinquestion) { 
            /* snapshot */
            let focus = [index, testindex, testindex-1];
            snapshot(focus);
            /* snapshot */
            thearray[testindex] = thearray[testindex-1]; 
            testindex -= 1;
        } 
        thearray[testindex] = valueinquestion; 
    } 
    finalframe();
    return frames;
}

// bubble sort algorithm
function bubblesort(){
    clearframes();
    let length = thearray.length;
    // moves boundary of unsorted subarray 
    for (let index = 0; index < length-1; index++){
        for (let subindex = 0; subindex < length-index-1; subindex++) {
            /* snapshot */
            let focus = [length-index-1, subindex, subindex+1];
            snapshot(focus);
            /* snapshot */
            // larger values bubble up and out of the subarray 
            if(thearray[subindex] > thearray[subindex+1]){
                temp = thearray[subindex];
                thearray[subindex] = thearray[subindex+1];
                thearray[subindex+1] = temp;
            }
        }
    }
    finalframe();
    return frames;
}

// merge sort algorithm
function mergesort(){
    clearframes();
    let length = thearray.length;
    let temp = new Array(length);
    sorthelper(0, length-1, temp);
    finalframe();
    return frames;
}
// divides items into two adjacent parts
// recursively sorts each part
function sorthelper(from, to, temp){
    if( from < to){
        let middle = Math.floor((from+to)/2);
        sorthelper(from, middle, temp);
        sorthelper(middle+1, to, temp);
        mergehelper(from, middle, to, temp);
    }
}
// merges two parts into sorted order
function mergehelper(from, middle, to, temp){
    let i = from;
    let j = middle + 1;
    let k = from;
    while(i <= middle && j <= to){
        if(thearray[i] < thearray[j]){
            temp[k] = thearray[i];
            i+=1;
        }else{
            temp[k] = thearray[j];
            j+=1;
        }
        k+=1;
    }
    while(i <= middle){
        temp[k] = thearray[i];
        i+=1;
        k+=1;
    }
    while(j <= to){
        temp[k] = thearray[j];
        j+=1;
        k+=1;
    }
    for(let x = from; x<= to; x++){
        /* snapshot */
        let focus = [x];
        snapshot(focus);
        /* snapshot */
        thearray[x] = temp[x];
    }
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
        if (sort_method == "bubble"){ 
            let steps = bubblesort();
            animate(steps);
        }
        if (sort_method == "merge"){ 
            let steps = mergesort();
            animate(steps);
        }
    };
    document.querySelector('#clear').onclick = function(){
        override = true;
        clearWorkSpace();
        thearray = [];
    };
});