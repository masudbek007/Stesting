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
    <div class="z-20 hidden lg:grid grid-rows-3 md:grid-rows-2 grid-flow-col gap-4 mt-5">
        <div class="row-span-3 ms-20 hidden md:block">
            <img class="border-[10px] border-white h-[432px] object-cover w-[254px] animate-image"
                src="${arr.image_url}" alt="qizbola">
        </div>
        <div class="col-span-2 hidden md:block">
            <img class="border-[10px] border-white h-[200px] object-cover w-[254px] animate-image"
                src="${arr.image1_url}" alt="stesting">
        </div>
        <div class="col-span-2 hidden md:block">
            <img class="border-[10px] border-white h-[200px] object-cover w-[254px] animate-image"
                src="${arr.image2_url}" alt="stesting">
        </div>
        <div class="row-span-3 hidden md:block">
            <img class="border-[10px] border-white h-[432px] object-cover w-[254px] animate-image"
                src="${arr.image3_url}" alt="stesting">
        </div>
        <!-- Responsive images for small screens -->
        <div class="block md:hidden">
            <img class="border-[10px] border-white h-auto object-cover w-full animate-image"
                src="${arr.image_url}" alt="qizbola">
        </div>
        <div class="block md:hidden">
            <img class="border-[10px] border-white h-auto object-cover w-full animate-image"
                src="${arr.image1_url}" alt="stesting">
        </div>
        <div class="block md:hidden">
            <img class="border-[10px] border-white h-auto object-cover w-full animate-image"
                src="${arr.image2_url}" alt="stesting">
        </div>
        <div class="block md:hidden">
            <img class="border-[10px] border-white h-auto object-cover w-full animate-image"
                src="${arr.image3_url}" alt="stesting">
        </div>
    </div>
    <div class="block md:hidden">
        <img class="border-[10px] border-white h-auto object-cover w-full mb-4 animate-image" src="${arr.image_url}" alt="qizbola">
        <img class="border-[10px] border-white h-auto object-cover w-full mb-4 animate-image" src="${arr.image1_url}" alt="stesting">
        <img class="border-[10px] border-white h-auto object-cover w-full mb-4 animate-image" src="${arr.image2_url}" alt="stesting">
        <img class="border-[10px] border-white h-auto object-cover w-full animate-image" src="${arr.image3_url}" alt="stesting">
    </div>
</div>

            </div>
            <div class="flex-col justify-between px-[25px] max-w[730px] mt-10 text-animation">
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
