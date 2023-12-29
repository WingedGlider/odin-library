const Books = [];
const Books2 = [];
Books.push(new book("Alice in Wonderland", "Lewis Carroll", 352, "Fantasy", false));
Books.push(new book("Caesar and Christ", "Will Durant", 752, "History", true));
Books.push(new book("Dune", "Frank Herbert", 412, "Sci-Fi", true));
let deskBook = document.querySelector('.desk').innerHTML;
let shelfBook = document.querySelector('.shelf-track').innerHTML;
document.querySelector('.shelf-track').innerHTML = "";
document.querySelector('.desk').innerHTML = "";
let deskButtons = document.querySelectorAll('button');


deskButtons.forEach((button) => {
    button.addEventListener('click', ()=>{
        if(button.innerHTML.includes('open')) if(document.querySelector('.desk').innerHTML == "") document.querySelector('.desk').innerHTML = deskBook; 
        if(button.innerHTML.includes('remove')) document.querySelector('.desk').innerHTML = "";
        if(button.innerHTML.includes('plus')) {
            addBook();
        };
    });
});

//add event listeners to the form to update the left side of it. Add it in a function so that it can be called each time a new form is generated
//(on open button or book press)

//When you add a book to the shelf, save the innerHTML of the form and store it in the object, so it can be called when the book is clicked

//Clicking a book on the shelf pulls the book out of the array and saves in a tempbook.

//shelve function generates the visual shelf based on the book objects in the current array

//add a class to the book object generated that changes its color depending on the genre

//Add an event listener to the banner on the book that swaps the color of the banner from red to green



function addBook(){
    if (Books.length < 10){
        Books.push(new book(document.querySelector('#title').value, document.querySelector('#author').value, document.querySelector('#pgNumber').value, document.querySelector('#genre').value, document.querySelector('#read').checked));
        shelve(Books);
        document.querySelector('.desk').innerHTML = ""
    } else if(Books2.length < 10){
        Books2.push(new book(document.querySelector('#title').value, document.querySelector('#author').value, document.querySelector('#pgNumber').value, document.querySelector('#genre').value, document.querySelector('#read').checked));
        shelve(Books2);
        document.querySelector('.desk').innerHTML = ""
    }
    else alert("Shelves are full!");
}

function shelve(shelf){
    //remember to add the .last class to the last book on the shelf, if the number of the books in the array are less than 10
}

function book(title, author, num, genre, read){
    this.title = title;
    this.author = author;
    this.pages = num;
    this.genre = genre;
    this.read = read;
}