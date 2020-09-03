class Launch {
  constructor([name, details, id, date, stringDate, datePrecision]){
    this._name = name;
    this._details = details;
    this._id = id;
    this._stringDate = stringDate;
    this._date = date;
    this._datePrecision = datePrecision;
  }
  get name () {return this._name}
  get details () {return this._details}
  get id () {return this._id}
  get date () {return this._date}
  get stringDate () {return this._stringDate}
  get datePrecision () {return this._datePrecision}
};

export default Launch;
