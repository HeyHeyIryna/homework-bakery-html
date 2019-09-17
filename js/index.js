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


