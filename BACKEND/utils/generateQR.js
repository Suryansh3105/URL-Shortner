import QRCode from 'qrcode'

async function generateQRCode(shortUrl){
    const qrCode = await QRCode.toDataURL(shortUrl);
    return qrCode;
}

export default generateQRCode;