//https bu server va client o'rtasidagi malumot almahinuvi protocoli 
//dns bu server api sini text variantga o'tkazib beradi 
//tcp ulanish protocoli 
//tcpapi va udipiapi TCP (Transmission Control Protocol) UDP (User Datagram Protocol)
//Native server — bu frameworksiz, platformaning o‘z imkoniyatlari bilan yozilgan server.
// Node.js → http, net, dgram
// To‘liq nazorat
// Kam qulaylik, ko‘p control

import http from 'http'
//doim serverda request va response bo'ladi
//request serverga yuborilgan so'rov
//response server qaytargan javob
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-type', 'text/plain; charset=utf-8')//header qismida qanday malumot borligi yoziladi
    res.end('bu oddiy js server Mikeethical tomonidan yaratildi')//end bu hammasi ishlab bo'lgandan kn tugatiladigan functioni
}) 

server.listen(3000, () => {
    console.log('server is running on http://localhost:3000');
});
//doim tepada yozilgan silkaga yani api mnziliga get so'rovi yuoradi


