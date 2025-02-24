<template>
    <div class="container py-5">
        <LoadingOverlay :loading="loading" />
        
        <div class="text-end mb-5">
        <!-- Back Button -->
            <router-link :to="{name: 'products'}" class="btn btn-primary">
                Back to Products
            </router-link>
        </div>
        <div v-if="product" class="row">
            <!-- Product Image -->
            <div class="col-md-6 mb-4">
                <img :src="product.image" :alt="product.name" class="img-fluid rounded" style="max-height: 500px; width: 100%; object-fit: contain;">
            </div>

            <!-- Product Details -->
            <div class="col-md-6">
                <h2 class="mb-4">{{ product.name }}</h2>
                
                <div class="mb-2">
                    <h4 class="">KSh {{ formatPrice(product.price) }}</h4>
                </div>

                <div class="mb-4">
                    <p>Product rating: {{ product.rating }}/5</p>
                </div>

                <div class="mb-4">
                    <!-- <h5>Stock Status</h5> -->
                    <p :class="product.quantity_in_stock > 0 ? 'text-success' : 'text-danger'">
                        {{ product.quantity_in_stock > 0 ? `In stock (${product.quantity_in_stock} available)` : 'Out of stock' }}
                    </p>
                </div>

                <div class="mb-4">
                    <h5>Description</h5>
                    <p>{{ product.description }}</p>
                </div>

                <div class="mb-4">
                    <button @click="addProductToCart(product.id)" class="btn-secondary">Add to cart</button>
                </div>


            </div>
        </div>
     
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import LoadingOverlay from '../components/LoadingOverlay.vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useProductsStore } from '@/state/state';


const productsStore = useProductsStore(); /**use the store */

const route = useRoute(); 
const toast = useToast(); /**toast instance to show warnings, errors, etc */
const product = ref(null); /**holds  currently shown product's dets */
const loading = ref(false); /**state to show loading overlay */

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

onMounted(async () => {
    await fetchProduct();
});

const fetchProduct = async () => {
    const productId = route.params.id;
    try {
        loading.value = true;
        const response = await axiosInstance.get(`/products/${productId}/`);
        product.value = response.data.data;
    } catch (err) {
        toast.error('Failed to load product details', {
            position: 'top-right',
            duration: 3000,
            dismissible: true,
            queue: true
        });
        console.error(err);
    } finally {
        loading.value = false;
    }
};

const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const addProductToCart = (productId: number) => {
    productsStore.addProductToCart(productId);
    // console.log("name ", productsStore.name)
    // console.log("here ", productsStore.userCart)
}
</script>

<style scoped>
.container {
    min-height: 80vh;
}
</style>