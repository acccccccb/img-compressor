export default function(file,maxLength,quality){
  if(!file || typeof file != 'object' || !file.type || file.type.indexOf('image')<0) {
    return new Promise((resolve,reject)=>{
      resolve(new Error('simplify-img-compressor:必须传入图片类型的文件对象'));
    });
  } else {
    let maxImgLength = maxLength?maxLength:1200;// 最长边的长度最大值
    let qua = quality?quality:0.6;// 压缩质量
    let reader = new FileReader();
    let compressImg = new Image();
    reader.readAsDataURL(file);
    return new Promise((resolve,reject) => {
      reader.onload = function(e) {
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
                name:file.name,
                quality:qua,
                maxImgLength:maxImgLength,
                afterCompressorSize:(blob.size/1024).toFixed(2) + 'kb',
                beforeCompressorSize:(file.size/1024).toFixed(2) + 'kb',
                dataURL:c.toDataURL(),
              });
            },file.type,qua);
          }
        },200);
      };
    });
  }
}
