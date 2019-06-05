// 图片压缩
//import { imgCompressor } from '/path/to/imgCompressor'
//@params
//file:文件
//maxImgLength:图片最大边长，如超出将被缩放至此长度，默认值：1200
//quality:图片压缩质量，0-1，默认0.6
//imgCompressor.img(file[,maxImgLength,quality]).then((res)=>{
//  Do something
//  console.log(res);
//});
export let imgCompressor =  {
  img:function(file,maxLength,quality){
    let maxImgLength = maxLength?maxLength:1200;// 最长边的长度最大值
    let qua = quality?quality:0.6;// 压缩质量
    let reader = new FileReader();
    let compressImg = new Image();
    reader.readAsDataURL(file.raw);
    return new Promise((resolve) => {
      reader.onload = function(e) {
        // 图片base64化
        let newUrl = e.target.result;
        let c = document.createElement('canvas');
        let img = document.createElement('img');
        img.src = newUrl;
        let ctx=c.getContext("2d");
        let timmer = setInterval(function(){
          if(reader.readyState == 2) {
            clearInterval(timmer);
            let imgHeight = img.height;
            let imgWidth = img.width;
            if(imgHeight>maxImgLength || imgWidth > maxImgLength) {
              if(imgHeight>imgWidth) {
                let rate = maxImgLength / imgHeight;
                imgHeight = maxImgLength;
                imgWidth = imgWidth*rate;
                c.width = imgWidth;
                c.height = imgHeight;
              } else {
                let rate = maxImgLength / imgWidth;
                imgWidth = maxImgLength;
                imgHeight = imgHeight*rate;
                c.width = imgWidth;
                c.height = imgHeight;
              }
            } else {
              c.width = img.width;
              c.height = img.height;
            }
            ctx.drawImage(img,0,0,imgWidth,imgHeight);
            compressImg = c.toBlob(function(blob){
              resolve({
                file:blob,
                name:file.name
              });
              console.log((file.size/1024).toFixed(2)+'kb => ' + (blob.size/1024).toFixed(2) + 'kb');
            },file.raw.type,qua);
          }
        },200);
      };
    });
  }
}
