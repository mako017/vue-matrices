<template>
  <div class="item-cont">
    <img :src="Item.src" :alt="'Item '+Item.id">
    <hr class="vsep">
    <table>
        <tbody>
            <tr>
                <td class="border-right">Difficulty</td>
                <td>Part-Whole</td>
            </tr>
            <tr>
                <td class="border-right">{{Item.diff}}</td>
                <td>{{Item.pwc}}</td>
            </tr>
        </tbody>
    </table>
    <hr class="vsep">
    <div class="rule-grid">
        <img :src="require('@/assets/img/plus.svg')" alt="Rule 1" class="rule-ico">
        <img :src="require('@/assets/img/minus.svg')" alt="Rule 2" class="rule-ico">
        <img :src="require('@/assets/img/aktualisierung.svg')" alt="Rule 3" class="rule-ico">
        <img :src="require('@/assets/img/ueberlappung.svg')" alt="Rule 4" class="rule-ico">
        <img :src="require('@/assets/img/plus.svg')" alt="Rule 5" class="rule-ico">
        <img :src="require('@/assets/img/planen.svg')" alt="Rule 6" class="rule-ico">
    </div>
  </div>
</template>

<script>
export default {
    name: "mat-card",
    props: {
        Item: Object,
    },
}
</script>

<style scoped>
table{
    width: 100%;
    border-collapse: collapse;
}

.border-right{
    border-right: 1px solid black;
}

td{
    text-align: center;
}

.item-cont{
    border: 1px solid black;
    width: 210px;
    margin: 5px auto;
    padding: 4%;
}

.rule-grid{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    row-gap: 0.5rem;
    column-gap: 5%;
}

.rule-ico{
    width: 70%;
}

.vsep{
    margin: 0.5rem auto;
}
</style>