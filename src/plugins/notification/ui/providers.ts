import { addNavMenuSection } from "@vendure/admin-ui/core";

const addMenu = addNavMenuSection(
  {
    id: "notifications",
    label: "Send Notification",
    items: [
      {
        id: "all-user",
        label: "All Users",
        routerLink: ["/extensions/notify/all"],
        icon: "users",
      },
      {
        id: "single-user",
        label: "Single User",
        routerLink: ["/extensions/notify/user"],
        icon: "user",
      },
    ],
  }
  // "settings"
);

export default [addMenu];
