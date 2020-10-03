// const initialState = {
//   edit: {
//     status: null,
//     data: null,
//     changed: null,
//   }
// }

// function editReducer(state = initialState.edit, action) {
//   switch (action.type) {
//     case constants.ADD_CHANGE:
//       const newForm = { ...state.data };
//       newForm[action.fieldName] = action.fieldValue;
//       return {
//         ...state,
//         changed: true,
//         data: newForm,
//       };
//     case constants.SET_UP_EDIT_FORM:
//       return {
//         ...state,
//         changed: false,
//         data: action.form,
//       };
//     case constants.EDIT_FORM_PENDING:
//       return {
//         ...state,
//         status: constants.EDIT_FORM_PENDING,
//       };
//     case constants.EDIT_FORM_SUCCESS:
//       return {
//         ...state,
//         changed: false,
//         data: action.form,
//         status: constants.EDIT_FORM_SUCCESS,
//       };
//     default:
//       return state;
//   }
// }