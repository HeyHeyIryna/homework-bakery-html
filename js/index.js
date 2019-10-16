$('#nav-about').click( () => location='#about' );
$('#nav-our-cakes').click( () => location='#our-cakes' );
$('#nav-reviews').click( () => location='#reviews' );
$('#nav-contacts').click( () => location='#contacts' );

if(sessionStorage.getItem('cart') === null){
    document.querySelector('.cart-icon').style.display = 'none';
}


fetch('cakes.json')
    .then(result => result.json())
    .then(cakesList => cakesList.forEach( cake => addCake(cake)));

function addCake(cakeData) {
        document.querySelector('.cakes-box').innerHTML +=
                `<div class="cake-item">
                    <div class="cake-item-img">
                        <img class="cake-item-img-top" src="${cakeData.imageMain}">
                    </div>
                    <div class="cake-item-content">
                        <h3 class="cake-item-heading">${cakeData.title}</h3>
                        <p class="cake-item-paragraph">
                        ${cakeData.description}
                        </p>
                        <div class="want-button">
                            <button class="want">Learn more</button>
                        </div>
                    </div>
                </div>`;
}

$('.cakes-box').on('click', '.want-button', function() {
  sessionStorage.setItem('title', $( this ).siblings().first().text());
  location = 'cake.html';
});


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
        total += Number(cartItem.price * cartItem.number);
    }

    document.querySelector('.modal-body').innerHTML +=
        `<p class="total"><span class="total-text">Total</span><span class="total-summ">${total}</span></p>`
})


$('.modal-body').on('click', '.cart-delete', function() {

    let cake = $( this ).siblings('.cart-cake').text()
    let number = $( this ).siblings('.cart-number').text()
    let price = $( this ).siblings('.cart-price').text()
    let line = '{"title":"' + cake + '","number":"' + number + '","price":"' + price + '"}'

    // $( this ).parent().remove();

    let orderArrey = [];
    orderArrey = sessionStorage.getItem('cart');
    console.log(orderArrey);
    if (orderArrey.includes(line + ',')) {
        orderArrey.replace(line + ',', '');
    } else if (orderArrey.includes(line)) {
        console.log('hello')
        orderArrey.replace(line, '');
    }
    console.log(orderArrey);
})

// $('.cakes-box').on('click', '.want-button', function() {
//   sessionStorage.setItem('title', $( this ).siblings().first().text());
//   location = 'cake.html';
// });



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
