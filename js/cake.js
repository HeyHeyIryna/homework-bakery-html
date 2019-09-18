$('#nav-cake-about').click( () => location = 'index.html#about' );
$('#nav-cake-our-cakes').click( () => location='index.html#our-cakes' );
$('#nav-cake-reviews').click( () => location='index.html#reviews' );
$('#nav-cake-contacts').click( () => location='index.html#contacts' );

// console.log(sessionStorage.getItem('title'));
let passedTitle = sessionStorage.getItem('title');

fetch('cakes.json')
    .then(result => result.json())
    .then(cakesList => cakesList.forEach( cake => fillPage(cake)));

function fillPage(cake) {
    if(passedTitle === cake.title) {
        document.querySelector('.item').innerHTML +=
            `<div class="item-img">
                <img class="item-img-desk" src="${cake.imgBuyDesk}" alt="${cake.alt}">
                <img class="item-img-mob" src="${cake.imgBuyMob}" alt="${cake.alt}">
            </div>
            <div class="info-block">
                <div class="order-info">
                    <h2 class="item-title">${cake.title}</h2>
                    <p class="item-text">${cake.description}</p>
                    <p class="item-text">${cake.ingridients}</p>
                    <br>
                    <p class="item-text">Калорійність: ${cake.calories}</p>
                    <p class="item-text">Термін придатності: ${cake.expiration}</p>
                </div>
                <form class="buy-form">
                <div class="buy-group">
                        <label>
                            <input class="no-shugar" type="checkbox" name="no-shugar" value="no-shugar">Без цукру
                        </label>
                        <br>
                        <label>
                            <input class="no-gluten" type="checkbox" name="no-gluten" value="no-gluten">Без глютену
                        </label>
                        <br>
                        <input type="submit" class="form-btn" value="Купити">
                    </div>
                    <div class="count-group">
                        <p class="price"><span class="price-num">${cake.price}</span> грн</p>
                        <p class="weight">${cake.weight} г</p>
                        <input class="number" type="number" name="amount" value=1>
                    </div>
                </form>
            </div>`;
    } else {
        document.querySelector('.try-box').innerHTML +=
            `<div class="cake-item">
                <div class="cake-item-img">
                    <img src="${cake.imageMain}" alt="${cake.title}">
                </div>
                <div class="cake-item-content">
                    <h3 class="cake-item-heading">${cake.title}</h3>
                    <p class="cake-item-paragraph">
                        ${cake.description}
                    </p>
                    <div class="want-button">
                        <button class="want">Хочу</button>
                    </div>
                </div>
            </div>`
    }
}

$('.try-box').on('click', '.want-button', function() {
  sessionStorage.setItem('title', $( this ).siblings().first().text());
  location = 'cake.html';
});

$('.item').on('click', '.form-btn', function(submit) {
    submit.preventDefault();
    let orderedCake = {};
    orderedCake.title = document.querySelector('.item-title').textContent;
    orderedCake.number = document.querySelector('.number').value;
    orderedCake.price = document.querySelector('.price-num').textContent;
    console.log(orderedCake.price)
    if(document.querySelector('.no-shugar').checked) {
        orderedCake.shugar = 'Без цукру';
    } else {
        orderedCake.shugar = 'no';
    }
    if(document.querySelector('.no-gluten').checked) {
        orderedCake.gluten = 'Без глютену';
    } else {
        orderedCake.gluten = 'no';
    }

    if(sessionStorage.getItem('cart')) {
        let cart = [];
        cart.push(sessionStorage.getItem('cart'));
        cart.push(JSON.stringify(orderedCake));
        sessionStorage.setItem('cart', cart);
    } else {
        let newCart = [];
        newCart.push(JSON.stringify(orderedCake));
        sessionStorage.setItem('cart', newCart)
    }
});

        console.log(sessionStorage.getItem('cart'));

