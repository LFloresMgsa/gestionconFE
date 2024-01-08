import { authHeader, handleResponse } from '../helpers';
import Fetch from '../helpers/Fetch';

const signingRequestService = {
  getRequestSummaryForAssignment: function (requestID) {
    const options = { headers: authHeader() };
    const params = {};
    const url = `/tu-end-point/.../${requestID}`;
    return Fetch.get(url, params, options).then(handleResponse);
  },

  assignAgentToRequest: function (requestID, agentPublicID, action) {
    const options = { headers: authHeader() };
    const params = { agentPublicID: agentPublicID, action: action };
    const url = `/tu-end-point/.../${requestID}`;
    return Fetch.update(url, params, options).then(handleResponse);
  },

  getAgentAvailRequestEmailTemplate: async function (requestID) {
    const options = { headers: authHeader() };
    const params = { requestID: requestID };
    const url = `/tu-end-point/...`;
    return Fetch.get(url, params, options).then((res) =>
      handleResponse(res, false)
    );
  },

  sendAvailabilityRequest: function (requestID, data) {
    const options = { headers: authHeader(), body: JSON.stringify(data) };
    const params = { requestID: requestID };
    const url = `/tu-end-point/...`;
    return Fetch.post(url, params, options).then((res) =>
      handleResponse(res, false)
    );
  },

  validateAvailabilityRequestToken: async function (publicId, encryption) {
    const options = { headers: authHeader() };
    const params = { publicId: publicId, encryption: encryption };
    const url = `/tu-end-point/...`;
    return Fetch.post(url, params, options).then((res) =>
      handleResponse(res, false)
    );
  },

  saveCustomInfoOnNotaryAssign: function (requestID, feesAndCustom) {
    const options = { headers: authHeader(), body: feesAndCustom };
    const params = { requestID: requestID };
    const url = `/tu-end-point/...`;
    return Fetch.update(url, params, options).then(handleResponse);
  },
};

export { signingRequestService };
