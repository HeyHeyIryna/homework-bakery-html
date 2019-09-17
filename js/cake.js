$('#nav-cake-about').click( () => location = 'index.html#about' );
$('#nav-cake-our-cakes').click( () => location='index.html#our-cakes' );
$('#nav-cake-reviews').click( () => location='index.html#reviews' );
$('#nav-cake-contacts').click( () => location='index.html#contacts' );

console.log(sessionStorage.getItem('title'));
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
                    <h2>${cake.title}</h2>
                    <p class="item-text">${cake.description}</p>
                    <p class="item-text">${cake.ingridients}</p>
                    <br>
                    <p class="item-text">Калорійність: ${cake.calories}</p>
                    <p class="item-text">Термін придатності: ${cake.expiration}</p>

                </div>
                <form class="buy-form">
                <div class="buy-group">
                        <label>
                            <input type="checkbox" name="no-shugar" value="no-shugar">Без цукру
                        </label>
                        <br>
                        <label>
                            <input type="checkbox" name="no-gluten" value="no-gluten">Без глютену
                        </label>
                        <br>
                        <input type="submit" class="form-btn" value="Купити">
                    </div>
                    <div class="count-group">
                        <p class="price">${cake.price} грн</p>
                        <p class="weight">${cake.weight} г</p>
                        <input class="number" type="number" name="amount">
                    </div>
                </form>
            </div>`;
    }
}