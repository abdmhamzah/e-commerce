<template>
    <div>
        <router-view></router-view>
        <ProductListAdmin></ProductListAdmin>
    </div>
</template>

<script>
import ProductListAdmin from '../components/ProductListAdmin'

export default {
    name: 'PageAdmin',
    components: {
        ProductListAdmin
    }
}
</script>