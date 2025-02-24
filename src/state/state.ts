import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';


export const useProductsStore = defineStore('products', {
    state: () => ({
        userCart: [],
        name: "ray",
        toast: useToast()
    }),
    
    actions: {
        addProductToCart(productId: number) {
            // check if product is already in cart
            const existingProduct = this.userCart.find(item => item.productId === productId);
            if (existingProduct) {
                // alert("found")
                // If product exists, increment quantity
                existingProduct.quantity += 1;
            } else {
                // If product doesn't exist, add it with quantity 1
                this.userCart.unshift({
                    productId: productId,
                    quantity: 1
                });
                
            }
            // Store updated cart in localStorage
            localStorage.setItem('userCart', JSON.stringify(this.userCart));
            this.toast.success('Product added to cart', {
                position: 'top-right',
                duration: 3000,
                dismissible: true,
                queue: true
            });
        },
        
        clearCart() {
            this.userCart = [];
        }
    },
    
    getters: {
        cartTotal: (state) => {
            return state.userCart.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);
        },
       
    }
})