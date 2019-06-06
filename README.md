# img-compressor
图片压缩
### 使用方法
    npm install simplify-img-compressor --save-dev

#### 引入
	import $imgCompressor from 'simplify-img-compressor'
	
#### 压缩
	imgCompressor.(file[,maxImgLength,quality]).then((res)=>{
        // Do something
    });
	
#### 参数说明：
- file：图片文件
- maxImgLength：图片最大长度
- quality：压缩质量

#### 返回参数：
- name：文件名称
- maxImgLength：图片最大长度
- quality：压缩质量
- afterCompressorSize:压缩后大小
- beforeCompressorSize:压缩前大小
- file：压缩后文件对象，类型：blob
- dataURL:压缩后文件的DataURL