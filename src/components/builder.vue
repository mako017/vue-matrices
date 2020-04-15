<template>
  <div class="builder">
      <div class="help-menu">
        <h2 class="side-title">Hilfe</h2>
        <collapse v-for="item in help" :key="item.title" :item="item" />
        <button id="reset" class="final-button" @click="resetItem">Zurücksetzen</button>
      </div>
      <div class="main">
        <div class="main-title">
            <svg @click="switchItem(-1)" viewBox="0 0 50 80" xml:space="preserve"><polyline stroke-linecap="round" stroke-linejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375 "/></svg> 
            <h2>{{itemCounter}}</h2>
            <svg @click="switchItem(1)" viewBox="0 0 50 80" xml:space="preserve"><polyline stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 "/></svg>
        </div>
        <con :item="item" />
        <drawer :items="items" />
      </div>
      <div class="control-menu">
        <h2 class="side-title">Control Panel</h2>
        <div class="side-container">
          <h3>Angewandte Regeln</h3>
          <table class="rules-table" style="width:80%;">
            <thead>
              <th>Regel</th>
              <th>Item</th>
              <th>Test</th>
            </thead>
            <tbody>
              <tr>
                <td>ADD</td>
                <td>{{item.rules.add.length}}</td>
                <td>-</td>
              </tr>
              <tr>
                <td>SUB</td>
                <td>{{item.rules.sub.length}}</td>
                <td>-</td>
              </tr>
              <tr>
                <td>EKA</td>
                <td>{{item.rules.eka.length}}</td>
                <td>-</td>
              </tr>
              <tr>
                <td>SM</td>
                <td>{{item.rules.sm.length}}</td>
                <td>-</td>
              </tr>
              <tr>
                <td>ROT</td>
                <td>{{item.rules.rot.length}}</td>
                <td>-</td>
              </tr>
              <tr>
                <td>VOLL</td>
                <td>{{item.rules.voll.length}}</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="side-container">
          <h3>Geschätzte Schwierigkeit</h3>
        </div>
        <div class="side-container">
          <h3>Einstellungen</h3>
        </div>
        <div class="side-container">
          <h3>Itemcode</h3>
          <textarea cols="30" rows="5" v-model="item.code" readonly></textarea>
          <svg viewBox="0 0 101 101" id="add" style="width:50%;" class="hidden">
            <defs>
                <path id="border" d="m 1 1 h 99 v 99 h -99 z " fill="#fff" stroke="#000" stroke-width="2" />
            </defs>
            <use transform="translate(0,0) scale(0.3)" href="#border" />
            <use transform="translate(0,0) scale(0.3)" href="#mat1" />
            <use transform="translate(35,0) scale(0.3)" href="#border" />
            <use transform="translate(35,0) scale(0.3)" href="#mat2" />
            <use transform="translate(70,0) scale(0.3)" href="#border" />
            <use transform="translate(70,0) scale(0.3)" href="#mat3" />
            <use transform="translate(0,35) scale(0.3)" href="#border" />
            <use transform="translate(0,35) scale(0.3)" href="#mat4" />
            <use transform="translate(35,35) scale(0.3)" href="#border" />
            <use transform="translate(35,35) scale(0.3)" href="#mat5" />
            <use transform="translate(70,35) scale(0.3)" href="#border" />
            <use transform="translate(70,35) scale(0.3)" href="#mat6" />
            <use transform="translate(0,70) scale(0.3)" href="#border" />
            <use transform="translate(0,70) scale(0.3)" href="#mat7" />
            <use transform="translate(35,70) scale(0.3)" href="#border" />
            <use transform="translate(35,70) scale(0.3)" href="#mat8" />
            <use transform="translate(70,70) scale(0.3)" href="#border" />
            <use transform="translate(70,70) scale(0.3)" href="#mat9" />
        </svg>
        </div>
        <button id="save-item" class="final-button" @click="saveItem">Item speichern</button>
      </div>
  </div>
</template>

<script>
import collapse from "@/components/builder-components/collapsible.vue";
import con from "@/components/builder-components/construction.vue";
import drawer from "@/components/builder-components/item-drawer.vue"
export default {
  components: {
    collapse,
    con,
    drawer,
  },
  data: function(){
    return {
      help: [
        {
          title: "Addition",
          content: "In der dritten Zelle einer Reihe werden alle Symbole abgebildet, die auch in der ersten und zweiten Zelle vorhanden sind.",
        },
        {
          title: "Subtraktion",
          content: "Die Symbole der zweiten Zelle werden von den Symbolen der ersten Zelle entfernt. Die übrigen Symbole werden in der dritten Zelle abgebildet.",
        },
        {
          title: "Einzelkomponentenaddition",
          content: "In der dritten Zelle einer Reihe werden alle Symbole abgebildet, die entweder in der ersten ODER in der zweiten Zelle vorhanden sind. Wenn ein Element in der ersten UND der zweiten Zelle vorhanden ist, so wird es in der dritten Zelle nicht abgebildet.",
        },
        {
          title: "Schnittmenge",
          content: "In der dritten Zelle einer Reihe werden alle Symbole abgebildet, die sowohl in der ersten als auch der zweiten Zelle enthalten sind.",
        },
        {
          title: "Rotation",
          content: "Über die Reihe hinweg rotiert das Symbol. Dies kann sowohl im als auch gegen den Uhrzeigersinn geschehen. Die Rotation kann um 90° oder 180° geschehen.",
        },
        {
          title: "Vollständigkeit",
          content: "Die Symbole, auf die diese Regel angewandt wird, müssen in allen Zeilen vollständig enthalten sein.",
        },
      ],
      items :[],
      item : {
        id : 0,
        code :"00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000",
        svg : [0,0,0,0,0,0,0,0,0],
        rules : {
          add:[],
          sub:[],
          eka:[],
          sm:[],
          rot:[],
          voll:[],
        }
      }
    }
  },
  methods:{
    resetItem(){
      this.$set(this.item, 'code', "00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000");
      this.item = Object.assign({},this.item);
    },
    saveItem(){
      if (!this.items[this.item.id+1]) {
        this.items.push({...this.item});
        this.$set(this.item, 'id', this.item.id+1);
        this.$set(this.item, 'code', "00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000");
        this.$set(this.item, 'rules', {
          add:[],
          sub:[],
          eka:[],
          sm:[],
          rot:[],
          voll:[],
        });
        this.item = Object.assign({},this.item);
      }
      else{
        this.$set(this.items, this.item.id, {...this.item})
      }
    },
    switchItem(val){
      if (+val === 1 && this.item.id === this.items.length-1) {
        this.$set(this.item, 'id', this.item.id+1);
        this.$set(this.item, 'code', "00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000");
        this.item = Object.assign({},this.item);
      }
      if ((+val === -1  && this.item.id > 0) | (+val === 1 && this.item.id < this.items.length-1)) {
        // console.log(this.item.id);
        this.item = Object.assign({},this.items[this.item.id+(+val)]);
      }
    }
  },
  computed:{
    itemCounter: function(){
      return "Item " + (this.item.id + 1) + " von " + (this.items.length + 1)
    }
  }
}
</script>

<style scoped>
th{
  font-weight: bold;
}
h2{
  font-weight: 800;
  text-align: center;
}
h3{
  font-weight: 600;
}

.builder{
    width: 100%;
    height: 100vh;
    background-color: hsl(0, 0%, 85%);
    display: flex;
    flex-direction: row;
}

.help-menu{
  width: 25%;
  border-right: 1px solid black;
  display: flex;
  flex-direction: column;
}
.main{
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 1rem 0 0 0;
  overflow: hidden;
}
.main-title{
  align-self: center;
  display: flex;
  flex-direction: row;
  font-size: 1.3rem;
}
.main-title svg{
  height: 1.3rem;
  stroke-width: 5px;
  stroke: #000;
  fill: none;
  margin: 0 1.5rem;
}
.control-menu{
  width: 25%;
  border-left: 1px solid black;
  display: flex;
  flex-direction: column;
}

.side-title{
  font-size: 2rem;
  text-align: center;
  padding: 0.2rem;
  border-bottom: 1px solid black;
}
.side-container{
  padding: 0.5rem 0;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
}

.side-container:last-of-type{
  border: none;
}

.final-button{
  margin: auto 0 0 0;
  height: 3rem;
  font-size: 2rem;
}

.rules-table{
  width: 80%;
  align-self: center;
}

</style>