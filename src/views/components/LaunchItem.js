import React from "react";
import { Card } from "react-bootstrap";

const displayBasedOnPrecision = {
  hour: (date) => date.toLocaleString(
    "default",
    { dateStyle: "medium", timeStyle: "long", timeZoneName: "long", }).replace(/(\d{1,2}:\d{2}):\d{2}/, `$1`),

  day: (date) => date.toLocaleString(
    "default",
    { dateStyle: "medium", timeZone: "UTC" }),

  month: (date) => date.toLocaleString(
    "default",
    { month: "short", year: "numeric" }),

  year: (date) => date.toLocaleString(
    "default",
    { year: "numeric" }),

  quarter: (date) => {
    let quarter = Math.floor((date.getMonth()+1)/3);
    let year = date.getFullYear();
    return `Quarter ${quarter} ${year}`;
  },
  half: (date) => ((date.getMonth()+1)/6 > 1 ? "1st Half " : "2nd Half ") + date.getFullYear
}

function LaunchItem(props) {
  let datePrecision = props.launch.datePrecision;
  return (
    <Card bg="light" className="shadow-lg border-secondary" text="dark" >
      <Card.Body>
        <Card.Title as="h2" className="bg">{props.index + 1}. {props.launch.name}</Card.Title>
        <Card.Text>
          {props.launch.details ?
            props.launch.details :
            "Details not given yet"}
        </Card.Text>
      </Card.Body>
      <Card.Footer>{displayBasedOnPrecision[datePrecision] ? displayBasedOnPrecision[datePrecision](props.launch.dateUtc) : props.launch.dateUtc.toString()}</Card.Footer>
    </Card>
  );
}

export default LaunchItem;
