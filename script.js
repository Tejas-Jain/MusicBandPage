var ItemAddBtns = document.getElementsByClassName('buy')
console.log('working')
for(let i=0; i<ItemAddBtns.length;i++)
{
    ItemAddBtns[i].addEventListener('click', addCartItems)
}
function addCartItems(event){
    var item=event.target.parentElement.parentElement;
    var title= item.getElementsByClassName('item-title')[0].innerHTML
    var image = item.getElementsByTagName('img')[0]
        if(image!=undefined) image=image.src
    var price= item.querySelectorAll('.item-details span')[0]
        if(price!=undefined) price=price.innerHTML
    var place= item.getElementsByClassName('item-place')[0]
        if(place!=undefined) place=place.innerHTML
    var date= item.getElementsByClassName('item-date')[0]
        if(date!=undefined) date=date.innerHTML
    addItemToCart(title,image,price,date,place)
}
function updateQty(event){
    var input=event.target
    if(input.value<=0)
        input.value=1;
    updateCartTotal();
}
function addItemToCart(title,image,price,date,place){
    var existingRowsTitles=document.querySelectorAll(".cartItemTitle");
    for(let i=0;i<existingRowsTitles.length;i++)
    {
        if(existingRowsTitles[i].innerHTML == title){
            existingRowsTitles[i].parentElement.parentElement.getElementsByClassName('quantity')[0].value++
            return
        }
    }
    var cartRow= document.createElement('tr')
    if(place!=undefined){
        var cartRowContent= `
            <td>${date}</td>
            <td>${place}</td>
            <td><span class='cartItemTitle'>${title}</span></td>
            <td>
                <input class='quantity' type="number" value="1">
                <button class="button btn not-buy" role="button">REMOVE</button>
            </td>`
    }
    if(image!=undefined){
        var cartRowContent= `
            <td><img  src="${image}"  alt="" width=60rem><span class='cartItemTitle'>${title}</span></td>
            <td>${price}</td>
            <td>
                <input class='quantity' type="number" value="1">
                <button class="button btn not-buy" role="button">REMOVE</button>
            </td>`
    }
    var cartRow= document.createElement('tr')
    cartRow.innerHTML=cartRowContent
    document.querySelectorAll('.cart table')[0].appendChild(cartRow)
    cartRow.getElementsByClassName('not-buy')[0].addEventListener("click", removeCartItems)
    cartRow.getElementsByClassName('quantity')[0].addEventListener('change',updateQty)
    updateCartTotal();
}
function removeCartItems(event){
    event.target.parentElement.parentElement.remove()
    updateCartTotal()
}
function updateCartTotal() {
    var prices = document.querySelectorAll(".cart tr td:nth-child(2)");
    var quantity = document.querySelectorAll(".cart tr td:nth-child(3) input");
    var total = 0;
    for (let i = 0; i < prices.length; i++) {
        total = total + prices[i].innerHTML.replace("$", "") * quantity[i].value;
    }
    document.getElementsByClassName("total-value")[0].innerHTML = '$' + total;
}