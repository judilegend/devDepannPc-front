export const userManagementPermissions = {
  canAccess: (role?: string) => {
    const allowedRoles = ["admin"];
    return role && allowedRoles.includes(role);
  },
};
