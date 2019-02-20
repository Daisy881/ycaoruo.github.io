<template>
    <div id="loading-container" v-show="this.$store.state.loading.LOADING">
        <div id="loading" >
            loading...
        </div>
    </div>
</template>
<script>
export default {
    name: 'loading'
}
</script>
<style>
#loading-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: .3;
    background: #ccc;
    z-index: 10000;
}

#loading {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 40px;
    height: 40px;
    z-index: 100001;
}
</style>