const SHEET_ID = "1FdPXn_wCiIk14DNTJGmFHFMsbmETOXvyTzXhCS1aN5U"
const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
let carde = [];
let length;
let current_index = 0;
let arrow = true;
function update_slider()
{
    let counter = (arrow == true) ? 1 : -1;
    const deck = document.getElementById("deck-container");
    l_value = current_index;
    current_index += counter;
    current_index %= length;
    current_index = current_index == -1 ? length - 1 : current_index;
    deck.style.transform = `translateX(${((deck.parentElement.offsetWidth/2)-(carde[current_index].offsetWidth / 2) - (current_index*carde[current_index]?.offsetWidth))}px)`;
    carde[l_value].id = "";
    carde[current_index].id ="active";
    deck.addEventListener('transitionend', () => {
    /*console.log(deck.getBoundingClientRect().left);*/
    })
}
fetch(url)
    .then(res => res.text())
    .then(data => {
        const json = JSON.parse(data.substring(47, data.length - 2));
        const rows = json.table.rows;
        let main_info = [];
        rows.forEach(row =>
        {
            const sku = row.c[0]?.v || "Неизвестно";
            const name = row.c[1]?.v || "Неизвестно";
            const category = row.c[2]?.v || "Неизвестно";
            const width = row.c[3]?.v || "Неизвестно";
            const height = row.c[4]?.v || "Неизвестно";
            const opening = row.c[5]?.v || "Неизвестно";
            const finish_color = row.c[6]?.v || "Неизвестно";
            const in_stock = row.c[7]?.v ||  "Неизвестно";
            const image = row.c[8]?.v || "https://i.ibb.co.com/p66NYqP3/Screenshot-2026-05-31-at-21-09-11-removebg-preview.png";
            main_info.push([sku,name,category, width, height, opening, finish_color, in_stock, image]);
        });
        return main_info;
       /*const json = JSON.parse(da)*/
    })
    .then(data => {
        data.forEach((element, index) => {
        const deck = document.getElementById("deck-container")
        const card = document.createElement('div');
        const name = document.createElement('h1');
        const img1 = document.createElement('img');
        card.className = "door-card"; 
        if(index == 0)
        {card.id = "active"}
        name.textContent = element[1];
        name.className = "text_s1";
        img1.src = element[8];
        img1.className = "img_class";
        deck.appendChild(card);
        card.appendChild(name);
        card.appendChild(img1);
        carde.push(card);
        const sku_category = document.createElement('p');
        sku_category.className = "info_text";
        sku_category.textContent = `${element[0]} | ${element[1]}`;
        card.appendChild(sku_category);
        const w_h_o = document.createElement('p');
        w_h_o.className = "info_who";
        w_h_o.textContent = `Ширина(мм):${element[3]} | Высота(мм):${element[4]} | ${element[5]}`;
        card.appendChild(w_h_o);
        const stock_quantity = document.createElement('p');
        stock_quantity.textContent = ( `${element[7]} | ${element[7] > 0 ? "В наличии" : "Отсутствует"}`);
        stock_quantity.className = "stock";
        if(element[7] > 0){
             stock_quantity.style.color = "rgb(111, 255, 111)"; 
        }
        else
        {
           stock_quantity.style.color = "rgb(255, 110, 110)"; 
        }
        card.appendChild(stock_quantity);
        length = index + 1;
        })
        update_slider();
    })
    .then(data =>{
    const button1 =  document.querySelector('.arrow_right');
    const button2 = document.querySelector('.arrow_left');
    console.log(button1, carde);
    if(button1 != undefined && carde[current_index] != undefined)
    {
        button1.addEventListener('click', () => {arrow = true;update_slider()});   
    }
    if(button2 != undefined && carde[current_index] != undefined)
    {
        button2.addEventListener('click', () => {arrow = false;update_slider()});   
    }})
    console.log("HIII");
 /*      card.style.zIndex = 100 - index;
        card.style.transform = `translateX(${index}%)translateY(${index}%)`;*/