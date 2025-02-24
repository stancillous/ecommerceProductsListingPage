<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <header class="p-5 border">
      <div class="d-flex align-items-center justify-content-between">
        <h6 class="fw-bold">Logo</h6>
        <div class="menu-links">
          <ul>
            <li class="d-flex gap-3">
              <router-link class="nav-link" :to="{name: 'home'}" active-class="active">Home</router-link>
              <router-link class="nav-link" :to="{name: 'products'}" active-class="active">Products</router-link>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <RouterView></RouterView>

    <footer class="p-5 border-top">
      Footer section
    </footer>
  </div>

</template>

<style scoped lang="scss">
ul li {
    list-style: none;
}

.nav-link {
    font-weight: 500;
    padding: 0.5rem 0;

    &.active {
        color: #000;
        font-weight: 600;
        text-decoration: underline;
        text-decoration-thickness: 3px;
    }
}
</style>
