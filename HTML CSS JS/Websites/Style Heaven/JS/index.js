// index.html
const hoverStyles = {
    position: 'absolute',
    right: '180px',
    top: '130px',
    width: '420px',
    height: '450px',
    zIndex: '1000',
};

// CSS styles for non-hover state
const nonHoverStyles = {
    position: '',
    width: '200px',
    height: '200px',
    zIndex: '',    
};

// Get all images inside the .right-box container
const images = document.querySelectorAll('.right-box img');

// Attach event listeners to each image
images.forEach(function (image) {
    image.addEventListener('mouseenter', function () {
        applyStyles(image, hoverStyles);
    });

    image.addEventListener('mouseleave', function () {
        applyStyles(image, nonHoverStyles);
    });
});

function applyStyles(element, styles) {
    for (let style in styles) {
        element.style[style] = styles[style];
    }
}

const half_path_cap = "../Img/Caps/";
const half_path_Shirt = "../Img/Shirt/";
const half_path_Pant = "../Img/Pant/";
const half_path_Shoes = "../Img/Shoes/";

const capNames = ["White", "Track & tones black", "Polo", "Black Puma", "Black Hilfiger", "GISTARIX", "Life Friends", "Solid Beanie", "Blue GISTARIX", "Nk tip top"];
const ShirtNames = ["DIMMY", "Blue check", "Solid Marun", "Dark Blue", "Light Blue Check", "Check","FINIVO FASHION", "Voroxy", "VeBNoR", "VeBNoR"];
const PantNames = ["Black Formal", "Green Jeans", "Ligt Blue", "Cream Formal", "Light Green Formal", "VURSO", "PETER ENGLAND", "Urbano Fashion", "Red Cherry", "MANCREW"];
const ShoesNames = ["Asian", "Abros", "Blue Sport", "Black Formal", "Sport Light", "Reebok", "Campus", "RGY", "Black Campus", "Vector X"];

const capPrices = [500, 449, 349, 359, 281, 319, 328, 329, 181, 299];
const ShirtPrices = [499, 284, 555, 449, 399, 349, 499, 439,299, 199, 249];
const PantPrices = [549, 699, 459, 799, 559, 379, 1029, 719, 404, 398];
const ShoesPrices = [929, 949, "1,099", "1,499", "1,029", "1,260", "1,045", 549, "1,024", "1,799"];

function generateCard(type) {
    let half_path = "";
    let names = [];
    let prices = [];

    switch (type) {
        case 'cap':
            half_path = half_path_cap;
            names = capNames;
            prices = capPrices;
            break;
        case 'shirt':
            half_path = half_path_Shirt;
            names = ShirtNames;
            prices = ShirtPrices;
            break;
        case 'pant':
            half_path = half_path_Pant;
            names = PantNames;
            prices = PantPrices;
            break;
        case 'shoes':
            half_path = half_path_Shoes;
            names = ShoesNames;
            prices = ShoesPrices;
            break;
        default:
            console.error("Invalid type");
            return;
    }

    const divElement = document.getElementById("product-cards");
    console.log(divElement)

    // Clear existing content
    divElement.innerHTML = '';

    // Use a for loop to generate card elements
    for (let i = 0; i < names.length; i++) {
        console.log(type)
        divElement.innerHTML += `
                    <div class="card">
                        <img class="card-img" src="${half_path}${type}${i + 1}.jpg" alt="${type} ${i + 1}">
                        <div class="description">
                            <div class="name">${names[i]} </div>
                            <div class="">Price: ₹${prices[i]}</div>
                            <div class="btns">
                                <div><button class="buttons">Buy now</button></div>
                                <div><button class="buttons">Add to cart</button></div>
                            </div>
                        </div>
                    </div>
                `;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const contactButton = document.querySelector('.contact-button');

    contactButton.addEventListener('click', function () {
        window.location.href = '../html/contact.html';
    });
});
