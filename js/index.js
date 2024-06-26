const Stesting = () => {
    document.getElementById('loading-spinner').classList.remove('hidden');
    
    fetch('https://qlapi.stesting.uz/api/v1/index/')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            dataBaza(data);
            updatePeople(data.statistics.registered); 
            updateSchool(data.statistics.participants); 
            updateAssigments(data.statistics.tests);

            document.getElementById('loading-spinner').classList.add('hidden');
        })
        .catch(error => {
            console.error('Xatolik:', error);

            document.getElementById('loading-spinner').classList.add('hidden');
        });
};
document.getElementById('hamburger-menu').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('translate-x-full');
    sidebar.classList.toggle('translate-x-0');
});
const container = document.querySelector('.container');
const Stesting_baza = document.querySelector(".Stesting_loyihas");
const StestinBlock = document.querySelector(".Stesting_tadqiqitlar");
const StestinDarslar = document.querySelector(".video_darslar");

const dataBaza = (arr) => {
    const div = document.createElement('div');
    const Stestin_wrap = document.createElement('div');
    const StestinBlockBaza = document.createElement("ul");
    const StestingVideoDarslar = document.createElement("ul");
    div.setAttribute("class","w-full")
     div.innerHTML = `
    <div class="min-h-screen  flex mt-20">
            <div class='  grid grid-cols-1 lg:grid-cols-2  gap-8 place-items-center'>
            <div class=" pl-5 lg:text-left">
                <h3 class="text-[30px] lg:text-[50px] text-slate-800 mt-[10px] font-bold">${arr.registration.title}</h3>
                <p class="">${arr.registration.description}</p>
                <a href="${arr.registration.link}">
                    <button class="bg-[#4f95ff] px-[70px] mt-[30px] hover:bg-blue-700 rounded-sm text-white py-3">Video yoriqnoma</button>
                </a>
            </div>
            <div class="max-w-[400px]">
                <img class="hidden lg:block mt-[100px] lg:mt-0" src="https://stesting.uz/focused-man.png" alt="bolla">
            </div>
        </div>
</div>
    
        
    `;
    Stestin_wrap.setAttribute("class", "mt-[20px]");
    Stestin_wrap.innerHTML = `
        <div class=" block  lg:flex gap-10">
            <p class="about-stesting text-slate-800  bg-[#f8fbff] px-[40px] py-2 text-lg">${arr.short_description}</p>
            <a class="" href="#">
                <button class="mt-6 lg:mt-0 bg-blue-500 px-[50px] ml-5 transition hover:bg-blue-600 rounded-sm mr-10 fond-bold text-white py-2">Tafsilotlar</button>
            </a>
        </div>
    `;
    StestinBlockBaza.setAttribute("class", "mt-[20px]");
    StestinBlockBaza.setAttribute("class","grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4")

    arr.research.forEach(item => {
        const researchDiv = document.createElement('li');
        researchDiv.setAttribute("class", "cursor-pointer");
        researchDiv.innerHTML = `
        <div class = " lg: bg-white  rounded-lg shadow-lg mt-5 p-6 max-w-sm cursor-pointer ">
        <div>
           <img class="mr-5 w-full scale-100  aspect-img max-w-sm cursor-pointer transform transition-transform h-[130px] duration-300 hover:scale-105 " src="${item.image_url}" alt="STesting">
        </div>
           <div class ="mt-3 w-[200px]">
           <h2 class="font-bold line-clamp-1 text-base md:text-lg text-slate-800">${item.title}</h2>
           <div class =  "flex justify-between align-center">
             <div>
              <img class=" w-5  mt-5  text-slate-300" src="../img/img.svg" alt="Koz">
              <p class = "  text-slate-300 ">${item.views}</p>
            </div>
            <div>
              <img class=" w-5  mt-5  text-slate-300" src="../img/calendar.svg" alt="Koz">
              <p class = "  text-slate-300 ">${item.date}</p>
            </div>
           </div>
          </div>
        </div>
        `
        researchDiv.addEventListener('click', () => showModal(item.title, item.description));
        StestinBlockBaza.append(researchDiv)
        StestinBlock.append(StestinBlockBaza)
    });

    StestingVideoDarslar.innerHTML = `
    <div class= "block  lg:flex justify-around mt-3 mx-auto">
    
      <iframe class= " max-w-[] mx-auto" src="${arr.main_video.video}" frameborder="0"></iframe>
      <div class="dars_block flex flex-col items-center text-center mx-auto max-w-screen-md">
    <h2 class="text-3xl font-bold">
        Videodarslar
    </h2>
    <p class="mt-5 mx-5">
        Foydalanuvchilarga qulaylik yaratish maqsadida Stesting loyihasida videodarsliklar ham joylashtirilgan
    </p>
    <a href="">
        <button class="bg-blue-500 px-6 md:px-[50px] py-3 mt-5 transition mb-5 hover:bg-blue-600 font-semibold rounded-sm text-white">
            Barcha videodarslar
        </button>
    </a>
</div>

    `
    StestinDarslar.append(StestingVideoDarslar)
    Stesting_baza.append(Stestin_wrap);
    container.append(div);
};

const showModal = (title, description) => {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    modalTitle.textContent = title;
    modalDescription.textContent = description;

    modal.classList.remove('hidden');
};

const closeModal = () => {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
};

document.getElementById('modal-close').addEventListener('click', closeModal);

const updatePeople = (newValue) => {
    const valueElement = document.getElementById('value');
    const startValue = parseInt(valueElement.innerHTML, 10);
    const duration = 3000; 
    const increment = (newValue - startValue) / (duration / 50); 
    let currentValue = startValue;
    const counter = setInterval(() => {
        currentValue += increment;
        valueElement.innerHTML = Math.floor(currentValue);

        if (currentValue >= newValue) {
            clearInterval(counter);
            valueElement.innerHTML = newValue; 
        }
    }, 60);
};
const updateSchool = (newValue) => {
    const valueElement = document.getElementById('School');
    const startValue = parseInt(valueElement.innerHTML, 10);
    const duration = 3000;
    const increment = (newValue - startValue) / (duration / 50);
    let currentValue = startValue;
    const counter = setInterval(() => {
        currentValue += increment;
        valueElement.innerHTML = Math.floor(currentValue);
        if (currentValue >= newValue) {
            clearInterval(counter);
            valueElement.innerHTML = newValue; 
        }
    }, 60);
}; 

const updateAssigments = (newValue) => {
    const valueElement = document.getElementById('Assigments');
    const startValue = parseInt(valueElement.innerHTML, 10);
    const duration = 2000; 
    const increment = (newValue - startValue) / (duration / 50);

    let currentValue = startValue;
    const counter = setInterval(() => {
        currentValue += increment;
        valueElement.innerHTML = Math.floor(currentValue);

        if (currentValue >= newValue) {
            clearInterval(counter);
            valueElement.innerHTML = newValue; 
        }
    }, 60);
}; 
   
Stesting();
