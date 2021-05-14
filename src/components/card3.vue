<template>
  <b-card>
            <div>
              <label for="sb-thalach" class="mt-2">Kişinin ulaştığı maksimum kalp atış hızı</label>
              <b-form-spinbutton
                id="sb-thalach"
                v-model.lazy="thalach"
                :thalach="thalach"
                min="60"
                max="180"
                v-on:change=changeThalach(thalach)
                step="1"
              ></b-form-spinbutton>
              <p>Maksimum kalp atış hızı: {{ thalach }}</p>
              <label for="sb-oldpeak" class="mt-2"> Egzersizin neden olduğu ST depresyonu </label>
              <b-form-spinbutton
                id="sb-oldpeak"
                v-model="oldpeak"
                :oldpeak="oldpeak"
                min="60"
                v-on:change="changeOldpeak(oldpeak)"
                max="180"
                step="1"
              ></b-form-spinbutton>
              <p>ST depresyonu: {{ oldpeak }}</p>
              <label for="sb-slopes">Pik egzersiz ST segmentinin eğimi</label>
              <b-form-select id="sb-slopes" v-model="slope" v-on:change=changeSlope :options="slopes"></b-form-select>
              <label for="sb-ca">Florosopi ile renklendirilen ana damarların sayısı (0-3) </label>
              <b-form-select id="sb-ca" v-model="ca"  v-on:change=changeCa :options="cas"></b-form-select>
              <label for="sb-thals">Talasemi adı verilen bir kan hastalığ</label>
              <b-form-select id="sb-thals" v-model="thal"  v-on:change=changeThal :options="thals"></b-form-select>
             
          </div>
          
            
          </b-card>
</template>

<script>
import ModelData from '../data/data.js'
export default {
    name:'card3',
    data(){
        return{
            thalach:ModelData.data.thalach,
            oldpeak:ModelData.data.oldpeak,
            slope:ModelData.data.slope,
            slopes:ModelData.data.slopes,
            ca:ModelData.data.ca,
            cas:ModelData.data.cas,
            thal:ModelData.data.thal,
            thals:ModelData.data.thals,

        }
    },methods:{
      changeThalach(value){
        ModelData.data.thalach=value;
      },
      changeOldpeak(value){
        ModelData.data.oldpeak=value;
      },
      changeSlope(value){
        ModelData.data.slope=value;
      },
      changeCa(value){
        ModelData.data.ca=value;
      },
      changeThal(value){
        ModelData.data.thal=value;
      }

    }

}
</script>

<style>

</style>