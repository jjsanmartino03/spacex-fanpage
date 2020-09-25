class Launch { // The Launch entity, base of this application
  constructor({
    name,
    details,
    id,
    launchDate,
    stringDate,
    date_precision
  }) {
    this._name = name;
    this._details = details;
    this._id = id;
    this._stringDate = stringDate; // The date to be displayed, based on the date precision of the launch
    this._date = launchDate; // The actual date as a Date object
    // TODO see if it is necessary to have stringDate and date and look for other ways to do the same task
    this._datePrecision = date_precision;
  }

  get name() { return this._name }
  get details() { return this._details }
  get id() { return this._id }
  get date() { return this._date }
  get stringDate() { return this._stringDate }
  get datePrecision() { return this._datePrecision }
};

export default Launch;
