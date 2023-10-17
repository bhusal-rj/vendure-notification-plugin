import { SharedModule, NotificationService } from "@vendure/admin-ui/core";
import { Component } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Apollo } from "apollo-angular";
import { Router } from "@angular/router";
import gql from "graphql-tag";

@Component({
  selector: "notification",
  templateUrl: "./notification.component.html",
  standalone: true,
  imports: [SharedModule],
})
export class NotificationComponent {
  allNotificationSent = false;
  uri = "";
  notificationForm: FormGroup = new FormGroup({});
  actionBarText = "";
  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.uri = router.url.split("/extensions/notify")[1];

    this.notificationForm = this.formBuilder.group({
      title: ["", Validators.required],
      message: ["", Validators.required],
      id: null,
    });
  }

  async sendNotification(notificationInput: any) {
    try {
      const { title, message, id } = notificationInput;

      let sendNotification;
      let input: { title: string; message: string; id?: number } = {
        title,
        message,
      };

      if (!id) {
        sendNotification = gql`
          mutation sendNotificationToAllUser(
            $input: notificationInputToAllUser!
          ) {
            sendNotificationToAllUser(input: $input) {
              id
            }
          }
        `;
      } else {
        input.id = id;
        sendNotification = gql`
          mutation sendNotificationToSingleUser(
            $input: notificationInputToSingleUser!
          ) {
            sendNotificationToSingleUser(input: $input) {
              id
            }
          }
        `;
      }

      this.apollo
        .mutate({
          mutation: sendNotification,
          variables: {
            input: {
              ...input,
            },
          },
        })
        .subscribe(({ data }) => {
          if (id) {
            this.notificationService.success(
              `Notification Sent to the User with ID ${id}`
            );
          } else {
            this.notificationService.success(`Notifications Sent to All Users`);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  get notificationFormControl() {
    return this.notificationForm.controls;
  }

  onSubmit(): void {
    const { title, message, id } = this.notificationForm.value;

    this.notificationForm.setValue({
      title: "",
      message: "",
      id: null,
    });
    this.sendNotification({ title, message, id });
  }
}
