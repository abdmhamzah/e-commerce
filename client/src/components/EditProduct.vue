<template>
    <div>
        <div class="d-flex justify-content-around" style="margin-top: 3%">
            <h1>Edit Product</h1>
        </div>
        <br>
        <div class="d-flex justify-content-around">
            <form @submit.prevent="editProduct" style="width: 50%;">
                <div class="form-row">
                    <div class="col mb-3">
                        <input v-model="edit_name" type="text" class="form-control" placeholder="Enter Product Name" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col mb-3">
                        <input v-model="edit_url" type="url" class="form-control" placeholder="Enter Image URL" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col mb-3">
                        <input v-model="edit_description" type="text" class="form-control" placeholder="Enter Product Description" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col mb-3">
                        <input v-model="edit_price" type="number" min="0" class="form-control" placeholder="Enter Prices">
                    </div>
                    <div class="col mb-3">
                        <input v-model="edit_stock" type="number" min="0" class="form-control" placeholder="Enter Stocks">
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <div class="form-row">
                        <div class="col mb-3">
                            <button type="submit" class="btn btn-primary" style="margin-right: 10px;">Submit</button>
                            <button @click.prevent="cancelEdit" class="btn btn-outline-danger my-2 my-sm-0">Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    name: 'EditProduct',
    data(){
        return {
            edit_name: null,
            edit_url: null,
            edit_description: null,
            edit_price: null,
            edit_stock: null,
        }
    },
    created(){
        this.edit_name = this.toEditData.name
        this.edit_url = this.toEditData.image_url
        this.edit_description = this.toEditData.description
        this.edit_price = this.toEditData.price
        this.edit_stock = this.toEditData.stock
    },
    computed: {
        toEditData(){
            return this.$store.state.toEdit
        }
    },
    methods: {
        editProduct(){
            const editedData = {
                id: this.toEditData.id,
                name: this.edit_name,
                image_url: this.edit_url,
                description: this.edit_description,
                price: this.edit_price,
                stock: this.edit_stock
            }            
            this.$store.dispatch('editProduct', editedData)
        },
        cancelEdit(){
            this.$router.push({ name: 'PageAdmin' })
        }
    }
}
</script>