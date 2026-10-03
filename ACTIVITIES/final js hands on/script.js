// Helper to clear and show result
function updateDisplay(content) {
    document.getElementById("exercise-output").innerHTML = content;
}

// Function to show/hide menus
function toggleMenu(menuId) {
    let menu = document.getElementById(menuId);
    if (menu.style.display === "none") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

// Function to put text inside the glossy box
function updateDisplay(content) {
    document.getElementById("exercise-output").innerHTML = content;
}

// Example Activity (Exercise 3 - Activity 1)
function ex3Activity1() {
    updateDisplay('<button id="colorBtn">Change Background</button>');
    document.getElementById("colorBtn").addEventListener("click", function() {
        document.body.style.backgroundColor = "#ffc0cb";
    });
}


/* --- EXERCISE 2 (Prompt First, Display After) --- */

// Activity 1: First JavaScript Output
function runActivity1() {
    // Requirements: alert and console.log
    alert("Welcome to JavaScript!"); 
    console.log("This is my first JS program.");
    updateDisplay("Activity 1: Messages sent to Alert and Console! 🌸");
}

// Activity 2: Variables and Data Types
function runActivity2() {
    // Requirements: Declare variables and display a specific sentence
    let name = "Kaye"; 
    let age = 19;      
    let isStudent = true; 

    console.log(name, age, isStudent); 
    updateDisplay(`My name is ${name}, I am ${age} years old.`); 
}

// Activity 3: Simple Calculator
function runActivity3() {
    // Requirements: Compute Sum, Diff, Prod, Quot
    let n1 = Number(prompt("Enter first number:"));
    let n2 = Number(prompt("Enter second number:"));
    
    let sum = n1 + n2;
    let diff = n1 - n2;
    let prod = n1 * n2;
    let quot = n1 / n2;

    console.log(`Results: ${sum}, ${diff}, ${prod}, ${quot}`);
    updateDisplay(`
        <strong>Calculator Results:</strong><br>
        Sum: ${sum}<br>
        Difference: ${diff}<br>
        Product: ${prod}<br>
        Quotient: ${quot}
    `);
}

// Activity 4: User Input using prompt()
function runActivity4() {
    // Requirements: Ask for name and fav number, then alert greeting
    let name = prompt("What is your name?");
    let num = prompt("What is your favorite number?");
    
    alert(`Hello ${name}! Your favorite number is ${num}.`);
    updateDisplay(`Hello ${name}! Your favorite number is ${num}.`);
}

// Activity 5: Conditional Statements
function runActivity5() {
    // Requirements: Ask age, check if 18 or above
    let age = prompt("Please enter your age:");
    
    if (age >= 18) {
        updateDisplay("You are eligible. ✅");
    } else {
        updateDisplay("You are not eligible. ❌");
    }
}

// Activity 6: Loops (Basic)
function runActivity6() {
    // Requirements: for loop (1-10) and while loop (10-1) in console
    console.log("For Loop (1 to 10):");
    for (let i = 1; i <= 10; i++) {
        console.log(i);
    }

    console.log("While Loop (10 to 1):");
    let j = 10;
    while (j >= 1) {
        console.log(j);
        j--;
    }
    updateDisplay("Check the Browser Console (F12) to see the numbers! 🎀");
}

// Activity 7: JavaScript and HTML Interaction
function runActivity7() {
    // Requirements: Display alert "Button Clicked!"
    alert("Button Clicked!");
    updateDisplay("The alert was triggered successfully!");
}

/* --- EXERCISE 3 (From Image) --- */
function ex3Activity1() { document.body.style.backgroundColor = "pink"; }
function ex3Activity2() { document.body.classList.toggle("dark-mode"); }
function ex3Activity3() {
    updateDisplay('<ul id="list3"></ul><button onclick="addEx3Item()">Add Item</button>');
}
function addEx3Item() {
    let li = document.createElement("li");
    li.innerText = "New Item";
    document.getElementById("list3").appendChild(li);
}

// Activity 3 - Add Custom List Items
function ex3Activity3() {
    let area = document.getElementById("exercise-output");
    area.innerHTML = `
        <div style="text-align: center;">
            <p><strong>Activity 3: Custom List</strong></p>
            <input type="text" id="itemName" placeholder="Enter item name..." 
                   style="padding: 5px; border: 1px solid #f06292;">
            <button onclick="addCustomItem()">Add to List</button>
            
            <ul id="myList" style="text-align: left; display: inline-block; margin-top: 10px;"></ul>
        </div>
    `;
}

function addCustomItem() {
    let input = document.getElementById("itemName");
    let list = document.getElementById("myList");
    
    // Check if the input is empty
    if (input.value.trim() !== "") {
        let li = document.createElement("li");
        li.textContent = input.value; // This puts YOUR text into the item
        list.appendChild(li);
        
        input.value = ""; // Clears the box so you can type the next item
        input.focus();    // Puts the cursor back in the box
    } else {
        alert("Please type a name first!");
    }
}

// Activity 4 - Remove Paragraph
function ex3Activity4() {
    let area = document.getElementById("exercise-output"); // The baby pink box
    
    area.innerHTML = `
        <div style="text-align: center;">
            <p id="targetP" style="color: black; font-weight: bold;">
                This is the paragraph that will disappear! 🌸
            </p>
            <button onclick="removeTheParagraph()">Click to Remove</button>
        </div>
    `;
}

function removeTheParagraph() {
    let p = document.getElementById("targetP");
    
    if (p) {
        p.remove(); // This deletes the paragraph from the page
        alert("Paragraph removed!");
    } else {
        alert("The paragraph is already gone!");
    }
}

function ex3Activity5() {
    updateDisplay('<input type="text" id="charIn" placeholder="Type..."><p>Count: <span id="charCount">0</span></p>');
    document.getElementById("charIn").addEventListener("input", (e) => {
        document.getElementById("charCount").innerText = e.target.value.length;
    });
}
function ex3Activity6() {
    updateDisplay('<input id="v1" type="number"> + <input id="v2" type="number"> <button onclick="addNums()">=</button> <span id="res"></span>');
}
function addNums() {
    let sum = Number(document.getElementById('v1').value) + Number(document.getElementById('v2').value);
    document.getElementById('res').innerText = sum;
}

// Variable to track which photo is showing
let photoIndex = 0;

// Your exact filenames from your folder
const myPhotos = [
    "pic1.jpg", 
    "pic2.jpg", 
    "pic3.jpg", 
    "pic4.jpg"
];

// Activity 7 - Change Image
function ex3Activity7() {
    // We clear the area and add the first image
    let area = document.getElementById("exercise-output");
    area.innerHTML = `
        <div style="text-align: center;">
            <p><strong>Activity 7: Photo Gallery</strong></p>
            <img id="myImage" src="${myPhotos[0]}" width="150" 
                 style="border: 2px solid #f06292; border-radius: 0px; margin-bottom: 8px; display: block; margin-left: auto; margin-right: auto;">
            <button onclick="nextPhoto()">Next Photo</button>
        </div>
    `;
    photoIndex = 0; // Reset to the first photo
}

function nextPhoto() {
    let img = document.getElementById("myImage");
    
    // Move to the next index
    photoIndex++;
    
    // If we go past the 4th photo, restart at the first one
    if (photoIndex >= myPhotos.length) {
        photoIndex = 0;
    }
    
    
    img.src = myPhotos[photoIndex];
}
function ex3Activity8() {
    updateDisplay('<input id="todoIn"><button onclick="addTodo()">Add</button><ul id="todoL"></ul>');
}


function ex3Activity8() {
    let area = document.getElementById("exercise-output");
    
    area.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: black; margin-bottom: 15px;"> 🎀 Your To-Do List 🎀 </h3>
            
            <input type="text" id="todoInput" placeholder="Enter your task..." 
                   style="padding: 8px; border: 2px solid #f06292; width: 60%;">
            
            <button onclick="addTodo()" style="margin-top: 10px;">Add Task</button>
            
            <ul id="todoList" style="text-align: left; display: inline-block; margin-top: 20px; width: 80%;"></ul>
        </div>
    `;
}

function addTodo() {
    let input = document.getElementById("todoInput");
    let list = document.getElementById("todoList");
    
    if (input.value.trim() !== "") {
        let li = document.createElement("li");
        
        
        li.innerHTML = "🌸 " + input.value;
        li.style.listStyleType = "none";
        li.style.marginBottom = "5px";
        
        list.appendChild(li);
        input.value = ""; 
        input.focus();
    }
}
