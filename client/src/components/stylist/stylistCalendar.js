import { EditingState, ViewState } from "@devexpress/dx-react-scheduler";
import { useHistory, useParams, Link } from "react-router-dom";
import {
  AllDayPanel,
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  DayView,
  EditRecurrenceMenu,
  MonthView,
  Scheduler,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import * as React from "react";
import AddAvailability from "./AddAvailability";
export default class StylistCalendar extends React.PureComponent {
  state = {
    data: [],
    stylist: {},
    currentDate: new Date().toLocaleString(),
    URL: `${process.env.REACT_APP_BACKEND}`,
    stylistId: this.props.match.params.id,
    addedAppointment: {},
    appointmentChanges: {},
    editingAppointment: undefined,
  };
  constructor(props) {
    super(props);
    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

  getStylistByID = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.REACT_APP_BACKEND}/api/stylists/appointments/${id}`)
        .then((x) => resolve(x.data.appointments))
        .catch((e) => {
          alert(e);
          reject();
        });
    });
  };

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }

      return { data };
    });
  }
  render() {
    const {
      currentDate,
      data,
      addedAppointment,
      appointmentChanges,
      editingAppointment,
    } = this.state;
    return (
      <div
        className="container"
        style={{ marginTop: "3%", marginBottom: "3%" }}
      >
        <div className="row justify-content-between mb-2">
          <h2 className="col-10"> Your Calendar </h2>
          <Link
            to={`/stylists/addAvailability/stylistId=${this.state.stylistId}`}
            className="col-2 btn btn-primary p-1 align-self-center"
          >
            Add availability
          </Link>
        </div>

        <div className="row">
          <div className="col">
            <Paper>
              <Scheduler data={data} height={660}>
                <ViewState
                  defaultCurrentDate={currentDate}
                  defaultCurrentViewName="Week"
                />
                <EditingState
                  onCommitChanges={this.commitChanges}
                  addedAppointment={addedAppointment}
                  onAddedAppointmentChange={this.changeAddedAppointment}
                  appointmentChanges={appointmentChanges}
                  onAppointmentChangesChange={this.changeAppointmentChanges}
                  editingAppointment={editingAppointment}
                  onEditingAppointmentChange={this.changeEditingAppointment}
                />
                <DayView startDayHour={9} endDayHour={18} />
                <WeekView startDayHour={9} endDayHour={19} />
                <MonthView startDayHour={9} endDayHour={19} />
                <Toolbar />
                <ViewSwitcher />
                <AllDayPanel />
                <EditRecurrenceMenu />
                <ConfirmationDialog />
                <Appointments />
                <AppointmentTooltip showOpenButton showDeleteButton />
                <AppointmentForm />
              </Scheduler>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.getStylistByID(this.state.stylistId).then((appointments) =>
      this.setState({ appointments }, () => {
        appointments = appointments.filter(
          (appointment) => appointment.user === null
        );
        this.setState({ data: appointments });
      })
    );
  }
}
