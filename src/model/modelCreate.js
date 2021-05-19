// Bağımlılıklar ekleniyor
const fs=require('fs');

const path=require('path');
// Csv'yi okumak için kullanıyoruz.
const csvtojson=require('csvtojson');
// Matrix
const {Matrix} =require('ml-matrix');
// Model perfornması için hata matrisi olarak bilinen  confusion matrisi karşılık matrisi
const confMatrix=require('ml-confusion-matrix')
//Temel bileşen analizi.İstatistiksel bir prosedürdür.
const PCA=require('ml-pca')
// Modelimiz
const KNN=require('ml-knn');
// Okunan csv dosyasının başlıklarının eklenmesi için.
const names=['age','sex','cp','trtbps','chol','fbs','restecg','thalachh','exng','oldpeak','slp','caa','thall','target'] //Header için

let usePCA=false;
// Model nesnesi
let knn;
// Ayırma boyutu
let seperationSize; // Eğitim ve test verilerini ayırmak için

// X niteliklerimiz, y hedef niteliğimiz
let data= [],X=[],y=[];
// Verilerin eğitim ve test olarak bölünmüş halleri
let trainingSetX = [], trainingSetY = [], testSetX = [], testSetY=[];

// Csv dosyası içerisinden okuma yapıyoruz.Okuma işlemi yapıldıktan sonra main metodu çağrılıyor.
fs.createReadStream(path.resolve(__dirname,'heart.csv'))
    .pipe(csvtojson({noheader:true,headers:names}))
    .on('error',err=>console.log(err))
    .on('json',(jsonObj)=>data.push(jsonObj))
    .on('done',()=>{
        //Veri setinin test kısmı burada belirleniyor veri setinin yüzde otuzu test verisi olarak kullanılıyor.
        seperationSize=0.3*data.length;
        data=shuffleArray(data);
    })
    .on('end',Main)
    
// Karıştırma fonksiyonu datayı karıştırılmış olarak geri dönüyor.
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Main metodu işlemlerimizin yapıldığı ana metod.
async function Main() {
    // dressData metodu 
    await dressData()
    console.log('Dress Data işlemleri sona erdi')
    // Train metodu çağrılıyor
    await train()
    // Test metodu çağrılıyor.
    await test()
    // Oluşturulan model bir JSON dosyasına dönüştürülüp yazılıyor.
    let modelJSON =JSON.stringify(knn.toJSON())
    fs.writeFileSync(path.resolve(__dirname,"model.json"),modelJSON)
}
    
async function dressData(){
    let types=new Set(); //Eşsiz sınıflar için
    data.forEach((row)=>{
        types.add(row.type);
    });
    typesArray = [...types];
    // Csv içerisinden okunan verinin hedef niteliğinden ayrılması sağlanılıyor.
    data.forEach((row)=>{
        y.push([Number(row['target'])]);
        delete row["target"];
        let x = Object.values(row).map(v => Number(v))
        X.push(x);
    });
    //Veri seti eğitim ve test verisi olmak üzere bölünüyor.
    trainingSetX=X.slice(0,seperationSize);
    trainingSetY=y.slice(0,seperationSize);
    testSetX=X.slice(seperationSize);
    testSetY=y.slice(seperationSize);
}
//Eğitim fonksiyounu
async function train() {
    if (usePCA === true) {
        // Eğitim için kullanılan X veri seti Matrix kütüphanesi kullanılarak oluşturuluyor.
        trainingSetX = new Matrix(trainingSetX);
        // Test için kullanılan X veri seti Matrix kütüphanesi kullanılarak oluşturuluyor.
        testSetX = new Matrix(testSetX);
        // PCA, keşif amaçlı veri analizinde ve tahmine dayalı modeller için makine öğreniminde en yaygın olarak kullanılan bir araçtır
        var pca = new PCA(trainingSetX);
        trainingSetX = pca.predict(trainingSetX, 2);
        testSetX = pca.predict(testSetX, 2);
    }
    // Oluşturulan modelin eğitimi, eğitim verileriyle gerçekleştiriliyor en yakın komşu sayısı 3 olarak belirlenmiştir.
    knn = new KNN(trainingSetX, trainingSetY, {k:3});
}
async function test(){

    //Test veri kümesinin  oluşturulan model üzeriden testi gerçekleştiriliyor.
    const y_pred=knn.predict(testSetX);
    const testSetLength=testSetX.length;
    // Tahmin hatası hesaplanıyor.
    const predictionError = error(y_pred,testSetY);
    // Ekrana test çıktıları veriliyor.
    console.log(`Test Seti Boyutu  = ${testSetLength} ve Yanlış Sınıflandırma sayısı = ${predictionError}`);

    // Confusion Matrix sayesinde modelin performans ölçümleri yapılıyor.
    let confMat=confMatrix.fromLabels(testSetY,y_pred)
    console.log(`Accuracy : ${confMat.getAccuracy()}`)
    console.log(`Total Count : ${confMat.getTotalCount()}`)
    console.log("Kappa Scores:");
    y.forEach(i => {
        let kappa = kappaFromMatrix(confMat.getConfusionTable(i));
        console.log(` ${i}: ${kappa}`);
    })
}
function error(predicted,expected){
    let misclassifications = 0;
    for(var index = 0;index<predicted.length;index++){
        if(predicted[index]!==expected[index]) {
            misclassifications++;
        }
    }
    return misclassifications;
}

// Kappa değerini hesaplamak için kullanılan fonsiyok
function kappaFromMatrix(table) {
    const [[TP, FN], [FP, TN]] = table;
    const all = TP + TN + FP + FN;

    const po = (TP + TN) / all; // accuracy
    const p1 = (TP + FN) / all;
    const p2 = (TP + FP) / all;

    const pe = (p1 * p2) + ((1 - p1) * (1 - p2)); // random accuracy
    return (po - pe) / (1 - pe);
}
