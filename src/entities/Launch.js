class Launch {
  constructor([name, details, id, stringDate, datePrecision]){
    this._name = name;
    this._details = details;
    this._id = id;
    this._datePrecision = datePrecision;
    this._dateUtc = new Date(stringDate);
  }
  get name () {return this._name}
  get details () {return this._details}
  get id () {return this._id}
  get dateUtc () {return this._dateUtc}
  get datePrecision () {return this._datePrecision}
};

export default Launch;
