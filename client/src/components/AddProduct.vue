<template>
    <div>
        <div class="d-flex justify-content-around" style="margin-top: 2%">
            <h1>Add Product</h1>
        </div>
        <br>
        <div class="d-flex justify-content-around">
            <form @submit.prevent="addProduct" style="width: 50%;">
                <div class="form-row">
                    <div class="col mb-3">
                        <input v-model="add_name" type="text" class="form-control" placeholder="Enter Product Name" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col mb-3">
                        <input v-model="add_url" type="url" class="form-control" placeholder="Enter Image URL" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col mb-3">
                        <input v-model="add_description" type="text" class="form-control" placeholder="Enter Product Description" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col mb-3">
                        <input v-model="add_price" type="number" min="0" class="form-control" placeholder="Enter Prices">
                    </div>
                    <div class="col mb-3">
                        <input v-model="add_stock" type="number" min="0" class="form-control" placeholder="Enter Stocks">
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <div class="form-row">
                        <div class="col mb-3">
                            <button type="submit" class="btn btn-primary" style="margin-right: 10px;">Submit</button>
                            <button @click.prevent="cancelAdd" class="btn btn-outline-danger my-2 my-sm-0">Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    name: "AddProduct",
    data(){
        return {
            add_name: null, 
            add_url: null,
            add_description: null,
            add_price: null, 
            add_stock: null,
        }
    },
    methods: {
        addProduct(){
            let newProduct = {
                    name: this.add_name,
                    image_url: this.add_url,
                    description: this.add_description,
                    price: this.add_price,
                    stock: this.add_stock
            }
            this.$store.dispatch('addProduct', newProduct)
            this.add_name = null
            this.add_url = null
            this.add_description = null
            this.add_price = null
            this.add_stock = null
        },
        cancelAdd(){
            this.add_name = null
            this.add_url = null
            this.add_price = null
            this.add_stock = null
            this.$router.push({ name: 'PageAdmin' })
        }
    }
}
</script>