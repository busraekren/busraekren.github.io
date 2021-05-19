// Verilerin model üzerinden arayüze aktarılması için kullanılan dosya 
let ModelData={
    data:{
        //Card1 datas
        age:20,
        gender: '0',
            genders:[
                {value:'0',text:'Kadın'},
                {value:'1',text:'Erkek'}
            ],
            //Card2 datas
        fbs: 120,
        chol: 200,
        trest: 100,
        cp: '0',
            cps: [
                {value: '0',text: 'Typical Angina'},
                {value: '1',text: 'Atypical Angina'},
                {value: '2',text: 'Non-anginal Pain'},
                {value: '3',text: 'Asymptomatic'}
            ],
        restecg :'0',
            restecgs: [
                {value: '0',text: 'Normal'},
                {value: '1',text: 'ST-T dalgası anormalliğine sahip olmak '},
                {value: '2',text: 'Estes kriterlerine göre olası veya kesin sol ventrikül hipertrofisini gösteren'}
            ],
        exang:'0',
            exangs:[
                {value:'0',text:'Hayır'},
                {value:'1',text:'Evet'}
            ],
            //Card3 Datas
        thalach:90,
        oldpeak:80,

        slope:'0',
            slopes:[
                {value: '0',text: 'Yukarı eğimli '},
                {value: '1',text: 'Düz'},
                {value: '2',text: 'Aşağı eğimli'},
            ],
        ca:'0',
            cas:[
                {value:'0',text:'0'},
                {value:'1',text:'1'},
                {value:'2',text:'2'}
            ],
        thal:'3',
            thals:[
                {value:'3',text:'Normal'},
                {value:'6',text:'Sabit kusur'},
                {value:'7',text:'Geri döndürülebilir kusur'}
            ],
    },result:{
        predict: ' '
    }
}
module.exports=ModelData;