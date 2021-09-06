export const PUBLIC = {
  route: '/public',
  link: () => '/public',
};

export const PRIVATE = {
  route: '/private',
  link: () => '/private',
};

export const USERS = {
  route: `${PRIVATE.route}/users`,
  link: () => `${PRIVATE.link()}/users`,
};

export const USERS_EDIT = {
  route: `${PRIVATE.route}/users/edit/:id`,
  link: ({ id }) => `${PRIVATE.link()}/users/edit/${id}`
};

export const SIGN_IN = {
  route: `${PUBLIC.route}/sign-in`,
  link: () => `${PUBLIC.link()}/sign-in`,
};

export const SIGN_UP = {
  route: `${PUBLIC.route}/sign-up`,
  link: () => `${PUBLIC.link()}/sign-up`,
};

export const HOMEPAGE = {
  route: `${PRIVATE.route}/homepage`,
  link: () => `${PRIVATE.link()}/homepage`,
};

export const NEW_USER = {
  route: `${PRIVATE.route}/new`,
  link: () => `${PRIVATE.link()}/new`,
};
