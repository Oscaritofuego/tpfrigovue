export default class Produit {

  constructor(id, nom, qte, photo) {

    this._id = id;
    this._nom = nom;
    this._qte = qte;
    this._photo = photo ?? "";
  }

  get postOptions() {
    return this.addRemoveOrPostQtyOption(this.qte, "POST")
  }

  get addQtyOption() {
    return this.addRemoveOrPostQtyOption(this.qte + 1, "PUT")
  }

  get removeQtyOption() {
    return this.addRemoveOrPostQtyOption(this.qte - 1, "PUT")
  }

  addRemoveOrPostQtyOption(qtyToChange, method) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    return {
      method: method,
      headers: myHeaders,
      body: JSON.stringify({id: this.id, nom: this.nom, qte: qtyToChange, photo: this.photo}),
    };
  }


  get id() {
    return this._id;
  }

  get nom() {
    return this._nom;
  }

  get qte() {
    return this._qte;
  }

  get photo() {
    return this._photo;
  }
}
