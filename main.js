//Mendeklarasikan variabel yang akan digunakan
const key = 'STORAGE-KEY';
const render = 'RENDER-KEY';
const Bookshelf = [];
//membuat fungsi untuk membuat objek, "nama objek yang saya gunakan mengikuti contoh dicoding"
function makeObject(id, title, author, year, isComplete)
{
    return {
        id, title, author, year, isComplete
    };
}
//membuat fungsi untuk membuat ID yang bersifat unik
function makeId()
{
    return +new Date();
}
//membuat fungsi untuk mengambil data dari localstorage
function getDataStorage()
{
    let dataBuku = JSON.parse(localStorage.getItem(key));
    if(dataBuku != null)
    {
        for(const book of dataBuku)
        {
            Bookshelf.push(book);
        }
    }
    document.dispatchEvent(new Event(render));
}
//membuat sebuh fungsi "save" untuk menyimpan perubahan pada lokalstorage
function save()
{
    localStorage.setItem(key, JSON.stringify(Bookshelf));
}
//Membuat sebuah fungsi yang dimana bisa menmbahakn buku kedalam lokalstorage
//membuat fungsi "tambahBuku"
function tambahBuku(){
    //mendeklarasikan variabel yakan diguankan seperti title, autor, year, dan setatus
    const title = document.getElementById('inputBookTitle').value;//diambil dari imputan
    const author = document.getElementById('inputBookAuthor').value;//diambil dari imputan
    const year = document.getElementById('inputBookYear').value;//diambil dari imputan
    const isComplete = document.getElementById('inputBookIsComplete');//diambil dari imputan
    let selesaiDiBaca;
    if(isComplete.checked)
    {
        selesaiDiBaca = true;
    } 
    else 
    {
        selesaiDiBaca = false;
    }
    //membuat variabel "ID" untuk menyipan id nuik
    const ID = makeId();
    const buku = makeObject(ID, title, author, year, selesaiDiBaca);
    Bookshelf.push(buku);
    document.dispatchEvent(new Event(render));
    save();
}

//fungsi untuk membuat tampilan elemen buku pada rak buku
function makeShelf(buku, statusBuku){
    const {id, title, author, year, isComplete} = buku;
    //menampilkan Judul buku
    const Title = document.createElement('h3');
    Title.innerText = "Judul Buku " + title;
    //menampilkan penulis buku
    const Author = document.createElement('p');
    Author.innerText = "Penulis: " + author;
    //menampilkan tahun buku
    const Year = document.createElement('p');
    Year.innerText = "Tahun: " + year;
    //menampilkan buku
    const Container = document.createElement('article');
    Container.classList.add('book_item');
    Container.append(Title, Author, Year);
    //membuat tampilan button pada tabel/rak search, belum selsei dibaca, Selesai dibaca
    //button pada rak buku belum selesi dibaca
    if(isComplete === false)
    {
        //button untuk memindahkan buku ke tabel selesi dibaca
        const change = document.createElement('button');
        change.classList.add('blue');
        change.innerText = 'Selesai dibaca';
        change.addEventListener('click', function()
        {
            //jika sudah dipindahkan maka buku pada tabel ini akan dihapus dan dipindahakan di tabel lain dengan 
            //memanggil fungsi changeCelery
            changeCelery(id);
        });
        //button untuk menghapus buku dari tabel/rak ini
        const clearItem = document.createElement('button');
        clearItem.classList.add('red');
        clearItem.innerText = 'Hapus buku';
        clearItem.addEventListener('click', function()
        {
            //jika button ditekan akan memanggil fungsi clear untuk menghapus buku
            clear(id);
        });   
        const actionContainer = document.createElement('div');
        actionContainer.classList.add('action');
        actionContainer.append(change, clearItem);
        Container.append(actionContainer);

    } 
    //button pada rak buku telah selesi dibaca
    else if(isComplete === true)
    {
        //button untuk memindahkan buku ke tabel belum selesi dibaca
        const change = document.createElement('button');
        change.classList.add('blue');
        change.innerText = 'Belum Selesi';
        change.addEventListener('click', function()
        {
            //jika sudah dipindahkan maka buku pada tabel ini akan dihapus dan dipindahakan di tabel lain dengan 
            //memanggil fungsi changeNotCelery
            changeNotCelery(id);
        });
        //button untuk menghapus buku 
        const clearItem = document.createElement('button');
        clearItem.classList.add('red');
        clearItem.innerText = 'Hapus buku';
        clearItem.addEventListener('click', function()
        {
            //jika button ditekan akan memanggil fungsi clear untuk menghapus buku
            clear(id);
        });  
        const actionContainer = document.createElement('div');
        actionContainer.classList.add('action');
        actionContainer.append(change, clearItem);
        Container.append(actionContainer); 
    }
    return Container;
}

//membuat fungsi untuk button iteraktif
//mencari indek buku 
function cariId(Id)
{ 
    for(const itemFormBook of Bookshelf){
        if(itemFormBook.id === Id){
            return itemFormBook;
        }
    }
    return null;
}
//mencari buku berdasarkan judul buku
function cariJudul(bookTitle)
{ 
    for(const itemFormBook of Bookshelf)
    {
        if(itemFormBook.title === bookTitle)
        {
            return itemFormBook;
        }
    }
    return null;
}
//fungsi untuk mencari dan menghapus buku
function hapusBuku(Id)
{ 
    for(const index in Bookshelf)
    {
        if(Bookshelf[index].id === Id)
        {
            return index;
        }
    }
    return -1;
}

//fungsi untuk memindahkan buku dari belum dibaca ke sudah dibaca
function changeCelery(Id)
{
    const  idBuku = cariId(Id);
    if (idBuku == null) return;
    idBuku.isComplete = true;
    document.dispatchEvent(new Event(render));
    //kemudian disimpan
    save();
}
//fungsi untuk memindahkan buku dari sudah dibaca ke belum dibaca
function changeNotCelery(Id)
{
    const idBuku = cariId(Id);
    if (idBuku == null) return;
    idBuku.isComplete = false;
    document.dispatchEvent(new Event(render));
    //kemudian disimpan
    save();
}
//membuat fungsi untuk menghapus buku
function clear(Id)
{
    const idBuku = hapusBuku(Id);
    Bookshelf.splice(idBuku, 1);
    document.dispatchEvent(new Event(render));
    //kemudian disimpan
    save();

}

//membuat fungsi untuk mencari buku
function fiturPencarian(buku)
{
    //membuat variabel yang akan di guanakn 
    const searchText = document.getElementById('searchBookTitle').value;
    const {id, title, author, year, isComplete} = buku;
    const layoutSearch = document.getElementById('tempatSearch');
    const searchTitleFromBook = cariJudul(searchText);
    buku.title;
    //jika hasil fungsi cariJudul == null maka hasilnya kosong 
    if(searchTitleFromBook == null)
    {
        return;
    }
    layoutSearch.innerHTML = '';
    //jika ada makan akan ditampilakan dengan car amengmabil data-data buku
    for(const itemFormBook of Bookshelf)
    {
        if(itemFormBook.title === searchText)
        {
            const statusBuku = buku.isComplete;
            const elementBook = makeShelf(searchTitleFromBook, statusBuku);
            layoutSearch.append(elementBook);
            searchTitleFromBook.isComplete = 'search';
            if(isComplete === 'search')
            {
                buku = makeObject(searchTitleFromBook.id, searchTitleFromBook.title, searchTitleFromBook.author, searchTitleFromBook.year, searchTitleFromBook.isComplete);
            }  
        }
    }            
}

document.addEventListener('DOMContentLoaded', function()
{    
    //membuat variabel 
    const kumpulanBuku = document.getElementById('inputBook');//diambil dari form dengan id inputBook pada html
    const formSearch = document.getElementById('searchBook');//diambil dari form dengan id searchBook pada html 
    //membuat even untuk melakukan submit ketiak button submit di tekan pada form inputBook
    kumpulanBuku.addEventListener('submit', function (event)
    {
        event.preventDefault();
        tambahBuku();
    });
    //membuat even untuk melakukan submit ketiak button submit di tekan pada form searchBook
    formSearch.addEventListener('submit', function(event)
    {
        event.preventDefault();
        for(const bookItem of Bookshelf)
        {
            fiturPencarian(bookItem);
        }
    });
    getDataStorage();
});
//membuat event untuk menampilkan data buku di setiap tabel
document.addEventListener(render, function()
{
    //membuat variabel 
    const belumSelesai = document.getElementById('belumSelesai');//diambil dari html
    const telahSelesi = document.getElementById('telahSelesi');//diambil dari html
    belumSelesai.innerHTML = '';
    telahSelesi.innerHTML = '';
    //melakukan perulanagan untuk setiap tampilan data buku yang baru
    for(const itemFormBook of Bookshelf)
    {
        const bookElement = makeShelf(itemFormBook);
        if(itemFormBook.isComplete)
        {
            telahSelesi.append(bookElement);
        }
        else
        {
             belumSelesai.append(bookElement);
        }
    }
});

/* NOTE: Web yang saya buat memiliki tampilan seperti apalikasi "Bookshelf Apps" yang menjadi contoh untuk mengerjakan modul ini, saya menerapkan beberapa mekanik dari apaliaski todo namun saya 
tidak langsung mengambil mentah-mentah atau copy-paste, saya terlebih dahulu memehami lalu saya ubah mengguankan cara yang saya mengerti, serta saya menambahkan fungsi Search pada web yang saya 
telah kerjaakan, saya juga menambahakan beberapa statemen untuk mempermudah memahami fungsi yang saya buat, karena banyaknya pengulangan yang saya lakukan selama mengerjakan modul ini membuat saya
lebih memahami materi yang terbukti dari pemahaman saya terhadap fungsi-fungsi yang saya gunakan sehingga saya tidak hanya mampu menerpakan namun mampu menambahakan fitur baru. Mohon pengertiannya 
sekian dan terimakasih */
