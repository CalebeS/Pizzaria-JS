// função pra criar atalho para evitar o uso repetitivo do document.querySelector, em vez de utilizar o document na função basta passar a função "c"
// v função retorna o ALL, ou retorna um array com os itens que ele achou, e o c retorna somente o item.
const c = (el) => document.querySelector(el);
const v = (el) => document.querySelectorAll(el);

// clona a estrutura div class pizza-item, preenche os dados dos campos e exibie na tela.
// tudo que tiver em div models nao vai ser alterado, só copiado e colocado na tela, pois ele é O MODELO, como especificado na descrição da class



pizzasJson.map((pizza, index) => {
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);
    //preeccher as informações em pizzaItem
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = pizza.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        document.querySelector('.pizzaBig img').src = pizzasJson[key].img;
        document.querySelector('.pizzaInfo h1').innerHTML = pizzasJson[key].name;
        document.querySelector('.pizzaInfo--desc').innerHTML = pizzasJson[key].description;
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzasJson[key].price.toFixed(2)}`;

        document.querySelector('.pizzaWindowArea').style.opacity = 0;
        document.querySelector('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            document.querySelector('.pizzaWindowArea').style.opacity = 1;
        }, 200)
    })
    // preencher as pizzas em pizza area div.
    document.querySelector('.pizza-area').append(pizzaItem);
})      