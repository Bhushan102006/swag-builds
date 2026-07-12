export type Role = 'Dispatcher' | 'Fleet Manager' | 'Safety Officer' | 'Financial Analyst';
export type Feature = 'dashboard' | 'fleet' | 'drivers' | 'maintenance' | 'analytics' | 'settings' | 'trips' | 'fuel';

const RBAC: Record<Role, { view: Feature[], edit: Feature[] }> = {
  'Dispatcher': {
    view: ['dashboard', 'fleet', 'trips', 'settings'],
    edit: ['trips']
  },
  'Fleet Manager': {
    view: ['dashboard', 'fleet', 'drivers', 'analytics', 'settings'],
    edit: ['fleet', 'drivers', 'analytics', 'settings']
  },
  'Safety Officer': {
    view: ['dashboard', 'drivers', 'trips', 'settings'],
    edit: ['drivers']
  },
  'Financial Analyst': {
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
