let sound;
let fft;

//サウンドファイルをプリロード
function preload() {
sound = loadSound('/sounds/beat.wav');
}

function setup() {
canvas = createCanvas(windowWidth, windowHeight);
colorMode(HSB, 255);
//FFTを初期化
fft = new p5.FFT();
//サウンドファイルをFFTの入力に
fft.setInput(sound);
canvas.position(0,0);//canvasをページの原点に固定
canvas.style('z-index','-1');//canvasを後ろに移動する
}

function draw() {
  blendMode(BLEND);
  background(0);
  //マウスクリックでサウンドループ再生
  if(mouseIsPressed && sound.isPlaying() == false){
  sound.loop();
  }
  noStroke();
  //FFT解析
  let spectrum = fft.analyze();
  blendMode(ADD);
  //結果を色の濃さで描画
  for (i = 0; i < spectrum.length; i++) {
    let hue = map(i, 0, spectrum.length-1, 0, 255);
    let brightness = spectrum[i]/2.0;
    fill(hue, 127, brightness);

    let x = map(i, 0, spectrum.length - 1, width/2, width);
    rect(x, 0, 1, height);

    x = map(i, 0, spectrum.length-1, width/2, 0);
    rect(x, 0, 1, height);

    let y = map(i, 0, spectrum.length-1, height/2, height);
    rect(0, y, width, 1);
    y = map(i, 0, spectrum.length-1, height/2, 0);
    rect(0, y, width, 1);
  }
}