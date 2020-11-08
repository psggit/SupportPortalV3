/* eslint-disable no-undef */
import App from "./App";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://03686b7e99b84b0594a962b4e2b30e43@sty.hipbar.com/14",
  environment: ARGS_SENTRY_ENV,
  release: ARGS_SENTRY_RELEASE,
});

export { App };
