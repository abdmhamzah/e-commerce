<template>
    <div>
        <div class="align-self-center" style="margin-top: 3%">
            <div class="d-flex justify-content-around" style="margin-top: 3%">
                <h1>Signup Form</h1>
            </div>
            <br>
            <div class="d-flex justify-content-around">
                <form @submit.prevent="signup" style="width: 25%;">
                    <div class="form-row">
                        <div class="col mb-3">
                            <input v-model="input_username" type="text" class="form-control" placeholder="Enter Your Name" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col mb-3">
                            <input v-model="input_email" type="email" class="form-control" placeholder="Enter Your Email" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col mb-3">
                            <input v-model="input_password" type="password" class="form-control" placeholder="Enter Your Password" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col mb-3">
                            <input v-model="input_confirm_password" type="password" class="form-control" placeholder="Confirm Your Password" required>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <div class="form-row">
                            <div class="col mb-3">
                                <button type="submit" class="btn btn-outline-primary my-2 my-sm-0" style="margin-right: 10px;">Sign Up</button>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <div class="form-row">
                            <div class="col mb-3">
                                <a @click.prevent="toSignin" href="#">Already have an account? Signin Here</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageSignup',
    data(){
        return {
            input_username: null,
            input_email: null,
            input_password: null,
            input_confirm_password: null
        }
    },
    methods: {
        signup(){
            this.$router.push({ path: 'signin' })
        },
        toSignin(){
            this.$router.push({ path: 'signin' })
        }
    }
}
</script>