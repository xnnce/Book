// المواد
const subjects = [
    { id: 'all', name: 'جميع المواد' },
    { id: 'islamic', name: 'التربية الإسلامية' },
    { id: 'arabic', name: 'اللغة العربية' },
    { id: 'english', name: 'اللغة الإنكليزية' },
    { id: 'math', name: 'الرياضيات' },
    { id: 'biology', name: 'علم الأحياء' },
    { id: 'chemistry', name: 'الكيمياء' },
    { id: 'physics', name: 'الفيزياء' },
    { id: 'computer', name: 'الحاسوب' }
];

// بيانات الكتب
let books = [
    { id:1, title:'ملزمة القواعد', subjectId:'arabic', author:'أ. أحمد', fileName:'arabic.pdf' },
    { id:2, title:'الرياضيات المنهجي', subjectId:'math', author:'وزارة التربية', fileName:'math.pdf' },
    { id:3, title:'الخلايا', subjectId:'biology', author:'أ. سارة', fileName:'bio.pdf' }
];

let currentSubject = 'all';

window.onload = () => {
    renderSubjects();
    populateSelectOptions();
    renderBooks();
    document.getElementById('search-input').addEventListener('input', renderBooks);
    document.getElementById('add-book-form').addEventListener('submit', e=>{
        e.preventDefault();
        addBook();
    });
};

function renderSubjects(){
    const container = document.getElementById('subjects-list');
    container.innerHTML='';
    subjects.forEach(sub=>{
        const btn=document.createElement('button');
        btn.innerText=sub.name;
        btn.onclick=()=>selectSubject(sub.id);
        container.appendChild(btn);
    });
}

function populateSelectOptions(){
    const select=document.getElementById('book-subject');
    select.innerHTML='';
    subjects.filter(s=>s.id!=='all').forEach(s=>{
        const opt=document.createElement('option');
        opt.value=s.id;
        opt.innerText=s.name;
        select.appendChild(opt);
    });
}

function selectSubject(id){
    currentSubject=id;
    document.getElementById('current-subject-title').innerText=subjects.find(s=>s.id===id).name;
    renderBooks();
}

function renderBooks(){
    const container=document.getElementById('books-container');
    const noResults=document.getElementById('no-results');
    const search=document.getElementById('search-input').value.toLowerCase();
    container.innerHTML='';
    let filtered = books.filter(b=>{
        const matchSubject=currentSubject==='all'||b.subjectId===currentSubject;
        const matchSearch=b.title.toLowerCase().includes(search)||b.author.toLowerCase().includes(search);
        return matchSubject && matchSearch;
    });
    if(filtered.length===0){ noResults.classList.remove('hidden'); return;}
    noResults.classList.add('hidden');
    filtered.forEach(b=>{
        const card=document.createElement('div');
        card.className='book-card';
        card.innerHTML=`
            <h3>${b.title}</h3>
            <p>${b.author}</p>
            <button onclick="alert('تحميل: ${b.fileName}')">تحميل / عرض</button>
        `;
        container.appendChild(card);
    });
}

function addBook(){
    const title=document.getElementById('book-title').value;
    const subjectId=document.getElementById('book-subject').value;
    const author=document.getElementById('book-author').value||'مدرس غير معروف';
    const fileInput=document.getElementById('dropzone-file');
    let fileName='new_file.pdf';
    if(fileInput.files.length>0) fileName=fileInput.files[0].name;
    const newBook={ id:Date.now(), title, subjectId, author, fileName};
    books.push(newBook);
    document.getElementById('add-book-form').reset();
    renderBooks();
    alert('تم نشر الكتاب بنجاح!');
}