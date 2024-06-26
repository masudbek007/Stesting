const Stesting = () => {
    fetch('https://qlapi.stesting.uz/api/v1/research/?area=&category__slug=')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            bazaData(data);
        })
        .catch(error => {
            console.error('Xatolik:', error);
        });
};

const StestinBlock = document.querySelector(".box-list");
const StestinBlockBaza = document.createElement("ul");
StestinBlockBaza.setAttribute("class", "mt-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4");

const bazaData = (arr) => {
    arr.results.forEach(item => {
        const researchDiv = document.createElement('li');
        researchDiv.setAttribute("class", "cursor-pointer");
        researchDiv.innerHTML = `
        <div class="lg:bg-white rounded-lg shadow-lg mt-5 p-6 max-w-sm cursor-pointer">
            <div>
                <img class="mr-5 w-full scale-100 aspect-img max-w-sm cursor-pointer transform transition-transform h-[130px] duration-300 hover:scale-105" src="${item.image_url}" alt="STesting">
            </div>
            <div class="mt-3 w-[200px]">
                <h2 class="font-bold line-clamp-1 text-base md:text-lg text-slate-800">${item.title}</h2>
                <div class="flex justify-between align-center">
                    <div>
                        <img class="w-5 mt-5 text-slate-300" src="../img/img.svg" alt="Koz">
                        <p class="text-slate-300">${item.views}</p>
                    </div>
                    <div>
                        <img class="w-5 mt-5 text-slate-300" src="../img/calendar.svg" alt="Koz">
                        <p class="text-slate-300">${item.date}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        researchDiv.addEventListener('click', () => {
            fetch(`https://qlapi.stesting.uz/api/v1/research/${item.id}/`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then(data => {
                    StestingBaza(data);
                    researchDiv.style.display = 'none';
                })
                .catch(error => {
                    console.error('Xatolik:', error);
                });
        });

        StestinBlockBaza.append(researchDiv);
        StestinBlock.append(StestinBlockBaza);
    });
};
document.getElementById('hamburger-menu').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('translate-x-full');
    sidebar.classList.toggle('translate-x-0');
});
const StestingBaza = (data) => {
    const blockBaza = document.querySelector(".block_baza");
    blockBaza.innerHTML = `
        <div class="lg:bg-white rounded-sm shadow-lg mt-5 p-6 max-w-full">
            <h2 class="font-bold text-base md:text-4xl text-slate-800">${data.title}</h2>
            <div class="flex gap-5 align-center mt-3">
                <div>
                    <img class="w-5 text-slate-300 " src="../img/img.svg" alt="Koz">
                    <p class="text-slate-300">${data.views}</p>
                </div>
                <div>
                    <img class="w-5 text-slate-300" src="../img/calendar.svg" alt="Koz">
                    <p class="text-slate-300">${data.date}</p>
                </div>
            </div>
        </div>
        <div class ="">
            <img class="max-w-[700px] aspect-img h-[130px] mt-3" src="${data.image_url}" alt="STesting">
            <p class="mt-3 text-slate-600">${data.content}</p>
        </div>
            
    `;
};

Stesting();
