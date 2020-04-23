<template>
    <div>
        <nav aria-label="Page navigation example" style="margin-top: 3%;">
        <ul class="pagination justify-content-center">
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
        </ul>
        </nav>
        <div class="d-flex justify-content-around" style="margin-top: 2%">
            <h1>My Cart</h1>
        </div>
        <br>
        <div v-if="this.$route.name == 'PageCart'" class="d-flex justify-content-around">
            <button @click.prevent="toHome" type="button" class="btn btn-outline-primary my-2 my-sm-0" style="margin-right: 10px;">
                <i class="fa fa-plus-circle"></i>  Get Yours
            </button>
        </div>
        <br>
        <div class="d-flex justify-content-around">
            <table class="table" style="width: 80%;">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Product</th>
                        <th scope="col">Price @</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Total</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody >
                    <tr >
                        <td > <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-family-select-2020?wid=882&amp;hei=1058&amp;fmt=jpeg&amp;qlt=80&amp;op_usm=0.5,0.5&amp;.v=1586794486444" style="width: 5rem; height: 5rem;"> </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td >
                            <button @click.prevent="" class="btn btn-outline-secondary my-2 my-sm-0" style="margin-right: 10px;">
                                <i class="fa fa-pencil"></i>
                            </button> 
                            <button @click.prevent="" class="btn btn-outline-danger my-2 my-sm-0">
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
    name: 'PageCart',
    methods: {
        toHome(){
            this.$router.push({ name: 'Home' })
        }
    },
    created(){
        this.getCarts()
    },
    computed: {
        cart_list(){
            return this.$store.state.cart_list
        }
    },
    methods: {
        getCarts(){
            this.$store.dispatch('getCarts')
        }
    }
}
</script>