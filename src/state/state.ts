import { defineStore } from 'pinia'



export const useProductsStore = defineStore('products', {
    state: () => ({
        userCart: [],
        name: "ray"
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