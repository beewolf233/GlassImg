interface OptsType {
  id: string;
  img: string;
  width?: number;
  height?: number;
}
export default class GlassImg {
  boxEle: HTMLElement;
  handEle: HTMLElement;

  constructor(opts: OptsType) {
    this.init(opts);
  }
  // 初始化方法
  init(opts) {
    const boxEle = document.getElementById(opts.id);
    const handEle = document.createElement('div');
    boxEle.style.width = opts.width + 'px';
    boxEle.style.height = opts.height + 'px';
    boxEle.style.position = 'relative';
    boxEle.style.backgroundImage = `url(${opts.img})`;
    boxEle.style.backgroundSize = `cover`;

    handEle.style.width = 200 + 'px';
    handEle.style.height = 200 + 'px';
    handEle.style.position = 'absolute';
    handEle.style.background = 'blue';
    handEle.style.opacity = '0.4';

    boxEle.appendChild(handEle);

    this.boxEle = boxEle;
    this.handEle = handEle;
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
  }
  leave() {
    // this.handEle.style.display = 'none';
  }
  move(e) {
    console.log(e);
    let l = e.offsetX - this.handEle.offsetWidth/2;
    let t = e.offsetY - this.handEle.offsetHeight/2;
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
  }
}