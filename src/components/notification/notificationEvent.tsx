import { ReactNode } from "react";
import { ProgressListItem } from "./progress";
import { components } from "@/network/omc/generated";
import { StatusBadge } from "./StatusBadge";
import { getStatusColor } from "./helpers/getStatusColor";

const NotificationEvent = ({
  children,
  status,
  timestamp,
}: {
  children: ReactNode;
  status: components["schemas"]["DeliveryStatuses"];
  timestamp: string;
}) => {
  const statusColor = getStatusColor(status);

  return (
    <ProgressListItem
      style={
        {
          "--progressBgColor": `var(${statusColor}-50)`,
          "--progressColor": `var(${statusColor}-500)`,
        } as React.CSSProperties
      }
      className="col-span-3 grid grid-cols-subgrid"
    >
      <StatusBadge>{status}</StatusBadge>
      <div>{children}</div>
      <div className="text-gray-500 italic">
        {new Date(timestamp).toLocaleString("nl-NL")}
      </div>
    </ProgressListItem>
  );
};

export default NotificationEvent;
