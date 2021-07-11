import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./timetable.css";
import axios from "axios";

function Timetable() {
  const [data, setData] = useState({});
  let daysArray = [];

  useEffect(() => {
    axios
      .get("/student/timetable", {
        headers: {
          "auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  if (data !== undefined) {
    for (const key in data.day) {
      const innerArray = [];
      innerArray.push(key);
      data.day[key].map((item) => {
        return innerArray.push(item);
      });
      daysArray.push(innerArray);
    }
  }

  return (
    <div>
      {data === undefined ? (
        <div style={{ color: "white", fontSize: "20px", textAlign: "center" }}>
          TIMETABLE HASN'T BEEN UPLOADED YET.
        </div>
      ) : (
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Day</th>
              <th>09:00 - 11:00 hrs</th>
              <th>11:10 - 13:10 hrs</th>
              <th>15:10 - 17:10 hrs</th>
              <th>17:10 - 19:10 hrs</th>
            </tr>
          </thead>
          <tbody>
            {daysArray.map((outer, keyOuter) => {
              return (
                <tr key={keyOuter} id={keyOuter}>
                  {outer.map((inner, keyInner) => {
                    return (
                      <td key={keyInner} id={keyInner}>
                        {inner}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Timetable;
