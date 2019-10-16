$('#nav-cake-about').click( () => location = 'index.html#about' );
$('#nav-cake-our-cakes').click( () => location='index.html#our-cakes' );
$('#nav-cake-reviews').click( () => location='index.html#reviews' );
$('#nav-cake-contacts').click( () => location='index.html#contacts' );

// console.log(sessionStorage.getItem('title'));
let passedTitle = sessionStorage.getItem('title');

if(sessionStorage.getItem('cart') === null){
    document.querySelector('.cart-icon').style.display = 'none';
}

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
                    <p class="item-text">Calories: ${cake.calories}</p>
                    <p class="item-text">Expiration: ${cake.expiration}</p>
                </div>
                <form class="buy-form">
                <div class="buy-group">
                        <label>
                            <input class="no-shugar" type="checkbox" name="no-shugar" value="no-shugar">Sugar free
                        </label>
                        <br>
                        <label>
                            <input class="no-gluten" type="checkbox" name="no-gluten" value="no-gluten">Gluten free
                        </label>
                        <br>
                        <input type="submit" class="form-btn" data-toggle="modal" data-target="#alert" value="Buy Now">
                    </div>
                    <div class="count-group">
                        <p class="price"><span class="price-num">${cake.price}</span> usd</p>
                        <p class="weight">${cake.weight}</p>
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
                        <button class="want">Learn more</button>
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

    // if(document.querySelector('.no-shugar').checked) {
    //     orderedCake.shugar = 'Без цукру';
    // } else {
    //     orderedCake.shugar = 'no';
    // }
    // if(document.querySelector('.no-gluten').checked) {
    //     orderedCake.gluten = 'Без глютену';
    // } else {
    //     orderedCake.gluten = 'no';
    // }

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
    document.querySelector('.cart-icon').style.display = 'block';

});

        console.log(sessionStorage.getItem('cart'));

$('#cart-btn').click( function() {
    let orderArrey = [];
    orderArrey = sessionStorage.getItem('cart');
    let cartList = orderArrey.split('"},');
    for(let i = 0; i < cartList.length - 1; i++){
        cartList[i] = cartList[i] + '"}';
    }
    let total = 0;
    for(let i = 0; i < cartList.length; i++){
        let cartItem = JSON.parse(cartList[i]);
        console.log(cartItem);
        document.querySelector('.modal-body').innerHTML +=
            `<p class="modal-cake-line">
                <span class="checkmark">✓</span>
                <span class="cart-cake">${cartItem.title}</span>
                <span class="cart-number">${cartItem.number}</span>
                <span class="cart-price">${cartItem.price}</span>
                <span class="cart-delete">X</span>
            </p>`
        total += Number(cartItem.price);
    }

    document.querySelector('.modal-body').innerHTML +=
        `<p class="total"><span class="total-text">Total </span><span class="total-summ">${total}</span></p>`
})

$('.close').click( function() {
    document.querySelector('.modal-body').innerHTML = ``;
})

$('#exampleModal').on('hidden.bs.modal', function() {
  document.querySelector('.modal-body').innerHTML = ``;
})

$('#buy').click( function() {
    document.querySelector('.modal-body').innerHTML = ``;
})

$('#finalOrder').click( function() {
    document.querySelector('.modal-body').innerHTML = ``;
    document.querySelector('.cart-icon').style.display = 'none';
    sessionStorage.clear();
})
