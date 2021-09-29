const graphql = require("graphql");
const addAppointmentMutation = require("./mutations/addAppointmentMutation");
const confirmAppointmentMutation = require("./mutations/confirmAppointmentMutation");
const addPersonalEventMutation = require("./mutations/addPersonalEventMutation");
const addClientMutation = require("./mutations/addClientMutation");
const deleteClientMutation = require("./mutations/deleteClientMutation");
const addEmployeeMutation = require("./mutations/addEmployeeMutation");
const deleteEmployeeMutation = require("./mutations/deleteEmployeeMutation");
const updateClientsInvalidateTokensMutation = require("./mutations/updateClientInvalidateTokensMutation");
const updateEmployeeInvalidateTokensMutation = require("./mutations/updateEmployeeInvalidateTokensMutation");
const deleteAppointmentMutation = require("./mutations/deleteAppointmentMutation");
const deletePersonalEventMutation = require("./mutations/deletePersonalEventMutation");
const updateAdminPasswordMutation = require("./mutations/updateAdminPasswordMutation");
const updateClientProfilePictureMutation = require("./mutations/updateClientProfilePictureMutation");
const updateAdminProfilePictureMutation = require("./mutations/updateAdminProfilePictureMutation");
const updatePersonalEventMutation = require("./mutations/updatePersonalEventMutation");
const updateClientInformationMutation = require("./mutations/updateClientInformationMutation");
const updateClientIDMutation = require("./mutations/updateClientIDMutation");
const updateUnsavedIDsMutation = require("./mutations/updateUnsavedIDsMutation");
const removeOneUnsavedIDsMutation = require("./mutations/removeOneUnsavedIDsMutation");
const registerClientMutation = require("./mutations/registerClientMutation");
const resetNotificationsMutation = require("./mutations/resetNotificationsMutation");

const { GraphQLObjectType } = graphql;

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAppointment: addAppointmentMutation,
    confirmAppointment: confirmAppointmentMutation,
    addPersonalEvent: addPersonalEventMutation,
    addClient: addClientMutation,
    deleteClient: deleteClientMutation,
    addEmployee: addEmployeeMutation,
    deleteEmployee: deleteEmployeeMutation,
    updateClientInvalidateTokens: updateClientsInvalidateTokensMutation,
    updateEmployeeInvalidateTokens: updateEmployeeInvalidateTokensMutation,
    deleteAppointment: deleteAppointmentMutation,
    deletePersonalEvent: deletePersonalEventMutation,
    updateAdminPassword: updateAdminPasswordMutation,
    updateClientProfilePicture: updateClientProfilePictureMutation,
    updateAdminProfilePicture: updateAdminProfilePictureMutation,
    updatePersonalEvent: updatePersonalEventMutation,
    updateClientInformation: updateClientInformationMutation,
    updateClientID: updateClientIDMutation,
    updateUnsavedIDs: updateUnsavedIDsMutation,
    removeOneUnsavedIDs: removeOneUnsavedIDsMutation,
    registerClient: registerClientMutation,
    resetNotifications: resetNotificationsMutation,
  },
});

module.exports = Mutation;
