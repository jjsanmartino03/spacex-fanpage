class Launch {
  constructor([name, details, id, date, stringDate]){
    this._name = name;
    this._details = details;
    this._id = id;
    this._stringDate = stringDate;
    this._date = date;
  }
  get name () {return this._name}
  get details () {return this._details}
  get id () {return this._id}
  get date () {return this._date}
  get stringDate () {return this._stringDate}
};

export default Launch;
