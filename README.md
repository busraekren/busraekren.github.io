# K-NN Algoritm  ile Model Eğitip Kalp Hastalığı Riskinin Tespiti
Bu proje js kullanılarak yapılmış web uygulamasıdır.
Bu çalışmada K-NN algoritması ile kalp hastalıkları ile diğer hastalıklar arasındaki ilişkiler anlamaya çalışılıp kalp hastası olurluğunun tahmini yapılmıştır.

## Uygulamanın kullanıcı arayüzü
Uygulamanın Kullanıcı arayüzünde model eğitmek için kullanılan test verisindeki(heart.csv) kategorilerin değerlerinin seçilimi yapılıp bu değerlere göre hastanın kalp hastalığının tespiti yapılması sağlandı.

Ayrıca kullanıcı arayüzünde eğitilen modelin başarım sonuçlarına da yer verildi.
## Test Verisinin Matris Boyutları
```python
Veri Setindeki Satır Sayısı:  304
Veri Setindeki Sütun Sayısı:  14

 ```
## Uygulamada Hangi Teknoloji Kullanıldı?

Json programlama dili yetkinlikleri  ve sağladığı kütüphaneleri kullanılmıştır. Client tarafında kullanıcı arayüzü oluşturmayı sağlamak için vue.js   kütüphanesi kullanılmıştır.Makine öğrenmesinin yapılmasında phyton programlama dili kullanılmıştır.
Boostrap-Vue ile projenin arayüz  kullanımı daha elverişli hale getirilmiştir. 

## Uygulamanın Özellikleri

 Test verisinin KNN algoritması ile eğitiminden elde edilen doğruluk değeri (0.6414473684210527) 1 'e yakın bir değer olup  makine öğrenmemizin başarılı sonuçlar elde ettiğinin göstergesidir.

Test verisindeki kategorilerin  kullanıcı arayüzünde değer aralıklarının seçilmesi ile eğitilen modelimizin yaptığı tahmin ;

0 ise Hayır, 

1 ise Evet sonuçları olup sırasıyla kalp hastası olma riskinin olmadığını  ve kalp hastası olma riskinin olduğunu ifade eder.
## Uygulamanın Başarım İstatistikleri


```bash

Test Seti Boyutu  = 304 ve Yanlış Sınıflandırma sayısı = 109

Accuracy : 0.6414473684210527

Kappa İstatistikleri: 
NaN: 0

 1: 0.6651982378854641

 2
 1: 0

 1: -0.0033003300329998357





```


## 

```python
Modelin doğruluğunun kontrolü  karışıklık matrisi ile sağlanmıştır.



```

## Projede Kappa İstatistiklerinin Hesabı
```python
function kappaFromMatrix(table) {
    const [[TP, FN], [FP, TN]] = table;
    const all = TP + TN + FP + FN;

    const po = (TP + TN) / all; // accuracy
    const p1 = (TP + FN) / all;
    const p2 = (TP + FP) / all;

    const pe = (p1 * p2) + ((1 - p1) * (1 - p2)); // random accuracy
    return (po - pe) / (1 - pe);

```

## Heart.csv dosyasındaki veri kategorilerinin  isimlendirilmesi
yaş:Yıl cinsinden yaş 

seks:  (1 = erkek; 0 = kadın)

cp:Göğüs ağrısı tipi

trestbps:
İstirahat kan basıncı (hastaneye kabulde mm Hg cinsinden)

chol:mg / dl cinsinden serum kolestoral

fbs:(açlık kan şekeri> 120 mg / dl) (1 = doğru; 0 = yanlış)

restecg:İstirahat elektrokardiyografik sonuçları

thalach:Ulaşılan maksimum kalp atış hızı

exang:Egzersize bağlı anjina (1 = evet; 0 = hayır)

oldpeak:Dinlenmeye göre egzersizin neden olduğu ST depresyonu

