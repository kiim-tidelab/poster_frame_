let mic;

function startMicrophone() {
  mic = new p5.AudioIn();
  mic.start();
  return mic;
}

function volume(mult = 1) {
  try {
    return mic.getLevel() * mult;
  } catch (e) {
    //
  }
}
