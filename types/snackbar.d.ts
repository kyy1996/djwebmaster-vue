export interface SnackbarInstanceProp {
  text: string;
  title?: string;
  autoHeight?: boolean;
  multiLine?: boolean;
  closeDelay?: number;
  vertical?: boolean;
  showCloseBtn?: boolean;
  color: string;
  visible?: boolean;
  removingTimeout?: number | undefined;
  accept?: Function | undefined;
  reject?: Function | undefined;
}

export type SnackbarInstanceFunction = (message: string, title: string, props: Partial<SnackbarInstanceProp>) => {};
declare module 'vue/types/vue' {
  interface Vue {
    $snackbar: {
      info: SnackbarInstanceFunction;
      error: SnackbarInstanceFunction;
      success: SnackbarInstanceFunction;
      warning: SnackbarInstanceFunction;
      remove: Function
    };
  }
}
