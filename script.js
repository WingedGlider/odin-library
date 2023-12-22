const newBook = new book("Alice in Wonderland", "Lewis Carroll", 352, false)
console.log(newBook.info());

function book(title, author, num, read){
    this.title = title;
    this.author = author;
    this.pages = num;
    this.read = read;
    this.info = function(){
        let text = this.title + " by " + this.author + ", " + this.pages +" pages, ";
        if(read) text += "finished reading.";
        else text += "not read yet."
        return text;
    };
}