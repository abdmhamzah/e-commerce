<template>
    <div>
        <div class="d-flex justify-content-around" style="margin-top: 2%">
            <h1>My Cart</h1>
        </div>
        <br>
        <div v-if="this.$route.name == 'PageCart' && cart_list.length == 0" class="d-flex justify-content-around">
            <button @click.prevent="toHome" type="button" class="btn btn-outline-primary my-2 my-sm-0" style="margin-right: 10px;">
                <i class="fa fa-plus-circle"></i>  Get Yours
            </button>
        </div>
        <br>
        <div v-if="cart_list.length == 0" class="d-flex justify-content-around">
            Cart is Empty
        </div>
        <div v-else class="d-flex justify-content-around">
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
                    <tr v-for="cart in cart_list" :key="cart.id">
                        <!-- <td>{{JSON.stringify(cart)}}</td> -->
                        <td > <img :src="cart.Product.image_url" style="width: 5rem; height: 5rem;"> </td>
                        <!-- <td >{{ cart.Product.image_url }}</td> -->
                        <td> {{ cart.Product.name }} </td>
                        <td> {{ toRupiah(cart.Product.price) }} </td>
                        <td> {{ cart.qty }} </td>
                        <td> {{ toRupiah(cart.Product.price * cart.qty) }} </td>
                        <td >
                            <!-- <button @click.prevent="" class="btn btn-outline-secondary my-2 my-sm-0" style="margin-right: 10px;">
                                <i class="fa fa-pencil"></i>
                            </button>  -->
                            <button @click.prevent="deleteFromCart(cart.id)" class="btn btn-outline-danger my-2 my-sm-0">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td> <strong>Total</strong></td>
                        <td><strong> {{ total_qty }} </strong></td>
                        <td><strong> {{ toRupiah(total_price) }} </strong></td>
                        <td>
                            <button @click.prevent="toCheckout" class="btn btn-outline-info my-2 my-sm-0">
                                <i class="fa fa-check-square"></i> Checkout
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    name: 'PageCart',
    created(){
        this.getCarts()
    },
    computed: {
        cart_list(){
            return this.$store.state.cart_list
        },
        total_qty(){
            let total = 0
            this.cart_list.forEach(el => {
                total += el.qty
            });
            return total
        },
        total_price(){
            let total = 0
            this.cart_list.forEach(el => {
                total += el.Product.price
            })
            return total
        }
    },
    methods: {
        toHome(){
            this.$router.push({ name: 'Home' })
        },
        getCarts(){
            this.$store.dispatch('getCarts')
        },
        toRupiah(number){
        var reverse = number.toString().split('').reverse().join(''),
            ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');
            return `IDR ${ribuan}`
        },
        deleteFromCart(id){
            Swal.fire({
            title: 'Are you sure?',
            text: "Your purchase will be remove from my Cart",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                    this.$store.dispatch('deleteFromCart', id)
                }
            })
        },
        toCheckout(){
            this.$store.dispatch('toCheckout')
        }
    },
}
</script>