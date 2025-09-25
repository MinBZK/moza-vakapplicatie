import { components } from "@/network/omc/generated";

//TODO praat later eens over deze statussen
export const getStatusColor = (
  status?: components["schemas"]["DeliveryStatuses"],
) => {
  switch (status) {
    case "Sending":
    case "Pending":
      return "--color-yellow";

    case "Created":
    case "Delivered":
    case "Sent":
    case "Accepted":
    case "Received":
      return "--color-green";

    case "Cancelled":
    case "PermanentFailure":
    case "TemporaryFailure":
    case "TechnicalFailure":
      return "--color-red";

    case "Unknown":
    default:
      return "--color-gray";
  }
};
