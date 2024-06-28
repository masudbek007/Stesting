const Stesting = () => {
    fetch('https://qlapi.stesting.uz/api/v1/aboutus/')
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
document.getElementById('hamburger-menu').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('translate-x-full');
    sidebar.classList.toggle('translate-x-0');
});

const StestinBlock = document.querySelector(".block_about");

const bazaData = (arr) => {
    StestinBlock.innerHTML = '';
    
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="block mt-20">
            <div class=" z-20 grid 2xl:grid-rows-3 xl:grid-rows-3 lg:grid-rows-3 md:grid-rows-2 grid-flow-col gap-4 grid-default mt-5 ">
            <div class="row-span-3 ms-20 2xl:block xl:block lg:block md:hidden sm:hidden">
            <img class="border-[10px] border-white h-[432px] object-cover w-[254px]"
                src="${arr.image_url}" alt="">
            </div>
        <div class="col-span-2 2xl:block xl:block lg:block md:hidden sm:hidden">
            <img class="border-[10px] border-white h-[200px] object-cover w-[254px]"
                src="${arr.image1_url}" alt="">
        </div>
        <div class="col-span-2 2xl:block xl:block lg:block md:hidden sm:hidden">
            <img class="border-[10px] border-white h-[200px] object-cover w-[254px]"
                src="${arr.image2_url}" alt="">
        </div>
        <div class="row-span-3  2xl:block xl:block lg:block md:hidden sm:hidden">
            <img class="border-[10px] border-white h-[432px] object-cover w-[254px]"
                src="${arr.image3_url}"
                alt="">
        </div>
            </div>
            <div class="flex-col justify-between px-[15px] max-w[730px] mt-10 text-animation">
                <h2 class="text-4xl mb-5 font-semibold">
                    ${arr.title}
                </h2>
                <p class="text-lg text-[#73777d text-item]">
                    ${arr.description}
                </p>
            </div>
        </div>
    `;
    StestinBlock.append(div);
}  

Stesting();
