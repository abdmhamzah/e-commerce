<template>
    <div>
        <div class="d-flex justify-content-center" style="margin: 2% 0%;">
            <div class="d-flex justify-content-center"  style="width: 90%;">
                <div v-for="product in list_product" :key="product.id" style="margin: 3px" class="card-deck">
                    <a href="#" style="text-decoration: none; color: #6c757d;">
                        <div class="card">
                            <div class="d-flex justify-content-md-center" style="margin: 20px;">
                                <img class="card-img-top" :src="product.image_url" style="width: 10rem; height: 10rem;" alt="Card image cap">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">{{ product.name }}</h5>
                                <p class="card-text">IDR {{ product.price }}</p>
                            </div>
                            <div class="card-footer">
                                <button @click.prevent="" type="button" class="btn btn-outline-secondary my-2 my-sm-0" style="margin-right: 10px;">
                                    <i class="fa fa-cart-plus"></i>
                                </button>
                                <button @click.prevent="" type="button" class="btn btn-outline-secondary my-2 my-sm-0" style="margin-right: 10px;">
                                    <i class="fa fa-eye"></i>
                                </button>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    computed: {
        list_product(){
            return this.$store.state.list_product
        }
    },
    created(){
        this.getProducts()
    },
    methods: {
        getProducts(){
            this.$store.dispatch('getProducts')
        },
    }
    
}
</script>