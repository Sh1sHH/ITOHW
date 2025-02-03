const fs = require('fs'); 


let sinif = [
    { isim: "Yusuf", soyIsim: "YEŞİLÇAM", telNo: "5455466363" },
    { isim: "Seda Nur", soyIsim: "ZURNACI", telNo: "5382847757" },
    { isim: "İrem", soyIsim: "BAĞCI", telNo: "5456785353" },
    { isim: "Şevval", soyIsim: "DEMİRSEL", telNo: "5432678990" },
    { isim: "Ahmet", soyIsim: "USLU", telNo: "5389870789" },
    { isim: "Mehmet", soyIsim: "YILMAZ", telNo: "5321234567" },
    { isim: "Ayşe", soyIsim: "KARA", telNo: "5367891234" },
    { isim: "Fatma", soyIsim: "DEMİR", telNo: "5398765432" },
    { isim: "Ali", soyIsim: "ÖZTÜRK", telNo: "5445556677" },
    { isim: "Zeynep", soyIsim: "ÇELIK", telNo: "5334445566" }
];


for (let i = 0; i < sinif.length; i++) {
    sinif[i].vize = Math.floor(Math.random() * 101);  
    sinif[i].final = Math.floor(Math.random() * 101);
}


console.log("DO-WHILE");
let index = 0;
do {
    console.log(`Ad Soyad: ${sinif[index].isim} ${sinif[index].soyIsim}`);
    console.log(`Tel No: ${sinif[index].telNo}`);
    console.log(`Vize: ${sinif[index].vize}`);
    console.log(`Final: ${sinif[index].final}`);
    console.log("----------------------");
    index++;
} while (index < sinif.length);


console.log("WHILE");
index = 0;
while (index < sinif.length) {
    console.log(`Ad Soyad: ${sinif[index].isim} ${sinif[index].soyIsim}`);
    console.log(`Tel No: ${sinif[index].telNo}`);
    console.log(`Vize: ${sinif[index].vize}`);
    console.log(`Final: ${sinif[index].final}`);
    console.log("----------------------");
    index++;
}


console.log("FOR");
for (let i = 0; i < sinif.length; i++) {
    console.log(`Ad Soyad: ${sinif[i].isim} ${sinif[i].soyIsim}`);
    console.log(`Tel No: ${sinif[i].telNo}`);
    console.log(`Vize: ${sinif[i].vize}`);
    console.log(`Final: ${sinif[i].final}`);
    console.log("----------------------");
}


console.log("FOR-IN");
for (let i in sinif) {
    console.log(`Ad Soyad: ${sinif[i].isim} ${sinif[i].soyIsim}`);
    console.log(`Tel No: ${sinif[i].telNo}`);
    console.log(`Vize: ${sinif[i].vize}`);
    console.log(`Final: ${sinif[i].final}`);
    console.log("----------------------");
}


let dosyaIcerik = "Ad Soyad | Telefon | Vize | Final\n";
dosyaIcerik += "-----------------------------------\n";
sinif.forEach((ogrenci) => {
    dosyaIcerik += `${ogrenci.isim} ${ogrenci.soyIsim} | ${ogrenci.telNo} | ${ogrenci.vize} | ${ogrenci.final}\n`;
});


fs.writeFile("dosyacikti.txt", dosyaIcerik, (err) => {
    if (err) {
        console.error("Dosyaya yazma hatası:", err);
    } else {
        console.log("Bilgiler 'ogrenci_notlari.txt' dosyasına başarıyla kaydedildi!");
    }
});
