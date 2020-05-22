<template>
      <div class="container">
        <svg viewBox="0 0 100 100" class="element" id="mat1"></svg>
        <svg viewBox="0 0 100 100" class="element" id="mat2"></svg>
        <svg viewBox="0 0 100 100" class="element" id="mat3"></svg>
        <svg viewBox="0 0 100 100" class="element" id="mat4"></svg>
        <svg viewBox="0 0 100 100" class="element" id="mat5"></svg>
        <svg viewBox="0 0 100 100" class="element" id="mat6"></svg>
        <svg viewBox="0 0 100 100" class="element" id="mat7"></svg>
        <svg viewBox="0 0 100 100" class="element" id="mat8"></svg>
        <svg viewBox="0 0 100 100" class="element" id="mat9"></svg>
    </div>
</template>

<script>
import drawSVG from "@/assets/js/drawing.js"
export default {
data: function(){
    return {
      code : ["01000000000000000000","00000000000000000000","00000000000000000000","00000000000000000000","00000000000000000000","00000000000000000000","00000000000000000000","00000000000000000000","00000000000000000000"]
    }
},
mounted(){
    for (let i = 0; i < 9; i++) {
        drawSVG.clear("mat"+(i+1));
        for (let j = 0; j < this.code[i].split('').length; j++) {
            if (+this.code[i].split('')[j] === 1) drawSVG.select("mat"+(i+1),j)
        }
    }
}

}


</script>

<style scoped>
.container{
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    justify-items: center;
}
.element{
    width: 90%;
    margin: 5% 0;
    background-color: white;
    border: 1px solid black;
}
</style>