
const fs=require('fs');
const path=require('path');
const csvtojson=require('csvtojson');
const {Matrix} =require('ml-matrix');
const confMatrix=require('ml-confusion-matrix')
const PCA=require('ml-pca')

const KNN=require('ml-knn');

console.log('--> createModel.js <---')

const names=['age','sex','cp','trtbps','chol','fbs','restecg','thalachh','exng','oldpeak','slp','caa','thall','target'] //Header için

let usePCA=false;
let knn;

let seperationSize; // Eğitim ve test verilerini ayırmak için

let data= [],X=[],y=[];
let trainingSetX = [], trainingSetY = [], testSetX = [], testSetY=[];


fs.createReadStream(path.resolve(__dirname,'heart.csv'))
    .pipe(csvtojson({noheader:true,headers:names}))
    .on('error',err=>console.log(err))
    .on('json',(jsonObj)=>data.push(jsonObj))
    .on('done',()=>{
        seperationSize=0.7*data.length;
        data=shuffleArray(data);
    })
    .on('end',Main)
    

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function Main(){
    dressData()
    console.log('Dress Data işlemleri sona erdi')

    train()
    test()
    let modelJSON =JSON.stringify(knn.toJSON())
    fs.writeFileSync(path.resolve(__dirname,"model.json"),modelJSON)
}
    
function dressData(){
    let types=new Set(); //Eşsiz sınıflar için
    data.forEach((row)=>{
        types.add(row.type);
    });
    typesArray = [...types];

    data.forEach((row)=>{
        y.push([Number(row['target'])]);
        delete row["target"];
        let x = Object.values(row).map(v => Number(v))
        X.push(x);
    });
    trainingSetX=X.slice(0,seperationSize);
    trainingSetY=y.slice(0,seperationSize);
    testSetX=X.slice(seperationSize);
    testSetY=y.slice(seperationSize);
}
function train() {
    if (usePCA === true) {
        trainingSetX = new Matrix(trainingSetX);
        testSetX = new Matrix(testSetX);
        var pca = new PCA(trainingSetX);
        trainingSetX = pca.predict(trainingSetX, 2);
        testSetX = pca.predict(testSetX, 2);
    }
    knn = new KNN(trainingSetX, trainingSetY, {k:3});
}

function test(){
    const y_pred=knn.predict(testSetX);
    const testSetLength=testSetX.length;
    const predictionError = error(y_pred,testSetY);
    console.log(`Test Seti Boyutu  = ${testSetLength} ve Yanlış Sınıflandırma sayısı = ${predictionError}`);

    let confMat=confMatrix.fromLabels(testSetY,y_pred)

    console.log(`Accuracy : ${confMat.getAccuracy()}`)

    
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
function kappaFromMatrix(table) {
    const [[TP, FN], [FP, TN]] = table;
    const all = TP + TN + FP + FN;

    const po = (TP + TN) / all; // accuracy
    const p1 = (TP + FN) / all;
    const p2 = (TP + FP) / all;

    const pe = (p1 * p2) + ((1 - p1) * (1 - p2)); // random accuracy
    return (po - pe) / (1 - pe);
}
