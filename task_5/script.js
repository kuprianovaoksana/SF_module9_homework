const minValue = 1;
const maxValue = 10;


prevRequests();

function prevRequests() {
    if(localStorage.myCollection) {
        showLocalStorage(localStorage);
    }
    document.getElementById('conditions').innerText = `Введите 2 числа в диапазоне от ${minValue} до ${maxValue}`;
}

function showLocalStorage(imgList){
    const prevCollection = imgList.myCollection;
    document.querySelector('.form').insertAdjacentHTML('afterend', prevCollection);
}


document.querySelector(".button").addEventListener('click', () => {

    const value1 = Math.round(document.getElementById('input1').value);
    const value2 = Math.round(document.getElementById('input2').value);
    validation(value1, value2);
    document.getElementById('input1').value="";
    document.getElementById('input2').value="";
});



function validation(page, limit) {

    let message = "";

    let msg1 = "Номер страницы вне диапазона от 1 до 10";
    let msg2 = "Лимит вне диапазона от 1 до 10";
    let msg3 = "Номер страницы и лимит вне диапазона от 1 до 10";

    let checkPage = false;
    let checkLimit = false;

    if ((page > maxValue) || (page < minValue) || (isNaN(page))) {
        checkPage = true;        
    }
    if ((limit > maxValue) || (limit < minValue) || (isNaN(limit))) {
        checkLimit = true;            
    }
    
    if (checkPage && checkLimit) {
        message = msg3;        
    }  else if (checkPage && !checkLimit) {
        message = msg1;        
    } else if (checkLimit && !checkPage) {
        message = msg2;        
    }

    if (message != "") {
        document.querySelector('.warning_message').innerText = message;
        document.querySelector('.warning_message').classList.add('active');
    } else {
        sendRequest(page, limit);
    }
}


/*

function validation(value1, value2) {

    if((value1>=1&&value1<=10)&&(value2>=1&&value2<=10)){
        sendRequest(value1, value2);
    }
    else {
        showMessage(value1, value2);
    }

    function showMessage(value1, value2) {

        console.log(isNaN(value1));
        let message = '';

        if(((value1<1)||(value1>10))&&((value2<1)||(value2>10))||((isNaN(value1))&&(isNaN(value2)))){
            message ="Номер страницы и лимит вне диапазона от 1 до 10";
        }
        else {

            if ((value1<1)||(value1>10)||(isNaN(value1))){
                message ="Номер страницы вне диапазона от 1 до 10";
            }
            else if((value2<1)||(value2>10)||(isNaN(value2))) {
                message ="Лимит вне диапазона от 1 до 10";
            }
        }
        document.querySelector('.warning_message').innerText = message;
        document.querySelector('.warning_message').classList.add('active');
    }
}
*/

    
function sendRequest(page, limit) {
    document.querySelector('.warning_message').classList.remove('active');
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
        .then((response) => {
            return obj = response.json();
        })
        .then((data) => { 
            initPictures(data);
        })
        .catch(() => {
            document.querySelector('.warning_message').innerText = "Внутренняя ошибка сервера";
            document.querySelector('.warning_message').classList.add('active');
        });
}


function initPictures(imgList) {
    
    let collection = "";
   
    for (let i=0; i<imgList.length; i++) {
        collection += `<p class="img_list">Картинка №${i+1}: ${imgList[i].url}</p>`;
    }
    showPictures(collection);
}


function showPictures(collection){
    document.querySelector('.form').insertAdjacentHTML('afterend', collection);
    localStorage.setItem("myCollection", collection);
}
