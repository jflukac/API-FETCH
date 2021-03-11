window.addEventListener('load', function() {
    fetch('http://localhost:3000/api/products/offers')
    .then(function(response){
        return response.json();
    })
    .then(function(offersDecode){
        let offersProducts = document.querySelector('#offers-products')
        let i = 0
        offersDecode.data.forEach(product => {
            let discount 
            if(product.discount > 0) {
                discount = `<span>${product.discount}% OFF</span>` 
            }
            let price = (product.price - product.price * product.discount / 100)
            offersProducts.innerHTML += `
            <div class="col-12 col-sm-6 col-lg-3">
                <section class="product-box">
                    <a href="/products/detail/${product.id}">
                        <figure class="product-box_image">
                            <img src="/images/products/${product.image}" alt="${product.name}">
                        </figure>
                        <article class="product-box_data">
                            <h2>$ ${price}</h2>
                            ${discount}
                            <p> ${product.name}</p>
                            <i class="fas fa-truck"></i>
                        </article>
                    </a>
                </section>
            </div>
            `            
        });
    })
    .catch(function(error){
        console.log(error);
    })

    


    fetch('http://localhost:3000/api/products/latest')
    .then(function(response){
        return response.json();
    })
    .then(function(latestDecode){
       
        let latestProducts = document.querySelector('#latest-products')
        let i = 0
        latestDecode.data.forEach(product => {
            let discount 
            if(product.discount > 0) {
                discount = `<span>${product.discount}% OFF</span>` 
            }
            let price = (product.price - product.price * product.discount / 100)
            if(i == 0) {
                latestProducts.innerHTML = `
                <div class="col-12 col-sm-6 col-lg-3">
                    <section class="product-box">
                        <a href="/products/detail/${product.id}">
                            <figure class="product-box_image">
                                <img src="/images/products/${product.image}" alt="${product.name}">
                            </figure>
                            <article class="product-box_data">
                                <h2>$ ${price}</h2>
                                ${discount}
                                <p> ${product.name}</p>
                                <i class="fas fa-truck"></i>
                            </article>
                        </a>
                    </section>
                </div>
                `
                i++
            } else {
                latestProducts.innerHTML += `
                <div class="col-12 col-sm-6 col-lg-3">
                    <section class="product-box">
                        <a href="/products/detail/${product.id}">
                            <figure class="product-box_image">
                                <img src="/images/products/${product.image}" alt="${product.name}">
                            </figure>
                            <article class="product-box_data">
                                <h2>$ ${price}</h2>
                                ${discount}
                                <p> ${product.name}</p>
                                <i class="fas fa-truck"></i>
                            </article>
                        </a>
                    </section>
                </div>
                `
            }
            
        });
    })
    .catch(function(error){
        console.log(error);
    })
})