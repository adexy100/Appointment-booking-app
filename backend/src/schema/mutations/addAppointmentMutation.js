const graphql = require("graphql");
const mongoose = require("mongoose");
const AppointmentType = require("../types/AppointmentType");
const ClientInput = require("../types/inputs/ClientInput");
const ServiceInput = require("../types/inputs/ServiceInput");
const Client = require("../../models/client");
const Appointment = require("../../models/appointment");
const moment = require("moment");
const {
  ICalendar,
  YahooCalendar,
  GoogleCalendar,
  OutlookCalendar,
} = require("datebook");
const mjmlUtils = require("mjml-utils");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const Notification = require("../../models/notification");
const Employee = require("../../models/employee");

// Used to normalize phone numbers for use by Twilio
const phone = require("phone");

// Hide usernames and passwords
require("dotenv").config();

const { GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

const addAppointmentMutation = {
	type: AppointmentType,
	args: {
	    date: { type: new GraphQLNonNull(GraphQLString) },
	    startTime: { type: new GraphQLNonNull(GraphQLString) },
	    morningOrEvening: { type: new GraphQLNonNull(GraphQLString) },
	    endTime: { type: new GraphQLNonNull(GraphQLString) },
	    duration: { type: new GraphQLNonNull(GraphQLInt) },
	    price: { type: new GraphQLNonNull(GraphQLInt) },
	    client: { type: new GraphQLList(ClientInput) },
	    professional: { type: new GraphQLNonNull(GraphQLString) },
	    services: { type: new GraphQLList(ServiceInput) },
	    bookedWithCardID: { type: GraphQLString },
	    notes: { type: GraphQLString },
	  },
	async resolve(parent, args, context) {
		const foundClient = await Client.findOne({
			email: arg.client[0].email,
			phoneNumber: args.client[0].phoneNumber,
		});

		let appt_res;

		const createEventObject = (appointment) => {
	      const eventObject = {
	        title: "RachyBeauty Appointment",
	        location: "10 Makinde St., Alausa, LAGOS",
	        description: appointment
	          ? (appointment.services[0].name
	              ? appointment.services[0].name === "Casual"
	                ? "Chemical Peel"
	                : appointment.services[0].name
	              : "") +
	            (appointment.services[0].name.includes("Premium")
	              ? " Occassional"
	              : " Facial Beauty")
	          : "",
	        start: appointment
	          ? moment(
	              moment(appointment.date, "LL")
	                .format("LLLL")
	                .split(" ")
	                .slice(
	                  0,
	                  moment(appointment.date, "LL").format("LLLL").split(" ")
	                    .length - 2
	                )
	                .join(" ") +
	                " " +
	                appointment.startTime +
	                " " +
	                appointment.morningOrEvening,
	              "LLLL"
	            ).format()
	          : "",
	        end: appointment
	          ? moment(
	              moment(appointment.date, "LL")
	                .format("LLLL")
	                .split(" ")
	                .slice(
	                  0,
	                  moment(appointment.date, "LL").format("LLLL").split(" ")
	                    .length - 2
	                )
	                .join(" ") +
	                " " +
	                appointment.startTime +
	                " " +
	                appointment.morningOrEvening,
	              "LLLL"
	            )
	              .add(appointment.duration, "minutes")
	              .format()
	          : "",
	      };

	      return eventObject;
	    };
	}
}

module.exports = addAppointmentMutation;