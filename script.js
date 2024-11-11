var blocks_parent = document.querySelector(".blocks");
var blocksArray = Array.from(document.querySelectorAll(".block"));
var randomize_btn = document.querySelector(".randomize");
var pause_btn = document.querySelector(".pause");
var bubble_sort_btn = document.querySelector(".bubble-sort");
var shaker_sort_btn = document.querySelector(".shaker-sort");
var custom_sort_btn = document.querySelector(".custom-sort");
var changing = [];
var checking = [];
var pause = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); 
}
function get_value_of_block(block) {
    return Number(block.children[0].textContent);
}

function randomize(array) {
    for (let i = 0; i < array.length; i++) {
        var ranNum = Math.floor(Math.random() * array.length);
        var temp = array[ranNum];

        array[ranNum] = array[i];
        array[i] = temp;
    }
    array.forEach(block => {
        blocks_parent.appendChild(block);
    });
}
async function is_more(e1, e2) {
    while (pause) await sleep(100);

    var first = get_value_of_block(e1);
    var second = get_value_of_block(e2);
    e1.classList.add("checking");
    e2.classList.add("checking");

    await sleep(500);
    while (pause) await sleep(100);

    e1.classList.remove("checking");
    e2.classList.remove("checking");

    if (first > second) return true;
    else return false;
}
async function change(e1, e2, array, e_id1, e_id2) {
    while (pause) await sleep(100);
    
    e1.classList.add("changing");
    e2.classList.add("changing");

    array[e_id1] = e2;
    array[e_id2] = e1;
    array.forEach(block => {
        blocks_parent.appendChild(block);
    });

    await sleep(500);
    while (pause) await sleep(100);

    e1.classList.remove("changing");
    e2.classList.remove("changing");
}
async function bubble_sort(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
        var is_changed = false;
        for (let o = 0; o < i; o++) {
            if (await is_more(array[o], array[o+1])) {
                await change(array[o], array[o+1], array, o, o+1);
                is_changed = true;
            }
        }
        if (!is_changed) break;
    }
}
async function shaker_sort(array) {
    for (let i = array.length - 1, j = 0; i > j; i--, j++) {
        var is_changed = false;
        for (let o = j; o < i; o++) {
            if (await is_more(array[o], array[o+1])) {
                await change(array[o], array[o+1], array, o, o+1);
                is_changed = true;
            }
        }
        if (!is_changed) break;
        for (let o = i-1; o > j; o--) {
            if (await is_more(array[o-1], array[o])) {
                await change(array[o], array[o-1], array, o, o-1);
                is_changed = true;
            }
        }
        if (!is_changed) break;
    }
}
async function custom_sort(array) { // Напишите вашу сортировку в этой функции
    // Удалите этот alert():
    alert("Для того чтобы добавить свою сортировку:\n\n1. Используйте браузер Google Chrome (или найдите способ редактировать script.js данного сайта в используемом браузере и пропустите шаги 2-3)\n2. Нажмите F12\n3. Выберите \"Источники\" (\"Sources\")\n4. Найдите файл script.js\n5. Найдите функцию custom_sort и, следуя инструкциям в ней, напишите свою сортировку\n6. Нажмите Ctrl+S");

    // Блоки хранятся в массиве array
    // Чтобы получить значение блока без сравнения, используйте get_value_of_block():
    //    Значение блока a в формате int --> get_value of block(a)
    // Но предпочтительнее сравнивать через is_more() (описано ниже)

    // Для того, чтобы поменять блоки местами, используйте change():
    //    Поменять блоки a и b с индексами i и j соответственно местами --> await change(a, b, array, i, j)

    // Для корректных анимаций сравнивайте объекты только через is_more():
    //    a > b --> await is_more(a, b)
    //    a < b --> await is_more(b, a)
}


randomize_btn.addEventListener("click", function(){
    randomize(blocksArray);
})
pause_btn.addEventListener("click", function() {
    pause = !pause;
})


bubble_sort_btn.addEventListener("click", function(){
    bubble_sort(blocksArray);
})
shaker_sort_btn.addEventListener("click", function(){
    shaker_sort(blocksArray);
})
custom_sort_btn.addEventListener("click", function(){
    custom_sort(blocksArray);
})