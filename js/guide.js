const elBoxList = document.querySelector('.box-list');
const elFormBtnPagination = document.querySelector('.pagination-list');
const elLoadingAnimation = document.querySelector('.animation');
const elSelect = document.querySelector('.Nashr_select');
const elStudentsBtn = document.querySelector('#students-btn');
const elTeachersBtn = document.querySelector('#teachers-btn');
const elAreaButton = document.querySelector('.area-button'); 
const categories = new Set();
let page = 1;
let loading = false;
let selectedCategory = '';
let filter = '';

const requestPublications = () => {
    loading = true;
    elLoadingAnimation.classList.remove("hidden");

    let url = `https://qlapi.stesting.uz/api/v1/videocourse/?courses=${filter}&direction=&page=${page}`;
    if (selectedCategory && selectedCategory !== 'all') {
        url += `&direction=${selectedCategory}`;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderPublications(data.results);
            renderPages(data.total_pages);
            loading = false;
            elLoadingAnimation.classList.add("hidden");
        })
        .catch(error => {
            elLoadingAnimation.classList.add("hidden");
            elBoxList.textContent = "Nashrlarni yuklashda xatolik...";
            console.log(error);
        });
};

document.getElementById('hamburger-menu').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('translate-x-full');
    sidebar.classList.toggle('translate-x-0');
});

const renderPages = (totalPages) => {
    elFormBtnPagination.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        const pagination = `
            <button class="px-4 py-2 border mb-5 text-[#007bff] hover:bg-[#e9ecef] transition" onclick="changePage(${i + 1})">${i + 1}</button>
        `;
        elFormBtnPagination.insertAdjacentHTML('beforeend', pagination);
    }
};

const changePage = (newPage) => {
    page = newPage;
    requestPublications();
};

const renderPublications = (publications) => {
    elBoxList.innerHTML = '';
    elAreaButton.innerHTML = "O'quvchilar uchun";  // Clear the area button container

    publications.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="mt-5">
                <div class="lg:bg-white rounded-lg shadow-lg mt-5 p-6 max-w-sm cursor-pointer">
                    <div>
                        <iframe class="w-full h-full" src="${item.video}" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <div class="mt-3 w-[200px]">
                        <h2 class="font-bold text-base md:text-lg text-slate-800">${item.title}</h2>
                        <div class="flex justify-between align-center">
                            <div>
                                <img class="w-5 mt-5 text-slate-300" src="../img/img.svg" alt="Koz">
                                <p class="text-slate-300">${item.views}</p>
                            </div>
                            <div>
                                <img class="w-5 mt-5 text-slate-300" src="../img/calendar.svg" alt="data">
                                <p class="text-slate-300">${item.date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        elBoxList.append(div);

        if (!categories.has(item.direction)) {
            categories.add(item.direction);
            const optionHtml = `<option value="${item.direction}">${item.direction}</option>`;
            elSelect.insertAdjacentHTML('beforeend', optionHtml);
        }
    });
};

elSelect.addEventListener('change', () => {
    selectedCategory = elSelect.value;
    page = 1;  
    requestPublications();
});

elStudentsBtn.addEventListener('click', () => {
    filter = 1;
    page = 1;
    requestPublications();
});

elTeachersBtn.addEventListener('click', () => {
    filter = 2;
    page = 1;
    requestPublications();
});

const addAllOption = () => {
    const allOption = `<option value="all">Barchasi</option>`;
    elSelect.insertAdjacentHTML('afterbegin', allOption);
};

addAllOption();
requestPublications();
