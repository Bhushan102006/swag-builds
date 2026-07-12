const API_BASE = "http://localhost:5000/api";

function getToken(): string | null {
  return localStorage.getItem("token");
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    const error: any = new Error(data.message || "Request failed");
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data as T;
}

// ── Auth ──
export interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  phone: string;
  isActive: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: AuthUser;
}

export interface RegisterResponse {
  message: string;
  user: AuthUser;
  token: string;
}

export function login(email: string, password: string) {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function register(data: {
  fullName: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
}) {
  return request<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ── Vehicles ──
export interface Vehicle {
  _id: string;
  registrationNumber: string;
  vehicleName: string;
  vehicleType: string;
  maxLoadCapacity: number;
  odometer: number;
  acquisitionCost: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function getVehicles(params?: {
  status?: string;
  vehicleType?: string;
  search?: string;
}) {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.vehicleType) query.set("vehicleType", params.vehicleType);
  if (params?.search) query.set("search", params.search);
  const qs = query.toString();
  return request<{ success: boolean; count: number; vehicles: Vehicle[] }>(
    `/vehicle${qs ? `?${qs}` : ""}`
  );
}

export function getVehicleById(id: string) {
  return request<{ success: boolean; vehicle: Vehicle }>(`/vehicle/${id}`);
}

export function createVehicle(data: Omit<Vehicle, "_id" | "createdAt" | "updatedAt">) {
  return request<{ success: boolean; message: string; vehicle: Vehicle }>(
    "/vehicle",
    { method: "POST", body: JSON.stringify(data) }
  );
}

export function updateVehicle(id: string, data: Partial<Vehicle>) {
  return request<{ success: boolean; message: string; vehicle: Vehicle }>(
    `/vehicle/${id}`,
    { method: "PUT", body: JSON.stringify(data) }
  );
}

export function deleteVehicle(id: string) {
  return request<{ success: boolean; message: string }>(`/vehicle/${id}`, {
    method: "DELETE",
  });
}

// ── Drivers ──
export interface Driver {
  _id: string;
  name: string;
  licenseNumber: string;
  licenseCategory: string;
  licenseExpiryDate: string;
  phone: string;
  safetyScore: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function getDrivers(params?: {
  status?: string;
  licenseCategory?: string;
  search?: string;
}) {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.licenseCategory)
    query.set("licenseCategory", params.licenseCategory);
  if (params?.search) query.set("search", params.search);
  const qs = query.toString();
  return request<{ success: boolean; count: number; drivers: Driver[] }>(
    `/driver${qs ? `?${qs}` : ""}`
  );
}

export function getDriverById(id: string) {
  return request<{ success: boolean; driver: Driver }>(`/driver/${id}`);
}

export function createDriver(
  data: Omit<Driver, "_id" | "createdAt" | "updatedAt">
) {
  return request<{ success: boolean; message: string; driver: Driver }>(
    "/driver",
    { method: "POST", body: JSON.stringify(data) }
  );
}

export function updateDriver(id: string, data: Partial<Driver>) {
  return request<{ success: boolean; message: string; driver: Driver }>(
    `/driver/${id}`,
    { method: "PUT", body: JSON.stringify(data) }
  );
}

export function deleteDriver(id: string) {
  return request<{ success: boolean; message: string }>(`/driver/${id}`, {
    method: "DELETE",
  });
}

// ── Trips ──
export interface Trip {
  _id: string;
  source: string;
  destination: string;
  vehicle: Vehicle;
  driver: Driver;
  cargoWeight: number;
  plannedDistance: number;
  status: "Draft" | "Dispatched" | "Completed" | "Cancelled";
  dispatchDate?: string;
  completedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export function getTrips(params?: { status?: string }) {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  const qs = query.toString();
  return request<{ success: boolean; count: number; trips: Trip[] }>(
    `/trip${qs ? `?${qs}` : ""}`
  );
}

export function getTripById(id: string) {
  return request<{ success: boolean; trip: Trip }>(`/trip/${id}`);
}

export function createTrip(data: {
  source: string;
  destination: string;
  vehicle: string;
  driver: string;
  cargoWeight: number;
  plannedDistance: number;
}) {
  return request<{ success: boolean; message: string; trip: Trip }>("/trip", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function dispatchTrip(id: string) {
  return request<{ success: boolean; message: string; trip: Trip }>(
    `/trip/${id}/dispatch`,
    { method: "PATCH" }
  );
}

export function completeTrip(id: string) {
  return request<{ success: boolean; message: string; trip: Trip }>(
    `/trip/${id}/complete`,
    { method: "PATCH" }
  );
}

export function cancelTrip(id: string) {
  return request<{ success: boolean; message: string; trip: Trip }>(
    `/trip/${id}/cancel`,
    { method: "PATCH" }
  );
}

// ── Maintenance ──
export interface Maintenance {
  _id: string;
  vehicle: Vehicle;
  maintenanceType: string;
  cost: number;
  description: string;
  status: "Open" | "Closed";
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export function getMaintenances(params?: {
  status?: string;
  vehicle?: string;
}) {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.vehicle) query.set("vehicle", params.vehicle);
  const qs = query.toString();
  return request<{
    success: boolean;
    count: number;
    maintenances: Maintenance[];
  }>(`/maintenance${qs ? `?${qs}` : ""}`);
}

export function createMaintenance(data: {
  vehicle: string;
  maintenanceType: string;
  cost?: number;
  description?: string;
  startDate?: string;
}) {
  return request<{
    success: boolean;
    message: string;
    maintenance: Maintenance;
  }>("/maintenance", { method: "POST", body: JSON.stringify(data) });
}

export function closeMaintenance(
  id: string,
  data?: { cost?: number; description?: string }
) {
  return request<{
    success: boolean;
    message: string;
    maintenance: Maintenance;
  }>(`/maintenance/${id}/close`, {
    method: "PATCH",
    body: JSON.stringify(data || {}),
  });
}

// ── Fuel Logs ──
export interface FuelLog {
  _id: string;
  vehicle: Vehicle;
  liters: number;
  cost: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export function getFuelLogs(params?: { vehicle?: string }) {
  const query = new URLSearchParams();
  if (params?.vehicle) query.set("vehicle", params.vehicle);
  const qs = query.toString();
  return request<{ success: boolean; count: number; fuelLogs: FuelLog[] }>(
    `/fuel${qs ? `?${qs}` : ""}`
  );
}

export function createFuelLog(data: {
  vehicle: string;
  liters: number;
  cost: number;
  date?: string;
}) {
  return request<{ success: boolean; message: string; fuelLog: FuelLog }>(
    "/fuel",
    { method: "POST", body: JSON.stringify(data) }
  );
}

// ── Expenses ──
export interface Expense {
  _id: string;
  vehicle: Vehicle;
  expenseType: string;
  amount: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export function getExpenses(params?: { vehicle?: string }) {
  const query = new URLSearchParams();
  if (params?.vehicle) query.set("vehicle", params.vehicle);
  const qs = query.toString();
  return request<{ success: boolean; count: number; expenses: Expense[] }>(
    `/expenses${qs ? `?${qs}` : ""}`
  );
}

export function createExpense(data: {
  vehicle: string;
  expenseType: string;
  amount: number;
  description?: string;
}) {
  return request<{ success: boolean; message: string; expense: Expense }>(
    "/expenses",
    { method: "POST", body: JSON.stringify(data) }
  );
}

// ── Dashboard ──
export interface DashboardData {
  totalVehicles: number;
  availableVehicles: number;
  onTripVehicles: number;
  inShopVehicles: number;
  totalDrivers: number;
  availableDrivers: number;
  activeTrips: number;
  completedTrips: number;
  maintenanceCount: number;
  fleetUtilization: number;
}

export function getDashboard() {
  return request<{ success: boolean; data: DashboardData }>("/dashboard");
}

// ── Reports ──
export interface ReportsData {
  totalFuelCost: number;
  totalMaintenanceCost: number;
  totalExpenses: number;
  totalTrips: number;
  completedTrips: number;
}

export function getReports() {
  return request<{ success: boolean; data: ReportsData }>("/reports");
}
