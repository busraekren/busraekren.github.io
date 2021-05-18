<template>
  <div id="app">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
           <Card1/>
        </b-col>
        <b-col>
         <Card2/>
        </b-col>
        <b-col>
          <Card3/>
           <b-button v-b-toggle.sidebar-1 v-on:click="train()">Test Et</b-button>
        </b-col>
         <b-sidebar id="sidebar-1" title="Test sonucu değerleri " shadow>
              <div class="px-10 py-10">
                <p>
                  Hasta yaşı : <b>{{model_data.age}}</b> <br>
                  Hasta cinsiyeti :<b>{{model_data.gender}}</b><br>
                  Göğüs ağrısı tipi : <b>{{model_data.cp}}</b><br>
                  Kişinin istirahat tansiyonu : <b>{{model_data.fbs}} mm Hg</b> <br>
                  Kolesterol ölçümü : <b>{{model_data.chol}} mg/dl </b><br>
                  Açlık kan şekeri : <b>{{model_data.trest}} mg/dl</b><br>
                  Dinlenme elektrokardiyografik ölçüm : <b>{{model_data.restecg}}</b><br>
                  Egzersiz kaynaklı anjina : <b>{{model_data.exang}}</b><br>
                  Kişinin ulaştığı maksimum kalp atış hızı : <b>{{model_data.thalach}}</b><br>
                  Egzersizin neden olduğu ST depresyonu  : <b>{{model_data.oldpeak}}</b><br>
                  Pik egzersiz ST segmentinin eğimi : <b>{{model_data.slope}}</b><br>
                  Florosopi ile renklendirilen ana damarların sayısı (0-3) : <b>{{model_data.ca}}</b><br>
                  Talasemi adı verilen bir kan hastalığ : <b>{{model_data.thal}}</b><br>
                </p>
               <h2> Sonuç : {{model_result.predict}}</h2>
               
              </div>
            </b-sidebar>
      </b-row>
    </b-container>
   <center>
     
  </center>
  </div>  
</template>

<script>

import Card1 from './components/card1.vue'
import Card2 from './components/card2.vue'
import Card3 from './components/card3.vue'
import KNN from'ml-knn'
import modelJson from './model/model.json'
import promise from './data/data.js'
const model =KNN.load(modelJson)



import ModelData from './data/data.js';

export default {
  name: 'app',
  components:{
    Card1,
    Card2,
    Card3,
  },
  data () {
    return {
      model_data:ModelData.data,
      msg: 'Heart Disease UCI ',
      model_result:ModelData.result,
      
    }
  },
  methods:{

    train(){
      try{
        let temp = [promise.data.age,
                    promise.data.gender,
                    promise.data.cp,
                    promise.data.trest,
                    promise.data.chol,
                    promise.data.fbs,
                    promise.data.restecg,
                    promise.data.thalach,
                    promise.data.exang,
                    promise.data.oldpeak,
                    promise.data.slope,
                    promise.data.ca,
                    promise.data.thal,
            ];
            let predictNumber=model.predict(temp);
            console.log(`PredictNum ${predictNumber}`)
            console.log(`${temp} --> türü =  ${predictNumber}`);
            promise.result.predict=predictNumber;
            console.log(promise.result.predict)
      }catch(err){
        console.log(err)
      }
      console.log('train methods')
    }
  }
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
