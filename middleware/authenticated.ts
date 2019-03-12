export default function ({ store, redirect }) {
  if (!store.state.user.isLogin) {
    return redirect('/common/user/login');
  }
}
