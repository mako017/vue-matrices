<template>
  <div>
    <div class="responsive" v-for=" Item in Items" :key=Item.id>
        <ItemCard :Item="Item"/>
    </div>
  </div>
</template>

<script>
import ItemCard from '@/components/database/mat-card.vue';
import COMM from '@/assets/js/communication.js';

export default {
    name : "database",
      data() {
    return{
      Items : 
      [
        {
          id : 0,
          code: "01000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000",
          params : {
            diff : 0.5,
            pwc : 0.9,
          },
          rules : {
            add : 1,
            sub : 1,
            eka : 0,
            sm : 1,
            rot : 0,
            voll : 1,
          },
        },
      ]
    }
  },
    components : {
        ItemCard,
    },
    async beforeMount(){
      let response = await COMM.requestData("readAll");
      console.log(response);
      this.Items = [...response];
      
    }
}
</script>

<style scoped>
.responsive {
  padding: 0 6px;
  float: left;
  width: 16.66666%;
}

@media only screen and (max-width: 1580px) {
  .responsive {
    width: 19.99999%;
    margin: 6px 0;
  }
}

@media only screen and (max-width: 1280px) {
  .responsive {
    width: 24.99999%;
    margin: 6px 0;
  }
}

@media only screen and (max-width: 950px) {
  .responsive {
    width: 33.33333%;
    margin: 6px 0;
  }
}

@media only screen and (max-width: 630px) {
  .responsive {
    width: 49.99999%; 
  }
}

@media only screen and (max-width: 420px) {
  .responsive {
    width: 100%;
  }
}
</style>