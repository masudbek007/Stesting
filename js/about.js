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
        <div class="block p-6 mt-20 mb-8 ">
            <div class=" gap-4 grid-default mt-5 image-container">
                <img class="min-w-[50px] image-item" src="${arr.image_url}" alt="Stesting">
                <img class="min-w-[50px] image-item" src="${arr.image1_url}" alt="Stesting">
                <img class="min-w-[50px] image-item" src="${arr.image2_url}" alt="Stesting">
                <img class="min-w-[50px] image-item" src="${arr.image3_url}" alt="Stesting">
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
