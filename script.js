const Books = [];
const Books2 = [];
Books.push(new book("The Dunwich Horror", "H. P. Lovecraft", 431, "Horror", false))
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

//4.5: Also make the alerts into modals (or popups) instead
//5: find a way to prevent the form from submitting if parameters are not met
//6: Add animation
//7: Add media query, 1400 width

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
    if (book != null){
        document.querySelector('#author').value = book.author;
        document.querySelector('#title').value = book.title;
        document.querySelector('#pgNumber').value = book.pages;
        document.querySelector('#genre').value = book.genre;
        document.querySelector('#read').checked = book.read;
        document.querySelector('.author').innerHTML = book.author;
        document.querySelector('.title').innerHTML = book.title;
        document.querySelector('h3').innerHTML = book.pages + " pages";
        document.querySelector('.book-open').className = "book-open";
        document.querySelector('.book-open').classList.add(book.genre);
    }
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
            var banner = currBook.querySelector('.banner');
            currBook.querySelector('h2').innerHTML = shelf[i].title;
            currBook.classList.add(shelf[i].genre);
            if (shelf[i].read) banner.classList.add('read');
            if (i+1 == shelf.length && shelf.length < 10) currBook.classList.add('last');
        };
        let bookIndex = document.querySelectorAll('.shelf-track>.book');
        bookIndex.forEach((book) =>{ 
            book.addEventListener('click', ()=>{
                if(document.querySelector('.desk').innerHTML == ""){
                    document.querySelector('.desk').innerHTML = deskBook;
                    formInit(Books[[...bookIndex].indexOf(book)]);
                    shelf.splice([...bookIndex].indexOf(book), 1);
                    shelve(shelf);
                }
                else alert("A book is on the desk already!");
            });
            book.querySelector(".banner").addEventListener('click', ()=>{
                if (book.querySelector('.banner').classList.contains('read')) {
                    Books[[...bookIndex].indexOf(book)].read = false;
                    book.querySelector('.banner').classList.remove('read');
                    event.stopPropagation();
                }
                else {
                    (book.querySelector('.banner').classList.add('read'));
                    Books[[...bookIndex].indexOf(book)].read = true;
                    event.stopPropagation();
                }
            });
        });
    }
    else{
        document.querySelector('.shelf-track-2').innerHTML = "";
        for(let i = 0; i < shelf.length; i++){
            document.querySelector('.shelf-track-2').innerHTML += shelfBook;
            var currBook = document.querySelector('.shelf-track-2>.book:nth-child('+(i+1)+')');
            var banner = currBook.querySelector('.banner');
            currBook.querySelector('h2').innerHTML = shelf[i].title;
            currBook.classList.add(shelf[i].genre);
            if (shelf[i].read) banner.classList.add('read');
            if (i+1 == shelf.length && shelf.length < 10) currBook.classList.add('last');
        }
        let bookIndex = document.querySelectorAll('.shelf-track-2>.book');
        bookIndex.forEach((book) =>{
            book.addEventListener('click', ()=>{
                if(document.querySelector('.desk').innerHTML == "") {
                    document.querySelector('.desk').innerHTML = deskBook;
                    formInit(Books2[[...bookIndex].indexOf(book)]);
                    shelf.splice([...bookIndex].indexOf(book), 1);
                    shelve(shelf);
                }
                else alert("A book is on the desk already!");
            });
            book.querySelector(".banner").addEventListener('click', ()=>{
                if (book.querySelector('.banner').classList.contains('read')) {
                    Books[[...bookIndex].indexOf(book)].read = false;
                    book.querySelector('.banner').classList.remove('read');
                }
                else {
                    (book.querySelector('.banner').classList.add('read'));
                    Books[[...bookIndex].indexOf(book)].read = true;
                }
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