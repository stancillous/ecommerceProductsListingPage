<template>
    <div class="container py-5">
        <LoadingOverlay :loading="loading"/>
        <h5 class="fw-bold display-6 mb-4">Products</h5>

        <!-- search input -->
        <div class="search-input d-flex justify-content-end gap-3 mb-5">
            <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Search for products"
                @input="searchProducts"
            >
        </div>

        <!-- Products Grid -->
        <div class="row g-4">
            <div v-if="!filteredProducts.length" class="text-center">
                <h6 class="fw-bold mb-4">No products found</h6>
            </div>
            <div v-else v-for="product in filteredProducts" :key="product.name" class="col-md-4 col-lg-3">
                <router-link :to="{name: 'product-details', params: {id: product.id}}" class="text-decoration-none">
                    <div class="card h-100">
                        <img :src="product.image" class="card-img-top" :alt="product.name" style="height: 200px; object-fit: contain;">
                        <div class="card-body">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="card-text mb-0">KSh {{ formatPrice(product.price) }}</p>
                                <div class="d-flex align-items-center">
                                    <span class="me-2">Rating: {{ product.rating }}/5</span>
                                </div>
                            </div>
                            <p class="card-text mt-2">
                                <small class="text-muted">In stock: {{ product.quantity_in_stock }}</small>
                            </p>
                        </div>
                    </div>

                </router-link>
            </div>
        </div>

        <!-- Pagination Controls -->
        <div class="d-flex justify-content-center mt-4 gap-2">
            <button 
                class="btn btn-primary" 
                @click="changePage(currentPage - 1)"
                :disabled="!paginationData.has_previous_page">
                Previous page
            </button>
            <button 
                class="btn btn-primary" 
                @click="changePage(currentPage + 1)"
                :disabled="!paginationData.has_next_page">
                Next page
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import LoadingOverlay from '../components/LoadingOverlay.vue'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useProductsStore } from '@/state/state';

const productsStore = useProductsStore();


const toast = useToast();
const products = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const searchQuery = ref('');
const paginationData = ref({
    has_next_page: false,
    next_page: null,
    has_previous_page: false,
    previous_page: null
});

// Computed property for filtered products
const filteredProducts = computed(() => {
    if (!searchQuery.value) return products.value;
    
    const query = searchQuery.value.toLowerCase();
    return products.value.filter(product => 
        product.name.toLowerCase().includes(query)
    );
});

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

onMounted(async () => {
    await fetchProducts(1);
});


// func to get products list
const fetchProducts = async (page: number) => {
    try {
        loading.value = true;
        const response = await axiosInstance.get(`/products/?page=${page}`);
        products.value = response.data.data.products;
        paginationData.value = {
            has_next_page: response.data.data.has_next_page,
            next_page: response.data.data.next_page,
            has_previous_page: response.data.data.has_previous_page,
            previous_page: response.data.data.previous_page
        };
        currentPage.value = page;
    } catch (error) {
        toast.error("Failed to fetch products", { 
            position: 'top-right', 
            duration: 3000, 
            dismissible: true, 
            queue: true
        });
        console.error(error);
    } finally {
        loading.value = false;
    }
}

// func to get products of a page
const changePage = (page: number) => {
    fetchProducts(page);
}

// func to format prices (eg add commas)
const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

</script>

<style scoped>
.card {
    transition: transform 0.2s;
}

.search-input input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 300px;
}

.search-input input:focus {
    outline: none;
    border-color: #0d6efd;
    box-shadow: 0 0 0 0.2rem rgba(13,110,253,.25);
}
</style>