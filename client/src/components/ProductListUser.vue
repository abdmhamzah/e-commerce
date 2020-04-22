<template>
    <div>
        <div>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="https://support.apple.com/content/dam/edam/applecare/images/en_US/psp/psp-hero-banner-icloud.image.large_2x.jpg" alt="First slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="https://support.apple.com/content/dam/edam/applecare/images/en_US/psp/psp-hero-banner-imac.image.large_2x.jpg" alt="Second slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="https://support.apple.com/content/dam/edam/applecare/images/en_US/psp/psp-hero-banner-mac-family.image.large_2x.jpg" alt="Third slide">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
        <ProductCard></ProductCard>
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard'

export default {
    name: 'ProductUserList',
    components: {
        ProductCard
    }
}
</script>
