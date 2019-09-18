$('#nav-about').click( () => location='#about' );
$('#nav-our-cakes').click( () => location='#our-cakes' );
$('#nav-reviews').click( () => location='#reviews' );
$('#nav-contacts').click( () => location='#contacts' );



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
                            <button class="want">Хочу</button>
                        </div>
                    </div>
                </div>`;
}

$('.cakes-box').on('click', '.want-button', function() {
  sessionStorage.setItem('title', $( this ).siblings().first().text());
  location = 'cake.html';
});




$('.modal-btn').click( function() {
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
                °<span class="cart-cake">${cartItem.title}</span>
                <span class="cart-number">${cartItem.number}</span>
                <span class="cart-price">${cartItem.price}</span>
            </p>`
        total += Number(cartItem.price);
    }

    document.querySelector('.modal-body').innerHTML +=
        `<p class="total"><span class="total-text">Всього до оплати </span><span class="total-summ">${total}</span></p>`
    console.log(total);

    // document.querySelector('.modal-body').textContent = sessionStorage.getItem('cart');



})


// document.querySelector('."btn btn-primary').click( function() {
//     let x = JSON.parse(sessionStorage.getItem('cart'))
//     console.log('parsed json ' + x)
// })



// document.querySelector('.modal-body').textContent = sessionStorage.getItem('cart');





// let t = sessionStorage.getItem('new');

// let arr = t.split('"},');

// arr[0] = arr[0] + '"}';
// for(let i = 0; i < arr.length; i++)
// {
//     let b = JSON.parse(arr[i])
// }






// let q = {};

// q.w = 'fff';
// q.m = 'aaa';

// console.log(JSON.stringify(q))

// let z = {};

// z.w = 'ggg';
// z.m = 'jjj';

// let o = [];
// o.push(JSON.stringify(q));
// o.push(JSON.stringify(z));
// console.log(o);

// sessionStorage.setItem('new', o);

// let t = sessionStorage.getItem('new');

// // console.log(t);
// let arr = t.split('"},');
// // console.log(arr);
// arr[0] = arr[0] + '"}';
// console.log(arr[0]);

// console.log(JSON.parse(arr[0]))

// console.log(arr.length)

// for(let i = 0; i < arr.length; i++)
// {
//     let b = JSON.parse(arr[i])
//     console.log(b.w)
// }
