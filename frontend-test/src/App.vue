<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-dark bg-info">
      <div class="container">
        <a class="navbar-brand" href="#">Alan Resto</a>
      </div>
    </nav>
    <nav class="navbar navbar-expand-sm bg-light shadow">
      <div class="container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" :class="{ active: $route.name === 'home' }" :to="{ name: 'home' }">Food
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" :class="{ active: $route.name === 'transactions' }"
                :to="{ name: 'transactions' }">Transaksi</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
  <footer>
    <p class="text-center mb-2 mt-4">Alan Resto &copy;2023 | Developed by Alan creative</p>
  </footer>
</template>

<style scoped>
.navbar-nav .nav-item .nav-link.active {
  color: #17a2b8;
  border-bottom: 2px solid #007bff;
}
</style>

<script>
export default {
  setup() {
    const route = useRoute()

    function isRouteActive(name) {
      return route.name === name
    }

    return {
      isRouteActive
    }
  },
}
</script>

