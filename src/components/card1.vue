<!-- Arayüzde bulunan 3 card'tan birincisi kullanıcı tarafından bu kart üzerine belirlenen değerler data.js ile app.vue üzeriden oluşturulan modelde test ediliyor  -->
<template>
    <b-card
            title="KNN classifier "
            img-src="https://picsum.photos/800/400/?image=58"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              Dünya Sağlık Örgütü, kardiyovasküler hastalıkların dünyadaki en büyük katil olduğunu açıkladı.
               Özellikle kalp hastalığı olmak üzere her yıl on yedi milyon insan ölüyor. Korunma tedaviden daha iyidir
               .Bu veri seti, hastaların önemli özelliklerini içeren gerçek bir veridir.
            </b-card-text>

            <div>
              
               <b-form-group label="Yaş" label-for="bg-age" label-cols-sm="4" label-cols-lg="12">
              <b-input-group>
                <b-form-input
                  id="bg-age"
                  v-model="age"
                  :v-on:change="changeAge(age)"
                  type="range"
                  number
                  min="0"
                  max="100"
                  step="1"
                ></b-form-input>
                <b-input-group-append is-text class="text-monospace">
                  {{ age.toFixed(0) }}
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
              <label for="sb-genders">Cinsiyet</label>
              <b-form-select id="sb-genders" v-model="gender" :options="genders" v-on:change="changeGender"></b-form-select>
          </div>
          </b-card>   
</template>

<script>
// Değerlerin saklandığı data.js dosyası
import ModelData from '../data/data.js'
export default {
    data (){
        return{
            age:ModelData.data.age,
            gender: ModelData.data.gender,
            genders:ModelData.data.genders
        }
    }
    ,methods:{
      changeAge(evt){
          ModelData.data.age=evt
      },
      changeGender(index){
        ModelData.data.gender=index
      }
    }

}

</script>