let durata_animazione = 2;
let fps = 60;
let tapStartTime;
let tapDuration = 200;

//

let logo;
let logo_e;
let logo_f;

let sfondi;
let sfondo_corrente;

let bg_color;
let green = "#0e8057";
let violet = "#7790c9";

//carica imm logo
function preload() {
  logo = loadImage("assets/logo.png");
  logo_e = loadImage("assets/logo_e.png");
  logo_f = loadImage("assets/logo_f.png");

  sfondi = [
    loadImage("background/lab_1.jpg"),
    loadImage("background/lab_2.jpg"),
    loadImage("background/lab_3.jpg"),
    loadImage("background/lab_4.jpg"),
    loadImage("background/lab_5.jpg"),
  ];

  bg_color = random([green, violet]);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fps);

  sfondo_corrente = random(sfondi);
}

let durata_effettiva_animazione = durata_animazione * fps;
let tempo_trascorso_animazione = 0;
let animazione_reverse = false;
let percentuale_animazione;

let easing = BezierEasing(0.6, 0, 0.735, 0.045);

function draw() {
  background("white");

  let dimensione_logo = width / 6;

  tint(bg_color);
  image(
    sfondo_corrente,
    0,
    0,
    width,
    height,
    0,
    0,
    sfondo_corrente.width,
    sfondo_corrente.height,
    COVER
  );
  noTint();

  //

  if (animazione_reverse == false) {
    if (tempo_trascorso_animazione < durata_effettiva_animazione) {
      tempo_trascorso_animazione += 1;
    }
  } else {
    if (tempo_trascorso_animazione > 0) {
      tempo_trascorso_animazione -= 1;
    }
  }

  percentuale_animazione = easing(
    tempo_trascorso_animazione / durata_effettiva_animazione
  );

  // tempo_trascorso_animazione = constrain(
  // tempo_trascorso_animazione, 0, durata_effettiva_animazione);

  //

  let spessore_h_max = (width - dimensione_logo) / 2;
  let spessore_v_max = (height - dimensione_logo) / 2;

  let spessore_h = percentuale_animazione * spessore_h_max;
  let spessore_v = percentuale_animazione * spessore_v_max;

  let sotto_y = height - spessore_v;

  fill("white");

  stroke("black");
  strokeWeight(5);

  // rettangolo orizzontale sotto
  rect(0, sotto_y, width, spessore_v);

  // rettangolo orizzontale sopra
  rect(0, 0, width, spessore_v);

  // rettangolo viola sx
  rect(0, 0, spessore_h, height);

  // rettangolo viola dx
  rect(width - spessore_h, 0, spessore_h, height);

  //

  // logo

  let margine_logo = dimensione_logo / 10;
  let logo_y = height - spessore_v - dimensione_logo;

  stroke("black");
  fill("white");
  strokeWeight(5);
  rect(spessore_h, logo_y, dimensione_logo, dimensione_logo);

  image(
    logo,
    spessore_h + margine_logo,
    logo_y + margine_logo,
    dimensione_logo - 2 * margine_logo,
    dimensione_logo - 2 * margine_logo
  );

  //text museo
  let w_m = spessore_h;
  let h_m = height - spessore_h;
  let m_m = 30;
  let g_m = createGraphics(w_m, h_m);

  let cx_m = w_m / 2;
  let cy_m = h_m / 2;
  let t_m = "Museo della Civiltà del Lavoro";
  g_m.textAlign(CENTER);
  let sides_font_size = getFontSizeByWidth(
    t_m,
    height - spessore_h_max - 2 * m_m
  );
  g_m.textSize(sides_font_size);

  if (w_m > m_m && h_m > m_m) {
    g_m.translate(cx_m, cy_m);
    g_m.rotate(HALF_PI);
    g_m.text(t_m, 0, (g_m.textAscent() / 2) * 0.9);
    image(g_m, 0, spessore_h, w_m, h_m);
  }

  noFill();
  rect(0, spessore_h, w_m, h_m);

  //f
  if (spessore_h > 0) {
    image(logo_f, 0, 0, spessore_h, spessore_h);

    image(
      logo_e,
      width - spessore_h,
      height - spessore_h,
      spessore_h,
      spessore_h
    );
  }
  //e
  rect(width - spessore_h, height - spessore_h, spessore_h, spessore_h);

  //text Instant
  let w_i = spessore_h;
  let h_i = height - spessore_h;
  let m_i = m_m;
  let g_i = createGraphics(w_i, h_i);

  let cx_i = spessore_h / 2;
  let cy_i = h_i / 2;
  let t_i = "Instant City";

  if (w_i > m_i && h_i > m_i) {
    g_i.textAlign(CENTER);
    g_i.textSize(sides_font_size);
    g_i.translate(cx_i, cy_i);
    g_i.rotate(HALF_PI);
    g_i.text(t_i, 0, (g_i.textAscent() / 2) * 0.9);
    image(g_i, width - spessore_h, 0, w_i, h_i);
  }

  noFill();
  rect(0, spessore_h, w_i, h_i);
}

function mouseClicked() {
  animazione_reverse = !animazione_reverse;
  sfondo_corrente = random(sfondi);
}

function getFontSizeByWidth(testo, larghezza) {
  push();
  let test_size = 10;
  textSize(test_size);
  let test_width = textWidth(testo);
  pop();
  return (test_size / test_width) * larghezza;
}

function touchStarted() {
  mouseClicked();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
