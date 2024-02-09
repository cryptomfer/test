const phi = 1.618; // Nombre d'or
let cells = [];
let colors;
let glitching = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(5); // Arrière-plan gris foncé
  initGrid();
}

function draw() {
  background(5);
  for (let cell of cells) {
    if (glitching) {
      // Appliquer un effet de glitch
      fill(random(colors));
      rect(cell.x + random(-5, 5), cell.y + random(-5, 5), cell.cellWidth + random(-5, 5), cell.cellHeight + random(-5, 5));
    } else {
      // Afficher normalement
      fill(cell.color);
      rect(cell.x, cell.y, cell.cellWidth, cell.cellHeight);
    }
  }
}

function initGrid() {
  // Réinitialiser le tableau des cellules
  cells = [];

  // Taille de la zone de dessin (un tiers de la fenêtre)
  let drawWidth = windowWidth / 3;
  let drawHeight = windowHeight / 3;
  let startX = (windowWidth - drawWidth) / 2;
  let startY = (windowHeight - drawHeight) / 2;

  let cols = int(random(6, 36));
  let rows = int(random(6, 36));
  let x = startX;
  let y = startY;

  colors = [color(0, 255, 0), color(255, 0, 0), color(0, 0, 255), color(0), color(255)]; 

  let remainingWidth = drawWidth;

  for (let i = 0; i < cols; i++) {
    let cellWidth = (i == cols - 1) ? remainingWidth : random(remainingWidth / phi, remainingWidth / 3);
    remainingWidth -= cellWidth;
    let remainingHeight = drawHeight;

    for (let j = 0; j < rows; j++) {
      let cellHeight = (j == rows - 1) ? remainingHeight : random(remainingHeight / phi, remainingHeight / 3);
      remainingHeight -= cellHeight;

      cells.push({ x, y, cellWidth, cellHeight, color: random(colors) });
      y += cellHeight;
      
      if (j == rows - 1) {
        y = startY;
      }
    }
    x += cellWidth;
  }
}

function mousePressed() {
  // Basculer l'état de l'effet de glitch
  glitching = !glitching;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initGrid(); // Redessiner le quadrillage lors du redimensionnement de la fenêtre
}
