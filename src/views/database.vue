<template>
  <div>
    <div class="responsive" v-for=" Item in Items" :key=Item.id>
        <ItemCard :Item="Item"/>
    </div>
  </div>
</template>

<script>
import ItemCard from '@/components/database/mat-card.vue'

export default {
    name : "database",
      data() {
    return{
      Items : 
      [
        {
          id : 1,
          src : require('@/assets/img/blank.png'),
          diff : ".85",
          pwc : ".21",
        },
        {
          id : 2,
          src : require('@/assets/img/blank.png'),
          diff : ".73",
          pwc : ".32",
        },
        {
          id : 3,
          src : require('@/assets/img/blank.png'),
          diff : ".73",
          pwc : ".32",
        },
        {
          id : 4,
          src : require('@/assets/img/blank.png'),
          diff : ".73",
          pwc : ".32",
        },
        {
          id : 5,
          src : require('@/assets/img/blank.png'),
          diff : ".73",
          pwc : ".32",
        },
        {
          id : 6,
          src : require('@/assets/img/blank.png'),
          diff : ".73",
          pwc : ".32",
        },
      ]
    }
  },
    components : {
        ItemCard,
    },
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