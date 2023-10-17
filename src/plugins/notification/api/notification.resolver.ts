import { Resolver, Mutation, Args } from "@nestjs/graphql";
import {
  Allow,
  Ctx,
  Customer,
  Permission,
  RequestContext,
  Transaction,
} from "@vendure/core";
import {
  notificationInputToAllUser,
  notificationInputToSingleUser,
} from "../types/notification.type";
import { NotificationService } from "../services/notification.services";

@Resolver()
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}
  @Transaction()
  @Allow(Permission.SuperAdmin)
  @Mutation()
  sendNotificationToAllUser(
    @Ctx() ctx: RequestContext,
    @Args() notifcationInputToallUser: notificationInputToAllUser
  ) {
    return this.notificationService.sendNotificationToAll(
      ctx,
      notifcationInputToallUser
    );
  }

  @Transaction()
  @Allow(Permission.SuperAdmin)
  @Mutation()
  async sendNotificationToSingleUser(
    @Ctx() ctx: RequestContext,
    @Args() notificationInputToSingleUser: notificationInputToSingleUser
  ): Promise<Customer> {
    const customer =
      await this.notificationService.sendNotificationToSingleUser(
        ctx,
        notificationInputToSingleUser
      );
    return customer[0];
  }
}
