let trator;
let alimentos = [];
let pontuacao = 0;
let tempo = 60; // segundos
let timerAtivo = true;

function setup() {
  createCanvas(800, 400);
  trator = new Trator();
  for (let i = 0; i < 5; i++) {
    alimentos.push(new Alimento());
  }
  setInterval(contarTempo, 1000);
}

function draw() {
  background(100, 200, 100); // verde do campo

  // Desenhar cidade
  fill(180);
  rect(600, 0, 200, height);
  fill(0);
  textSize(16);
  text("Cidade", 640, 30);

  // Desenhar campo
  fill(255);
  text("Campo", 50, 30);

  trator.mostrar();
  trator.mover();

  for (let alimento of alimentos) {
    alimento.mostrar();
  }

  verificarColisao();

  fill(0);
  textSize(18);
  text("Pontuação: " + pontuacao, 10, height - 10);
  text("Tempo: " + tempo, width - 120, height - 10);

  if (tempo <= 0) {
    noLoop();
    fill(255, 0, 0);
    textSize(32);
    text("Tempo Esgotado!", width / 2 - 100, height / 2);
  }
}

function contarTempo() {
  if (timerAtivo && tempo > 0) {
    tempo--;
  }
}

function verificarColisao() {
  for (let i = alimentos.length - 1; i >= 0; i--) {
    if (dist(trator.x, trator.y, alimentos[i].x, alimentos[i].y) < 30) {
      if (!alimentos[i].coletado) {
        alimentos[i].coletado = true;
        trator.carregando = true;
      }
    }
  }

  if (trator.x > 600 && trator.carregando) {
    pontuacao += 10;
    trator.carregando = false;
    alimentos = alimentos.filter(a => !a.coletado);
    alimentos.push(new Alimento());
  }
}

class Trator {
  constructor() {
    this.x = 100;
    this.y = height / 2;
    this.carregando = false;
  }

  mostrar() {
    fill(this.carregando ? 'orange' : 'blue');
    rect(this.x, this.y, 40, 30);
  }

  mover() {
    if (keyIsDown(LEFT_ARROW)) this.x -= 3;
    if (keyIsDown(RIGHT_ARROW)) this.x += 3;
    if (keyIsDown(UP_ARROW)) this.y -= 3;
    if (keyIsDown(DOWN_ARROW)) this.y += 3;

    // Limites da tela
    this.x = constrain(this.x, 0, width - 40);
    this.y = constrain(this.y, 0, height - 30);
  }
}

class Alimento {
  constructor() {
    this.x = random(50, 550);
    this.y = random(50, height - 50);
    this.coletado = false;
  }

  mostrar() {
    if (!this.coletado) {
      fill('yellow');
      ellipse(this.x, this.y, 20, 20);
    }
  }
}
