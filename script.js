const Books = [];
const Books2 = [];
Books.push(new book("Alice in Wonderland", "Lewis Carroll", 352, "Fantasy", false));
Books.push(new book("Caesar and Christ", "Will Durant", 752, "History", true));
Books.push(new book("Dune", "Frank Herbert", 412, "Sci-Fi", true));
let deskBook = document.querySelector('.desk').innerHTML;
let shelfBook = document.querySelector('.shelf-track').innerHTML;
formInit();
shelve(Books);

document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', ()=>{
        if(button.innerHTML.includes('open')) {
            if(document.querySelector('.desk').innerHTML == "") {
                document.querySelector('.desk').innerHTML = deskBook;
                formInit();
            }
        } 
        if(button.innerHTML.includes('remove')) document.querySelector('.desk').innerHTML = "";
        if(button.innerHTML.includes('plus')) {
            addBook();
        };
    });
});

//1: We need to add an event listener to each book as they're shelved, that allows them to fill the desk book form based on the data stored in them
//2: Another event listener must be added to the banner of each book that alters the read or unread status of both the banner and the linked object
//5: find a way to prevent the form from submitting if parameters are not met
//6: Add animation
//7: Add media query

function formInit(book){
    document.querySelectorAll("input, select").forEach((input) =>{
        input.addEventListener('input', ()=>{
            if(input.id == 'author') document.querySelector('.author').innerHTML = input.value;
            if(input.id == 'title') document.querySelector('.title').innerHTML = input.value;
            if(input.id == 'pgNumber') document.querySelector('h3').innerHTML = input.value + " pages";
            if(input.id == 'genre'){
                document.querySelector('.book-open').className = "book-open";
                document.querySelector('.book-open').classList.add(input.value);
            }
        });
    });
};

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
    if(shelf == Books){
        document.querySelector('.shelf-track').innerHTML = "";
        for(let i = 0; i < shelf.length; i++){
            document.querySelector('.shelf-track').innerHTML += shelfBook;
            var currBook = document.querySelector('.shelf-track>.book:nth-child('+(i+1)+')');
            currBook.querySelector('h2').innerHTML = shelf[i].title;
            currBook.classList.add(shelf[i].genre);
            if (i+1 == shelf.length && shelf.length < 10) currBook.classList.add('last');
        };
        document.querySelectorAll('.shelf-track>.book').forEach((book) =>{
            book.addEventListener('click', ()=>{
                //Get the index of an item in an array, based on a match between the index item's NAME attribute and the h2 of the 'book' element.
                //If the desk is empty, use the index to populate the form data
                //then use the index of the item to remove it from the array.
                shelve(shelf); //finally, update the shelf.
            });
        });
    }
    else{
        document.querySelector('.shelf-track-2').innerHTML = "";
        for(let i = 0; i < shelf.length; i++){
            document.querySelector('.shelf-track-2').innerHTML += shelfBook;
            var currBook = document.querySelector('.shelf-track-2>.book:nth-child('+(i+1)+')');
            currBook.querySelector('h2').innerHTML = shelf[i].title;
            currBook.classList.add(shelf[i].genre);
            if (i+1 == shelf.length && shelf.length < 10) currBook.classList.add('last');
        }
        document.querySelectorAll('.shelf-track-2>.book').forEach((book) =>{
            book.addEventListener('click', ()=>{
                //Get the index of an item in an array, based on a match between the index item's NAME attribute and the h2 of the 'book' element.
                //If the desk is empty, use the index to populate the form data
                //then use the index of the item to remove it from the array.
                shelve(shelf);//finally, update the shelf.
            });
        });
    };
}

function book(title, author, num, genre, read){
    this.title = title;
    this.author = author;
    this.pages = num;
    this.genre = genre;
    this.read = read;
}