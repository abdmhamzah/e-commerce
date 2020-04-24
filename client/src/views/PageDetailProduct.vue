<template>
    <div>

        <div class="d-flex justify-content-center">
            <div class="d-flex justify-content-center"  style="width: 90%;">
                <b-container fluid style="margin-top: 2%;">
                    <b-row>
                        <b-col class="d-flex flex-row-reverse">
                            <b-img thumbnail fluid :src="product.image_url" style="width: 300px; height: 300px;" alt="Image 1"></b-img>
                        </b-col>
                        <b-col class="d-flex align-items-center">
                            <div>
                                <h3>{{ product.name }}</h3>
                                <h4>IDR {{ product.price }}</h4>
                                <p>{{ product.description }}</p>
                                <p>Stock: {{ product.stock }}</p>
                                <button @click.prevent="addToCart(product.id)" type="button" class="btn btn-outline-secondary my-2 my-sm-0" style="margin-right: 10px;">
                                    <i class="fa fa-cart-plus"></i> Add to My Cart
                                </button>
                            </div>
                        </b-col>
                    </b-row>
                <div style="margin-top: 2%;" class="d-flex justify-content-center">
                    <h5 style="color: #6c757d;">Others Also Bought</h5>
                </div>
                </b-container>
            </div>
        </div>
        <ProductCard></ProductCard>
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard'

export default {
    name: 'PageDetailProduct',
    components: {
        ProductCard
    },
    computed: {
        product(){
            return this.$store.state.toDetail
        }
    },
    methods: {
        addToCart(id){
            this.$store.dispatch('addToCart', id)
        }
    }
}
</script>