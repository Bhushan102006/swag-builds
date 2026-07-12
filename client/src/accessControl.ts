export type Role = 'dispatcher' | 'fleet_manager' | 'safety_officer' | 'financial_analyst';
export type Feature = 'dashboard' | 'fleet' | 'drivers' | 'maintenance' | 'analytics' | 'settings' | 'trips' | 'fuel';

const RBAC: Record<Role, { view: Feature[], edit: Feature[] }> = {
  dispatcher: {
    view: ['dashboard', 'fleet', 'trips', 'settings'],
    edit: ['trips']
  },
  fleet_manager: {
    view: ['dashboard', 'fleet', 'drivers', 'analytics', 'settings'],
    edit: ['fleet', 'drivers', 'analytics', 'settings']
  },
  safety_officer: {
    view: ['dashboard', 'drivers', 'trips', 'settings'],
    edit: ['drivers']
  },
  financial_analyst: {
    view: ['dashboard', 'fuel', 'analytics', 'fleet', 'settings'],
    edit: ['fuel', 'analytics']
  }
};

export const canView = (role: string, feature: Feature): boolean => {
  const roleData = RBAC[role as Role];
  if (!roleData) return false;
  return roleData.view.includes(feature);
};

export const canEdit = (role: string, feature: Feature): boolean => {
  const roleData = RBAC[role as Role];
  if (!roleData) return false;
  return roleData.edit.includes(feature);
};
