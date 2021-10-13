//Book class: Represent a book
class Book{
    constructor(title,author,identity){
        this.title = title;
        this.author = author;
        this.identity = identity;
    }
}

//UI class: Handles UI tasks
class UI{
   static displayBooks(){ 
    //    const StoredBooks = [
    // 	{title: 'Title5',
	// 	author: 'Author5',
    //     identity: Math. floor((Math. random() * 1000000) + 1),
	// },
	// 	{title: 'Title6',
	// author: 'Author6',
    // identity: Math. floor((Math. random() * 1000000) + 1),
	// },
	// 	{title: 'Title7',
	// author: 'Author7',
    // identity: Math. floor((Math. random() * 1000000) + 1),
	// },
    // ];

    const books = Store.getBooks();
    // const books = StoredBooks;

    books.forEach((book)=> UI.addBookToList(book));
}

    static addBookToList(book){
    const bookList = document.querySelector('#book-list');
    const li = document.createElement('li');
    // const hr = document.createElement('hr');
    // const input = document.createElement('input');
    // input.setAttribute('type','button');
    // input.setAttribute('value','Remove');
    // input.setAttribute('class','delete');



    li.innerHTML = `
    <div>${book.title}</div>
    <div>${book.author}</div>
     <div id ="del" class="d-none">${book.identity}</div>

    <button class="delete"> Remove</button>
    <hr>
    `
    // li.appendChild(input);
    // li.appendChild(hr);
    bookList.appendChild(li);

}
    static deleteBook(el){
        if(el.className =='delete'){
            el.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const bookForms = document.querySelector('#book-forms');
        const Title = document.querySelector('#title');
        bookForms.insertBefore(div, Title);
        //Vanish in 2seconds
        setTimeout(()=>document.querySelector('.alert').remove(), 2000);


    }
    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        // document.getElementById("id").reset();
    }

}

// Store class: Handles storage

class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(id) {
        const books = Store.getBooks();

        books.forEach((book,index) =>{
            if(book.id === id) {
                books.splice(index,1);
            }
        });


        localStorage.setItem('books',JSON.stringify(books));

    }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks());

//Event: Add books
const bookForms = document.querySelector('#book-forms');

bookForms.addEventListener('submit',(e)=>{
    e.preventDefault();
    const titleValue = document.querySelector('#title').value;
    const authorValue = document.querySelector('#author').value;
    // const ID = Math. floor((Math. random() * 1000000) + 1)
const identity = document.querySelector('#identity').value = Math. floor((Math. random() * 1000000) + 1);


    //Validate fields
    if(titleValue === ''|| authorValue === '' ){
        UI.showAlert('Fill in the fields','warning')
    } else{

            
        //Instansiate book

    const book = new Book(titleValue,authorValue,identity);
    //Add book to UI

    UI.addBookToList(book);
    //Add book to store

    Store.addBook(book);

    UI.showAlert('Book added successfully','success');


    //Clear fields

    UI.clearFields();
    }

})

//Event: Removes book

const bookList = document.querySelector('#book-list');
const del= document.querySelector('#del')

bookList.addEventListener('click',(e)=>{
// e.preventDefault();

UI.deleteBook(e.target);

Store.removeBook(e.target.del);


UI.showAlert('Book deleted','danger')

})

// hide books
const Hide = document.querySelector('#hide');

Hide.addEventListener('change', function(e){
    const list = document.querySelector('#book-list')
	if(Hide.checked){
		list.style.display = "none";
	}else{
		list.style.display = "block";
	}
})

// Filter books
// const searchBar = document.forms['search-form'].querySelector('input');
const searchBar = document.querySelector('#search-book');

searchBar.addEventListener('keyup',function(e){
    const list = document.querySelector('#book-list')


	const searched = e.target.value.toLowerCase();
	const Books = list.getElementsByTagName('li');
	Array.from(Books).forEach(function(Book){
		const title = Book.firstElementChild.textContent;
		if(title.toLowerCase().indexOf(searched) != -1){
			Book.style.display = 'block'
		} else {
			Book.style.display = 'none'
		}
	})
})
