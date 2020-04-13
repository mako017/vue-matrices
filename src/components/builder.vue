<template>
  <div class="builder">
      <div class="help-menu">
        <h2 class="side-title">Hilfe</h2>
        <collapse v-for="item in help" :key="item.title" :item="item" />
        <button id="reset" class="final-button">Zurücksetzen</button>
      </div>
      <div class="main">
        <con :item="item" />
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
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>SUB</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>EKA</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>SM</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>ROT</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>VOLL</td>
                <td>-</td>
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
        </div>
        <button id="save-item" class="final-button" @click="saveItem">Item speichern</button>
      </div>
  </div>
</template>

<script>
import collapse from "@/components/builder-components/collapsible.vue";
import con from "@/components/builder-components/construction.vue";
export default {
  components: {
    collapse,
    con,
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
          content: "Die Symbole der zweiten Zelle werden von den Symbolen der ersten Zelle entfernt. Die übrigen Symbole werden in der dritten Zelle abgebildet.",
        },
        {
          title: "Schnittmenge",
          content: "Die Symbole der zweiten Zelle werden von den Symbolen der ersten Zelle entfernt. Die übrigen Symbole werden in der dritten Zelle abgebildet.",
        },
        {
          title: "Rotation",
          content: "Die Symbole der zweiten Zelle werden von den Symbolen der ersten Zelle entfernt. Die übrigen Symbole werden in der dritten Zelle abgebildet.",
        },
        {
          title: "Vollständigkeit",
          content: "Die Symbole der zweiten Zelle werden von den Symbolen der ersten Zelle entfernt. Die übrigen Symbole werden in der dritten Zelle abgebildet.",
        },
      ],
      items :[],
      item : {
        id : 0,
        code :"00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000"
      }
    }
  },
  methods:{
    saveItem(){
      this.items.push({...this.item})
      console.log(this.items);
      if (!this.items[this.item.id+1]) {
        this.item.id++;
        this.item.code = "00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000,00000000000000000000";
      }
    }
  },
  watch:{
    item: function(){
      console.log(this.item);
    }
  }
}
</script>

<style scoped>
h2{
  font-weight: 800;
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