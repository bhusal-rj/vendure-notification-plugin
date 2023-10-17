import { LanguageCode, PluginCommonModule, VendurePlugin } from "@vendure/core";
import { NotificationItem } from "./entities/notification.entity";
import { NotificationService } from "./services/notification.services";
import { notificationApiExtension } from "./api/api-extension";
import "./types";
import { NotificationResolver } from "./api/notification.resolver";

@VendurePlugin({
  imports: [PluginCommonModule],
  entities: [NotificationItem],
  providers: [NotificationService],
  adminApiExtensions: {
    schema: notificationApiExtension,
    resolvers: [NotificationResolver],
  },
  compatibility: "^2.0.0",
  configuration: (config) => {
    config.customFields.Customer.push({
      name: "notification",
      type: "relation",
      list: true,
      entity: NotificationItem,
      internal: true,
    });
    return config;
  },
})
export class NotificationPlugin {}
