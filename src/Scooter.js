class Scooter {
  constructor(station) {
    this.station = station;
    this.user = null;
    this.nextSerial = 1;
    this.serial = this.nextSerial;
    this.charge = 100;
    this.isBroken = false;
  }
  rent() {
    if (this.charge <= 20) {
      throw new Error("scooter needs to charge");
    }
    if (this.isBroken) {
      throw new Error("scooter needs repair");
    }
    this.station = null;
  }
  dock(station) {
    this.station = station;
    this.user = null;
  }
}

module.exports = Scooter;
