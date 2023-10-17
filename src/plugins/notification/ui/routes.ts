import { registerRouteComponent } from "@vendure/admin-ui/core";
import { NotificationComponent } from "./components/notification/notification.component";

export default [
  registerRouteComponent({
    component: NotificationComponent,
    path: "all",
    title: "Send Notification",
  }),
  registerRouteComponent({
    component: NotificationComponent,
    path: "user",
    title: "Send Notification To Single User",
  }),
];
