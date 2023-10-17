import { ID } from "@vendure/core";

export type notificationInput = {
  title: string;
  message: string;
};

export type notificationInputToAllUser = {
  input: notificationInput;
};

export type notificationInputToSingleUser = {
  input: { id: ID } & notificationInput;
};
