<template>
    <div>
        <div class="d-flex justify-content-around" style="margin-top: 2%">
            <h1>List Product</h1>
        </div>
        <br>
        <div v-if="this.$route.name == 'PageAdmin'" class="d-flex justify-content-around">
            <button @click.prevent="toAddProduct" type="button" class="btn btn-outline-primary my-2 my-sm-0" style="margin-right: 10px;">
                <i class="fa fa-plus-circle"></i>  New Product
            </button>
        </div>
        <br>
        <div class="d-flex justify-content-around">
            <table class="table" style="width: 80%;">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Image URL</th>
                        <th scope="col">Prices</th>
                        <th scope="col">Stocks</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in list_product" :key="product.id">
                        <td> {{ product.id }} </td>
                        <td> {{ product.name }} </td>
                        <td> <a v-bind:href="product.image_url">{{ product.name }} Image</a> </td>
                        <td> Rp. {{ product.price }} </td>
                        <td> {{ product.stock }} pcs </td>
                        <td>
                            <button @click.prevent="toUpdateProduct(product)" class="btn btn-outline-secondary my-2 my-sm-0" style="margin-right: 10px;">
                                <i class="fa fa-pencil"></i>
                            </button> 
                            <button @click.prevent="deleteProduct(product.id)" class="btn btn-outline-danger my-2 my-sm-0">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductListAdmin',
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
        toAddProduct(){
            this.$router.push({ name: 'AddProduct' })
        },
        toUpdateProduct(product){
            this.$store.commit('TO_EDIT_PRODUCT', product)
            this.$router.push({ name: 'EditProduct' })
        },
        deleteProduct(id){
            this.$store.dispatch('deleteProduct', id)
        }
    }
}
</script>