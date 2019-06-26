import { VBtn, VSnackbar } from 'vuetify/lib';
import { Component, Emit, Vue } from 'vue-property-decorator';
import { CreateElement, VNode } from 'vue';
import { SnackbarInstanceProp } from '~/types';

@Component({
  render (createElement: CreateElement): VNode {
    const buttons: (VNode | string)[] = [];
    if (this['showCloseBtn']) {
      buttons.push(createElement(VBtn, {
        props: {
          flat: true
        },
        on: {
          click: (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            this['close']();
          }
        }
      }, ['关闭']));
    }
    buttons.unshift(this['text']);
    return createElement(VSnackbar, {
      props: {
        autoHeight: this['autoHeight'],
        multiLine: this['multiLine'],
        timeout: this['closeDelay'],
        vertical: this['vertical'],
        color: this['color'],
        value: this['visible']
      },
      on: {
        input: (visible: boolean) => {
          if (!visible) {
            if (this['removingTimeout']) clearTimeout(this['removingTimeout']);
            this['removingTimeout'] = setTimeout(() => {
              this['remove']();
              // 因为v-snack-transition退出动画时间是400毫秒，我们等动画结束了再删除元素dom
            }, 400);
          }
          this.$emit('input', visible);
        }
      }
    }, buttons);
  }
})
class SnackbarInstanceComponent extends Vue {
  text: string = '';
  title?: string = '';
  autoHeight: boolean = false;
  multiLine: boolean = false;
  closeDelay: number = 5000;
  vertical: boolean = false;
  showCloseBtn: boolean = true;
  color: string = 'info';
  visible: boolean = false;
  removingTimeout?: number | undefined;

  @Emit()
  close () {
    this['visible'] = false;
    this.$children[0].$emit('input', false);
  }

  @Emit()
  remove () {
    this.$nextTick(() => {
      this.destroy();
    });
  }

  destroy () {
    this.$el.remove();
    this.$destroy();
  }
}

const instanceConstructor = Vue.extend(SnackbarInstanceComponent);
VSnackbar.newInstance = () => {
  return new instanceConstructor({
    el: document.createElement('div')
  });
};

let snackbarInstance;

function getSnackbarInstance (): SnackbarInstanceComponent {
  snackbarInstance = snackbarInstance || VSnackbar.newInstance();

  return snackbarInstance;
}

const messageList: Partial<SnackbarInstanceProp>[] = [];

function confirm (props: Partial<SnackbarInstanceProp>) {
  messageList.push(props);
  showNextMessage();
}

const showNextMessage = () => {
  const instance = getSnackbarInstance();
  if (!instance.visible && instance.removingTimeout === undefined) {
    if (messageList.length > 0) {
      const props = messageList.shift();
      for (const propsKey in props) {
        if (props.hasOwnProperty(propsKey)) {
          instance[propsKey] = props[propsKey];
        }
      }
      instance.visible = true;
      instance.$on('remove', () => {
        snackbarInstance = null;
        showNextMessage();
      });
      document.body.appendChild(instance.$el);
    }
  }
};

VSnackbar.info = function (message: string, title: string = '', props: Partial<SnackbarInstanceProp> = {}) {
  props.color = 'info';
  props.text = message;
  props.title = title;
  return confirm(props);
};

VSnackbar.success = function (message: string = '操作成功', title: string = '', props: Partial<SnackbarInstanceProp> = {}) {
  props.color = 'success';
  props.text = message;
  props.title = title;
  return confirm(props);
};

VSnackbar.warning = function (message: string, title: string, props: Partial<SnackbarInstanceProp> = {}) {
  props.color = 'warning';
  props.text = message;
  props.title = title;
  return confirm(props);
};

VSnackbar.error = function (message: string = '操作失败', title: string = '', props: Partial<SnackbarInstanceProp> = {}) {
  props.color = 'error';
  props.text = message;
  props.title = title;
  return confirm(props);
};

VSnackbar.confirm = function (message: string, title: string = '', props: Partial<SnackbarInstanceProp> = {}) {
  props.color = 'confirm';
  props.text = message;
  props.title = title;
  return confirm(props);
};

VSnackbar.remove = function () {
  if (!snackbarInstance) {
    return false;
  }

  const instance = getSnackbarInstance();
  if (instance.visible) {
    instance.close();
  }
  messageList.length = 0;
  return true;
};

Vue.use(Vue => {
  Vue.prototype.$snackbar = VSnackbar;
});
