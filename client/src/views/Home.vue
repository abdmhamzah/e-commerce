<template>
    <div class="home">
        <router-view></router-view>
        <ProductListUser></ProductListUser>
    </div>
</template>

<script>
import ProductListUser from '../components/ProductListUser'

export default {
    name: 'Home',
    components: {
        ProductListUser,
    },
}
</script>
