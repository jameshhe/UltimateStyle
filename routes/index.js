import * as notebook from "../controllers/notebookController.js";
import * as user from "../controllers/userController.js";
import * as stylist from "../controllers/stylistController.js";
import { errorHandler } from "../middleware/error.js";
import { protectStylist, protectUser } from "../middleware/auth.js";

export default (app) => {
  //GET request

  app.route("/api/notes").get(notebook.getAllNotes).post(notebook.createNote);

  app
    .route("/api/notes/:noteId")
    .get(notebook.getNote)
    .put(notebook.updateNote)
    .delete(notebook.deleteNote);

  app.route("/api/users").get(user.getUsers);
  app.route("/api/users/:id").put(protectUser, user.updateUser);
  app.route("/api/users/change/:userId").post(protectUser, user.changePassword);
  app.route("/api/users/forgotPassword").post(user.forgotPassword);
  app.route("/api/users/resetPassword/:resettoken").put(user.resetPassword);
  app.route("/api/users/register").post(user.createUser);
  app.route("/api/users/login/").post(user.userLogin);
  app
    .route("/api/users/appointments/book/:appointmentId")
    .put(user.bookAppointment);
  app
    .route("/api/users/appointments/cancel/:appointmentId")
    .put(user.cancelAppointment);

  app.route("/api/users/appointments/:id").get(user.getAppointments);
  app.route("/api/users/me").get(protectUser, user.getMe);

  app.route("/api/stylists").get(stylist.getStylists);
  app.route("/api/stylists/search").get(stylist.searchStylist);
  app.route("/api/stylists/me").get(protectStylist, stylist.getMe);
  app
    .route("/api/stylists/:id")
    .put(protectStylist, stylist.updateStylist)
    .get(stylist.getOneStylist);
  app
    .route("/api/stylists/change/:stylistId")
    .post(protectStylist, stylist.changePassword);
  /*
    // PUT /users/appointments/book/:appointmentId
// PUT /users/appointments/cancel/:appointmentId
        bookAppointment
        cancelAppoint
    */
  app.route("/api/stylists/forgotPassword").post(stylist.forgotPassword);
  app
    .route("/api/stylists/resetPassword/:resettoken")
    .put(stylist.resetPassword);
  app.route("/api/stylists/register/").post(stylist.createStylist);
  app.route("/api/stylists/login/").post(stylist.stylistLogin);
  app.route("/api/stylists/services/:id/add").post(stylist.addService);
  app.route("/api/stylists/postReview").post(stylist.postReview);
  app
    .route("/api/stylists/appointments/:id")
    .post(stylist.addAppointment)
    .get(stylist.getAppointments);

  //this one right here, kirk (go to the stylistController for the logic if
  //you want to see)

  app.use(errorHandler);
};

// module.export
