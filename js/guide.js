const elBoxList = document.querySelector('.box-list');
const elFormBtnPagination = document.querySelector('.pagination-list');
const elLoadingAnimation = document.querySelector('.animation');
const elSelect = document.querySelector('.Nashr_select');
const elStudentsBtn = document.querySelector('#students-btn');
const elTeachersBtn = document.querySelector('#teachers-btn');
const elAreaButton = document.querySelector('.area-button');
const elModal = document.querySelector('.video-modal');
const elModalContent = document.querySelector('.video-modal-content');
const elModalClose = document.querySelector('.video-modal-close');
const elModalPrev = document.querySelector('.video-modal-prev');
const elModalNext = document.querySelector('.video-modal-next');

const categories = new Set();
let page = 1;
let loading = false;
let selectedCategory = '';
let filter = '';
let currentVideoIndex = 0;
let publications = [];

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
            publications = data.results;
            renderPublications(publications);
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
    elAreaButton.innerHTML = "O'quvchilar uchun";  

    publications.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="mt-5">
                <div class="flex flex-col justify-between bg-white rounded-lg shadow-lg mt-5 p-6  cursor-pointer" data-index="${index}">
                    <div>
                        <img class="" src="https://stesting.uz/_nuxt/img/videoCover.e3ce9ad.jpg" alt="STesting">
                    </div>
                    <div class="!grow mt-3  flex flex-col justify-between">
                        <h2 class="line-clamp-1 font-bold text-base md:text-lg text-slate-800">${item.title}</h2>
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

        div.querySelector('.cursor-pointer').addEventListener('click', () => {
            openModal(index);
        });
    });
};

const openModal = (index) => {
    currentVideoIndex = index;
    const video = publications[currentVideoIndex].video;
    elModalContent.innerHTML = `<iframe src="${video}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    elModal.classList.remove('hidden');
};

const closeModal = () => {
    elModal.classList.add('hidden');
    elModalContent.innerHTML = '';
};

const showPrevVideo = () => {
    if (currentVideoIndex > 0) {
        openModal(currentVideoIndex - 1);
    }
};

const showNextVideo = () => {
    if (currentVideoIndex < publications.length - 1) {
        openModal(currentVideoIndex + 1);
    }
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

elModalClose.addEventListener('click', closeModal);
elModalPrev.addEventListener('click', showPrevVideo);
elModalNext.addEventListener('click', showNextVideo);

const addAllOption = () => {
    const allOption = `<option value="all">Barchasi</option>`;
    elSelect.insertAdjacentHTML('afterbegin', allOption);
};

addAllOption();
requestPublications();
