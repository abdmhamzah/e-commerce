<template>
    <div>
        <ProductCarosel></ProductCarosel>
        <ProductCard></ProductCard>
    </div>
</template>

<script>
import ProductCarosel from '../components/ProductCarosel'
import ProductCard from '../components/ProductCard'

export default {
    name: 'ProductUserList',
    components: {
        ProductCarosel,
        ProductCard,
    }
}
</script>
