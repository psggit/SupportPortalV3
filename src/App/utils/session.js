function getHasuraRole(data) {
  const hasuraRoles = data.hasura_roles;
  const rolesMap = {
    anonymous: 0,
    user: 1,
    admin: 2,
    opdataadmin: 3,
    support_admin: 4,
  };
  let xHasuraRole = "anonymous";
  for (let i = 0; i < hasuraRoles.length; i++) {
    if (rolesMap[xHasuraRole] <= rolesMap[hasuraRoles[i]]) {
      xHasuraRole = hasuraRoles[i];
    }
  }
  console.log("xHasuraRole", xHasuraRole);
  return xHasuraRole;
}

function getHasuraId(data) {
  const hasuraId = data.hasura_id;
  return hasuraId;
}

export function createSession(data) {
  // console.log("[CREATE SESSION]");
  // console.log(data);
  localStorage.setItem("x-hasura-role", getHasuraRole(data));
  localStorage.setItem("hasura-id", getHasuraId(data));
}
