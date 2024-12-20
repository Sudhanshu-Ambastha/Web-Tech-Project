import { fetchProductsByCategory } from '../main/api.js';

document.addEventListener('DOMContentLoaded', async function () {
    const mainContainer = document.querySelector('#product-container');

    // Fetch and display products
    const displayProducts = (products) => {
        mainContainer.innerHTML = '';  // Clear any existing products

        products.forEach((product) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            mainContainer.appendChild(productDiv);
        });
    };

    // Fetch products by category
    try {
        const products = await fetchProductsByCategory('jewelery');
        if (products && products.length > 0) {
            displayProducts(products);
        } else {
            mainContainer.innerHTML = '<p>No products available in this category.</p>';
        }
    } catch (error) {
        mainContainer.innerHTML = '<p>Error fetching products. Please try again later.</p>';
    }

    document.getElementById('toggleBtn').addEventListener('click', function () {
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('content');

        sidebar.classList.toggle('sidebar-active');
        content.classList.toggle('content-shift');
    });
});

window.addToCart = async (id) => {
    const products = await fetchProductsByCategory('jewelery');  
    const product = products.find(product => product.id === id);

    if (!product) {
        console.error('Product not found!');
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.title} added to cart.`);
};

