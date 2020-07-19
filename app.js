const header = document.querySelector('.header');

document.addEventListener('scroll', ()=>{
    var scrollPosition = window.scrollY;
    if (scrollPosition > 250){
        header.style.backgroundColor = "#29323c";
    }
    else {
        header.style.backgroundColor = "transparent";
    }
})

const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', ()=>{
    hamburger.classList.toggle('active');
    header.classList.toggle('active');  
})


const lion = document.querySelector('.liontxt');
const catImg = document.querySelector('.cat');
const lionImg = document.querySelector('.lion');

const opt = {
    threshold: 1
}

const obsvr = new IntersectionObserver(function(entries) {
    entries.forEach(entry =>{
        if(!entry.isIntersecting){
        catImg.style.opacity= 1;
        lionImg.style.opacity= 0;
        } else{
        catImg.style.opacity= 0;
        lionImg.style.opacity= 1;   
        }
    })
}, opt)
obsvr.observe(lion)

/*
window.addEventListener('scroll', (event)=> {
    var scrollAmount = 100;
    const scroll = cat.getBoundingClientRect().top;
    if (scroll  < scrollAmount){
        lion.style.opacity = 1;
        cat.style.opacity = 0;
    }
    else{
        lion.style.opacity = 0;
        cat.style.opacity = 1;
    }
})
*/

const projects = document.querySelectorAll('.project');

const Options = {
    threshold: 0.6
};

const observer = new IntersectionObserver(function(entries){
    entries.forEach(entry =>{
        if (!entry.isIntersecting){
            entry.target.classList.add('picDis')
        } else{
            entry.target.classList.remove('picDis')
        }
    })
} ,Options)

projects.forEach(project =>{
    observer.observe(project);
})

// shop

if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready())
}
else{
    ready();
}

function ready(){

    const removebtn = document.getElementsByClassName('btn-danger');

    for(var i = 0; i<removebtn.length; i++){
        var button = removebtn[i];
        button.addEventListener('click', removeItem);
    }

    const qnty = document.getElementsByClassName('cart-quantity-input');

    for(var i = 0; i<qnty.length; i++){
        var button = qnty[i];
        button.addEventListener('change', checkQnty);
    }

    const primarybtn = document.getElementsByClassName('shop-item-button');

    for(var i = 0; i<primarybtn.length; i++){
        var button = primarybtn[i];
        button.addEventListener('click', addItem);
    }

    const purchasebtn = document.getElementsByClassName('btn-purchase')[0];
    purchasebtn.addEventListener('click', removeItems);
}

function removeItems(){
    const cartItems = document.getElementsByClassName('cart-items')[0];
    if(cartItems.childElementCount>0){
        alert('Thank you for your purchase')
        while(cartItems.hasChildNodes()){
            cartItems.removeChild(cartItems.firstChild);
        }
        updateTotal();  
    }
    else{
        alert('There is nothing in cart')
    }
    
}

function addItem(event){
    var button = event.target;
    var item = button.parentElement.parentElement;
    var title = item.getElementsByClassName('shop-item-title')[0].innerText; 
    var price = item.getElementsByClassName('shop-item-price')[0].innerText; 
    var imgSrc = item.getElementsByClassName('shop-item-image')[0].src; 

    addtoCart(title, price, imgSrc);
}

function addtoCart(title, price, imgSrc){
    var cartRow = document.createElement('div');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var checkTitle = cartItems.getElementsByClassName('cart-item-title');
    for(var i = 0; i<checkTitle.length;i++){
        if (title == checkTitle[i].innerText){
            alert('You already added this item to the cart');
            return;
        }
    }
    var cartRowContent = `
    <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
                    <span class="cart-item-title">${title}</span>
                </div>
                <span class="cart-price cart-column">${price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>` 
    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);
    var button = cartRow.getElementsByClassName('btn-danger')[0];
    button.addEventListener('click', removeItem);
    button = cartRow.getElementsByClassName('cart-quantity-input')[0];
    button.addEventListener('change', checkQnty);
    updateTotal();
}

function removeItem(event){
    var removeButton = event.target; 
    removeButton.parentElement.parentElement.remove();
    updateTotal();
}

function checkQnty(event){
    var qnty = event.target;
    if (qnty.value<1 || isNaN(qnty.value)){
        qnty.value = 1;
    }
    updateTotal()
}

function updateTotal(){
    const cartItems = document.getElementsByClassName('cart-items')[0];

    const cartRows = cartItems.getElementsByClassName('cart-row');
    var total = 0;
    for (var i=0; i<cartRows.length; i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var qntyElement = cartRow.getElementsByClassName('cart-quantity-input')[0];

        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var qnty = qntyElement.value;
        total += price * qnty;
    }
    total = Math.round(total * 100) / 100;
    const totalString = document.getElementsByClassName('cart-total-price')[0];
    totalString.innerText = '$'+ total;
}


// End of shop