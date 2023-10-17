import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { NotificationItem } from "../entities/notification.entity";
import { ForbiddenError } from "@vendure/core";

import {
  CustomOrderFields,
  Customer,
  RequestContext,
  TransactionalConnection,
} from "@vendure/core";
import {
  notificationInput,
  notificationInputToAllUser,
  notificationInputToSingleUser,
} from "../types/notification.type";

@Injectable()
export class NotificationService {
  constructor(private connection: TransactionalConnection) {}

  async sendNotification(
    ctx: RequestContext,
    notificationInput: notificationInput,
    customers: Customer[]
  ) {
    // const customerRepository = this.connection.getRepository(ctx, Customer);

    const notificationRepository = this.connection.getRepository(
      ctx,
      NotificationItem
    );
    let newNotification = notificationRepository.create();
    newNotification.customer = [...customers];
    const savedNotification = await notificationRepository.save(
      Object.assign(newNotification, notificationInput)
    );

    return customers;
  }

  async sendNotificationToAll(
    ctx: RequestContext,
    notificationInputToAllUser: notificationInputToAllUser
  ): Promise<Customer[]> {
    const allUsers = await this.connection.getRepository(ctx, Customer).find({
      relations: {
        customFields: {
          notification: {
            customer: true,
          },
        },
      },
    });

    const { input } = notificationInputToAllUser;
    return await this.sendNotification(ctx, input, allUsers);
  }

  async sendNotificationToSingleUser(
    ctx: RequestContext,
    notificationInputToSingleUser: notificationInputToSingleUser
  ) {
    const { input } = notificationInputToSingleUser;
    const user = await this.connection.getRepository(ctx, Customer).findOne({
      where: {
        id: input.id,
      },
    });
    if (user) {
      return this.sendNotification(
        ctx,
        {
          title: input.title,
          message: input.message,
        },
        [user]
      );
    }

    throw new HttpException(
      "No user with given user id",
      HttpStatus.BAD_REQUEST
    );
  }
}
