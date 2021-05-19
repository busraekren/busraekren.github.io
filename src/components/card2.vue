<!-- Arayüzde bulunan 3 card'tan ikincisi kullanıcı tarafından bu kart üzerine belirlenen değerler data.js ile app.vue üzeriden oluşturulan modelde test ediliyor  -->
<template>
  <b-card>
            <div>
              <label for="sb-cp">Göğüs ağrısı tipi</label>
              <b-form-select id="sb-cp" v-model="cp" :options="cps" v-on:change="changeCp"></b-form-select>
              <label for="sb-trest" class="mt-2">Kişinin istirahat tansiyonu </label>
              <b-form-spinbutton
                id="sb-trest"
                v-model="trest"
                :trest="trest"
                min="0"
                max="200"
                v-on:change="changeTrest(trest)"
                step="1"
              ></b-form-spinbutton>
              <p>Tansiyon: {{ trest }} mm Hg</p>
              <label for="sb-fbs" class="mt-2">Kolesterol ölçümü </label>
              <b-form-spinbutton
                id="sb-fbs"
                v-model="fbs"
                :fbs="fbs"
                min="0"
                max="400"
                step="1"
                v-on:change="changeFbs(fbs)"
              ></b-form-spinbutton>
              <p>Kolesterol: {{ fbs }} mg/dl</p>
              <label for="sb-chol" class="mt-2">Açlık kan şekeri</label>
              <b-form-spinbutton
                id="sb-chol"
                v-model="chol"
                :chol="chol"
                min="0"
                max="400"
                step="1"
                v-on:change="changeChol(chol)"
              ></b-form-spinbutton>
              <p>Açlık kan şekeri: {{ chol }} mg/dl</p>
              <label for="sb-restecgs">Dinlenme elektrokardiyografik ölçüm </label>
              <b-form-select id="sb-restecgs" v-model="restecg" v-on:change="changeRestecg" :options="restecgs"></b-form-select>
              <label for="sb-exangs">Egzersiz kaynaklı anjina</label>
              <b-form-select id="sb-exangs" v-model="exang" v-on:change="changeExang" :options="exangs"></b-form-select>
          </div>
          
            
          </b-card>
</template>

<script>
import ModelData from '../data/data.js'
export default {
    name:'card2',
    data(){
        return{
            fbs: ModelData.data.fbs,
            chol: ModelData.data.chol,
            trest: ModelData.data.trest,
            cp: ModelData.data.cp,
            cps: ModelData.data.cps,
            restecg :ModelData.data.restecg,
            restecgs: ModelData.data.restecgs,
            exang:ModelData.data.exang,
            exangs:ModelData.data.exangs,
        }
    },methods:{
        changeFbs(value){
            ModelData.data.fbs=value;
        },
        changeChol(value){
            ModelData.data.chol=value;
        },
        changeTrest(value){
            ModelData.data.trest=value;
        },
        changeCp(value){
            ModelData.data.cp=value;
        },
        changeRestecg(value){
            ModelData.data.restecg=value;
        },
        changeExang(value){
            ModelData.data.exang=value;
        },
    }

}
</script>

<style>

</style>