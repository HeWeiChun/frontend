export namespace API {
  /** GET /api/currentUser */
  export type GET_API_CURRENT_USER_QUERY = {
    /** example:  123 */
    token: string;
  };

  export type GET_API_CURRENT_USER_PAYLOAD = Record<string, any>;

  export type GET_API_CURRENT_USER_RES = {
    data: {
      name: string;
      avatar: string;
    };
  };


  /** POST /api/login/outLogin */
  export type POST_API_LOGIN_OUT_LOGIN_QUERY = {
    /** example:  123 */
    token: string;
  };

  export type POST_API_LOGIN_OUT_LOGIN_PAYLOAD = Record<string, any>;

  export type POST_API_LOGIN_OUT_LOGIN_RES = {
    /** example: {} */
    data: Record<string, any>;
    /** example: true */
    success: boolean;
  };

  /** POST /api/login/account */
  export type POST_API_LOGIN_ACCOUNT_QUERY = {
    /** example:  123 */
    token: string;
  };

  export type POST_API_LOGIN_ACCOUNT_PAYLOAD = {
    /** example: admin */
    username: string;
    /** example: ant.design */
    password: string;
    /** example: true */
    autoLogin: boolean;
    /** example: account */
    type: string;
  };

  export type POST_API_LOGIN_ACCOUNT_RES = {
    /** example: ok */
    status: string;
    /** example: account */
    type: string;
    /** example: admin */
    currentAuthority: string;
  };
}
