export default function ({ store, redirect, req }) {
  const loginUrl = '/common/auth/login';

  if (!store.state.user.isLogin && req.url !== loginUrl) {
    return redirect(loginUrl);
  }
}
