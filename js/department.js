const elListBox = document.querySelector('.list-box')
const elLoadingAnimation = document.querySelector('.animation')

let loading = false

const requestInstruction = () => 

  fetch('https://qlapi.stesting.uz/api/v1/instruction/').then(res => res.json()).then(data => {
    renderInstruction(data)
    
  }).catch(error => console.log(error))
    
const renderInstruction = (arr) => {
    arr.forEach(item => {
        const html = `
        <li class="iframe-item py-2 px-4 text-lg hover:text-[#73777d] transition font-semibold border-b">
            <a href="#">
            ${item.title}
            </a>
        </li>
        `
        elListBox.insertAdjacentHTML('beforeend', html) 
    });
}
document.getElementById('hamburger-menu').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('translate-x-full');
    sidebar.classList.toggle('translate-x-0');
});
function embedYouTubeFromOembed(htmlString, targetElementId) {
    function extractYouTubeUrl(htmlString) {
      const regex = /<oembed\s+url="(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[\w-]+)"><\/oembed>/;
      const match = htmlString.match(regex);
      return match ? match[1] : null;
    }
  
    const youtubeUrl = extractYouTubeUrl(htmlString);
  
    if (!youtubeUrl) {
      console.error('No YouTube URL found in the provided HTML.');
      return;
    }
  
    const iframe = document.createElement('iframe');
  
    iframe.width = "655";  
    iframe.height = "600"; 
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture "; // Allow attributes for embedded player
    iframe.setAttribute('frameborder', '0'); 
    iframe.setAttribute('class', 'max-h-[300px] mt-20 max-w-full')
  
    const embedUrl = `https://www.youtube.com/embed/${getYouTubeVideoId(youtubeUrl)}`;
    iframe.src = embedUrl;
  
    const targetElement = document.getElementById(targetElementId);
  
    if (!targetElement) {
      console.error(`Target element with id '${targetElementId}' not found.`);
      return;
    }
  
    targetElement.appendChild(iframe);
  }
  
  function getYouTubeVideoId(url) {
    const videoIdRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null;
  }
  
  const htmlString = '<figure class="media"><oembed url="https://www.youtube.com/watch?v=WUlrWzlmEm8"></oembed></figure>';
  const targetElementId = 'iframe-list'; 
  
  embedYouTubeFromOembed(htmlString, targetElementId);
  
  
  

requestInstruction()