# 🚚 TransitOps – Smart Transport Operations Platform

## Overview

TransitOps is a centralized fleet management platform designed to digitize transport operations for logistics companies. It replaces manual spreadsheets and logbooks with an integrated system for managing vehicles, drivers, trips, maintenance, expenses, and operational analytics.

---

## Problem Statement

Logistics companies often face operational challenges due to manual fleet management, including:

- Scheduling conflicts
- Underutilized vehicles
- Missed maintenance
- Expired driver licenses
- Inaccurate fuel and expense tracking
- Poor operational visibility

TransitOps solves these challenges through automation, validation, and real-time monitoring.

---

## Target Users

- *Fleet Manager* – Manages vehicles, maintenance, and fleet utilization.
- *Dispatcher* – Creates and dispatches trips.
- *Safety Officer* – Monitors driver compliance and license validity.
- *Financial Analyst* – Tracks operational costs, fuel usage, and ROI.

---

# Features

## Authentication
- Secure Email & Password Login
- Role-Based Access Control (RBAC)
- Protected Routes

## Dashboard
- Active Vehicles
- Available Vehicles
- Vehicles in Maintenance
- Active Trips
- Pending Trips
- Drivers On Duty
- Fleet Utilization
- Filters by Vehicle Type, Status, and Region

## Vehicle Management
- Register Vehicles
- Update Vehicle Details
- Vehicle Status Management
- Unique Registration Number Validation

## Driver Management
- Driver Profiles
- License Validation
- Safety Score Tracking
- Driver Availability Management

## Trip Management
- Create Trips
- Assign Vehicles & Drivers
- Cargo Weight Validation
- Trip Lifecycle
  - Draft
  - Dispatched
  - Completed
  - Cancelled

## Maintenance Management
- Create Maintenance Logs
- Automatic Vehicle Status Updates
- Close Maintenance Records

## Fuel & Expense Management
- Fuel Logs
- Maintenance Expenses
- Toll Expenses
- Operational Cost Calculation

## Reports & Analytics
- Fuel Efficiency
- Fleet Utilization
- Vehicle ROI
- Operational Cost Analysis
- CSV Export
- PDF Export (Optional)

---

# Business Rules

- Vehicle Registration Number must be unique.
- Retired and In-Shop vehicles cannot be dispatched.
- Drivers with expired licenses cannot be assigned.
- Suspended drivers cannot be assigned.
- Drivers and vehicles already on a trip cannot be reused.
- Cargo weight cannot exceed vehicle capacity.
- Dispatch automatically updates vehicle and driver status to *On Trip*.
- Completing or cancelling a trip restores availability.
- Creating maintenance automatically changes vehicle status to *In Shop*.
- Closing maintenance restores vehicle availability.

---

# Database Entities

- Users
- Roles
- Vehicles
- Drivers
- Trips
- Maintenance Logs
- Fuel Logs
- Expenses

---

# Workflow

1. Register Vehicle
2. Register Driver
3. Create Trip
4. Validate Cargo Capacity
5. Dispatch Trip
6. Complete Trip
7. Update Vehicle & Driver Status
8. Create Maintenance Record
9. Update Reports & Analytics

---

# Technology Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JWT Authentication
- Role-Based Access Control

### Charts
- Chart.js / Recharts

---

# Future Enhancements

- Email reminders for expiring licenses
- Vehicle document management
- Advanced search and filtering
- Dark Mode
- Mobile-friendly interface
- Real-time notifications

---

# Team

Developed as part of the *TransitOps Smart Transport Operations Platform Hackathon*.

---

# License

This project is intended for educational and hackathon purposes.
