window.addEventListener('load', () => {
    let categoriesFetch = function(category='') {
        let productsContainer = document.querySelector('.products-container')
        productsContainer.innerHTML = ''
        fetch('http://localhost:3000/api/products/categories/' + category)
        .then(function(response){
            return response.json();
        })
        .then(function(dataDecode){
            dataDecode.data.forEach(product => {
                let discount 
                if(product.discount > 0) {
                    discount = `<span>${product.discount}% OFF</span>` 
                }
                let price = (product.price - product.price * product.discount / 100)
                productsContainer.innerHTML += `
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
    }

    categoriesFetch()

    let categoriesButtons = document.querySelectorAll('.product-detail-title')

    categoriesButtons.forEach(categoryButton => {
        categoryButton.addEventListener('click', function(event){
            event.preventDefault()
            let productsTitle = document.querySelector('.products-title')
            let catId = categoryButton.getAttribute('id') 
            if(catId == 'allProducts') {
                productsTitle.innerHTML = `Todos los productos`
                categoriesFetch()
            } else {
                productsTitle.innerHTML = catId
                categoriesFetch(catId)
            }
            
        })
    });
    
})