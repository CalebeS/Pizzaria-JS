// função pra criar atalho para evitar o uso repetitivo do document.querySelector, em vez de utilizar o document na função basta passar a função "c"
// v função retorna o ALL, ou retorna um array com os itens que ele achou, e o c retorna somente o item.
const c = (el) => document.querySelector(el);
const v = (el) => document.querySelectorAll(el);

let modalQuantidade = 1;
let modalKey = 0;
let carrinho = [];

//ESTRUTURA
// clona a estrutura div class pizza-item, preenche os dados dos campos e exibie na tela.
// tudo que tiver em div models nao vai ser alterado, só copiado e colocado na tela, pois ele é O MODELO, como especificado na descrição da class


//lISTAR E PREENCHER AS PIZZAS
pizzasJson.map((pizza, index) => {
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = pizza.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description;
    //evento de click pra abrir o modal das pizzas.
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQuantidade = 1;
        modalKey = key;
        document.querySelector('.pizzaBig img').src = pizzasJson[key].img;
        document.querySelector('.pizzaInfo h1').innerHTML = pizzasJson[key].name;
        document.querySelector('.pizzaInfo--desc').innerHTML = pizzasJson[key].description;
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzasJson[key].price.toFixed(2)}`;
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {  
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzasJson[key].sizes[sizeIndex];
        });
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQuantidade;
        document.querySelector('.pizzaWindowArea').style.opacity = 0;
        document.querySelector('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            document.querySelector('.pizzaWindowArea').style.opacity = 1;
        }, 200)
    })
    // preencher as pizzas em pizza area div.
    document.querySelector('.pizza-area').append(pizzaItem);
}); 

//eventos do modal

function closeModal() {
    document.querySelector('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    }, 500)
}

document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=> {
    item.addEventListener('click', closeModal);
});

document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQuantidade > 1){
        modalQuantidade--;
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQuantidade;
    }
})

document.querySelector('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQuantidade++;
    document.querySelector('.pizzaInfo--qt').innerHTML = modalQuantidade;
})

document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {  
    size.addEventListener('click', (e)=> {
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
});

document.querySelector('.pizzaInfo--addButton').addEventListener('click', ()=> {
    //qual a pizza?
    //console.log("Pizza: " + modalKey);
    //qual o tamanho?
    let sizePizza = parseInt(document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key'));
    //console.log("Tamanho: " + sizePizza);
    let identificador = pizzasJson[modalKey].id+'-'+sizePizza;
    //qual a quantidade?
    //console.log("quantidade: " + modalQuantidade);
    let key = carrinho.findIndex((item)=> item.identificador == identificador);
    //depois só adicionar ao carrinho
    if(key > -1) {
        carrinho[key].quantidade += modalQuantidade;
    } else {
        carrinho.push({
        identificador,
        id:pizzasJson[modalKey].id,
        sizePizza,
        quantidade:modalQuantidade
     });
    };
   
    closeModal();
 //botão que adiciona tudo ao carrinho, que é um array vazio la em cima.
 //qual a pizza? qual o tamanho? quantas pizzas? pega os dados e preenche no modal
})