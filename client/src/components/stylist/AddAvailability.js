import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
const times = [
  {
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    tS: 9,
    tF: 10,
  },
  {
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    tS: 10,
    tF: 11,
  },
  {
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    tS: 11,
    tF: 12,
  },
  {
    startTime: "12:00 PM",
    endTime: "1:00 PM",
    tS: 12,
    tF: 13,
  },
  {
    startTime: "1:00 PM",
    endTime: "2:00 PM",
    tS: 13,
    tF: 14,
  },
  {
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    tS: 14,
    tF: 15,
  },
  {
    startTime: "3:00 PM",
    endTime: "4:00 PM",
    tS: 15,
    tF: 16,
  },
  {
    startTime: "4:00 PM",
    endTime: "5:00 PM",
    tS: 16,
    tF: 17,
  },
  {
    startTime: "5:00 PM",
    endTime: "6:00 PM",
    tS: 17,
    tF: 18,
  },
];
const days = [
  { day: "Monday" },
  { day: "Tuesday" },
  { day: "Wednesday" },
  { day: "Thursday" },
  { day: "Friday" },
];
export const AddAvailability = () => {
  const currentDate = new Date();
  const [stylist, setStylist] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState({}); //plain object as state
  const stylistId = useParams();
  const URL = `${process.env.REACT_APP_BACKEND}/api`;
  const [day, setDay] = useState(1);
  const [startTime, setStartTime] = useState("");
  let history = useHistory();

  const onSend = () => {
    console.log("FIRST", currentDate);
    const dOTW = currentDate.getDay();
    const newDay = Number(day);
    let newDate = 1;
    if (dOTW > day) {
      console.log("DAY OF THE WEEK", dOTW);
      console.log("DAY", day);
      newDate = currentDate.getDate() + (7 - (5 - day));
      console.log(newDate);
    } else if (dOTW === parseInt(day)) {
      newDate = currentDate.getDate() + 7;
      console.log("DOTW===DAY", currentDate);
      console.log(newDate);
    } else if (dOTW < day) {
      newDate = parseInt(currentDate.getDate()) + parseInt(day) - dOTW;
      console.log(newDate);
    }
    const finalDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      newDate,
      times[startTime].tS,
      0,
      0
    );
    const finalDate2 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      newDate,
      times[startTime].tF,
      0,
      0
    );
    const appointment = {
      stylist: stylistId.id,
      stylistName: `${stylist.firstName}` + `  ${stylist.lastName}`,
      startDate: finalDate,
      endDate: finalDate2,
      location: "Customer's Home",
    };
    const postAppt = async () => {
      console.log("posting appintment", appointment);
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND}/api/stylists/appointments/${stylistId.id}`,
          appointment
        )
        .then((res) => {
          setAppointments(res.data.appointments);
          alert("Appointment added!");
          history.push(`/stylists/stylistCalendar/stylistId=${stylistId.id}`);
        })
        .catch((err) =>
          //   dispatch({
          //     type: GET_ERRORS,
          //     payload: err.response.data
          // })
          console.log("Error upon errors")
        );
    };
    postAppt();
  };
  function handleChangeDay(e) {
    setDay(e.target.value);
  }
  function handleChangeStartTime(e) {
    setStartTime(e.target.value);
  }

  useEffect(() => {
    const fetchStylist = async () => {
      await axios.get(`${URL}/stylists/${stylistId.id}`).then((res) => {
        const stylistData = res.data.stylist;
        setStylist(stylistData);
        setIsLoading(false);
      });
    };
    fetchStylist();
  }, [stylist]);

  useEffect(() => {
    const fetchAppointments = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_BACKEND}/api/stylists/appointments/${stylistId.id}`
        )
        .then((res) => {
          const appts = res.data.appointments;
          setAppointments(appts);
        });
    };
    fetchAppointments();
  }, [appointments]);
  return (
    <>
      <form
        className="container border border-info rounded"
        style={{ width: "50%", height: "50%", marginTop: "3%" }}
      >
        <h3>Add Your Availability for the upcoming week</h3>
        <div className="form-group row">
          <label htmlFor="inputState">Day</label>
          <select
            id="inputState"
            className="form-control"
            onChange={handleChangeDay}
          >
            <option>Choose the available day</option>
            {days.map((items, i) => (
              <option key={i} value={i + 1}>
                {items.day}
              </option>
            ))}
          </select>
          <label htmlFor="inputState">Time</label>
          <select
            id="inputState"
            className="form-control"
            onChange={handleChangeStartTime}
          >
            <option>Add an available time</option>
            {times.map((items, i) => (
              <option key={i} value={i}>
                {items.startTime} - {items.endTime}
              </option>
            ))}
          </select>
        </div>
        <input
          className="btn btn-primary my-2"
          type="button"
          value="Add"
          onClick={() => onSend()}
          text="helloworldAddServices"
        />
      </form>
    </>
  );
};

export default AddAvailability;
