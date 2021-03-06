interface OptsType {
  id: string;
  img: string;
  width?: number;
  height?: number;
}
export default class GlassImg {
  boxEle: HTMLElement;
  handEle: HTMLElement;
  bigImgEle: HTMLElement;
  imgEle: HTMLImageElement;
  $imgWidth: number;
  $imgHeight: number;
  $scaleX: number;
  $scaleY: number;
  $boxWidth: number;
  $boxHeight: number;
  constructor(opts: OptsType) {
    this.init({
      width: '400px',
      height: '400px',
      ...opts
    });
  }
  // 初始化方法
  init(opts) {
    const that = this;
    const boxEle = document.getElementById(opts.id);
    const handEle = document.createElement('div');
    const bigImgEle = document.createElement('div');
    const imgEle = document.createElement('img');
    
    this.$boxWidth = opts.width;
    this.$boxHeight = opts.height;
    imgEle.src = opts.img;
    imgEle.style.position = 'absolute';
    imgEle.style.top = 0 + 'px';
    imgEle.style.left = 0 + 'px';
    imgEle.onload = () => {
      that.imgLoad(imgEle, handEle);
      // that.$imgWidth = imgEle.width;
      // that.$imgHeight = imgEle.height;
      // that.$scaleX = opts.width/imgEle.width;
      // that.$scaleY = opts.height/imgEle.height;

      // handEle.style.width = opts.width * that.$scaleX + 'px';
      // handEle.style.height = opts.height * that.$scaleY  + 'px';
      // handEle.style.position = 'absolute';
      // handEle.style.background = 'blue';
      // handEle.style.opacity = '0.4';
      // handEle.style.display = 'none';
    };
    
    boxEle.style.width = opts.width + 'px';
    boxEle.style.height = opts.height + 'px';
    boxEle.style.position = 'relative';
    boxEle.style.backgroundImage = `url(${opts.img})`;
    boxEle.style.backgroundSize = `cover`;

    
    bigImgEle.style.width = opts.width + 'px';
    bigImgEle.style.height = opts.height + 'px';
    bigImgEle.style.position = 'absolute';
    bigImgEle.style.overflow = 'hidden';
    bigImgEle.style.left = boxEle.offsetLeft + opts.width + 'px';
    bigImgEle.style.top = 0 + 'px';
    bigImgEle.style.display = 'none';

    boxEle.appendChild(handEle);
    boxEle.appendChild(bigImgEle);

    
    bigImgEle.appendChild(imgEle);

    this.boxEle = boxEle;
    this.handEle = handEle;
    this.bigImgEle = bigImgEle;
    this.imgEle = imgEle;

    this.addEvent();
  }

  addEvent() {
    const that = this;
    this.boxEle.onmouseover = () => {
      this.over();
    }
    this.boxEle.onmouseleave = () => {
      this.leave();
    }
    this.boxEle.onmousemove = (event) => {
      const e = event || window.event;
      this.move(e);
    }
  }

  over() {
    this.handEle.style.display = 'block';
    this.bigImgEle.style.display = 'block';
  }
  leave() {
    this.handEle.style.display = 'none';
    this.bigImgEle.style.display = 'none';
  }
  move(e) {
    let l = e.clientX - this.boxEle.offsetLeft - this.handEle.offsetWidth/2;
    let t = e.clientY - this.boxEle.offsetTop - this.handEle.offsetHeight/2;
    if (l < 0) l = 0;
    if (t < 0) t = 0;
    if (l > this.boxEle.offsetWidth - this.handEle.offsetWidth) {
      l = this.boxEle.offsetWidth - this.handEle.offsetWidth;
    };
    if (t > this.boxEle.offsetHeight - this.handEle.offsetHeight) {
      t = this.boxEle.offsetHeight - this.handEle.offsetHeight;
    };
    this.handEle.style.left = l + 'px';
    this.handEle.style.top = t + 'px';
    this.imgEle.style.left = -l/this.$scaleX + 'px';
    this.imgEle.style.top = -t/this.$scaleY + 'px';
  }
  changeImg(path) {
    const that = this;
    (this.imgEle as HTMLImageElement).src = path;
    this.boxEle.style.backgroundImage = `url(${path})`;
    this.imgEle.onload = () => {
      that.imgLoad(that.imgEle, that.handEle);
    }
  }
  imgLoad(imgEle, handEle) {
    this.$imgWidth = imgEle.width;
    this.$imgHeight = imgEle.height;
    this.$scaleX = this.$boxWidth/imgEle.width;
    this.$scaleY = this.$boxHeight/imgEle.height;

    handEle.style.width = this.$boxWidth * this.$scaleX + 'px';
    handEle.style.height = this.$boxHeight * this.$scaleY  + 'px';
    handEle.style.position = 'absolute';
    handEle.style.background = 'blue';
    handEle.style.opacity = '0.4';
    handEle.style.display = 'none';
  }
}