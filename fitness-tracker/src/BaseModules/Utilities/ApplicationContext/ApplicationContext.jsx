import AlertComponent from "../../Components/MainCoponents/Alerts/AlertComponent";
import UXComponent from "../../Components/UX/UXComponent/UXComponent";

export const ApplicationContext = {
  modal: {
    setModalValue: UXComponent.setValue,
    getModalValue: UXComponent.getValue,
  },
  config: {},
  notification: AlertComponent.notification,
};
