<template>
    <div class="home">

        <el-carousel height="calc(100vh - 60px)">

            <el-carousel-item :key="1">
                <img src="../assets/01.jpg" />
            </el-carousel-item>

            <el-carousel-item :key="2">
                <img src="../assets/02.jpg" />
            </el-carousel-item>

            <el-carousel-item :key="3">
                <img src="../assets/03.jpg" />
            </el-carousel-item>

        </el-carousel>

    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.home {

    .el-carousel img {
        width: 100%;
        height: 100%;
    }
}
</style>