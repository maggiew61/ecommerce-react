export const isAuthenticated = user => !!user;

export const isAllowed = (user, rights) =>
  rights.some(right => user.rights.includes(right));

// export const hasRole = (user, roles) =>
//   roles.some(role => user.roles.includes(role));

  // test
  export const hasRole = (user, roles) => {
    console.log('user is',user,'roler is',roles)
    return roles.some(role => user.roles.includes(role));

  }
