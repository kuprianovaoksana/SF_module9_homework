// Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.

const minValue = 1;
const maxValue = 10;
let value = 0;

const btn = document.querySelector(".btn");
const inpNode = document.getElementById("warn_mes");
const input = document.querySelector('input');
const imgWrapper = document.getElementById("download_pics");

let images = [];


input.addEventListener('input', () => {
    inpNode.innerHTML = "";
});


btn.addEventListener('click', clickFunction);

function clickFunction() {
    
    value = Math.round(input.value);
    sendXHR(value);
    input.value = "";
}


document.querySelector('body').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        btn.click();
    }
});


function sendXHR(value) {
    if((value>=minValue)&&(value<=maxValue)){
        
        btn.removeEventListener('click', clickFunction);
        document.querySelector('.btn').classList.add('active');

        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://picsum.photos/v2/list?limit=${value}`, true);
        xhr.send();
        xhr.onload = function() {
            // console.log(`Статус: ${xhr.status}; Результат: ${xhr.response}`)
            if (xhr.status = 200) {
                let imgList = JSON.parse(xhr.response);
            // console.log(imgList);
            // console.log(imgList[0].download_url);
            initImages(imgList);
            }
        };    
    }
    else {
        inpNode.innerHTML = "Число вне диапазона";
        document.querySelector('.btn').classList.remove('active');

    } 
}

function initImages(imgList) {
    // for(let i=0; i<imgList.length; i++){
    //     let url = "" + imgList[i].download_url;
    //     let imageDiv = `
    //   <div class="card">
    //     <img
    //       src="${url}"
    //       class="d_pics"
    //     />
    //   </div>
    // `;
    //     imgWrapper.innerHTML += imageDiv;
    // }

    let collectionHtml = '';
    for(let i=0; i<imgList.length; i++){
        let url = imgList[i].download_url;
        collectionHtml += `<div style="background-image: url(${url})" class= "d_pics"></div>`;
    }
    // imgWrapper.innerHTML = collectionHtml;

    // 2й вариант
    imgWrapper.insertAdjacentHTML('afterbegin', collectionHtml);
    // btn.insertAdjacentHTML('afterend', collectionHtml);
};






