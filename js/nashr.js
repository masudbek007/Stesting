const elBoxList = document.querySelector('.box-list');
const elFormBtnPagination = document.querySelector('.pagination-list');
const elLoadingAnimation = document.querySelector('.animation');
const elSelect = document.querySelector('.Nashr_selekt');
const elAreaButtons = document.querySelector('.pagination-list');

const area = new Set();
const categories = new Set();
let page = 1;
let loading = false;
let selectedCategory = '';
let filter = '';  
let cabinet = '';

const requestPublications = (category = '', filter = '') => {
    loading = true;
    elLoadingAnimation.classList.remove("hidden");

    let url = `https://qlapi.stesting.uz/api/v1/publication/?area=${cabinet}&page=${page}`;
    if (category && category !== 'all') {
        url += `&category__slug=${category.toLowerCase()}`;
    }
    if (filter) {
        url += `&filter=${filter}`;
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
            elBoxList.textContent = "Error loading publications...";
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
    requestPublications(selectedCategory, filter);
};

const renderPublications = (publications) => {
    elBoxList.innerHTML = '';
    publications.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="block lg:flex gap-[44px] p-6 mt-5 mb-8 shadow">
                <div>
                    <img class="px-[15px] min-w-[200px]" src="${item.image_url}" alt="bola">
                </div>
                <div class="flex-col justify-between px-[15px] max-w[730px]">
                    <h2 class="text-2xl font-semibold">
                        ${item.title}
                    </h2>
                    <p class="text-lg text-[#73777d]">
                        ${item.description}
                    </p>
                    <a href="${item.file_url}" target="_blank">
                        <button class="flex mt-3 lg:flex items-center py-3 px-[43px] bg-[#4f95ff] text-white gap-1 transition hover:bg-[#1064b2]">
                           <img src="./img/yuklab_olish.svg" alt="yuklab_olish">
                            Yuklab olish
                        </button>
                    </a>
                </div>
            </div>
        `;
        elBoxList.append(div);  

        if (!categories.has(item.category)) {
            categories.add(item.category);
            const optionHtml = `<option value="${item.category}">${item.category}</option>`;
            elSelect.insertAdjacentHTML('beforeend', optionHtml);
        }
         
        if (!area.has(item.get_area_display)) {
            area.add(item.get_area_display);
            const areaButton = `<button>${item.get_area_display}</button>`;
            elAreaButtons.insertAdjacentHTML('beforeend', areaButton);
        }
    });
};

elSelect.addEventListener('change', () => {
    selectedCategory = elSelect.value;
    page = 1;  
    requestPublications(selectedCategory, filter);
});

document.getElementById('internationalBtn').addEventListener('click', () => {
    cabinet = 1;
    filter = '';
    page = 1;
    requestPublications(selectedCategory, filter);
});

document.getElementById('nationalBtn').addEventListener('click', () => {
    cabinet = 2;
    filter = '';
    page = 1;
    requestPublications(selectedCategory, filter);
});

requestPublications();

const addAllOption = () => {
    const allOption = `<option value="all">Barchasi</option>`;
    elSelect.insertAdjacentHTML('afterbegin', allOption);
};

addAllOption();
