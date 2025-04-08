
let cart = []; 

function addToCart(productName, price, imageSrc) {
    cart.push({ name: productName, price: price, image: imageSrc });
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    let cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Sepetiniz boş.</p>';
    } else {
        cart.forEach((item, index) => {
            let listItem = document.createElement('div');
            listItem.classList.add('cart-item');
            let imgElement = document.createElement('img');
            imgElement.src = item.image;
            imgElement.alt = item.name;
            imgElement.classList.add('cart-product-img');
            let productText = document.createElement('span');
            productText.textContent = `${item.name} - ${item.price}`;
            let removeButton = document.createElement('button');
            removeButton.textContent = 'Çıkar';
            removeButton.onclick = function() {
                removeFromCart(index);
            };
            listItem.appendChild(imgElement);
            listItem.appendChild(productText);
            listItem.appendChild(removeButton);
            cartItems.appendChild(listItem);
        });
    }
    document.getElementById("cartCount").innerText = cart.length;
}

function showCategory(category) {
   
    let categories = document.querySelectorAll(".product-container");
    categories.forEach(cat => {
        cat.style.display = "none";
    });
  
    let selectedCategory = document.getElementById(`${category}-content`);
    if (selectedCategory) {
        selectedCategory.style.display = "block";
    }
}

function searchProduct() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let products = document.querySelectorAll(".product");
    products.forEach(product => {
        let productName = product.querySelector("p").textContent.toLowerCase();
        product.style.display = productName.includes(input) ? "block" : "none";
    });
}

function viewCart() {
    document.getElementById("cartModal").style.display = "block";
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

function openModal(imageSrc, productName, price) {
    let modal = document.getElementById("imageModal");
    let modalImg = document.getElementById("modalImg");
    let caption = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = imageSrc;
    caption.innerHTML = `<p>${productName} - ${price}</p>`;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

function checkout() {
    if (cart.length === 0) {
        alert("Sepetiniz boş, ödeme yapamazsınız!");
        return;
    }
    
    alert("Ödeme işlemi tamamlandı! Teşekkür ederiz.");
    cart = []; 
    updateCartUI();
    closeCart();
}

function filterCategory(category) {
    const products = document.querySelectorAll('.product');
    if (category === 'all') {
        products.forEach(product => {
            product.style.display = 'block';
        });
    } else {
        products.forEach(product => {
            if (product.getAttribute('data-category') === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
}




function addToFavorites(productName) {
  if (!favorites.includes(productName)) {
    favorites.push(productName);
    alert(`${productName} favorilere eklendi!`);
    updateFavoritesDisplay();
  } else {
    alert(`${productName} zaten favorilerinizde!`);
  }
}



function updateCartDisplay() {
  const cartContainer = document.getElementById('cartItems');
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Sepetiniz boş!</p>';
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.productName} - $${item.price}`;
    cartContainer.appendChild(li);
    total += item.price;
  });

  const totalElement = document.createElement('p');
  totalElement.innerHTML = `<strong>Toplam: $${total}</strong>`;
  cartContainer.appendChild(totalElement);
}


function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}


function addToCart(productName, price) {
  cart.push({ productName, price });
  updateCartDisplay();
  alert(`${productName} sepete eklendi!`);
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(0, 0, 255, ${star.alpha})`;  
        ctx.fill();
        star.alpha += star.speed * (Math.random() < 0.5 ? -1 : 1);
        if (star.alpha < 0) star.alpha = 0;
        if (star.alpha > 1) star.alpha = 1;
    });
    requestAnimationFrame(drawStars);
}


function closePoster() {
    const poster = document.querySelector('.poster');
    poster.classList.add('fadeOut');
}


const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let stars = [];


function resize() {
    canvas.width = window.innerWidth;  
    canvas.height = window.innerHeight; 
}
window.addEventListener('resize', resize);
resize(); 


function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width, 
            y: Math.random() * canvas.height, 
            r: Math.random() * 1.5 + 0.5, 
            alpha: Math.random(), 
            speed: Math.random() * 0.002 + 0.001 
        });
    }
}


function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI); 
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`; 
        ctx.fill();

        
        star.alpha += star.speed * (Math.random() < 0.5 ? -1 : 1);
        if (star.alpha < 0) star.alpha = 0; 
        if (star.alpha > 1) star.alpha = 1; 
    });
    requestAnimationFrame(drawStars); 
}


createStars(300); 
drawStars(); 




document.addEventListener('DOMContentLoaded', function() {
  const gazeteIcon = document.getElementById('gazeteIcon');
  const gazeteModal = document.getElementById('gazeteModal');
  const gazetePages = document.getElementById('gazetePages');
  const prevPage = document.getElementById('prevPage');
  const nextPage = document.getElementById('nextPage');
  const closeGazete = document.getElementById('closeGazete');
  let currentPage = 0;


  function toggleGazete() {
    if (gazeteModal.style.display === 'flex') {
      gazeteModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    } else {
      gazeteModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      currentPage = 0;
      updatePage();
    }
  }

 
  function updatePage() {
    gazetePages.style.transform = `translateX(-${currentPage * 100}%)`;
    prevPage.style.display = currentPage === 0 ? 'none' : 'block';
    nextPage.style.display = currentPage === gazetePages.children.length - 1 ? 'none' : 'block';
  }


  gazeteIcon.addEventListener('click', toggleGazete);
  closeGazete.addEventListener('click', toggleGazete);
  
  prevPage.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      updatePage();
    }
  });

  nextPage.addEventListener('click', () => {
    if (currentPage < gazetePages.children.length - 1) {
      currentPage++;
      updatePage();
    }
  });


  document.addEventListener('keydown', (e) => {
    if (gazeteModal.style.display === 'flex') {
      if (e.key === 'Escape') toggleGazete();
      if (e.key === 'ArrowLeft' && currentPage > 0) {
        currentPage--;
        updatePage();
      }
      if (e.key === 'ArrowRight' && currentPage < gazetePages.children.length - 1) {
        currentPage++;
        updatePage();
      }
    }
  });


  updatePage();
});



function toggleCart(forceClose = false) {
    const cartModal = document.getElementById('cartModal');
    if (forceClose) {
        cartModal.style.display = 'none';
    } else {
        cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
    }
    updateCartUI(); 
}


function addToCart(name, price, image) {
    cart.push({ name, price, image });
    updateCartUI();
    
    
    const icon = document.getElementById('cartIcon');
    icon.classList.add('cart-bounce');
    setTimeout(() => icon.classList.remove('cart-bounce'), 500);
    
    console.log("Ürün eklendi:", { name, price });
}


function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        updateCartUI();
        console.log("Ürün çıkarıldı. Kalan:", cart); // Test için
    }
}


function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    
  
    cartCount.textContent = cart.length;
    
    
    cartItems.innerHTML = cart.length ? 
        cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <p>${item.name}</p>
                    <p>${item.price} TL</p>
                </div>
                <button onclick="removeFromCart(${index}); event.stopPropagation()" class="remove-btn">
                    ✕
                </button>
            </div>
        `).join('') : '<p class="empty-cart">Sepetiniz boş</p>';
}


document.addEventListener('DOMContentLoaded', () => {
   
    document.querySelector('.cart-modal .close-btn').addEventListener('click', () => toggleCart(true));
    
 
});

function updateSimplePayment() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('simpleTotal').textContent = total;
}

function completePayment() {
  if(cart.length === 0) {
    alert("Sepetiniz boş!");
    return;
  }
  alert("Ödeme tamamlandı! Toplam: " + document.getElementById('simpleTotal').textContent + " TL");
  cart = [];
  updateCartUI();
}

function completePayment() {
    const cartItemsContainer = document.getElementById("cartItems");
  
  
    if (!cartItemsContainer || cartItemsContainer.children.length === 0) {
      alert("İşlem gerçekleştirilemedi. Sepetiniz boş.");
      return;
    }
  
 
    alert("Ödeme başarıyla gerçekleşti!");
  
    
    cartItemsContainer.innerHTML = "";
  
    
    document.getElementById('cartSubtotal').textContent = '0.00 TL';
    document.getElementById('cartTax').textContent = '0.00 TL';
    document.getElementById('cartTotal').textContent = '0.00 TL';
  
   
    const modal = document.getElementById("cartModal");
    if (modal) {
      modal.style.display = "none";
    }
  }
  